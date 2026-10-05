#!/usr/bin/env node
/**
 * pen-spec.mjs — Rend `design/pencil-demiton.pen` exploitable en texte.
 *
 * Le fichier .pen (format pen.dev, JSON, version 2.19) contient des écrans
 * (`frame` racines) dont les nœuds portent des propriétés de mise en page et
 * de style. Ce script :
 *   1. résout les variables de design (`$surface` -> `#16161B`, `$font-body`
 *      -> `Barlow`, ...) ;
 *   2. développe les nœuds `ref` (composants réutilisables) et applique leurs
 *      surcharges `descendants` ;
 *   3. normalise les propriétés (padding, poids de police, couleurs, images) ;
 *   4. émet un arbre lisible (défaut) ou un JSON structuré (`--json`).
 *
 * Usage :
 *   node scripts/pen-spec.mjs                          # tous les écrans, arbre texte
 *   node scripts/pen-spec.mjs --json                   # tout le document en JSON
 *   node scripts/pen-spec.mjs --screen "Accueil"       # un seul écran (nom exact)
 *   node scripts/pen-spec.mjs --match mobile           # écrans dont le nom contient
 *   node scripts/pen-spec.mjs --depth 3                # limite la profondeur
 *   node scripts/pen-spec.mjs --tokens                 # variables + inventaire
 *   node scripts/pen-spec.mjs --out docs/pen-spec.json # écrit dans un fichier
 *
 * Options : --pen <chemin> (défaut design/pencil-demiton.pen), --no-refs
 * (ne développe pas les `ref`), --no-resolve (garde les `$tokens` bruts).
 *
 * Aucune dépendance externe. Node >= 18 (ESM).
 */

import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DEFAULT_PEN = resolve(__dirname, '..', 'design', 'pencil-demiton.pen');

/* ------------------------------------------------------------------ */
/* 1. Chargement + résolution des variables                            */
/* ------------------------------------------------------------------ */

export function loadPen(penPath = DEFAULT_PEN) {
	const raw = JSON.parse(readFileSync(penPath, 'utf8'));
	const variables = raw.variables ?? {};
	/** Résout `$nom` en valeur de variable ; laisse le reste intact. */
	const resolveToken = (value) =>
		typeof value === 'string' && value.startsWith('$') && variables[value.slice(1)]
			? variables[value.slice(1)].value
			: value;
	return { raw, variables, resolveToken };
}

/** Index id -> nœud (le .pen est un arbre, les `ref` pointent par id). */
function indexById(roots) {
	const byId = new Map();
	const walk = (node) => {
		byId.set(node.id, node);
		(node.children ?? []).forEach(walk);
	};
	roots.forEach(walk);
	return byId;
}

/* ------------------------------------------------------------------ */
/* 2. Normalisation des propriétés                                     */
/* ------------------------------------------------------------------ */

const FONT_WEIGHTS = { normal: 400, regular: 400, medium: 500, '500': 500, semibold: 600, '600': 600, bold: 700, '700': 700 };

/** `20` -> {top:20,right:20,bottom:20,left:20} ; `[v,h]` / `[t,r,b,l]`. */
export function normalizePadding(padding) {
	if (padding === undefined || padding === null) return null;
	if (typeof padding === 'number') return { top: padding, right: padding, bottom: padding, left: padding };
	if (Array.isArray(padding)) {
		if (padding.length === 2) return { top: padding[0], right: padding[1], bottom: padding[0], left: padding[1] };
		if (padding.length === 4)
			return { top: padding[0], right: padding[1], bottom: padding[2], left: padding[3] };
	}
	return null;
}

/** Normalise `strokeWidth` (nombre ou objet par côté) en {top,right,bottom,left}. */
function normalizeStrokeWidth(strokeWidth) {
	if (strokeWidth === undefined || strokeWidth === null) return null;
	if (typeof strokeWidth === 'number')
		return { top: strokeWidth, right: strokeWidth, bottom: strokeWidth, left: strokeWidth };
	return { top: 0, right: 0, bottom: 0, left: 0, ...strokeWidth };
}

