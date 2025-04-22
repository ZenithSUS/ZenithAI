export type Message = {
  text: string;
  sender: "user" | "assistant" | "bot" | "system";
};
