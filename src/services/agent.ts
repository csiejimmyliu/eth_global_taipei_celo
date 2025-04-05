import { getOnChainTools } from "@goat-sdk/adapter-langchain";
import { erc20 } from "@goat-sdk/plugin-erc20";
import { viem } from "@goat-sdk/wallet-viem";
import type { ChatPromptTemplate } from "@langchain/core/prompts";
import { AgentExecutor, createStructuredChatAgent } from "langchain/agents";
import { pull } from "langchain/hub";
import { BaseCallbackHandler } from "@langchain/core/callbacks/base";
import { TOKENS } from "../config/tokens";
import { walletClient } from "../config/wallet";
import { selectLLMModel } from "./llm";

export async function setupAgent() {
  // Get onchain tools for the wallet
  const tools = await getOnChainTools({
    wallet: viem(walletClient),
    plugins: [erc20({ tokens: TOKENS })],
  });

  // Initialize LLM
  const llm = selectLLMModel();

  // Get prompt template
  const prompt = await pull<ChatPromptTemplate>(
    "hwchase17/structured-chat-agent"
  );

  // Create agent
  const agent = await createStructuredChatAgent({
    llm,
    tools: tools as any,
    prompt,
  });

  // Create agent executor
  return new AgentExecutor({
    agent,
    tools: tools as any,
  });
}
