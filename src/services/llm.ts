import { ChatAnthropic } from "@langchain/anthropic";
import { BaseChatModel } from "@langchain/core/language_models/chat_models";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatOpenAI } from "@langchain/openai";
import "dotenv/config";

/**
 * Selects the appropriate LLM model based on available API keys
 * Priority order: OpenAI > Anthropic > Gemini
 * @returns The initialized LLM model
 */
export function selectLLMModel(): BaseChatModel {
  // Check for OpenAI API key
  if (process.env.OPENAI_API_KEY) {
    return new ChatOpenAI({
      model: process.env.OPENAI_MODEL_NAME || "gpt-4o-mini",
      apiKey: process.env.OPENAI_API_KEY,
    });
  }

  // Check for Anthropic API key
  if (process.env.ANTHROPIC_API_KEY) {
    return new ChatAnthropic({
      model: process.env.ANTHROPIC_MODEL_NAME || "claude-3-haiku-20240307",
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }

  // Check for Gemini API key (will be used as fallback)
  if (process.env.GEMINI_API_KEY) {
    return new ChatGoogleGenerativeAI({
      model: process.env.GEMINI_MODEL_NAME || "gemini-pro",
      apiKey: process.env.GEMINI_API_KEY,
    });
  }

  // This should never happen due to validation, but added as a safeguard
  throw new Error(
    "No LLM API keys available. Please provide at least one of: OPENAI_API_KEY, ANTHROPIC_API_KEY, or GEMINI_API_KEY"
  );
}
