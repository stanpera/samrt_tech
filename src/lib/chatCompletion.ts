"use server";
import OpenAI from "openai";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const chatCompletion = async (
  id: number | null,
  messageHistory: {
    role: "user" | "assistant" | "system";
    content: string;
  }[]
) => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      categoryId: true,
      description: true,
      technicalSpecs: true,
      brandId: true,
      stocks: true,
      category: { select: { id: true, name: true } },
    },
  });
  const contextMessage: Message = {
    role: "system",
    content: `You are a professional customer advisor in an electronics store. Based on the customer's inquiries and preferences, you select the best available products and bundles they can purchase. This is the array of products accessible in the shop: ${products.map(
      (prod) => {
        return `[${prod.id}, ${prod.name}, ${prod.price}, ${prod.categoryId}, ${
          prod.description
        }, ${prod.technicalSpecs}, ${prod.brandId}, ${prod.stocks.map(
          (s) => s
        )}, ${prod.category.name}]`;
      }
    )}. After searching the product database, only return a comma-separated list of products ids as numbers, without any additional text or explanation. You must never write anything except numbers `,
  };
  console.log("products", contextMessage);

  const fullMessageHistory = [contextMessage, ...messageHistory];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: fullMessageHistory,
  });

  const assistantMessage = response.choices[0].message as Message;

  const messages: Message[] = [...messageHistory, assistantMessage];

  const chatId = id;

  return {
    messages,
    id: chatId,
  };
};

export default chatCompletion;
