import { buildMesh, compileUserCode, UserCodeError, type Mesh, type Params } from './model.ts';

export interface WorkerRequest { code: string; params: Params }
export type WorkerResponse = { mesh: Mesh } | { error: string };

self.onmessage = (e: MessageEvent<WorkerRequest>) => {
  let res: WorkerResponse;
  try {
    res = { mesh: buildMesh(compileUserCode(e.data.code), e.data.params) };
  } catch (err) {
    res = { error: err instanceof UserCodeError ? err.message : `Unexpected error: ${String(err)}` };
  }
  if ('mesh' in res) (self as unknown as Worker).postMessage(res, [res.mesh.positions.buffer]);
  else (self as unknown as Worker).postMessage(res);
};
