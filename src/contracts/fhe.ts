import {
  initSDK,
  createInstance,
  SepoliaConfig,
} from "@zama-fhe/relayer-sdk/web";

let fheInstance: any = null;

export async function getFheInstance() {
  if (fheInstance) return fheInstance;

  await initSDK();

  fheInstance = await createInstance({
    ...SepoliaConfig,
    network: window.ethereum,
  });

  return fheInstance;
}