# Newsletter

A React-only newsletter UI. There is no backend, API layer, or server-rendered app in this project. Newsletter content lives inside the React app, so most future releases should only need changes in one file:

```text
src/app/content/newsletter.ts
```

## Stack

- React for the UI
- Parcel for local dev and production bundling
- TypeScript for type safety
- Tailwind CSS for styling

Everything runs in the browser. The project does not require a separate backend service.

## Quick start

```bash
npm install
npm run dev
```

Open the local URL Parcel prints, usually `http://127.0.0.1:5173`.

## Create a new release

1. Open `src/app/content/newsletter.ts`.
2. Update the top-level `preparedBy` value if needed.
3. Keep or update the top-level `logo`.
4. Edit, add, remove, or reorder items in `newsletter.pages`.
5. For each page, update:
   - `brand`
   - `editionLabel`
   - `hero`
   - `columns.left`
   - `columns.right`
   - `sections`
6. Run `npm run check`.

You do not need to create a new React component or another app layer for the next newsletter. Add another object to `newsletter.pages`, or update the existing page objects.

## Supported page sections

Each page can use these section types:

```ts
{ type: 'image', image: { src, alt } }
{ type: 'cards', cards: [...] }
{ type: 'stats', title, items: [...] }
{ type: 'comparison', title, tone, items: [...] }
{ type: 'steps', title, lead, tone, steps: [...] }
{ type: 'metrics', title, tone, items: [...] }
```

Use `columns.left` and `columns.right` for the main two-column story area. Use `sections` for full-width content after the columns.

Steps can include an optional short `label` such as `Scope`, `Build`, or `Launch`. The label appears above the step title in the rollout timeline.

## Add images

For local images, put the file inside `src` and import it in `src/app/content/newsletter.ts`:

```ts
import reportImage from '../assets/poc.jpeg';
```

Then use it in a section:

```ts
{
  type: 'image',
  image: {
    src: reportImage,
    alt: 'Short description for accessibility',
  },
}
```

Remote image URLs also work, but local images are better when the React app must keep working offline or in a private environment.

## Customization options

Available tones:

```text
indigo, blue, emerald, amber, purple, red, cyan, slate
```

Available icons:

```text
sparkles, target, clock, lightbulb, check, none
```

Header gradients are Tailwind classes, for example:

```text
bg-[linear-gradient(120deg,#0b0d0e_0%,#053057_62%,#031114_100%)]
```

## Architecture

- `src/main.tsx` boots the React app
- `src/app/App.tsx` handles the screen view and print view
- `src/app/content/newsletter.ts` is the in-app content source
- `src/app/components/newsletter/*` contains the reusable newsletter UI

If the project stays UI-only, you do not need to add Express, Next.js, a database, or an API server.

## Quality checks

```bash
npm run typecheck
npm run build
npm run check
```

`npm run check` runs TypeScript and the production build. TypeScript is configured to fail on unused locals and unused parameters, so dead imports are caught early.

## Production preview

```bash
npm run build
npm run preview
```

Open `http://127.0.0.1:4173`.

## Print and PDF export

Use print preview in one of these ways:

```text
/print
?view=print
```

When the app is hosted as plain static files, `?view=print` is the safest option because it does not need server rewrites. On this page you can choose paper size from `A1` to `A6`. Each newsletter page is locked to a single physical page for cleaner PDF export and email sharing.

For best results:

1. Open `?view=print` (or `/print` when your host supports rewrites).
2. Select paper size in the toolbar.
3. Click `Print / Save PDF`.
4. In the browser print dialog, keep `Background graphics` enabled.

## Common issues

**Browser shows old UI**

Hard refresh with `Cmd+Shift+R`, then restart the dev server if needed.

**`localhost` is not working**

Use `127.0.0.1`. Some environments fail DNS resolution for `localhost`.

**Port already in use**

Parcel may choose another port if `5173` is busy.

**An image does not show**

Check that the import path is relative, not machine-specific. Avoid paths like `/Users/name/project/...`.
