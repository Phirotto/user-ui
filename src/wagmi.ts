import { getDefaultConfig } from "connectkit";
import { optimismSepolia } from "viem/chains";
import { createConfig } from "wagmi";

export const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    infuraId: import.meta.env.VITE_INFURA_KEY,
    walletConnectProjectId: import.meta.env.VITE_WC_PROJECT_ID!,

    // Required
    appName: "Phirotto app",

    chains: [optimismSepolia],
  })
);
