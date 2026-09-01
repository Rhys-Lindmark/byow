# BYOW

Build Your Own Website: a rough-draft web experiment where one permanent chat can continuously reshape the page around it.

The public prototype turns natural-language instructions into structured, reversible page changes. It supports precise palette, typography, alignment, surface treatment, topic, headline, description, button, section, reset, and undo changes. Open-ended creative directions also trigger a coherent full-page remix instead of a clarification dead end. Drafts persist in the visitor's browser.

The builder also ships with 100 tested “wild modes” spanning radically different layouts, animated environments, absurd content remixes, local productivity tools, and small interactive games. Try `make a dice roller`, `turn the whole page into a snow globe`, `make a tiny museum on the moon`, `make a markdown scratchpad`, or `delete everything except the chat`.

This version uses a bounded page-building agent rather than executing arbitrary generated code. Wild modes are sandboxed to presentation and local in-page interaction: they do not execute user code, request credentials, embed arbitrary HTML, or perform irreversible actions. Every mutation can be undone or reset from the persistent chat.

## Run locally

```bash
npm install
npm run dev
```
