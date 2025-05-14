"use server";

import {
  Order,
  OrderItem,
  User,
  Product,
  Category,
  Brand,
  Stock,
} from "@/types";
import prisma from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";

export async function getAllCategoriesFromDb(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { id: "asc" },
    });
    return categories;
  } catch {
    throw new Error("Failed to upload categories from db.");
  }
}
export const getAllCategories = unstable_cache(
  getAllCategoriesFromDb,
  ["categories-list"],
  {
    tags: ["categories"],
  }
);

export const getProducts = async (
  ids: Array<number>,
  values: Array<string>
): Promise<Partial<Product>[]> => {
  try {
    const selectValues: { [key: string]: boolean } = {};

    values.forEach((value) => {
      selectValues[value] = true;
    });

    const products = await prisma.product.findMany({
      where: { id: { in: ids } },
      select: selectValues,
    });

    return products;
  } catch {
    throw new Error("Failed to upload products from db.");
  }
};
export const getRandomProductsFromDb = async (): Promise<
  Partial<Product>[]
> => {
  try {
    const productsIds = await prisma.product.findMany({
      select: {
        id: true,
      },
    });

    const randomProductsArrayLength = productsIds.length;
    const countToTake = Math.min(6, randomProductsArrayLength);

    const randomIndexes: Array<number> = [];
    while (randomIndexes.length < countToTake) {
      const randomIndex = Math.floor(Math.random() * randomProductsArrayLength);
      if (!randomIndexes.includes(randomIndex)) {
        randomIndexes.push(randomIndex);
      }
    }

    const randomProductIds = randomIndexes.map(
      (index) => productsIds[index].id
    );

    const randomProducts = await prisma.product.findMany({
      where: {
        id: {
          in: randomProductIds,
        },
      },
      include: {
        images: true,
        category: true,
      },
    });

    return randomProducts;
  } catch {
    throw new Error("Failed to upload recommended products from db.");
  }
};
export const getSingleProduct = async (
  id: number
): Promise<Partial<Product> | null> => {
  try {
    const products = await prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        images: true,
        stocks: true,
        category: { select: { id: true, name: true } },
      },
    });
    return products;
  } catch {
    throw new Error("Failed to upload specific product from db.");
  }
};

export const getAllBrandsFromDb = async (): Promise<Brand[]> => {
  try {
    const brands = await prisma.brand.findMany();

    return brands;
  } catch {
    throw new Error("Failed to upload brands from db.");
  }
};
export const getAllBrands = unstable_cache(
  getAllBrandsFromDb,
  ["brands-list"],
  {
    tags: ["brands"],
  }
);

export async function createUser(
  email: string,
  passwordHash: string,
  mobileNumber: string
): Promise<void> {
  try {
    await prisma.user.create({
      data: {
        email: email,
        passwordHash: passwordHash,
        mobileNumber: mobileNumber,
      },
    });
    revalidateTag("user");
  } catch {
    throw new Error("Failed to save user in db.");
  }
}
export async function getUserFromDb(
  identifier: string | number,
  values: Array<string>
): Promise<User | null> {
  try {
    const selectValues: { [key: string]: boolean } = {};

    values.forEach((value) => {
      selectValues[value] = true;
    });

    const user = await prisma.user.findUnique({
      where: {
        ...(typeof identifier === "string" &&
        identifier.startsWith("+") &&
        !identifier.includes("@")
          ? { mobileNumber: identifier.slice(1) }
          : typeof identifier === "string"
          ? { email: identifier }
          : { id: identifier }),
      },
      select: selectValues,
    });
    return user;
  } catch {
    throw new Error("Failed to upload user from db.");
  }
}
export const getUser = unstable_cache(getUserFromDb, ["user-list"], {
  tags: ["user"],
});
export async function updateUser(
  userId: number,
  updatedData: {
    [key: string]: string;
  }
): Promise<void> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });
    revalidateTag("user");
    return;
  } catch {
    throw new Error("Failed to update user in db");
  }
}

export async function createAddress(
  userId: number,
  country: string
): Promise<void> {
  try {
    await prisma.address.create({
      data: {
        userId: userId,
        country: country,
      },
    });

    revalidateTag("address");
    revalidateTag("user");
  } catch {
    throw new Error("Error saving address data in database");
  }
}
export async function updateAddress(
  userId: number,
  updatedData: {
    [key: string]: string;
  }
): Promise<void> {
  try {
    await prisma.address.update({
      where: { userId: userId },
      data: updatedData,
    });
    revalidateTag("address");
    revalidateTag("user");
    return;
  } catch {
    throw new Error("Error saving address data in database");
  }
}

type PartialStock = {
  [key in keyof Stock]?: Stock[key];
};

export const getStockProductsFromDb = async (
  ids: Array<number>,
  values: Array<string>
): Promise<PartialStock[]> => {
  try {
    const selectValues: { [key: string]: boolean } = {};
    values.forEach((value) => {
      selectValues[value] = true;
    });

    const products = await prisma.stock.findMany({
      where: { id: { in: ids } },
      select: selectValues,
    });

    return products;
  } catch {
    throw new Error("Failed to upload stock from db.");
  }
};
export const getStockProducts = unstable_cache(
  getStockProductsFromDb,
  ["stock-list"],
  {
    tags: ["stock"],
  }
);
export async function updateStock(values: [number, number][]): Promise<void> {
  try {
    for (let i = 0; i < values.length; i++) {
      const [id, amount] = values[i];
      await prisma.stock.update({
        where: { id },
        data: {
          amount,
        },
      });
    }
    revalidateTag("stock");
    revalidateTag("products");
    revalidateTag("categories");
    revalidateTag("brands");
    return;
  } catch {
    throw new Error("Failed to update stock in db");
  }
}

export async function createOrder(
  order: Omit<Order, "id" | "createdAt">
): Promise<number> {
  try {
    const newOrder = await prisma.order.create({
      data: {
        orderNumber: order.orderNumber,
        userId: order.userId,
        status: order.status,
        totalAmount: order.totalAmount,
        paymentMethod: order.paymentMethod,
        shippingMethod: order.shippingMethod,
        shippingPrice: order.shippingPrice,
        shippingInsurance: order.shippingInsurance,
        serviceFees: order.serviceFees,
      },
    });
    revalidateTag("order");
    return newOrder.id;
  } catch {
    throw new Error("Failed to save order in db");
  }
}
export const getOrder = async (id: number): Promise<Order | null> => {
  try {
    const order = await prisma.order.findUnique({
      where: {
        id: id,
      },
      include: {
        orderItems: true,
      },
    });

    return order;
  } catch {
    throw new Error("Failed to upload specific order from db.");
  }
};

export const getOrders = async (userId: number): Promise<Partial<Order>[]> => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: userId },
      include: {
        orderItems: {
          include: {
            product: true,
          },
        },
      },
    });

    return orders;
  } catch {
    throw new Error("Failed to upload orders with orders items from db.");
  }
};

export async function createOrderItem(
  data: Omit<OrderItem, "id">[]
): Promise<number> {
  try {
    const createdItems = await prisma.orderItem.createMany({ data });
    revalidateTag("order");
    revalidateTag("orederItem");
    return createdItems.count;
  } catch {
    throw new Error("Failed to save order items in db.");
  }
}