/** Décrit un `fill` : couleur résolue, image, ou valeur brute. */
export function describeFill(fill, resolveToken) {
	if (fill === undefined || fill === null) return null;
	if (typeof fill === 'object' && fill.type === 'image') {
		return {
			kind: 'image',
			url: fill.url,
			mode: fill.mode ?? null,
			external: /^https?:/.test(fill.url ?? ''),
		};
	}
	if (typeof fill === 'string') {
		const resolved = resolveToken(fill);
		const opaque = /^#[0-9A-Fa-f]{6}$/.test(resolved) ? `#${resolved.slice(1)}` : resolved;
		// #RRGGBBAA -> opacité en plus de la couleur de base
		let alpha = null;
		if (/^#[0-9A-Fa-f]{8}$/.test(resolved)) {
			alpha = parseInt(resolved.slice(7, 9), 16) / 255;
		}
		return { kind: 'color', token: fill.startsWith('$') ? fill : null, value: opaque, alpha };
	}
	return { kind: 'raw', value: fill };
}

/**
 * Aplatit un nœud .pen en une spec sérialisable.
 * `resolveToken` résout les `$variables` ; `byId` permet de développer les `ref`.
 */
export function normalizeNode(node, ctx, depth = 0, maxDepth = Infinity) {
	const { resolveToken, byId, expandRefs = true, overrides = null } = ctx;

	// --- nœud `ref` : on remplace par la définition référencée -------------
	if (node.type === 'ref') {
		const target = byId.get(node.ref);
		const base = {
			type: 'ref',
			name: node.name ?? target?.name ?? '(ref sans nom)',
			ref: node.ref,
			refName: target?.name ?? null,
			refMissing: !target,
			width: node.width ?? null,
			height: node.height ?? null,
			x: node.x ?? null,
			y: node.y ?? null,
			layoutPosition: node.layoutPosition ?? null,
			overrides: node.descendants ? Object.keys(node.descendants) : null,
			children: [],
		};
		if (!target || !expandRefs || depth >= maxDepth) return base;
		// Le composant référencé est instancié, avec ses éventuelles surcharges.
		const expanded = normalizeNode(
			target,
			{ ...ctx, overrides: node.descendants ?? null, expandRefs: false },
			depth,
			maxDepth,
		);
		return { ...base, expanded };
	}

	const override = overrides?.[node.id] ?? null;
	const merged = override ? { ...node, ...override } : node;

	const fill = describeFill(merged.fill, resolveToken);
	const strokeToken = merged.stroke ?? null;
	const stroke = strokeToken
		? { token: String(strokeToken).startsWith('$') ? strokeToken : null, value: resolveToken(strokeToken) }
		: null;

	const out = {
		type: merged.type,
		name: merged.name ?? null,
		id: merged.id,
		x: merged.x ?? null,
		y: merged.y ?? null,
		width: merged.width ?? null,
		height: merged.height ?? null,
		layoutPosition: merged.layoutPosition ?? null,
		layout: merged.layout ?? null,
		fill,
		stroke,
		strokeWidth: normalizeStrokeWidth(merged.strokeWidth),
		cornerRadius: merged.cornerRadius ?? null,
		clip: merged.clip ?? null,
		padding: normalizePadding(merged.padding),
		gap: merged.gap ?? null,
		justifyContent: merged.justifyContent ?? null,
		alignItems: merged.alignItems ?? null,
	};

	if (merged.type === 'text' || merged.content !== undefined) {
		out.text = {
			content: merged.content ?? null,
			fontFamily: merged.fontFamily ? { token: merged.fontFamily, value: resolveToken(merged.fontFamily) } : null,
			fontSize: merged.fontSize ?? null,
			fontWeight: merged.fontWeight !== undefined ? (FONT_WEIGHTS[String(merged.fontWeight)] ?? merged.fontWeight) : null,
			fontWeightRaw: merged.fontWeight ?? null,
			lineHeight: merged.lineHeight ?? null,
			letterSpacing: merged.letterSpacing ?? null,
			textAlign: merged.textAlign ?? null,
			textGrowth: merged.textGrowth ?? null,
		};
	}
	if (merged.type === 'icon') {
		out.icon = { name: merged.icon ?? null, library: merged.library ?? null };
	}

	if (override) out.overriddenBy = override;

	out.children = [];
	if (depth < maxDepth) {
		for (const child of merged.children ?? []) {
			out.children.push(normalizeNode(child, ctx, depth + 1, maxDepth));
		}
	}
	return out;
}

