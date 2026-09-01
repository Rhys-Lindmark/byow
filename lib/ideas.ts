import type { SiteState } from './builder.ts';

export type WildLayout = 'hero' | 'poster' | 'bento' | 'terminal' | 'newspaper' | 'split' | 'stacked' | 'dashboard' | 'manifesto' | 'blank';
export type WildEffect = 'none' | 'stars' | 'rain' | 'snow' | 'confetti' | 'bubbles' | 'aurora' | 'checker' | 'grid' | 'scanlines' | 'lava' | 'upside-down' | 'marquee';
export type WildWidget = 'none' | 'clock' | 'countdown' | 'pomodoro' | 'stopwatch' | 'counter' | 'dice' | 'coin' | 'random' | 'fortune' | 'decision' | 'tictactoe' | 'rps' | 'memory' | 'reaction' | 'quiz' | 'poll' | 'higher-lower' | 'color-guess' | 'scramble' | 'adventure' | 'breathing' | 'journal' | 'tracker' | 'list' | 'calculator' | 'password' | 'markdown' | 'self-destruct';

export type WildIdea = { id: string; label: string; prompt: string; triggers: string[]; layout: WildLayout; effect: WildEffect; widget: WildWidget };
type IdeaRow = [string, string, string, string, WildLayout, WildEffect, WildWidget];

