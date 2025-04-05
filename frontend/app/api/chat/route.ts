import { NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface RequestBody {
  messages: Message[];
}

const AGENT_URL = 'http://localhost:3001/api/chat';

export async function POST(request: Request) {
  try {
    const body: RequestBody = await request.json();

    // Forward the request to the agent server
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
    console.error('Error processing chat message:', error);
    
    // Check if it's a blockchain-related error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    if (errorMessage.includes('block is out of range')) {
      return NextResponse.json({ 
        response: "I'm having trouble connecting to the Celo network. This might be due to network synchronization issues. Please try again in a moment." 
      });
    }
    
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
} 