/** Construit la spec complète : variables + un objet par écran racine. */
export function buildSpec(penPath = DEFAULT_PEN, opts = {}) {
	const { expandRefs = true, resolve = true, maxDepth = Infinity } = opts;
	const { raw, variables, resolveToken: realResolve } = loadPen(penPath);
	const resolveToken = resolve ? realResolve : (v) => v;
	const byId = indexById(raw.children ?? []);
	const screens = (raw.children ?? []).map((screen) =>
		normalizeNode(screen, { resolveToken, byId, expandRefs }, 0, maxDepth),
	);
	return {
		version: raw.version,
		source: penPath,
		variables,
		screens,
	};
}

/* ------------------------------------------------------------------ */
/* 3. Rendu texte                                                      */
/* ------------------------------------------------------------------ */

const px = (v) => (v === null || v === undefined ? '?' : typeof v === 'number' ? `${v}px` : String(v));

function fmtFill(fill) {
	if (!fill) return null;
	if (fill.kind === 'color') return fill.token ? `${fill.token}(${fill.value}${fill.alpha !== null ? ` α${fill.alpha.toFixed(2)}` : ''})` : fill.value;
	if (fill.kind === 'image') return `image(${fill.external ? 'externe' : 'locale'}:${String(fill.url).split('/').pop()})`;
	return JSON.stringify(fill.value);
}

function fmtPadding(p) {
	if (!p) return null;
	const { top, right, bottom, left } = p;
	if (top === right && right === bottom && bottom === left) return `${top}`;
	if (top === bottom && right === left) return `${top} ${right}`;
	return `${top} ${right} ${bottom} ${left}`;
}

/** Ligne compacte d'un nœud normalisé. */
export function nodeLine(node) {
	const bits = [`${node.type} "${node.name ?? ''}"`];
	if (node.id) bits.push(`#${node.id}`);
	if (node.x !== null || node.y !== null) bits.push(`@${px(node.x)},${px(node.y)}`);
	if (node.width !== null || node.height !== null) bits.push(`${px(node.width)}x${px(node.height)}`);
	const fill = fmtFill(node.fill);
	if (fill) bits.push(`fill=${fill}`);
	if (node.stroke) bits.push(`stroke=${node.stroke.token ?? ''}(${node.stroke.value})`);
	if (node.strokeWidth) {
		const sides = ['top', 'right', 'bottom', 'left'].filter((s) => node.strokeWidth[s]);
		if (sides.length) bits.push(`strokeW={${sides.map((s) => `${s}:${node.strokeWidth[s]}`).join(',')}}`);
	}
	if (node.cornerRadius !== null) bits.push(`radius=${px(node.cornerRadius)}`);
	if (node.padding) bits.push(`padding=[${fmtPadding(node.padding)}]`);
	if (node.gap !== null) bits.push(`gap=${px(node.gap)}`);
	if (node.layout) bits.push(`layout=${node.layout}`);
	if (node.justifyContent) bits.push(`justify=${node.justifyContent}`);
	if (node.alignItems) bits.push(`align=${node.alignItems}`);
	if (node.layoutPosition) bits.push(`pos=${node.layoutPosition}`);
	if (node.text) {
		const t = node.text;
		if (t.content !== null) bits.push(`text=${JSON.stringify(String(t.content).slice(0, 60))}`);
		if (t.fontFamily) bits.push(`font=${t.fontFamily.value}/${t.fontSize ?? '?'}px`);
		if (t.fontWeight !== null && t.fontWeight !== undefined) bits.push(`weight=${t.fontWeight}`);
		if (t.lineHeight !== null && t.lineHeight !== undefined) bits.push(`lh=${t.lineHeight}`);
		if (t.letterSpacing !== null && t.letterSpacing !== undefined) bits.push(`ls=${t.letterSpacing}`);
		if (t.textAlign) bits.push(`align-text=${t.textAlign}`);
	}
	if (node.icon) bits.push(`icon=${node.icon.name}(${node.icon.library})`);
	if (node.refName) bits.push(`REF->${node.refName}${node.refMissing ? ' (MANQUANT)' : ''}`);
	if (node.overrides) bits.push(`overrides=${node.overrides.length}`);
	return bits.join(' | ');
}

