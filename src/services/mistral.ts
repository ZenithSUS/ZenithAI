import { Mistral } from "@mistralai/mistralai";
import { MistralChatResponse } from "../utils/types";

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });

const mistralContent =
  "You are a helpful assistant. Answer the user's questions. Respond in a concise way.";

export default async function chatResponse(message: string) {
  try {
    const data: MistralChatResponse = await mistralChat(message);
    if (!data) {
      throw new Error("No data received from Mistral API.");
    }
    return data;
  } catch (error) {
    console.error("Error in chatResponse:", error);
    throw error;
  }
}

async function mistralChat(message: string) {
  const response = await client.chat.complete({
    model: "mistral-large-latest",
    messages: [
      {
        role: "system",
        content: mistralContent,
      },
      { role: "user", content: message },
    ],
    temperature: 0.7,
  });
  return response.choices?.[0].message as MistralChatResponse;
}
