import React, { useState, useRef, useEffect } from 'react';
import { Send, Loader2, Copy, Check } from 'lucide-react';
import { generateContent, ChatMessage } from '../services/openai';

export default function ContentEditor() {
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [streamedContent, setStreamedContent] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content || streamedContent);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy content:', err);
    }
  };

  const handleStream = async (messages: ChatMessage[]) => {
    try {
      const stream = await generateContent(messages, true);
      let accumulated = '';
      
      if (stream && typeof stream !== 'string') {
        for await (const part of stream) {
          const content = part.choices[0]?.delta?.content || '';
          accumulated += content;
          setStreamedContent(accumulated);
        }
      }
    } catch (err) {
      console.error('Streaming error:', err);
      throw err;
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    setGenerating(true);
    setError('');
    setContent('');
    setStreamedContent('');

    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: 'You are a professional content writer helping to create engaging and SEO-optimized content.'
      },
      {
        role: 'user',
        content: prompt
      }
    ];

    try {
      await handleStream(messages);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-4">
        <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">
          What would you like to write about?
        </label>
        <div className="flex gap-2">
          <textarea
            id="prompt"
            rows={3}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Enter your content brief..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            onClick={handleGenerate}
            disabled={generating || !prompt.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {generating ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Generate
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="text-sm text-red-700">{error}</div>
        </div>
      )}

      {(content || streamedContent) && (
        <div className="prose max-w-none">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">Generated Content:</h3>
            <button
              onClick={handleCopy}
              className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              {copied ? (
                <Check className="w-4 h-4 mr-2 text-green-500" />
              ) : (
                <Copy className="w-4 h-4 mr-2" />
              )}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <div 
            ref={contentRef}
            className="mt-2 p-4 bg-white rounded-lg shadow whitespace-pre-wrap"
          >
            {streamedContent || content}
          </div>
        </div>
      )}
    </div>
  );
}