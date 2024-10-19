import { http, createConfig, createStorage, cookieStorage } from "wagmi";
import { base, baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const config = createConfig({
  chains: [baseSepolia],
  // chains: [base],
  connectors: [coinbaseWallet()],
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    // [base.id]: http(),
    [baseSepolia.id]: http(),
  },
});
