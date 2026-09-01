# BYOW

Build Your Own Website: a rough-draft web experiment where one permanent chat can continuously reshape the page around it.

The first public prototype turns natural-language instructions into structured, reversible page changes. It supports palette, typography, alignment, surface treatment, topic, headline, description, button, section, reset, and undo changes. Drafts persist in the visitor's browser.

This version uses a bounded page-building agent rather than executing arbitrary generated code. That keeps public prompts from running untrusted JavaScript while the interaction is being tested.

## Run locally

```bash
npm install
npm run dev
```
