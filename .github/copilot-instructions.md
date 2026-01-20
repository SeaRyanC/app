# General Information

This is a quasi-mono-repo of many different small webapps. Every app is a static single-page app that doesn't require any backend server.

Each one follows the same basic principles:
 * TypeScript 6.0 (install `typescript@next`)
   * Initialize with `tsc --init` and only change minimal settings from these defaults
 * Always use preact
 * Always use esbuild
 * Never use vite
 * Always output to the repo root's `docs` folder, as this is where github pages gets served from

Folder layout, for example
```
/abc
  /src
    file1.ts
    file2.tsx
    app.tsx
  README.md
  package.json
  tsconfig.json
  index.html
  style.css
/def
  /src
    file1.ts
    file2.tsx
    app.tsx
  /baselines
    file1.txt
    file1.jpg
    file2.txt
    file2.jpg
  README.md
  package.json
  tsconfig.json
  index.html
  style.css
/ghi
  /src
    file1.ts
    file2.tsx
    app.tsx
  README.md
  package.json
  tsconfig.json
  index.html
  style.css
/docs
  /index.html
  /abc
    index.html
    app.js
    style.css
  /def
    index.html
    app.js
    style.css
  /ghi
    index.html
    app.js
    style.css
```

# Your Role

I might ask you to *import* one of my existing repositories. I think you can figure this out. Restructure the project as needed to fit into this repo's conventions (most will be quite close).

I might ask you to *create* a new app by filling in its USER_STORY.md first. You do the rest. In your implementation PR, ask me as many follow-up questions as you need (I will address in a subsequent iteration), but still write the application.

I might ask you to fix or implement a feature in an existing app. I will tell you which one.

Never try to work on more than one app at once UNLESS I am giving you an "infrastructure" task, in which case your update should apply (if applicable) to every app.

# Invariants

Every app has the following requirements
 * EVERY PULL REQUEST must increment the major, minor, or patch version in package.json. Use sentimental versioning
 * Each app MUST have a small footer with the following info:
   * The message "A vibe-coded micro-app via SeaRyanC" where SeaRyanC is a link to https://searyanc.dev
   * A GitHub icon link to the subdir the app comes from
   * The full version number the app was build from, including commit hash

Every app maintains a USER_STORY.md. This is a complete document that explains how the app works, its core requirements, and other information.
If you are changing app code for any reason except to fix a *logic bug*, you must update USER_STORY.md to include information about the scenario you are enabling or otherwise changing.

Every app maintains a README.md, which contains a very brief markdown document explaining the purpose, role, and capabilities of the application.
This starts at the `##` markdown level (see why below).

Any change to a README.md creates an update to `/docs/index.html`. Run the `./build.ts` script to regenerate it.

# Each App Has...

Each app should have the following files
 * `package.json`. It should have a `bundle` task that runs esbuild and a `check` task that runs `tsc --noEmit`
 * README.md, as described
 * eslint config with recommended rules for TS development; all projects should be lint clean at all times
 * `tsconfig.json` with settings that mimic `tsc --init` under `typescript@next` as close as possible

# README.md, USER_STORY.md, and DEV_NOTES.md

The README is a short document, 1-3 paragraphs, that explains what the software does and how to use it. This should change when significant new functionality is added. Always integrate your changes into this document thoughtfully; prose should not appear "bolted on" as new functionality is added to the project. NEVER talk about algorithms or obvious things like "does not crash when doing x" in README.md.

The USER_STORY is a list of user stories that each app enables. Think of this as a living spec for the project; if we were to lose all the code, the USER_STORY.md would have enough information to create a new version of the app that would serve the same users equally well. Append to this document as new user stories are requested through work items, and modify existing user stories as the software changes.

You can use DEV_NOTES to keep track of information between runs. Read this file first when working on a project to see what notes you've left yourself, and be liberal in adding to it whenever it's useful to do so

# Unit Testing

Write unit tests using jest. Be very selective about what you choose to unit test and how.
 * Tests should not ever test an invariant that TypeScript is already checking for
 * Tests should never hardcode specific outputs unless ALL of the following are true:
   * There's an unambiguous correct output for a given input
   * The code has realistic risk of regression AND is likely to be changed in the future
   * You got it wrong on the first try

Never write a unit test that tests a function by re-implementing it.

## Baselines as Proof of Functionality

If it makes sense to, use a `/baselines` folder in each project structured as follows:

 * A list of input files (e.g. `scenario-1.json`, `data.txt`, `cat.jpg`) which each represent some invocation of a major functionality point in the software
 * A corresponding set of output files (e.g. `scenario1-.txt`, `data.jpeg`, `cat.avi`) which represent HUMAN-VERIFYABLE output from that input
 * Have a script which regenerates these baselines, and ensure it's run at the end of your PR if applicable
 * Verify that baseline changes you incur are both intentional and correct

Your human will be looking at these files in order to verify that your changes or new functionality are correctly implemented

## Other

You never need to run CodeQL or security checks; these projects are all client-side only and have no security implications.

All `package.json` should have a `npm run local` that runs the esbuild dev server, appropriately configured