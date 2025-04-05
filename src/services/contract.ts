import { createPublicClient, http } from 'viem';
import { celo, celoAlfajores } from 'viem/chains';
import { walletClient } from '../config/wallet';
import { compileSolidity } from './compiler';
import { verifyERC20Contract } from './verification';
import path from 'path';

export async function deployContract(
  contractBytecode: `0x${string}`,
  abi: any[],
  constructorArgs: any[] = []
) {
  try {
    if (!walletClient.account) {
      throw new Error('No account configured in wallet client');
    }

    const hash = await walletClient.deployContract({
      abi,
      bytecode: contractBytecode,
      args: constructorArgs,
      account: walletClient.account,
      chain: process.env.NETWORK === "mainnet" ? celo : celoAlfajores,
    });

    const publicClient = createPublicClient({
      chain: process.env.NETWORK === "mainnet" ? celo : celoAlfajores,
      transport: http(process.env.RPC_PROVIDER_URL),
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (!receipt.contractAddress) {
      throw new Error('Contract address not found in deployment receipt');
    }

    return {
      transactionHash: hash,
      contractAddress: receipt.contractAddress,
    };
  } catch (error) {
    console.error('Contract deployment failed:', error);
    throw error;
  }
}

export async function deployERC20Token(
  name: string,
  symbol: string,
  initialSupply: number
) {
  try {
    const contractPath = path.join(process.cwd(), 'src', 'contracts', 'ERC20Token.sol');
    const { abi, bytecode } = await compileSolidity(contractPath);
    
    const deploymentResult = await deployContract(
      bytecode,
      abi,
      [name, symbol, initialSupply]
    );

    // Verify the contract if CELOSCAN_API_KEY is available
    if (process.env.CELOSCAN_API_KEY) {
      try {
        const verificationResult = await verifyERC20Contract(
          deploymentResult.contractAddress!,
          name,
          symbol,
          initialSupply
        );
        return {
          ...deploymentResult,
          verification: verificationResult
        };
      } catch (verificationError) {
        console.warn('Contract verification failed:', verificationError);
        return {
          ...deploymentResult,
          verification: {
            success: false,
            error: verificationError instanceof Error ? verificationError.message : 'Unknown verification error'
          }
        };
      }
    }

    return deploymentResult;
  } catch (error) {
    console.error('ERC20 deployment failed:', error);
    throw error;
  }
} 