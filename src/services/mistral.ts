import { Mistral } from "@mistralai/mistralai";
import { MistralChatResponse } from "../utils/types";

const apiKey = import.meta.env.VITE_MISTRAL_API_KEY;
const client = new Mistral({ apiKey: apiKey });

const mistralContent =
  'You are a helpful assistant. Answer the user\'s questions. Respond in a JSON format and this is the format: {"response": "your response", "status": "This is a word like success, failed or error", "code": 200}. This is the only format you can respond with. Clean the format to avoid errors and don\'t add unnecessary content. Only output the JSON. If the user asks for a list, just add a number and a next line to it. For example: 1. First item\n2. Second item\n3. Third item\n4. Fourth item. The output should only be a string in the response key and in the content key only JSON, nothing more.';

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
        content: mistralContent,
      },
      { role: "user", content: message },
    ],
    temperature: 0.7,
  });
  console.log("Mistral response:", response);
  return response.choices?.[0].message as MistralChatResponse;
}
