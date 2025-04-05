import { NextResponse } from 'next/server';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatRequest {
  messages: Message[];
}

export async function POST(request: Request) {
  try {
    const body: ChatRequest = await request.json();
    const userMessage = body.messages[body.messages.length - 1];

    // TODO: Implement actual contract interaction logic here
    // For now, return a mock response
    const response = `I received your message: "${userMessage.content}". This is a placeholder response. In the future, this will interact with Celo smart contracts.`;

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Error processing chat message:', error);
    return NextResponse.json(
      { error: 'Failed to process message' },
      { status: 500 }
    );
  }
} 