export function renderTree(node, depth = 0, maxDepth = Infinity) {
	const lines = [`${'  '.repeat(depth)}${nodeLine(node)}`];
	if (node.expanded) lines.push(...renderTree(node.expanded, depth + 1, maxDepth));
	for (const child of node.children ?? []) {
		if (depth + 1 > maxDepth) {
			lines.push(`${'  '.repeat(depth + 1)}… (${(node.children ?? []).length} enfants, profondeur limitée)`);
			break;
		}
		lines.push(...renderTree(child, depth + 1, maxDepth));
	}
	return lines;
}

export function renderScreen(screen, maxDepth = Infinity) {
	const header = `### ${screen.name} (${screen.width ?? '?'}x${screen.height ?? '?'}) id=${screen.id}`;
	return [header, ...renderTree(screen, 0, maxDepth === Infinity ? Infinity : maxDepth + 1)].join('\n');
}

/** Inventaire des tokens réellement utilisés dans le document. */
export function tokenUsage(spec) {
	const used = new Map();
	const bump = (key) => used.set(key, (used.get(key) ?? 0) + 1);
	const walk = (n) => {
		if (n.fill?.token) bump(n.fill.token);
		if (n.stroke?.token) bump(n.stroke.token);
		if (n.text?.fontFamily?.token) bump(n.text.fontFamily.token);
		if (n.expanded) walk(n.expanded);
		(n.children ?? []).forEach(walk);
	};
	spec.screens.forEach(walk);
	return used;
}

/* ------------------------------------------------------------------ */
/* 4. CLI                                                              */
/* ------------------------------------------------------------------ */

function parseArgs(argv) {
	const args = { _: [], depth: Infinity, expandRefs: true, resolve: true, json: false, tokens: false };
	for (let i = 0; i < argv.length; i++) {
		const a = argv[i];
		if (a === '--json') args.json = true;
		else if (a === '--tokens') args.tokens = true;
		else if (a === '--no-refs') args.expandRefs = false;
		else if (a === '--no-resolve') args.resolve = false;
		else if (a === '--screen') args.screen = argv[++i];
		else if (a === '--match') args.match = argv[++i];
		else if (a === '--depth') args.depth = Number(argv[++i]);
		else if (a === '--pen') args.pen = argv[++i];
		else if (a === '--out') args.out = argv[++i];
		else args._.push(a);
	}
	return args;
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(fileURLToPath(import.meta.url));

if (isMain) {
	const args = parseArgs(process.argv.slice(2));
	const spec = buildSpec(args.pen ?? DEFAULT_PEN, {
		expandRefs: args.expandRefs,
		resolve: args.resolve,
		maxDepth: args.depth,
	});

	let out;
	if (args.json) {
		out = JSON.stringify(spec, null, 2);
	} else {
		const lines = [
			`# Spécification extraite de ${spec.source}`,
			`# version .pen : ${spec.version} — ${spec.screens.length} écrans`,
			'',
		];
		if (args.tokens) {
			lines.push('## Variables de design', '');
			for (const [name, v] of Object.entries(spec.variables)) lines.push(`- $${name} = ${v.value} (${v.type})`);
			lines.push('', '## Tokens utilisés dans les écrans', '');
			for (const [token, count] of [...tokenUsage(spec)].sort((a, b) => b[1] - a[1]))
				lines.push(`- ${token} ×${count}`);
			lines.push('');
		}
		let screens = spec.screens;
		if (args.screen) screens = screens.filter((s) => s.name === args.screen);
		if (args.match) screens = screens.filter((s) => s.name.includes(args.match));
		if (screens.length === 0) {
			console.error(`Aucun écran ne correspond (disponibles : ${spec.screens.map((s) => s.name).join(', ')})`);
			process.exitCode = 1;
		}
		for (const screen of screens) lines.push(renderScreen(screen, args.depth), '');
		out = lines.join('\n');
	}

	if (args.out) {
		mkdirSync(dirname(resolve(args.out)), { recursive: true });
		writeFileSync(resolve(args.out), out);
		console.error(`Écrit : ${resolve(args.out)} (${out.length} octets)`);
	} else {
		process.stdout.write(out + '\n');
	}
}
