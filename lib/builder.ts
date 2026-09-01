export type Card = { title: string; body: string };

export type SiteState = {
  background: string;
  foreground: string;
  accent: string;
  highlight: string;
  kicker: string;
  title: string;
  subtitle: string;
  buttonLabel: string;
  font: 'sans' | 'serif' | 'mono';
  align: 'left' | 'center';
  treatment: 'brutalist' | 'soft' | 'minimal' | 'editorial';
  cards: Card[];
  showOrb: boolean;
  showButton: boolean;
  gradient: boolean;
  backgroundImage: string | null;
  backgroundSourceLabel: string | null;
  backgroundSourceUrl: string | null;
};

export const initialSite: SiteState = {
  background: '#f1eddf',
  foreground: '#171611',
  accent: '#ff4f2f',
  highlight: '#dfff2f',
  kicker: 'BYOW / version 0.01',
  title: 'THIS WEBSITE\nIS NEVER\nFINISHED.',
  subtitle: 'Tell the builder what should exist. The page changes. The builder stays.',
  buttonLabel: 'START SOMEWHERE',
  font: 'sans',
  align: 'left',
  treatment: 'brutalist',
  showOrb: true,
  showButton: false,
  gradient: false,
  backgroundImage: null,
  backgroundSourceLabel: null,
  backgroundSourceUrl: null,
  cards: [
    { title: 'CHANGE THE FEEL', body: '“Make this warmer, stranger, and less polite.”' },
    { title: 'CHANGE THE STORY', body: '“Turn this into a field guide for urban moss.”' },
    { title: 'CHANGE EVERYTHING', body: '“Clear the page. Start with one enormous word.”' },
  ],
};

const colors: Record<string, string> = {
  black: '#111111', white: '#fffef8', cream: '#f3edda', beige: '#e8dec8',
  red: '#ef3d32', coral: '#ff5b45', orange: '#ff7a1a', yellow: '#ffd83d',
  lime: '#dfff2f', green: '#167a4a', forest: '#123d2b', teal: '#0f766e',
  blue: '#2251ff', navy: '#101d42', 'midnight blue': '#10162f', purple: '#6d3cff',
  pink: '#ff8fbc', lavender: '#c8b6ff', gray: '#d5d5d0', grey: '#d5d5d0',
};

