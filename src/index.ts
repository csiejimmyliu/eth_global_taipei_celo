import readline from "node:readline";
import { setupAgent } from "./services/agent";

async function main(): Promise<void> {
  // Setup the agent
  const agentExecutor = await setupAgent();

  // Create readline interface
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  // Main interaction loop
  while (true) {
    const prompt = await new Promise<string>((resolve) => {
      rl.question('Enter your prompt (or "exit" to quit): ', resolve);
    });

    if (prompt === "exit") {
      rl.close();
      break;
    }

    const response = await agentExecutor.invoke({
      input: prompt,
    });

    console.log(response);
  }
}

// Run the application
main().catch(console.error);
