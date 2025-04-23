import { Mistral } from "@mistralai/mistralai";
import { MistralChatResponse } from "../utils/types";

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });

export default async function chatResponse(message: string) {
  try {
    const data: MistralChatResponse = await mistralChat(message);

    const response = JSON.parse(data.content) as MistralChatResponse;
    console.log("Response:", response);
    if (response.code === 200) {
      return response;
    } else {
      throw new Error("Invalid response format");
    }
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
        content:
          'You are a helpful assistant. Answer the user\'s questions. Respond in a JSON format and this is the format: {"response": "your response", "status": "This is a word like success, failed or error", "code": 200} this is the only format you can respond and output exactly like the format clean the format to avoid errors and dont add neccesarry in the content only output the JSON.',
      },
      { role: "user", content: message },
    ],
    temperature: 0.7,
  });
  console.log("Mistral response:", response);
  return response.choices?.[0].message as MistralChatResponse;
}
