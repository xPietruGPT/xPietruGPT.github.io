// pages/api/chat.js
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request format' });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages,
    });

    res.status(200).json({ choices: completion.choices });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
}
