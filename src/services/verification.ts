import axios from 'axios';
import { promises as fs } from 'fs';
import path from 'path';

const CELOSCAN_API_URLS = {
  mainnet: 'https://api.celoscan.io/api',
  testnet: 'https://api-alfajores.celoscan.io/api'
};

export async function verifyCeloscanContract(
  contractAddress: string,
  contractName: string,
  constructorArguments: any[],
  sourceCode: string
) {
  try {
    const apiKey = process.env.CELOSCAN_API_KEY;
    if (!apiKey) {
      throw new Error('CELOSCAN_API_KEY not found in environment variables');
    }

    const network = process.env.NETWORK || 'testnet';
    const apiUrl = CELOSCAN_API_URLS[network as keyof typeof CELOSCAN_API_URLS];

    // Format constructor arguments
    const constructorArgsEncoded = constructorArguments
      .map(arg => arg.toString())
      .join(',');

    const verificationData = {
      apikey: apiKey,
      module: 'contract',
      action: 'verifysourcecode',
      contractaddress: contractAddress,
      sourceCode: sourceCode,
      codeformat: 'solidity-single-file',
      contractname: contractName,
      compilerversion: 'v0.8.20+commit.a1b79de6', // Match your compiler version
      optimizationUsed: 1,
      runs: 200,
      constructorArguments: constructorArgsEncoded,
      evmversion: 'london'
    };

    const response = await axios.post(apiUrl, null, { params: verificationData });

    if (response.data.status === '1') {
      console.log('Verification submitted successfully. GUID:', response.data.result);
      
      // Check verification status
      await checkVerificationStatus(apiUrl, response.data.result, apiKey);
      
      return {
        success: true,
        guid: response.data.result,
        explorerUrl: `${network === 'mainnet' ? 'celoscan.io' : 'alfajores.celoscan.io'}/address/${contractAddress}#code`
      };
    } else {
      throw new Error(`Verification submission failed: ${response.data.result}`);
    }
  } catch (error) {
    console.error('Contract verification failed:', error);
    throw error;
  }
}

async function checkVerificationStatus(apiUrl: string, guid: string, apiKey: string) {
  const maxAttempts = 10;
  const delayMs = 5000;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const checkData = {
      apikey: apiKey,
      module: 'contract',
      action: 'checkverifystatus',
      guid: guid
    };

    const response = await axios.get(apiUrl, { params: checkData });

    if (response.data.result === 'Pending in queue') {
      await new Promise(resolve => setTimeout(resolve, delayMs));
      continue;
    }

    if (response.data.result === 'Pass - Verified') {
      return true;
    }

    throw new Error(`Verification failed: ${response.data.result}`);
  }

  throw new Error('Verification timeout');
}

export async function verifyERC20Contract(
  contractAddress: string,
  name: string,
  symbol: string,
  initialSupply: number
) {
  const contractPath = path.join(process.cwd(), 'src', 'contracts', 'ERC20Token.sol');
  const sourceCode = await fs.readFile(contractPath, 'utf8');

  return await verifyCeloscanContract(
    contractAddress,
    'CeloERC20Token',
    [name, symbol, initialSupply],
    sourceCode
  );
} 