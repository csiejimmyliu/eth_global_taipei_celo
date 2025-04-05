import { exec } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function compileSolidity(contractPath: string) {
  try {
    const outputPath = path.join(process.cwd(), 'build');
    await fs.mkdir(outputPath, { recursive: true });

    // Read the source code to find the contract name
    const sourceCode = await fs.readFile(contractPath, 'utf8');
    const contractNameMatch = sourceCode.match(/contract\s+(\w+)\s+is/);
    if (!contractNameMatch) {
      throw new Error('Could not find contract name in source file');
    }
    const actualContractName = contractNameMatch[1];

    // Use standard-json format for better control over imports and settings
    const input = {
      language: 'Solidity',
      sources: {
        [path.basename(contractPath)]: {
          content: sourceCode
        }
      },
      settings: {
        optimizer: {
          enabled: true,
          runs: 200
        },
        outputSelection: {
          '*': {
            '*': ['abi', 'evm.bytecode']
          }
        }
      }
    };

    const inputFile = path.join(outputPath, 'input.json');
    await fs.writeFile(inputFile, JSON.stringify(input));

    // Run solc with remappings for OpenZeppelin
    const nodeModulesPath = path.join(process.cwd(), 'node_modules');
    
    const { stdout, stderr } = await execAsync(
      `solc --standard-json ${inputFile} --allow-paths ${nodeModulesPath} --base-path . --include-path ${nodeModulesPath} > ${path.join(outputPath, 'output.json')}`
    );

    if (stderr) {
      console.warn('Compilation warnings:', stderr);
    }

    const output = JSON.parse(
      await fs.readFile(path.join(outputPath, 'output.json'), 'utf8')
    );

    // Check for errors
    if (output.errors) {
      const errors = output.errors.filter((error: any) => error.severity === 'error');
      if (errors.length > 0) {
        throw new Error(
          `Compilation errors:\n${errors.map((e: any) => e.message).join('\n')}`
        );
      }
    }

    // Find the contract in the compiled output using the actual contract name
    const fileName = path.basename(contractPath);
    const compiledContract = output.contracts[fileName][actualContractName];

    if (!compiledContract) {
      throw new Error(
        `Contract ${actualContractName} not found in compiled output. ` +
        `Available contracts: ${Object.keys(output.contracts[fileName]).join(', ')}`
      );
    }

    return {
      abi: compiledContract.abi,
      bytecode: `0x${compiledContract.evm.bytecode.object}` as `0x${string}`,
    };
  } catch (error) {
    console.error('Compilation failed:', error);
    throw error;
  }
} 