import { createWalletClient, http, type WalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { celo, celoAlfajores } from "viem/chains";
import { validateEnvVariables } from "./validation";

// Validate environment variables before proceeding
validateEnvVariables();

// Create wallet account from private key
export const account = privateKeyToAccount(
  process.env.WALLET_PRIVATE_KEY as `0x${string}`
);

// Create wallet client
export const walletClient: WalletClient = createWalletClient({
  account: account,
  transport: http(process.env.RPC_PROVIDER_URL),
  chain: process.env.NETWORK === "mainnet" ? celo : celoAlfajores,
});
