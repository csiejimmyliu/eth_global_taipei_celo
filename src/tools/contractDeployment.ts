import { Tool } from "@langchain/core/tools";
import { deployContract, deployERC20Token } from "../services/contract";

export class ContractDeploymentTool extends Tool {
  name = "contract_deployment";
  description = "Deploy smart contracts to the Celo network. For ERC20 tokens, provide 'type: erc20' along with 'name', 'symbol', and 'initialSupply'. For custom contracts, provide 'bytecode', 'abi', and optional 'constructorArgs'.";

  async _call(input: string) {
    try {
      const params = JSON.parse(input);
      
      if (params.type === 'erc20') {
        const { name, symbol, initialSupply } = params;
        
        if (!name || !symbol || !initialSupply) {
          throw new Error("Name, symbol, and initialSupply are required for ERC20 token deployment");
        }

        const result = await deployERC20Token(name, symbol, Number(initialSupply));
        
        return JSON.stringify({
          ...result,
          tokenType: 'ERC20',
          success: true
        });
      } else {
        const { bytecode, abi, constructorArgs = [] } = params;

        if (!bytecode || !abi) {
          throw new Error("Bytecode and ABI are required for custom contract deployment");
        }

        const result = await deployContract(bytecode as `0x${string}`, abi, constructorArgs);
        
        return JSON.stringify({
          ...result,
          success: true
        });
      }
    } catch (error) {
      return JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      });
    }
  }
} 