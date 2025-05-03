"use server";

import { AddUserProps, Brand, Category } from "@/types";
import prisma from "@/lib/prisma";
import { revalidateTag, unstable_cache } from "next/cache";

export async function getAllCategoriesFromDb(
  values: Array<string>
): Promise<Category[]> {
  const selectValues: { [key: string]: boolean } = {};

  values.forEach((value) => {
    selectValues[value] = true;
  });

  const categories = await prisma.category.findMany({
    orderBy: { id: "asc" },
    select: selectValues,
  });
  return categories as any as Category[];
}

export const getAllCategories = unstable_cache(
  getAllCategoriesFromDb,
  ["categories-list"],
  {
    tags: ["categories"],
  }
);

export const getAllProductsFromDb = async () => {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });

  return products;
};

export const getAllProducts = unstable_cache(
  getAllProductsFromDb,
  ["products-list"],
  {
    tags: ["products"],
  }
);

export const getRandomProductsFromDb = async () => {
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

  const randomProductIds = randomIndexes.map((index) => productsIds[index].id);

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
};

export const getAllBrandsFromDb = async (
  values: Array<string>
): Promise<Brand[]> => {
  const selectValues: { [key: string]: boolean } = {};

  values.forEach((value) => {
    selectValues[value] = true;
  });

  const brands = await prisma.brand.findMany({
    select: selectValues,
  });
  return brands as any as Brand[];
};

export const getAllBrands = unstable_cache(
  getAllBrandsFromDb,
  ["brands-list"],
  {
    tags: ["brands"],
  }
);

export const getSingleProductFromDb = async (id: number) => {
  const products = await prisma.product.findUnique({
    where: {
      id: id,
    },
    select: {
      id: true,
      name: true,
      description: true,
      technicalSpecs: true,
      price: true,
      categoryId: true,
      brandId: true,
      images: true,
      stocks: true,
      category: { select: { id: true, name: true } },
    },
  });
  console.log("products", products);
  return products;
};

export const getSingleProduct = unstable_cache(
  getSingleProductFromDb,
  ["singleProduct-list"],
  {
    tags: ["singleProduct"],
  }
);

export async function createUser(
  email: string,
  passwordHash: string
): Promise<void> {
  try {
    await prisma.user.create({
      data: {
        email: email,
        passwordHash: passwordHash,
      },
    });

    revalidateTag("user");
  } catch (error: unknown) {
    throw new Error("Failed to save user.");
  }
}
