import { JsonRpcProvider, Contract } from 'ethers';
import { Tool } from '@langchain/core/tools';

// Standard ERC20 ABI for the functions we need
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
];

export class ERC20TokenInfoTool extends Tool {
  name = 'erc20_token_info';
  description = 'Get information about an ERC20 token on the Celo network. Input should be a contract address.';
  provider: JsonRpcProvider;

  constructor() {
    super();
    this.provider = new JsonRpcProvider('https://forno.celo.org');
  }

  async _call(contractAddress: string): Promise<string> {
    try {
      // Validate the contract address
      if (!contractAddress.match(/^0x[a-fA-F0-9]{40}$/)) {
        return 'Invalid contract address format. Please provide a valid Ethereum address.';
      }

      const contract = new Contract(contractAddress, ERC20_ABI, this.provider);

      const [name, symbol, decimals, totalSupply] = await Promise.all([
        contract.name(),
        contract.symbol(),
        contract.decimals(),
        contract.totalSupply(),
      ]);

      return `Here's the information about the ERC20 token at ${contractAddress}:\n\n` +
        `Name: ${name}\n` +
        `Symbol: ${symbol}\n` +
        `Decimals: ${Number(decimals)}\n` +
        `Total Supply: ${totalSupply.toString()}\n\n` +
        `Network: Celo Mainnet\n\n` +
        `You can view more details on Celoscan:\n` +
        `https://celoscan.io/token/${contractAddress}`;
    } catch (error) {
      console.error('Error fetching ERC20 info:', error);
      return 'Failed to fetch token information. This could be because:\n' +
        '1. The address is not a valid ERC20 token contract\n' +
        '2. The contract doesn\'t implement the standard ERC20 interface\n' +
        '3. There might be network connectivity issues\n\n' +
        'Please verify that the contract address is correct and try again.';
    }
  }
} 