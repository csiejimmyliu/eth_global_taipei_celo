import { promises as fs } from 'fs';
import path from 'path';
import solc from 'solc';

export async function compileSolidity(contractPath: string) {
  try {
    // Read the contract source
    const sourceCode = await fs.readFile(contractPath, 'utf8');

    // Prepare input for solc
    const input = {
      language: 'Solidity',
      sources: {
        [path.basename(contractPath)]: {
          content: sourceCode,
        },
      },
      settings: {
        outputSelection: {
          '*': {
            '*': ['abi', 'evm.bytecode'],
          },
        },
        optimizer: {
          enabled: true,
          runs: 200,
        },
      },
    };

    // Find all import paths
    const importPaths = [
      path.join(process.cwd(), 'node_modules'),
    ];

    // Create custom import resolver
    function findImports(importPath: string) {
      for (const basePath of importPaths) {
        const fullPath = path.join(basePath, importPath);
        try {
          return {
            contents: fs.readFileSync(fullPath, 'utf8'),
          };
        } catch (error) {
          continue;
        }
      }
      return { error: 'File not found' };
    }

    // Compile the contract
    const output = JSON.parse(
      solc.compile(JSON.stringify(input), { import: findImports })
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

    // Get the contract name from the file
    const contractName = path.basename(contractPath, '.sol');
    
    // Find the contract in the compiled output
    const compiledContract = output.contracts[path.basename(contractPath)][contractName];

    if (!compiledContract) {
      throw new Error(`Contract ${contractName} not found in compiled output`);
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