const rows: IdeaRow[] = [
  ['bauhaus-poster','Bauhaus poster','make it a Bauhaus poster','bauhaus|geometric poster', 'poster','grid','none'],
  ['swiss-grid','Swiss grid','use a strict Swiss design grid','swiss design|swiss grid', 'bento','grid','none'],
  ['brutalist-zine','Brutalist zine','turn this into a brutalist zine','brutalist zine|raw zine', 'stacked','none','none'],
  ['art-deco','Art Deco lounge','make an Art Deco cocktail lounge','art deco|deco lounge', 'split','checker','none'],
  ['vaporwave','Vaporwave mall','send this to a vaporwave mall','vaporwave|retro mall', 'poster','scanlines','none'],
  ['y2k-portal','Y2K portal','make a shiny Y2K web portal','y2k|web portal', 'dashboard','bubbles','none'],
  ['solarpunk','Solarpunk garden','grow a solarpunk garden website','solarpunk|future garden', 'bento','aurora','none'],
  ['cyber-terminal','Cyberpunk terminal','make it a cyberpunk terminal','cyberpunk terminal|hacker terminal', 'terminal','scanlines','none'],
  ['medieval','Medieval manuscript','illuminate this like a medieval manuscript','medieval manuscript|illuminated manuscript', 'newspaper','none','none'],
  ['luxury-editorial','Luxury magazine','make it a luxury fashion magazine','luxury magazine|fashion editorial', 'newspaper','none','none'],
  ['starfield','Starfield','put the site in a moving starfield','starfield|stars everywhere', 'hero','stars','none'],
  ['rain-window','Rain window','make rain fall across the page','rain window|make it rain|rainy page', 'split','rain','none'],
  ['snow-globe','Snow globe','turn the whole page into a snow globe','snow globe|make it snow', 'hero','snow','none'],
  ['confetti','Confetti storm','fire a permanent confetti storm','confetti storm|confetti everywhere', 'poster','confetti','none'],
  ['lava-lamp','Lava lamp','make the background a lava lamp','lava lamp|liquid blobs', 'hero','lava','none'],
  ['bubble-world','Bubble world','fill the page with floating bubbles','floating bubbles|bubble world', 'bento','bubbles','none'],
  ['aurora','Aurora','put an aurora behind everything','aurora|northern lights', 'hero','aurora','none'],
  ['checkerboard','Checkerboard','make a giant checkerboard world','checkerboard|checker board', 'poster','checker','none'],
  ['graph-paper','Graph paper','draw the whole thing on graph paper','graph paper|blueprint grid', 'dashboard','grid','none'],
  ['crt','CRT scanlines','make it look like an old CRT','crt|scanlines|old television', 'terminal','scanlines','none'],
  ['bananas','Banana takeover','make the page all bananas','all bananas|banana takeover|go bananas', 'poster','confetti','none'],
  ['cheese','Everything is cheese','make everything cheese','everything cheese|all cheese', 'bento','bubbles','none'],
  ['moon-museum','Tiny moon museum','build a tiny museum on the moon','moon museum|lunar museum', 'newspaper','stars','none'],
  ['alien-signal','Alien transmission','turn this into an alien transmission','alien transmission|alien signal', 'terminal','scanlines','none'],
  ['conspiracy-wall','Conspiracy wall','make a conspiracy corkboard','conspiracy wall|conspiracy board|corkboard', 'bento','grid','none'],
  ['toaster-manifesto','Toaster manifesto','publish a sentient toaster manifesto','toaster manifesto|sentient toaster', 'manifesto','none','none'],
  ['haunted-aquarium','Haunted aquarium','make a haunted midnight aquarium','haunted aquarium|ghost aquarium', 'split','bubbles','none'],
  ['dinosaur-startup','Dinosaur startup','launch a startup run by dinosaurs','dinosaur startup|dinosaur company', 'dashboard','grid','none'],
  ['pigeon-parliament','Pigeon parliament','open a parliament for pigeons','pigeon parliament|pigeon government', 'newspaper','none','none'],
  ['mushroom-club','Mushroom nightclub','open a bioluminescent mushroom nightclub','mushroom nightclub|mushroom club', 'poster','aurora','none'],
  ['newspaper','Newspaper front page','make todays front page newspaper','newspaper front page|front page news', 'newspaper','none','none'],
  ['movie-poster','Movie poster','turn it into an impossible movie poster','movie poster|film poster', 'poster','none','none'],
  ['album-release','Album release','make a page for an imaginary album release','album release|album landing page', 'split','aurora','none'],
  ['restaurant-menu','Restaurant menu','turn this into a tiny restaurant menu','restaurant menu|dinner menu', 'newspaper','none','none'],
  ['museum-placard','Museum placard','make it a museum exhibit placard','museum placard|museum exhibit', 'split','none','none'],
  ['field-guide','Field guide','turn this into a strange field guide','field guide|nature guide', 'bento','grid','none'],
  ['product-launch','Product launch','launch a product that should not exist','product launch|launch page', 'hero','aurora','none'],
  ['festival-flyer','Festival flyer','design a flyer for an imaginary festival','festival flyer|music festival', 'poster','confetti','none'],
  ['postcard','Travel postcard','send a postcard from an impossible place','travel postcard|impossible postcard', 'split','none','none'],
  ['comic-cover','Comic cover','make a comic book cover','comic cover|comic book', 'poster','checker','none'],
  ['live-clock','Live clock','add a giant live clock','live clock|giant clock', 'dashboard','grid','clock'],
  ['countdown','Countdown','start a one minute countdown','countdown|count down', 'dashboard','scanlines','countdown'],
  ['pomodoro','Pomodoro','make a pomodoro focus timer','pomodoro|focus timer', 'dashboard','none','pomodoro'],
  ['stopwatch','Stopwatch','add a working stopwatch','stopwatch|stop watch', 'dashboard','grid','stopwatch'],
  ['counter','Counter','add a giant click counter','click counter|giant counter', 'dashboard','checker','counter'],
  ['dice','Dice roller','make a dice roller','dice roller|roll dice', 'dashboard','confetti','dice'],
  ['coin','Coin flip','make a coin flipper','coin flip|flip a coin', 'dashboard','none','coin'],
  ['random-number','Random number','generate random numbers','random number|number generator', 'dashboard','grid','random'],
  ['fortune','Fortune cookie','make a fortune cookie machine','fortune cookie|fortune machine', 'bento','confetti','fortune'],
  ['decision','Decision maker','make a tiny decision machine','decision maker|decide for me', 'dashboard','checker','decision'],
  ['tic-tac-toe','Tic tac toe','add a tic tac toe game','tic tac toe|noughts and crosses', 'dashboard','grid','tictactoe'],
  ['rock-paper-scissors','Rock paper scissors','play rock paper scissors','rock paper scissors|rps game', 'dashboard','confetti','rps'],
  ['memory-game','Memory game','make a memory matching game','memory game|matching game', 'dashboard','grid','memory'],
  ['reaction-test','Reaction test','make a reaction speed test','reaction test|reaction speed', 'dashboard','scanlines','reaction'],
  ['quiz','Tiny quiz','make a one question quiz','tiny quiz|one question quiz', 'bento','none','quiz'],
  ['poll','Live poll','add a ridiculous live poll','live poll|ridiculous poll', 'dashboard','none','poll'],
  ['higher-lower','Higher or lower','make a higher or lower game','higher or lower|higher lower', 'dashboard','checker','higher-lower'],
  ['color-guess','Color guess','make a guess the color game','guess the color|color guessing', 'dashboard','aurora','color-guess'],
  ['word-scramble','Word scramble','make a word scramble game','word scramble|scramble game', 'dashboard','grid','scramble'],
  ['adventure','Choose adventure','make a choose your own adventure','choose your own adventure|choice adventure', 'bento','stars','adventure'],
  ['breathing','Breathing guide','make a breathing exercise','breathing exercise|breathing guide', 'hero','bubbles','breathing'],
  ['gratitude','Gratitude journal','make a gratitude journal','gratitude journal|gratitude log', 'dashboard','aurora','journal'],
  ['dream-log','Dream log','make a dream journal','dream journal|dream log', 'dashboard','stars','journal'],
  ['habit','Habit tracker','make a habit tracker','habit tracker|track habits', 'dashboard','grid','tracker'],
  ['mood','Mood check-in','make a mood check in','mood check|mood tracker', 'dashboard','aurora','tracker'],
  ['intention','Daily intention','make a daily intention page','daily intention|intention page', 'hero','none','journal'],
  ['compliment','Compliment machine','make a compliment generator','compliment machine|compliment generator', 'bento','confetti','fortune'],
  ['diary','Tiny diary','make a tiny private diary','tiny diary|private diary', 'dashboard','none','journal'],
  ['time-capsule','Time capsule','make a digital time capsule','time capsule|future message', 'bento','stars','journal'],
  ['altar','Digital altar','build a tiny digital altar','digital altar|tiny altar', 'hero','aurora','tracker'],
  ['solar-system','Solar system exhibit','make a solar system exhibit','solar system|planet exhibit', 'bento','stars','none'],
  ['deep-sea','Deep sea exhibit','take the page to the deep sea','deep sea|ocean exhibit', 'split','bubbles','none'],
  ['insect-atlas','Insect atlas','make an atlas of imaginary insects','insect atlas|bug atlas', 'bento','grid','none'],
  ['architecture-timeline','Architecture timeline','make an architecture timeline','architecture timeline|building timeline', 'stacked','grid','none'],
  ['weird-history','Weird history','make a weird history timeline','weird history|history timeline', 'stacked','none','none'],
  ['data-dashboard','Data dashboard','make a fake live data dashboard','data dashboard|fake dashboard', 'dashboard','grid','counter'],
  ['concept-map','Concept map','make a concept map','concept map|idea map', 'bento','grid','none'],
  ['faq','FAQ','turn the page into an FAQ','faq|frequently asked', 'stacked','none','none'],
  ['recipe','Recipe card','make a recipe card','recipe card|cookbook page', 'split','none','none'],
  ['book-notes','Book notes','make a book notes page','book notes|reading notes', 'newspaper','none','journal'],
  ['todo','Todo board','make a todo list','todo list|to do list', 'dashboard','grid','list'],
  ['kanban','Kanban board','make a kanban board','kanban|project board', 'dashboard','grid','list'],
  ['shopping','Shopping list','make a shopping list','shopping list|grocery list', 'dashboard','none','list'],
  ['packing','Packing list','make a packing checklist','packing list|packing checklist', 'dashboard','grid','list'],
  ['workout','Workout timer','make a workout interval timer','workout timer|interval timer', 'dashboard','scanlines','countdown'],
  ['flashcards','Flashcards','make interactive flashcards','flashcards|study cards', 'bento','none','quiz'],
  ['converter','Unit converter','make a unit converter','unit converter|convert units', 'dashboard','grid','calculator'],
  ['tip-calculator','Tip calculator','make a tip calculator','tip calculator|calculate tip', 'dashboard','none','calculator'],
  ['password','Password generator','make a password generator','password generator|generate password', 'terminal','scanlines','password'],
  ['markdown','Markdown scratchpad','make a markdown scratchpad','markdown scratchpad|markdown editor', 'split','grid','markdown'],
  ['self-destruct','Self destruct','add a self destruct button','self destruct|destroy the page', 'terminal','scanlines','self-destruct'],
  ['upside-down','Upside down','turn the whole page upside down','upside down|flip the page', 'hero','upside-down','none'],
  ['monochrome-red','Monochrome red','make absolutely everything red','everything red|monochrome red', 'poster','none','none'],
  ['giant-type','Giant typography','use one enormous headline','giant typography|enormous headline', 'manifesto','none','none'],
  ['tiny-type','Microscopic typography','make all the content microscopic','microscopic type|tiny typography', 'newspaper','grid','none'],
  ['marquee','Infinite marquee','make an infinite scrolling marquee','infinite marquee|scrolling marquee', 'poster','marquee','none'],
  ['no-rectangles','No rectangles','remove every rectangle','no rectangles|remove rectangles', 'hero','bubbles','none'],
  ['one-word','One word only','reduce the entire page to one word','one word only|single word', 'manifesto','none','none'],
  ['random-everything','Randomize everything','randomize absolutely everything','randomize everything|chaos button', 'bento','confetti','random'],
  ['blank-slate','Blank slate','delete everything except the chat','blank page|delete everything|only the chat', 'blank','none','none'],
];

