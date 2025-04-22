import { Mistral } from "@mistralai/mistralai";

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });

export default function chatResponse(message: string) {
  return client.chat.complete({
    model: "mistral-tiny",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant. Answer the user's questions. Be concise.",
      },
      { role: "user", content: message },
    ],
    temperature: 0.7,
    maxTokens: 100,
  });
}
