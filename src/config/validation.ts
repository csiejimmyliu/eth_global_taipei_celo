import dotenv from "dotenv";

dotenv.config();

const requiredEnvVars = ["WALLET_PRIVATE_KEY", "RPC_PROVIDER_URL"] as const;

export function validateEnvVariables(): void {
  const missingVars = requiredEnvVars.filter(
    (varName) => !process.env[varName]
  );

  if (missingVars.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missingVars.join(", ")}\n` +
        `Please check your .env file and ensure all required variables are set.`
    );
  }

  // Validate private key format
  if (!process.env.WALLET_PRIVATE_KEY?.startsWith("0x")) {
    throw new Error("WALLET_PRIVATE_KEY must start with '0x'");
  }

  // Validate RPC URL format
  try {
    new URL(process.env.RPC_PROVIDER_URL as string);
  } catch {
    throw new Error("RPC_PROVIDER_URL must be a valid URL");
  }
}
