import { createResource } from "solid-js";
import { EnvironmentsEnum } from "@multiversx/sdk-dapp-core/out/types";
import { initializeNetwork } from "lib/sdkDappCore";

const initNetwork = async () => {
  const data = await initializeNetwork({
    environment: EnvironmentsEnum.devnet,
  });
  return data;
};

export const useFetchData = () => {
  const [data, { mutate, refetch }] = createResource(initNetwork);
  return { data, mutate, refetch };
};
