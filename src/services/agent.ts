import { getOnChainTools } from "@goat-sdk/adapter-langchain";
import { erc20 } from "@goat-sdk/plugin-erc20";
import { sendETH } from "@goat-sdk/wallet-evm";
import { viem } from "@goat-sdk/wallet-viem";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { ChatOpenAI } from "@langchain/openai";
import { AgentExecutor, createStructuredChatAgent } from "langchain/agents";
import { pull } from "langchain/hub";
import { TOKENS } from "../config/tokens";
import { walletClient } from "../config/wallet";

export async function setupAgent() {
  // Get onchain tools for the wallet
  const tools = await getOnChainTools({
    wallet: viem(walletClient),
    plugins: [sendETH(), erc20({ tokens: TOKENS })],
  });

  // Initialize LLM
  const llm = new ChatOpenAI({
    model: "gpt-4o-mini",
  });

  // Get prompt template
  const prompt = await pull<ChatPromptTemplate>(
    "hwchase17/structured-chat-agent"
  );

  // Create agent
  const agent = await createStructuredChatAgent({
    llm,
    tools,
    prompt,
  });

  // Create agent executor
  return new AgentExecutor({
    agent,
    tools,
  });
}
