import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_GITHUB_TOKEN,
  baseURL: 'https://models.inference.ai.azure.com',
  dangerouslyAllowBrowser: true
});

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
  image?: { url: string };
}

export async function generateContent(
  messages: ChatMessage[], 
  stream = false
) {
  try {
    if (stream) {
      return await openai.chat.completions.create({
        model: 'gpt-4o',
        messages,
        temperature: 0.7,
        max_tokens: 2000,
        stream: true
      });
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.7,
      max_tokens: 2000
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}

export async function generateImageContent(
  messages: ChatMessage[], 
  imageBase64?: string
) {
  try {
    if (imageBase64) {
      const imageMessage = {
        ...messages[messages.length - 1],
        image: { url: `data:image/jpeg;base64,${imageBase64}` }
      };
      messages[messages.length - 1] = imageMessage;
    }

    const response = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages,
      temperature: 0.7,
      max_tokens: 2000
    });

    return response.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating image content:', error);
    throw error;
  }
}