# Still

Still is a deliberately minimal todos app built with React Native and Expo.

The project exists to internalize first-principles mobile fundamentals — layout, interaction, state, and local persistence — without the noise of features, metrics, or optimization pressure.

This is a learning root, not a product.

## Why this exists

I want a clear mental model for React Native that I can reuse confidently in future projects.

Still is intentionally small so that:

- every UI decision is felt, not abstracted away
- platform differences (RN vs web React) become obvious
- the codebase stays calm and readable
- “done” is reachable

## What Still is

- A single-screen todos app
- Local-only persistence
- Calm, touch-first interactions
- Minimal visual language
- No accounts, sync, or productivity mechanics

## What Still is not

- Not a task manager
- Not a productivity system
- Not a habit tracker
- Not a framework or boilerplate
- Not built for scale or distribution

If you’re looking for features, this is the wrong repo.

## Scope

- Single primary screen (task list)
- One flow for adding a task (modal)
- Local-only persistence
- System-driven light/dark theme
- No settings screen

## Design philosophy

- Do less
- Completion is relief
- Empty is success
- Nothing begs for attention

The UI is intentionally quiet.

## Design system (minimal)

Still uses a minimal, token-based design system expressed through NativeWind classes.

There is no component library.

Consistency is achieved through:

- a small, fixed color palette (surface, primary text, muted text, accent)
- a repeated spacing scale
- a limited set of text styles (title, body, meta)

Components are only extracted when visual or behavioral variation appears.

## Tech stack

- React Native
- Expo
- TypeScript
- NativeWind
- Jest (unit tests)
- E2E testing (minimal, one happy path)
