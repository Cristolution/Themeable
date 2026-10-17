"""Builds the Themeable logo masters (symbol, small cut, lockups) as outline-only SVGs.

Wordmark: Inter Bold (SIL OFL 1.1), converted to paths with fontTools.
Run from brand/logo: python build_kit.py
"""
import pathlib
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen

OUT = pathlib.Path(__file__).parent / "kit"
OUT.mkdir(exist_ok=True)

BLUE, BLUE_LIGHT, INK, PAPER, SNOW = "#4a6cf7", "#7c9cff", "#0b0d12", "#f6f7fb", "#e8eaf0"

# --- Symbol: pill swatch over a square stem (8-unit grid, 256 canvas) ---------
# Content spans y 24..228 so the mark sits a touch above geometric centre.
PILL = "M60 24H196A36 36 0 0 1 196 96H60A36 36 0 0 1 60 24Z"
STEM = "M92 112H164V188A40 40 0 0 1 124 228H92Z"
# Small-size cut: wider gap and heavier parts so the split survives at 16 px.
PILL_S = "M64 20H192A44 44 0 0 1 192 108H64A44 44 0 0 1 64 20Z"
STEM_S = "M84 132H172V192A44 44 0 0 1 128 236H84Z"


def symbol_paths(pill_fill, stem_fill, small=False):
    p, s = (PILL_S, STEM_S) if small else (PILL, STEM)
    return f'<path id="pill" fill="{pill_fill}" d="{p}"/><path id="stem" fill="{stem_fill}" d="{s}"/>'


def svg(w, h, body, title):
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" '
            f'role="img" aria-labelledby="title"><title id="title">{title}</title>{body}</svg>\n')


# --- Wordmark ------------------------------------------------------------------
# Download Inter Bold (TTF) next to this script first: https://fonts.google.com/specimen/Inter
font = TTFont(pathlib.Path(__file__).parent / "inter-700.ttf")
gs = font.getGlyphSet()
cmap = font.getBestCmap()
hmtx = font["hmtx"]
CAP = font["OS/2"].sCapHeight  # 1490 for Inter
TRACK = -0.025  # em


def wordmark(text, cap_px, x0, baseline, fill):
    scale = cap_px / CAP
    upm = font["head"].unitsPerEm
    pen = SVGPathPen(gs)
    x = 0.0
    prev = None
    for ch in text:
        g = cmap[ord(ch)]
        tp = TransformPen(pen, (scale, 0, 0, -scale, x0 + x * scale, baseline))
        gs[g].draw(tp)
        x += hmtx[g][0] + TRACK * upm
        prev = g
    width = (x - TRACK * upm) * scale
    d = pen.getCommands()
    # round coordinates to 2 decimals to keep files small
    import re
    d = re.sub(r"-?\d+\.\d+", lambda m: f"{float(m.group()):.2f}".rstrip("0").rstrip("."), d)
    return f'<path id="wordmark" fill="{fill}" d="{d}"/>', width


def left_bearing(text, cap_px):
    bp = BoundsPen(gs)
    gs[cmap[ord(text[0])]].draw(bp)
    return bp.bounds[0] * cap_px / CAP


NAME = "Themeable"

# Horizontal lockup: cap height 120 (≈0.59 of the 204-unit symbol), centred on the symbol's optical middle.
CAP_H = 120
GAP = 52
base_h = 126 + CAP_H / 2
lb = left_bearing(NAME, CAP_H)
x_word = 232 + GAP - lb
_, w_word = wordmark(NAME, CAP_H, 0, 0, INK)
W_H = int(x_word + w_word + 24)


def horizontal(pill, stem, word):
    wm, _ = wordmark(NAME, CAP_H, x_word, base_h, word)
    return svg(W_H, 256, f'<g id="symbol">{symbol_paths(pill, stem)}</g>{wm}', "Themeable logo")


# Stacked lockup: symbol 256 on top, wordmark (cap 96) centred below.
CAP_S = 96
_, w_s = wordmark(NAME, CAP_S, 0, 0, INK)
lb_s = left_bearing(NAME, CAP_S)
W_S = int(max(w_s, 256) + 48)
x_s = (W_S - w_s) / 2 - lb_s / 2
H_S = 256 + 40 + CAP_S + 32


def stacked(pill, stem, word):
    wm, _ = wordmark(NAME, CAP_S, x_s, 256 + 40 + CAP_S, word)
    dx = (W_S - 256) / 2
    return svg(W_S, H_S, f'<g id="symbol" transform="translate({dx:.1f} 0)">{symbol_paths(pill, stem)}</g>{wm}', "Themeable logo")


def word_only(fill):
    wm, w = wordmark(NAME, CAP_H, 16 - lb, 24 + CAP_H, fill)
    return svg(int(w + 32), CAP_H + 48, wm, "Themeable wordmark")


files = {
    "themeable-symbol.svg": svg(256, 256, symbol_paths(BLUE, INK), "Themeable symbol"),
    "themeable-symbol-on-dark.svg": svg(256, 256, symbol_paths(BLUE_LIGHT, SNOW), "Themeable symbol (dark backgrounds)"),
    "themeable-symbol-small.svg": svg(256, 256, symbol_paths(BLUE, INK, small=True), "Themeable symbol, small sizes"),
    "themeable-symbol-small-on-dark.svg": svg(256, 256, symbol_paths(BLUE_LIGHT, SNOW, small=True), "Themeable symbol, small sizes (dark)"),
    "themeable-horizontal.svg": horizontal(BLUE, INK, INK),
    "themeable-horizontal-on-dark.svg": horizontal(BLUE_LIGHT, SNOW, SNOW),
    "themeable-stacked.svg": stacked(BLUE, INK, INK),
    "themeable-stacked-on-dark.svg": stacked(BLUE_LIGHT, SNOW, SNOW),
    "themeable-wordmark.svg": word_only(INK),
    "themeable-wordmark-on-dark.svg": word_only(SNOW),
}
for name, content in files.items():
    (OUT / name).write_text(content, encoding="utf-8")
print("wrote", len(files), "files to", OUT)
