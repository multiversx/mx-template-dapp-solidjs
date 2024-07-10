// useFetchData.js
import { createResource } from "solid-js";
import { initializeNetwork } from "@multiversx/sdk-dapp-core/out/store/slices/network/actions/initializeNetwork";
import { EnvironmentsEnum } from "@multiversx/sdk-dapp-core/out/types";

const initNetwork = async () => {
  const data = await initializeNetwork({
    environment: EnvironmentsEnum.devnet,
  });
  console.log({ data });
  return data;
};

export const useFetchData = () => {
  const [data, { mutate, refetch }] = createResource(initNetwork);
  return [data, { mutate, refetch }];
};
