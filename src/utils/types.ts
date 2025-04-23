export type Message = {
  text: string;
  sender: "user" | "assistant" | "bot" | "system";
};

export type MistralChatResponse = {
  content: string;
  response: string;
  status: string;
  code: number;
};
