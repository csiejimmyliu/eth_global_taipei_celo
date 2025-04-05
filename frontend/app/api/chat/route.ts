import { NextResponse } from 'next/server';
import { Contract, JsonRpcProvider } from 'ethers';

const CELO_RPC_URL = 'https://forno.celo.org';
const AGENT_URL = 'http://localhost:3001/api/chat';

// Standard ERC20 ABI for the functions we need
const ERC20_ABI = [
  'function name() view returns (string)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  messages: Message[];
}

async function getERC20Info(contractAddress: string) {
  try {
    const provider = new JsonRpcProvider(CELO_RPC_URL);
    const contract = new Contract(contractAddress, ERC20_ABI, provider);

    const [name, symbol, decimals, totalSupply] = await Promise.all([
      contract.name(),
      contract.symbol(),
      contract.decimals(),
      contract.totalSupply(),
    ]);

    return {
      name,
      symbol,
      decimals: Number(decimals),
      totalSupply: totalSupply.toString(),
    };
  } catch (error) {
    console.error('Error fetching ERC20 info:', error);
    throw error;
  }
}

// Function to extract Ethereum address from text
function extractAddress(text: string | undefined): string | null {
  if (!text) return null;
  const matches = text.match(/0x[a-fA-F0-9]{40}/);
  return matches ? matches[0] : null;
}

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({
        response: "Please provide a message to process."
      });
    }

    // Get the last message from the conversation
    const lastMessage = messages[messages.length - 1];
    const messageContent = lastMessage.content;

    // Extract contract address from message
    const contractAddress = extractAddress(messageContent);

    // Check if the message is asking about ERC20 token information and contains a valid address
    if (contractAddress && (
        messageContent.toLowerCase().includes('token') ||
        messageContent.toLowerCase().includes('erc20') ||
        messageContent.toLowerCase().includes('contract')
      )) {
      try {
        const tokenInfo = await getERC20Info(contractAddress);
        const response = `Here's the information about the ERC20 token at ${contractAddress}:\n\n` +
          `Name: ${tokenInfo.name}\n` +
          `Symbol: ${tokenInfo.symbol}\n` +
          `Decimals: ${tokenInfo.decimals}\n` +
          `Total Supply: ${tokenInfo.totalSupply}\n\n` +
          `Network: Celo Mainnet\n\n` +
          `You can view more details on Celoscan:\n` +
          `https://celoscan.io/token/${contractAddress}`;
        
        return NextResponse.json({ response });
      } catch (error) {
        // If there's an error with the ERC20 info, forward to the agent
        console.error('Error fetching ERC20 info:', error);
        const agentResponse = await fetch(AGENT_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(body),
        });

        if (!agentResponse.ok) {
          throw new Error('Agent server error');
        }

        const data = await agentResponse.json();
        return NextResponse.json({ response: data.response });
      }
    }

    // For all other queries, forward to the agent
    const agentResponse = await fetch(AGENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!agentResponse.ok) {
      throw new Error('Agent server error');
    }

    const data = await agentResponse.json();
    return NextResponse.json({ response: data.response });

  } catch (error) {
    console.error('Error processing chat:', error);
    
    // Check if it's a blockchain-related error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes('block is out of range')) {
      return NextResponse.json({ 
        response: "I'm having trouble connecting to the Celo network. This might be due to network synchronization issues. Please try again in a moment." 
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
} 