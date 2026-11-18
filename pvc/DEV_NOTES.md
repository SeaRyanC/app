# PVC Dev Notes

- TypeScript is aliased to `@typescript/typescript6` because `typescript@next` is 7.x, which typescript-eslint and ts-jest don't support yet. Install with `--legacy-peer-deps`.
- Build: `node --experimental-strip-types scripts/build.ts` (injects `__VERSION__`/`__COMMIT__`, copies index.html/style.css to `docs/pvc`).
- Viewer is raw WebGL2 (flat shading via screen-space derivatives); no three.js.
- Floor = first layer solid; inner wall starts at the second z layer.
