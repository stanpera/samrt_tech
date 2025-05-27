"use client";

import chatCompletion from "@/lib/chatCompletion";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useProductsContext } from "@/context/ProductProvider";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const AiAdvisor = () => {
  const { setProductId } = useProductsContext();
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");

  const chatId = useRef<number | null>(null);

  const onClick = async () => {
    const completions = await chatCompletion(chatId.current, [
      ...messages,
      { role: "user", content: message },
    ]);


    setMessage("");
    setMessages(completions.messages);
    setProductId(completions.messages[completions.messages.length - 1].content);
    console.log("JOŁ", completions.messages);
  };

  return (
    <div className="flex justify-center mb-2">
      <Input
        className="w-full sm:w-100 text-lg sm:text-xl"
        placeholder="Ask Chat AI for help..."
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === "Enter") onClick();
        }}
      />
      <Button
        onClick={onClick}
        variant="outline"
        size="form"
        className="p-0 w-20 ml-2"
      >
        Send
      </Button>
    </div>
  );
};

export default AiAdvisor;