export const wildIdeas: WildIdea[] = rows.map(([id,label,prompt,triggers,layout,effect,widget]) => ({ id,label,prompt,triggers:triggers.split('|'),layout,effect,widget }));

const palettes = [
  ['#f6e7c7','#17130e','#ee4b2b','#dfff2f'], ['#10162f','#f5f0e5','#7c9cff','#ff6e9e'],
  ['#e6f0df','#183125','#28785c','#f2c94c'], ['#f1dbea','#341934','#b83280','#ffe45c'],
  ['#111111','#f7f2df','#ff3b30','#dfff2f'], ['#dbeafe','#12213d','#2559d6','#ff9fbd'],
] as const;

export function findWildIdea(prompt: string) {
  const lower = prompt.toLowerCase();
  return wildIdeas.find((idea) => idea.prompt.toLowerCase() === lower)
    ?? wildIdeas.find((idea) => idea.triggers.some((trigger) => lower.includes(trigger)));
}

export function patchForWildIdea(idea: WildIdea): Partial<SiteState> {
  const palette = palettes[wildIdeas.indexOf(idea) % palettes.length];
  const title = idea.id === 'one-word' ? 'ONE.' : idea.id === 'blank-slate' ? '' : idea.id === 'bananas' ? 'GO FULL\nBANANAS.' : idea.label.toUpperCase();
  const cards = idea.layout === 'blank' || idea.id === 'one-word' ? [] : [
    { title:'THE PREMISE', body:`This draft has become ${idea.label.toLowerCase()}.` },
    { title:'TRY IT', body: idea.widget === 'none' ? 'Push the visual direction further with another instruction.' : 'Use the working module below, then ask the builder to mutate it.' },
    { title:'NEXT MUTATION', body:'Contradict this idea, combine it with another, or undo it completely.' },
  ];
  return {
    background: idea.id === 'monochrome-red' ? '#d80f23' : palette[0],
    foreground: idea.id === 'monochrome-red' ? '#fff4ee' : palette[1],
    accent: idea.id === 'monochrome-red' ? '#68000c' : palette[2],
    highlight: idea.id === 'monochrome-red' ? '#ff8791' : palette[3],
    kicker: idea.layout === 'blank' ? '' : `WILD MODE / ${String(wildIdeas.indexOf(idea)+1).padStart(3,'0')}`,
    title,
    subtitle: idea.layout === 'blank' ? '' : `${idea.label}. A safe, reversible experiment generated inside BYOW.`,
    cards,
    font: idea.layout === 'terminal' ? 'mono' : idea.layout === 'newspaper' ? 'serif' : 'sans',
    align: ['poster','hero','manifesto','blank'].includes(idea.layout) ? 'center' : 'left',
    treatment: idea.layout === 'newspaper' ? 'editorial' : idea.layout === 'terminal' ? 'minimal' : idea.layout === 'poster' ? 'brutalist' : 'soft',
    layout: idea.layout,
    effect: idea.effect,
    widget: idea.widget,
    mode: idea.id,
    showOrb: idea.effect === 'none' && idea.layout !== 'blank',
    showButton: false,
    gradient: ['aurora','lava'].includes(idea.effect),
    backgroundImage:null, backgroundSourceLabel:null, backgroundSourceUrl:null,
  };
}
