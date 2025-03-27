import { Token } from "@goat-sdk/plugin-erc20";

// Define chain IDs
const CELO_MAINNET_CHAIN_ID = 42220;
const CELO_ALFAJORES_CHAIN_ID = 44787;

// Token definitions with chain-specific addresses
export const TOKENS: Token[] = [
  {
    symbol: "CELO",
    name: "Celo Native Asset",
    decimals: 18,
    chains: {
      [CELO_MAINNET_CHAIN_ID]: {
        contractAddress:
          "0x471EcE3750Da237f93B8E339c536989b8978a438" as `0x${string}`,
      },
      [CELO_ALFAJORES_CHAIN_ID]: {
        contractAddress:
          "0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9" as `0x${string}`,
      },
    },
  },
  {
    symbol: "cUSD",
    name: "Celo Dollar",
    decimals: 18,
    chains: {
      [CELO_MAINNET_CHAIN_ID]: {
        contractAddress:
          "0x765DE816845861e75A25fCA122bb6898B8B1282a" as `0x${string}`,
      },
      [CELO_ALFAJORES_CHAIN_ID]: {
        contractAddress:
          "0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1" as `0x${string}`,
      },
    },
  },
  {
    symbol: "cEUR",
    name: "Celo Euro",
    decimals: 18,
    chains: {
      [CELO_MAINNET_CHAIN_ID]: {
        contractAddress:
          "0xD8763CBa276a3738E6DE85b4b3bF5FDed6D6cA73" as `0x${string}`,
      },
      [CELO_ALFAJORES_CHAIN_ID]: {
        contractAddress:
          "0x10c892A6EC43a53E45D0B916B4b7D383B1b78C0F" as `0x${string}`,
      },
    },
  },
  {
    symbol: "cREAL",
    name: "Celo Brazilian Real",
    decimals: 18,
    chains: {
      [CELO_MAINNET_CHAIN_ID]: {
        contractAddress:
          "0xe8537a3d056DA446677B9E9d6c5dB704EaAb4787" as `0x${string}`,
      },
      [CELO_ALFAJORES_CHAIN_ID]: {
        contractAddress:
          "0xE4D517785D091D3c54818832dB6094bcc2744545" as `0x${string}`,
      },
    },
  },
];
