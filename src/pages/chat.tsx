import { useState, useEffect, useRef } from "react";
import { Message, MistralChatResponse } from "../utils/types";
import chatResponse from "../services/mistral";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSend = async () => {
    try {
      if (!message.trim()) return;
      setMessages((prev) => [...prev, { text: message, sender: "user" }]);
      setMessage("");
      setLoading(true);

      const response: MistralChatResponse = await chatResponse(message);
      console.log("Response:", response);

      if (!response) {
        setLoading(false);
        setError("No response from the server.");
        return;
      }

      setMessages((prev) => [
        ...prev,
        { text: response.content, sender: "assistant" },
      ]);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError("An error occurred while fetching the response.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-4 shadow-md">
        <h1 className="mb-4 text-2xl font-bold">ZenithAI</h1>
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSend();
                }
              }}
              className="flex-grow rounded border border-gray-300 p-2"
            />
            <button
              className="rounded bg-blue-500 px-4 py-2 text-white"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
          <div
            ref={chatContainerRef}
            className="flex h-64 flex-col space-y-2 overflow-y-auto rounded border border-gray-300 p-2"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`rounded p-2 ${
                  msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"
                }`}
              >
                {msg.text}
              </div>
            ))}
            {loading && (
              <div className="text-gray-500">Zenith is typing...</div>
            )}
            {error && <div className="text-red-500">{error}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
