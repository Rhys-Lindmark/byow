'use client';

import { ArrowUp, RotateCcw, Sparkles, Undo2 } from 'lucide-react';
import { type CSSProperties, type FormEvent, useEffect, useRef, useState } from 'react';
import { initialSite, type SiteState } from '@/lib/builder';

type Message = { id: number; role: 'builder' | 'you'; text: string };
const firstMessage: Message = { id: 1, role: 'builder', text: 'Hey. I can rebuild everything you see here. What should we make?' };

export default function Home() {
  const [site, setSite] = useState<SiteState>(initialSite);
  const [history, setHistory] = useState<SiteState[]>([]);
  const [messages, setMessages] = useState<Message[]>([firstMessage]);
  const [prompt, setPrompt] = useState('');
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const historyEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('byow-site-v1');
      if (saved) setSite({ ...initialSite, ...JSON.parse(saved) });
    } catch { /* A broken local draft should never break the builder. */ }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem('byow-site-v1', JSON.stringify(site));
  }, [ready, site]);

  useEffect(() => { historyEnd.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, busy]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    const instruction = prompt.trim();
    if (!instruction || busy) return;
    setPrompt('');
    setBusy(true);
    setMessages((items) => [...items, { id: Date.now(), role: 'you', text: instruction }]);
    try {
      const routeBase = window.location.pathname === '/byow' || window.location.pathname.startsWith('/byow/') ? '/byow' : '';
      const response = await fetch(`${routeBase}/api/build`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ prompt: instruction, site }),
      });
      const result = await response.json() as { patch?: Partial<SiteState>; message?: string; error?: string };
      if (!response.ok || !result.patch) throw new Error(result.error ?? 'The builder hit a snag.');
      if (Object.keys(result.patch).length) {
        setHistory((items) => [...items.slice(-9), site]);
        setSite((current) => ({ ...current, ...result.patch }));
      }
      setMessages((items) => [...items, { id: Date.now() + 1, role: 'builder', text: result.message ?? 'Done.' }]);
    } catch (error) {
      setMessages((items) => [...items, { id: Date.now() + 1, role: 'builder', text: error instanceof Error ? error.message : 'The builder hit a snag.' }]);
    } finally { setBusy(false); }
  }

  function undo() {
    const previous = history.at(-1);
    if (!previous) return;
    setSite(previous);
    setHistory((items) => items.slice(0, -1));
    setMessages((items) => [...items, { id: Date.now(), role: 'builder', text: 'Undid the last page change.' }]);
  }

  function reset() {
    setHistory((items) => [...items.slice(-9), site]);
    setSite(initialSite);
    setMessages((items) => [...items, { id: Date.now(), role: 'builder', text: 'Reset the canvas. The chat, naturally, stayed put.' }]);
  }

  const variables = {
    '--site-bg': site.background,
    '--site-fg': site.foreground,
    '--site-accent': site.accent,
    '--site-highlight': site.highlight,
  } as CSSProperties;
  const canvasStyle = site.backgroundImage ? {
    backgroundImage: `linear-gradient(90deg, rgb(0 0 0 / 64%) 0%, rgb(0 0 0 / 34%) 62%, rgb(0 0 0 / 48%) 100%), url("${site.backgroundImage}")`,
  } : undefined;

  return (
    <main className={`byow-shell font-${site.font} align-${site.align} treatment-${site.treatment} ${site.gradient ? 'has-gradient' : ''}`} style={variables}>
      <section className={`draft-canvas ${site.backgroundImage ? 'has-photo-background' : ''}`} style={canvasStyle}>
        {site.showOrb ? <span aria-hidden="true" className="canvas-orb" /> : null}
        <div className="canvas-content">
          <p className="draft-kicker">{site.kicker}</p>
          <h1>{site.title.split('\n').map((line, index) => <span key={`${line}-${index}`}>{line}</span>)}</h1>
          <p className="draft-copy">{site.subtitle}</p>
          {site.showButton ? <button className="canvas-button" type="button">{site.buttonLabel}</button> : null}
          {site.cards.length ? (
            <div className="draft-grid" aria-label="Page sections">
              {site.cards.map((card, index) => <article key={`${card.title}-${index}`}><span>0{index + 1}</span><strong>{card.title}</strong><p>{card.body}</p></article>)}
            </div>
          ) : null}
        </div>
        {site.backgroundSourceLabel && site.backgroundSourceUrl ? (
          <a className="background-credit" href={site.backgroundSourceUrl} rel="noreferrer" target="_blank">Background: {site.backgroundSourceLabel}</a>
        ) : null}
      </section>

      <aside className="builder-chat" aria-label="BYOW builder">
        <div className="chat-topline">
          <div><Sparkles size={15} /><strong>BYOW BUILDER</strong></div>
          <div className="chat-actions">
            <button aria-label="Undo last page change" disabled={!history.length || busy} onClick={undo} title="Undo" type="button"><Undo2 size={14} /></button>
            <button aria-label="Reset page" disabled={busy} onClick={reset} title="Reset" type="button"><RotateCcw size={14} /></button>
            <span>{busy ? 'BUILDING' : 'READY'}</span>
          </div>
        </div>
        <div aria-live="polite" className="chat-history">
          {messages.map((message) => <p className={`message-${message.role}`} key={message.id}><small>{message.role}</small>{message.text}</p>)}
          {busy ? <p className="message-builder message-building"><small>builder</small><i /><i /><i /></p> : null}
          <div ref={historyEnd} />
        </div>
        <form className="chat-composer" onSubmit={submit}>
          <textarea
            aria-label="Describe a change"
            disabled={busy}
            maxLength={1000}
            onChange={(event) => setPrompt(event.target.value)}
            onKeyDown={(event) => { if (event.key === 'Enter' && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }}
            placeholder="Make this a midnight-blue site about urban moss…"
            rows={2}
            value={prompt}
          />
          <button aria-label="Send change" disabled={!prompt.trim() || busy} type="submit"><ArrowUp size={18} /></button>
        </form>
        <p className="chat-footnote">The page can change. This chat stays. · saved on this device</p>
      </aside>
    </main>
  );
}
