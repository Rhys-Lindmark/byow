'use client';

import { type ReactNode, useEffect, useMemo, useState } from 'react';
import type { WildWidget as WildWidgetKind } from '@/lib/ideas';

const fortunes = ['The weird draft is the honest draft.', 'A contradiction is about to improve this page.', 'Your next idea needs fewer meetings.', 'The internet rewards a committed bit.'];
const words = ['MUTATION','WEBSITE','BANANAS','STRANGE'];

export function WildWidget({ kind, onSelfDestruct }: { kind: WildWidgetKind; onSelfDestruct: () => void }) {
  const [now,setNow]=useState(new Date()); const [seconds,setSeconds]=useState(kind==='pomodoro'?1500:60); const [running,setRunning]=useState(false);
  const [value,setValue]=useState(0); const [output,setOutput]=useState('Ready.'); const [items,setItems]=useState<string[]>([]); const [input,setInput]=useState('');
  const [marks,setMarks]=useState<string[]>(Array(9).fill('')); const [turn,setTurn]=useState('X'); const [revealed,setRevealed]=useState<number[]>([]);
  useEffect(()=>{ const timer=setInterval(()=>setNow(new Date()),1000); return()=>clearInterval(timer); },[]);
  useEffect(()=>{ if(!running||!['countdown','pomodoro'].includes(kind)) return; const timer=setInterval(()=>setSeconds(s=>Math.max(0,s-1)),1000); return()=>clearInterval(timer); },[running,kind]);
  useEffect(()=>{ if(!running||kind!=='stopwatch') return; const timer=setInterval(()=>setValue(v=>v+1),1000); return()=>clearInterval(timer); },[running,kind]);
  const shuffled=useMemo(()=>words[value%words.length].split('').sort(()=>.5-Math.random()).join(''),[kind,value]);
  if(kind==='none') return null;
  const action=(label:string,fn:()=>void)=><button className="wild-action" onClick={fn} type="button">{label}</button>;
  if(kind==='clock') return <Widget><strong className="wild-big">{now.toLocaleTimeString()}</strong><p>{now.toLocaleDateString(undefined,{weekday:'long',month:'long',day:'numeric'})}</p></Widget>;
  if(['countdown','pomodoro','stopwatch'].includes(kind)) return <Widget><strong className="wild-big">{kind==='stopwatch'?value:`${Math.floor(seconds/60)}:${String(seconds%60).padStart(2,'0')}`}</strong>{action(running?'Pause':'Start',()=>setRunning(!running))}{action('Reset',()=>{setRunning(false);kind==='stopwatch'?setValue(0):setSeconds(kind==='pomodoro'?1500:60)})}</Widget>;
  if(kind==='counter') return <Widget><strong className="wild-big">{value}</strong>{action('+1',()=>setValue(value+1))}{action('−1',()=>setValue(value-1))}</Widget>;
  if(['dice','coin','random','fortune','decision','rps','higher-lower','color-guess','scramble'].includes(kind)) {
    const run=()=>{ setValue(value+1); const results:Record<string,string>={dice:`You rolled ${1+Math.floor(Math.random()*6)}.`,coin:Math.random()>.5?'Heads.':'Tails.',random:String(Math.floor(Math.random()*1000)),fortune:fortunes[Math.floor(Math.random()*fortunes.length)],decision:Math.random()>.5?'Yes. Commit.':'No. Mutate it.',rps:['Rock.','Paper.','Scissors.'][Math.floor(Math.random()*3)],'higher-lower':Math.random()>.5?'Higher.':'Lower.','color-guess':['Coral.','Cobalt.','Acid lime.','Midnight.'][Math.floor(Math.random()*4)],scramble:`Unscramble: ${shuffled}`}; setOutput(results[kind]); };
    return <Widget><strong className="wild-result">{output}</strong>{action(kind==='fortune'?'Crack another':'Try it',run)}</Widget>;
  }
  if(kind==='tictactoe') return <Widget><div className="tic-grid">{marks.map((mark,i)=><button key={i} onClick={()=>{if(mark)return;const next=[...marks];next[i]=turn;setMarks(next);setTurn(turn==='X'?'O':'X')}} type="button">{mark}</button>)}</div>{action('Clear',()=>setMarks(Array(9).fill('')))}</Widget>;
  if(kind==='memory') { const symbols=['●','▲','■','●','▲','■']; return <Widget><div className="memory-grid">{symbols.map((symbol,i)=><button key={i} onClick={()=>setRevealed([...revealed,i])} type="button">{revealed.includes(i)?symbol:'?'}</button>)}</div>{action('Hide',()=>setRevealed([]))}</Widget>; }
  if(kind==='reaction') return <Widget><strong className="wild-result">{output}</strong>{action('Start reaction test',()=>{setOutput('Wait for it…');const started=Date.now();setTimeout(()=>{setOutput('CLICK NOW');const handler=()=>{setOutput(`${Date.now()-started-900} ms`);window.removeEventListener('click',handler)};window.addEventListener('click',handler)},900)})}</Widget>;
  if(['quiz','poll','adventure'].includes(kind)) { const question=kind==='quiz'?'Which draft is best?':kind==='poll'?'Should websites be allowed to molt?':'A door hums in the dark. What now?'; const choices=kind==='adventure'?['Open it','Become the door']:['The living one','Absolutely']; return <Widget><strong className="wild-result">{question}</strong>{choices.map(choice=><button className="wild-action" key={choice} onClick={()=>setOutput(`${choice} selected.`)} type="button">{choice}</button>)}<p>{output}</p></Widget>; }
  if(kind==='breathing') return <Widget><div className="breathing-orb"/><strong className="wild-result">Breathe in. Hold. Breathe out.</strong></Widget>;
  if(['journal','tracker'].includes(kind)) return <Widget>{kind==='journal'?<textarea className="wild-input wild-area" onChange={e=>setInput(e.target.value)} placeholder="Write something worth keeping…" value={input}/>:<div className="tracker-list">{['Show up','Notice something','Change one thing'].map((x,i)=><label key={x}><input type="checkbox"/> {x}</label>)}</div>}<p>{kind==='journal'?(input?'Saved in this draft.':'Nothing written yet.'):'Progress stays on this device.'}</p></Widget>;
  if(kind==='list') return <Widget><form onSubmit={e=>{e.preventDefault();if(input.trim()){setItems([...items,input.trim()]);setInput('')}}}><input className="wild-input" onChange={e=>setInput(e.target.value)} placeholder="Add an item" value={input}/></form><ul>{items.map((item,i)=><li key={`${item}-${i}`}><button onClick={()=>setItems(items.filter((_,j)=>j!==i))} type="button">×</button>{item}</li>)}</ul></Widget>;
  if(kind==='calculator') return <Widget><input className="wild-input" inputMode="decimal" onChange={e=>setValue(Number(e.target.value)||0)} placeholder="Number"/><strong className="wild-result">15% tip: {(value*.15).toFixed(2)} · total: {(value*1.15).toFixed(2)}</strong></Widget>;
  if(kind==='password') return <Widget><strong className="wild-result">{output}</strong>{action('Generate safely',()=>{const a=new Uint32Array(4);crypto.getRandomValues(a);setOutput([...a].map(x=>x.toString(36)).join('-'))})}</Widget>;
  if(kind==='markdown') return <Widget><textarea className="wild-input wild-area" onChange={e=>setInput(e.target.value)} placeholder="# Write markdown" value={input}/><pre className="markdown-preview">{input||'Preview appears here.'}</pre></Widget>;
  if(kind==='self-destruct') return <Widget><strong className="wild-result">This removes the canvas. Undo can bring it back.</strong>{action('Self destruct',onSelfDestruct)}</Widget>;
  return null;
}

function Widget({children}:{children:ReactNode}) { return <section className="wild-widget" aria-live="polite">{children}</section>; }

export function EffectLayer({effect}:{effect:string}) { if(effect==='none'||effect==='upside-down')return null; return <div aria-hidden="true" className={`effect-layer effect-${effect}`}>{effect==='marquee'?<><b>CHANGE EVERYTHING ✦ CHANGE EVERYTHING ✦ CHANGE EVERYTHING ✦</b><b>CHANGE EVERYTHING ✦ CHANGE EVERYTHING ✦ CHANGE EVERYTHING ✦</b></>:Array.from({length:24},(_,i)=><i key={i}/>)}</div>; }
