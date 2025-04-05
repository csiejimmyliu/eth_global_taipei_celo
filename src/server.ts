import express from 'express';
import cors from 'cors';
import { setupAgent } from './services/agent';

const app = express();
const port = 3001; // Different from Next.js port

app.use(cors()); // Enable CORS for frontend
app.use(express.json());

// Initialize agent
let agentExecutor: Awaited<ReturnType<typeof setupAgent>>;

async function initializeAgent() {
  agentExecutor = await setupAgent();
  console.log('Agent initialized and ready');
}

// Initialize agent when server starts
initializeAgent().catch(console.error);

app.post('/api/chat', async (req, res) => {
  try {
    if (!agentExecutor) {
      return res.status(503).json({ error: 'Agent not initialized yet' });
    }

    const { messages } = req.body;
    const lastMessage = messages[messages.length - 1];

    const response = await agentExecutor.invoke({
      input: lastMessage.content,
    });

    res.json({ response: response.output });
  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Agent server running at http://localhost:${port}`);
}); 