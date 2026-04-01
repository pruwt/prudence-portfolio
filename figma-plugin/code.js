// ─────────────────────────────────────────────────────────────────────────────
// NSE Dosikaa — Hi-Fi Screens Plugin
// Screen: Splash — Investor Onboarding
// Frame: 390 × 844 px (iPhone 14)
// Placed 80px to the right of the last existing frame on the current page.
// ─────────────────────────────────────────────────────────────────────────────

(async () => {
  // ── colour helpers ──────────────────────────────────────────────────────────
  function rgb(hex) {
    const h = hex.replace('#', '');
    return {
      r: parseInt(h.slice(0, 2), 16) / 255,
      g: parseInt(h.slice(2, 4), 16) / 255,
      b: parseInt(h.slice(4, 6), 16) / 255,
    };
  }
  const fill  = (hex) => [{ type: 'SOLID', color: rgb(hex) }];
  const white = () => [{ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }];

  // ── font loader (tries several SF Pro variant names) ────────────────────────
  async function tryLoad(family, style) {
    try { await figma.loadFontAsync({ family, style }); return { family, style }; }
    catch (_) { return null; }
  }

  // Each role tries a priority list; first success wins.
  const SF_DISPLAY_BOLD =
    await tryLoad('SF Pro Display', 'Bold') ||
    await tryLoad('SF Pro',         'Bold') ||
    await tryLoad('SF Pro Text',    'Bold');

  const SF_TEXT_REGULAR =
    await tryLoad('SF Pro Text',    'Regular') ||
    await tryLoad('SF Pro',         'Regular') ||
    await tryLoad('SF Pro Display', 'Regular');

  const SF_TEXT_SEMIBOLD =
    await tryLoad('SF Pro Text',    'Semibold') ||
    await tryLoad('SF Pro',         'Semibold') ||
    await tryLoad('SF Pro Display', 'Semibold');

  const SF_TEXT_BOLD =
    await tryLoad('SF Pro Text',    'Bold') ||
    await tryLoad('SF Pro',         'Bold') ||
    await tryLoad('SF Pro Display', 'Bold');

  if (!SF_DISPLAY_BOLD || !SF_TEXT_REGULAR || !SF_TEXT_SEMIBOLD || !SF_TEXT_BOLD) {
    figma.notify(
      '⚠ SF Pro not found. Install SF Pro from Apple (developer.apple.com/fonts) and restart Figma.',
      { error: true }
    );
    figma.closePlugin();
    return;
  }

  // ── position: right of existing frames + 80 px gap ─────────────────────────
  const existingFrames = figma.currentPage.children.filter((n) => n.type === 'FRAME');
  let startX = 0;
  for (const f of existingFrames) {
    const rightEdge = f.x + f.width;
    if (rightEdge > startX) startX = rightEdge;
  }
  if (existingFrames.length > 0) startX += 80;

  // ── create the main frame ───────────────────────────────────────────────────
  const F = figma.createFrame();
  F.name       = 'Splash — Investor Onboarding';
  F.resize(390, 844);
  F.x          = startX;
  F.y          = 0;
  F.fills      = fill('#F4F6F8');
  F.clipsContent = true;

  // ── helper: create + style a text node, append to F ────────────────────────
  function txt({ font, chars, size, color, x, y, lh, ls, maxW }) {
    const t = figma.createText();
    t.fontName    = font;
    t.characters  = chars;
    t.fontSize    = size;
    t.fills       = fill(color);
    if (lh  !== undefined) t.lineHeight    = { value: lh, unit: 'PIXELS' };
    if (ls  !== undefined) t.letterSpacing = { value: ls, unit: 'PERCENT' };
    if (maxW !== undefined) {
      t.textAutoResize = 'HEIGHT';
      t.resize(maxW, 1000);
    }
    t.x = x;
    t.y = y;
    F.appendChild(t);
    return t;
  }

  // ────────────────────────────────────────────────────────────────────────────
  // 1. NSE LOGO — top-left, 24 px from left, 60 px from top
  // ────────────────────────────────────────────────────────────────────────────
  txt({
    font:  SF_DISPLAY_BOLD,
    chars: 'NSE',
    size:  24,
    color: '#0B1F33',
    x: 24, y: 60,
  });
  txt({
    font:  SF_TEXT_REGULAR,
    chars: 'nairobi securities exchange',
    size:  11,
    color: '#6B8299',
    ls:    0,
    x: 24, y: 91,   // ≈ 60 + 24px text height + 7px gap
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 2. HEADING BLOCK — left-aligned, 24 px margin, 180 px from top
  // ────────────────────────────────────────────────────────────────────────────
  // Overline
  txt({
    font:  SF_TEXT_SEMIBOLD,
    chars: 'INVESTOR ONBOARDING',
    size:  11,
    color: '#6B8299',
    ls:    8,           // +8 % letter-spacing
    x: 24, y: 180,
  });

  // Display title — max-width 300 px, multi-line
  txt({
    font:  SF_DISPLAY_BOLD,
    chars: "Prepare to invest confidently in Kenya\u2019s capital markets.",
    size:  30,
    color: '#0B1F33',
    lh:    34,
    ls:    -1,          // −1 % letter-spacing
    maxW:  300,
    x: 24, y: 204,      // overline y(180) + overline height(~16) + 8 px gap
  });

  // ────────────────────────────────────────────────────────────────────────────
  // 3. GEOMETRIC BACKGROUND MOTIF — bottom-right, circles bleed off frame
  //    Append BEFORE button so button renders on top.
  // ────────────────────────────────────────────────────────────────────────────
  //  Circle 1 — NSE Green #00674F — largest (220 px), anchored bottom-right
  const c1 = figma.createEllipse();
  c1.resize(220, 220);
  c1.x     = 250;   // right side — bleeds partially
  c1.y     = 660;   // bottom — bleeds partially
  c1.fills = fill('#00674F');
  c1.name  = 'Circle / Green';
  F.appendChild(c1);

  //  Circle 2 — Accent Blue #1F4E79 — medium (190 px), overlapping C1, offset left
  const c2 = figma.createEllipse();
  c2.resize(190, 190);
  c2.x     = 140;
  c2.y     = 700;
  c2.fills = fill('#1F4E79');
  c2.name  = 'Circle / Blue';
  F.appendChild(c2);

  //  Circle 3 — Navy 20 #C2CDD8 — smaller (155 px), overlapping both, offset up-left
  const c3 = figma.createEllipse();
  c3.resize(155, 155);
  c3.x     = 55;
  c3.y     = 658;
  c3.fills = fill('#C2CDD8');
  c3.name  = 'Circle / Navy20';
  F.appendChild(c3);

  // ────────────────────────────────────────────────────────────────────────────
  // 4. PRIMARY BUTTON — "Begin"
  //    Full-width 342 px × 52 px, pill radius 26 px
  //    Sits 24 px above iPhone 14 bottom safe area (34 px from screen bottom)
  //    → y = 844 − 34 − 24 − 52 = 734
  // ────────────────────────────────────────────────────────────────────────────
  const BTN_Y = 844 - 34 - 24 - 52; // = 734

  const btn = figma.createFrame();
  btn.name         = 'Button / Primary / Begin';
  btn.resize(342, 52);
  btn.x            = 24;
  btn.y            = BTN_Y;
  btn.cornerRadius = 26;
  btn.fills        = fill('#0B1F33');

  const btnLabel = figma.createText();
  btnLabel.fontName   = SF_TEXT_BOLD;
  btnLabel.characters = 'Begin';
  btnLabel.fontSize   = 16;
  btnLabel.fills      = white();
  btnLabel.textAlignHorizontal = 'CENTER';
  btn.appendChild(btnLabel);

  // Centre label within the button
  btnLabel.x = Math.round((342 - btnLabel.width)  / 2);
  btnLabel.y = Math.round((52  - btnLabel.height) / 2);

  F.appendChild(btn);

  // ── finalise: select + zoom to the new frame ────────────────────────────────
  figma.currentPage.selection = [F];
  figma.viewport.scrollAndZoomIntoView([F]);
  figma.notify('✓ Splash screen created — NSE Dosikaa');
  figma.closePlugin();
})();
