<div align="center">
<div style="display: flex; align-items: center; justify-content: center; gap: 15px;">
  <img src="https://github.com/user-attachments/assets/5fc7f121-259c-492c-8bca-f15fe7eb830c" alt="GOAT" width="100px" height="auto" style="object-fit: contain;">
  <span style="font-size: 24px; font-weight: bold;">×</span>
  <img src="https://images.ctfassets.net/wr0no19kwov9/4SBboHNAVGDL6iSUBtzwf5/99bffcbe8a37dcb9a8cdb34b2b2054a4/brand-kit-wordmark-image-01.png?fm=webp&w=3840&q=70" alt="Celo" width="100px" height="auto" style="object-fit: contain;">
</div>
</div>

# Celo GOAT Langchain Agent

## 🚀 Quickstart

This example demonstrates how to use GOAT to allow a [Langchain](https://www.langchain.com/) agent to **send and receive Celo tokens** on the Celo network. This implementation works with both Celo mainnet and the Alfajores testnet, supporting CELO, cUSD, cEUR, and cREAL tokens.

You can use this example with any other agent framework, chain, and wallet of your choice by adapting the code.

## Features

- Interact with a Langchain agent through a simple CLI interface
- Check balances of ERC-20 tokens on Celo
- Send ERC-20 tokens to other addresses
- Seamless integration with multiple LLM providers (OpenAI, Anthropic, Google Gemini)
- Built with TypeScript for strong typing and better developer experience

## Prerequisites

- Node.js (v16 or newer)
- npm, yarn, or pnpm

## Setup

1. Clone the repository:

```bash
git clone https://github.com/celo-org/celo-goat-langchain-example.git
cd celo-goat-langchain-example
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Copy the `.env.template` and populate with your values:

```bash
cp .env.template .env
```

Required values:

- One of the following LLM API keys: `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, or `GEMINI_API_KEY`
- `WALLET_PRIVATE_KEY`: Your wallet's private key (must start with '0x')
- `RPC_PROVIDER_URL`: RPC URL for connecting to Celo (defaults to mainnet)

Optional values:

- `OPENAI_MODEL_NAME`: Defaults to "gpt-4o-mini"
- `ANTHROPIC_MODEL_NAME`: Defaults to "claude-3-haiku-20240307"
- `GEMINI_MODEL_NAME`: Defaults to "gemini-pro"
- `NETWORK`: Set to "mainnet" for mainnet or any other value for Alfajores testnet

4. Add test funds (if using Alfajores testnet):

- Get testnet CELO from a [Celo Alfajores Faucet](https://faucet.celo.org)

## Usage

1. Build the project:

```bash
npm run build
# or
yarn build
# or
pnpm build
```

2. Run the application:

```bash
npm start
# or
yarn start
# or
pnpm start
```

3. For development mode with auto-reload:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Chat with the agent:

- Check your balance for ERC-20 tokens
- Send ERC-20 tokens to another address
- Check your balance again to see the tokens you just sent

Example prompts:

```
"What is my CELO balance?"
"Send 0.1 cUSD to 0x742d35Cc6634C0532925a3b844Bc454e4438f44e"
"How much cEUR do I have?"
```

## Project Structure

- `src/index.ts` - Main application entry point with CLI interface
- `src/services/agent.ts` - Langchain agent setup and configuration
- `src/services/llm.ts` - LLM model selection and initialization
- `src/config/tokens.ts` - Token definitions for Celo assets
- `src/config/wallet.ts` - Wallet client configuration
- `src/config/validation.ts` - Environment variable validation

## Using in production

In production, developers require advanced wallet setups that utilize [smart wallets](https://docs.goat-sdk.com/concepts/smart-wallets), which allow them to:

1. **Increase security** by setting programmable permissions (e.g. limiting fund amounts, restricting contract interactions, and defining required signatures)
2. **Maintain regulatory compliance** by ensuring agent wallets are non-custodial. This means that:
   - Launchpads, wallet providers, or agent platforms never have access to agents' wallets.
   - Agent platforms do not require money transmitter licenses.

### Agent Wallets

[Crossmint](https://docs.crossmint.com/wallets/quickstarts/agent-wallets) offers one of the most advanced solutions for agent developers and launchpads: [Agent Wallets](https://docs.crossmint.com/wallets/quickstarts/agent-wallets).

To integrate Agent Wallets with GOAT, check out the following quickstarts:

1. Agent Wallets Quickstart [[EVM](https://github.com/goat-sdk/goat/tree/main/typescript/examples/by-wallet/crossmint-smart-wallets), [Solana](https://github.com/goat-sdk/goat/tree/main/typescript/examples/by-wallet/crossmint-smart-wallets)]
2. [Agent Launchpad Starter Kit](https://github.com/Crossmint/agent-launchpad-starter-kit/)

<footer>
<br/>
<br/>
<div>
  <img src="https://github.com/user-attachments/assets/59fa5ddc-9d47-4d41-a51a-64f6798f94bd" alt="GOAT" width="100%" height="auto" style="object-fit: contain; max-width: 800px;">

<div>
</footer>