function mentionedColor(text: string, after: RegExp) {
  const match = text.match(after);
  if (!match) return null;
  const fragment = match[1].toLowerCase();
  const hex = fragment.match(/#[0-9a-f]{6}\b/i)?.[0];
  if (hex) return hex;
  return Object.entries(colors).find(([name]) => fragment.includes(name))?.[1] ?? null;
}

function cleanValue(value: string) {
  return value.trim().replace(/^['“"]|['”"]$/g, '').replace(/[.!]$/, '').trim();
}

const creativePalettes = [
  { background: '#ffe45c', foreground: '#28220d', accent: '#638c2c', highlight: '#fff4a8' },
  { background: '#dcecff', foreground: '#17233d', accent: '#3457d5', highlight: '#ff9ec4' },
  { background: '#f2d7e8', foreground: '#351b32', accent: '#b93672', highlight: '#ffd55c' },
  { background: '#d9ead3', foreground: '#163322', accent: '#2e7d4f', highlight: '#f2c94c' },
  { background: '#201b33', foreground: '#fff5d6', accent: '#ff6f61', highlight: '#7ef0c1' },
];

function stablePalette(value: string) {
  const score = [...value].reduce((total, character) => total + character.charCodeAt(0), 0);
  return creativePalettes[score % creativePalettes.length];
}

function inferCreativeDirection(text: string) {
  const patterns = [
    /(?:make|turn) (?:the )?(?:page|site|website|it|this) (?:feel|look) like\s+(.+)/i,
    /(?:make|turn) (?:the )?(?:page|site|website|it|this) (?:all|more|very|super)\s+(.+)/i,
    /(?:make|turn) (?:the )?(?:page|site|website|it|this)\s+(.+)/i,
    /(?:go|make it) full\s+(.+)/i,
    /(?:more|all)\s+(.+)/i,
  ];
  for (const pattern of patterns) {
    const match = text.match(pattern)?.[1];
    if (match) return cleanValue(match.replace(/^(?:about|into)\s+/i, ''));
  }
  return cleanValue(text.replace(/^(?:please|could you|can you)\s+/i, ''));
}

function creativePatch(direction: string): Partial<SiteState> {
  const subject = direction.replace(/^(?:a |an |the )/i, '').trim();
  const lower = subject.toLowerCase();
  const palette = stablePalette(lower);
  const base: Partial<SiteState> = {
    ...palette,
    kicker: 'CURRENT OBSESSION',
    title: subject.toUpperCase(),
    subtitle: `A page remixed around ${lower}. Keep pushing it—the next instruction can change everything again.`,
    cards: [
      { title: 'LOOK CLOSER', body: `Notice what gets interesting when ${lower} takes over the whole page.` },
      { title: 'PUSH THE IDEA', body: `Make ${lower} louder, stranger, calmer, sharper, or more specific.` },
      { title: 'BREAK THE DRAFT', body: 'Give the builder a contradictory direction and see what survives.' },
    ],
    showOrb: true,
    showButton: false,
    gradient: true,
    backgroundImage: null,
    backgroundSourceLabel: null,
    backgroundSourceUrl: null,
    treatment: 'soft',
  };

  if (/banana|plantain|tropical fruit/.test(lower)) {
    return {
      ...base,
      background: '#ffe45c', foreground: '#28220d', accent: '#5e7f28', highlight: '#fff3a6',
      kicker: 'RIPE / READY / REMIXABLE', title: 'GO FULL\nBANANAS.',
      subtitle: 'A suspiciously ripe corner of the internet. Yellow everywhere. Seriousness nowhere.',
      buttonLabel: 'PEEL HERE', showButton: true, align: 'center', font: 'sans', treatment: 'soft',
      cards: [
        { title: 'THE BUNCH', body: 'One banana is a snack. A whole page of them is a creative direction.' },
        { title: 'PEAK RIPENESS', body: 'Bright yellow, a little green, and exactly zero beige restraint.' },
        { title: 'BANANA SPLIT', body: 'Change one instruction and send the entire page somewhere new.' },
      ],
    };
  }
  if (/space|cosmic|galaxy|lunar|moon|planet|sci-fi/.test(lower)) {
    return { ...base, background: '#0a1026', foreground: '#eef3ff', accent: '#7897ff', highlight: '#d7ff67', font: 'mono', treatment: 'minimal' };
  }
  if (/luxury|hotel|fashion|elegant|romantic|old world/.test(lower)) {
    return { ...base, background: '#ede2ce', foreground: '#2e221b', accent: '#8e3328', highlight: '#d6b66d', font: 'serif', treatment: 'editorial' };
  }
  if (/punk|zine|chaos|loud|angry|grunge/.test(lower)) {
    return { ...base, background: '#f1eee3', foreground: '#111111', accent: '#ff2b2b', highlight: '#dfff2f', font: 'mono', treatment: 'brutalist', align: 'left', gradient: false };
  }
  if (/calm|quiet|zen|meditat|spa|gentle/.test(lower)) {
    return { ...base, background: '#e7eee9', foreground: '#20352b', accent: '#6b8f7c', highlight: '#d7c9a7', font: 'serif', treatment: 'minimal', gradient: false };
  }
  return base;
}

export function buildPatch(prompt: string, current: SiteState = initialSite): { patch: Partial<SiteState>; message: string; reset?: boolean } {
  const text = prompt.trim();
  const lower = text.toLowerCase();
  if (/^(reset|start over|restore default)/.test(lower)) {
    return { patch: initialSite, reset: true, message: 'Reset the canvas to the original BYOW draft.' };
  }

  const patch: Partial<SiteState> = {};
  const changes: string[] = [];
  const background = mentionedColor(text, /background(?: color)?(?: to| be|:)?\s+([^,;.]+)/i);
  const foreground = mentionedColor(text, /(?:text|type)(?: color)?(?: to| be|:)?\s+([^,;.]+)/i);
  const accent = mentionedColor(text, /accent(?: color)?(?: to| be|:)?\s+([^,;.]+)/i);

  if (background) {
    Object.assign(patch, { background, backgroundImage: null, backgroundSourceLabel: null, backgroundSourceUrl: null });
    changes.push('changed the background');
  }
  if (foreground) { patch.foreground = foreground; changes.push('changed the text color'); }
  if (accent) { patch.accent = accent; changes.push('changed the accent'); }

  if (!background && lower.includes('midnight blue')) { patch.background = colors['midnight blue']; changes.push('changed the background to midnight blue'); }

  if (/dark mode|make (?:it|this|the site) dark|night mode/.test(lower)) {
    Object.assign(patch, { background: '#111217', foreground: '#f5f0e5', accent: '#ff6b52', highlight: '#dfff2f' });
    changes.push('switched to a dark palette');
  } else if (/light mode|make (?:it|this|the site) light/.test(lower)) {
    Object.assign(patch, { background: '#fffef8', foreground: '#171611' });
    changes.push('switched to a light palette');
  } else if (/warmer|warm palette|sunset/.test(lower)) {
    Object.assign(patch, { background: '#f5dfc4', foreground: '#35190f', accent: '#e8482e', highlight: '#ffbd59' });
    changes.push('warmed up the palette');
  } else if (/ocean|underwater|sea blue/.test(lower)) {
    Object.assign(patch, { background: '#d9f0ed', foreground: '#092f3b', accent: '#007d8a', highlight: '#73e5ce' });
    changes.push('shifted to an ocean palette');
  } else if (/forest|moss|botanical/.test(lower)) {
    Object.assign(patch, { background: '#e6ead7', foreground: '#193224', accent: '#4d7b43', highlight: '#bedf68' });
    changes.push('shifted to a botanical palette');
  } else if (/neon|cyber|electric/.test(lower)) {
    Object.assign(patch, { background: '#0b0820', foreground: '#f7f3ff', accent: '#ff3ed2', highlight: '#55ffad', gradient: true });
    changes.push('made the palette electric');
  }

  if (/gradient/.test(lower)) { patch.gradient = !/(?:no|remove|without) gradient/.test(lower); changes.push(patch.gradient ? 'added a gradient' : 'removed the gradient'); }
  if (/brutalist|raw|less polite/.test(lower)) { patch.treatment = 'brutalist'; changes.push('made the layout more brutalist'); }
  if (/soft|rounded|gentle/.test(lower)) { patch.treatment = 'soft'; changes.push('softened the surfaces'); }
  if (/minimal|cleaner|strip it back/.test(lower)) { patch.treatment = 'minimal'; changes.push('stripped back the layout'); }
  if (/editorial|magazine/.test(lower)) { patch.treatment = 'editorial'; patch.font = 'serif'; changes.push('gave it an editorial treatment'); }
  if (/center(?:ed)?|align (?:it|everything) center/.test(lower)) { patch.align = 'center'; changes.push('centered the composition'); }
  if (/align (?:it|everything) left|left aligned/.test(lower)) { patch.align = 'left'; changes.push('left-aligned the composition'); }
  if (/monospace|mono type|terminal/.test(lower)) { patch.font = 'mono'; changes.push('changed the type to monospace'); }
  if (/serif/.test(lower)) { patch.font = 'serif'; changes.push('changed the type to serif'); }
  if (/sans serif|sans-serif/.test(lower)) { patch.font = 'sans'; changes.push('changed the type to sans serif'); }

  const title = text.match(/(?:headline|title)(?: to| be| say| says|:)+\s*["“']?([^"”']+)["”']?/i)?.[1];
  if (title) { patch.title = cleanValue(title).toUpperCase(); changes.push('rewrote the headline'); }
  const subtitle = text.match(/(?:subtitle|description|subhead)(?: to| be| say| says|:)+\s*["“']?([^"”']+)["”']?/i)?.[1];
  if (subtitle) { patch.subtitle = cleanValue(subtitle); changes.push('rewrote the introduction'); }
  const button = text.match(/button(?: to| be| say| says| label|:)+\s*["“']?([^"”']+)["”']?/i)?.[1];
  if (button) { patch.buttonLabel = cleanValue(button).toUpperCase(); patch.showButton = true; changes.push('updated the button'); }

  const subject = (
    text.match(/(?:make|turn) (?:this|it|the site|the website) (?:about|into)\s+(.+?)(?:\s+with\s+|[.!]|$)/i)?.[1]
    ?? text.match(/(?:site|website|page) about\s+(.+?)(?:\s+with\s+|[.!]|$)/i)?.[1]
  );
  if (subject) {
    const cleaned = cleanValue(subject);
    patch.kicker = 'A WEBSITE ABOUT';
    patch.title = cleaned.toUpperCase();
    patch.subtitle = `An evolving page about ${cleaned.toLowerCase()}, shaped one instruction at a time.`;
    patch.cards = [
      { title: 'NOTICE', body: `What is easy to miss about ${cleaned.toLowerCase()}?` },
      { title: 'FOLLOW', body: 'Trace one surprising thread all the way through.' },
      { title: 'REMAKE', body: 'Ask the builder for a completely different point of view.' },
    ];
    changes.push(`rebuilt the page around ${cleaned}`);
  }

  const section = text.match(/add (?:a |another )?(?:card|section)(?: called| for| about|:)?\s+["“']?([^"”']+)["”']?/i)?.[1];
  if (section) {
    const cleaned = cleanValue(section);
    patch.cards = [...current.cards.slice(0, 5), { title: cleaned.toUpperCase(), body: `A new space for ${cleaned.toLowerCase()}. Keep shaping it in the chat.` }];
    changes.push(`added a “${cleaned}” section`);
  }
  if (/remove (?:the )?(?:cards|sections)|hide (?:the )?(?:cards|sections)|clear the page/.test(lower)) { patch.cards = []; changes.push('cleared the supporting sections'); }
  if (/hide (?:the )?(?:circle|orb|shape)/.test(lower)) { patch.showOrb = false; changes.push('removed the background shape'); }
  if (/show (?:the )?(?:circle|orb|shape)/.test(lower)) { patch.showOrb = true; changes.push('restored the background shape'); }
  if (/hide (?:the )?button|remove (?:the )?button/.test(lower)) { patch.showButton = false; changes.push('removed the button'); }
  if (/show (?:the )?button|add (?:a )?button/.test(lower) && !button) { patch.showButton = true; changes.push('added a button'); }
  if (/(?:remove|clear|hide) (?:the )?(?:background image|background photo|photo background)/.test(lower)) {
    Object.assign(patch, { backgroundImage: null, backgroundSourceLabel: null, backgroundSourceUrl: null });
    changes.push('removed the background image');
  }

  if (/surprise me|randomize|make it weird/.test(lower)) {
    Object.assign(patch, { background: '#25194a', foreground: '#f9efc7', accent: '#ff5c8a', highlight: '#52ffc8', font: 'serif', align: 'center', treatment: 'soft', gradient: true });
    changes.push('took the weird door');
  }

  if (!changes.length) {
    const direction = inferCreativeDirection(text);
    return {
      patch: creativePatch(direction),
      message: `I took “${direction}” as the creative direction and rebuilt the whole page around it. Keep it, undo it, or push it further.`,
    };
  }
  return { patch, message: `Done — ${changes.join(', ')}.` };
}
