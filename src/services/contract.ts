import { createPublicClient, http } from 'viem';
import { celo } from 'viem/chains';
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
      chain: celo,
    });

    const publicClient = createPublicClient({
      chain: celo,
      transport: http(process.env.RPC_PROVIDER_URL),
    });

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (!receipt.contractAddress) {
      throw new Error('Contract address not found in deployment receipt');
    }

    return {
      transactionHash: hash,
      contractAddress: receipt.contractAddress,
      network: 'Celo Mainnet',
      chainId: celo.id
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
    
    console.log('Compiling contract...');
    const { abi, bytecode } = await compileSolidity(contractPath);
    console.log('Contract compiled successfully');
    
    console.log('Deploying contract to Celo Mainnet...');
    const deploymentResult = await deployContract(
      bytecode,
      abi,
      [name, symbol, initialSupply]
    );
    console.log('Contract deployed successfully');

    return {
      ...deploymentResult,
      name,
      symbol,
      initialSupply,
      contractType: 'CeloERC20Token'
    };
  } catch (error) {
    console.error('ERC20 deployment failed:', error);
    throw error;
  }
} 