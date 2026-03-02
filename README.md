# Still

> Status: Complete (v1.0.1)

Still is a deliberately minimal todos app built with React Native and Expo.

The project exists to internalize first-principles mobile fundamentals — layout, interaction, state, and local persistence — without the noise of features, metrics, or optimization pressure.

This is a learning root, not a product.

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

## Release

Still builds as a production Android APK via Expo EAS.

To generate a release build: `eas build --platform android`

To update the installed app:

- Bump `expo.version` and `android.versionCode` in `app.json`
- Bump `package.json.version`
- Rebuild via EAS
- Install the new `.apk` (Android upgrades in place)

The current canonical release is tagged as `v1.0.1`.

## Closure

Still achieved its goal:

- Internalize React Native fundamentals
- Establish a reusable mental model for mobile layout and persistence
- Ship a production build via EAS

No additional features are planned.
Future React Native work will continue in new projects.
