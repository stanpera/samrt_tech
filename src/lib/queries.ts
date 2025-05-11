"use server";

import { Address, Brand, Category, User } from "@/types";
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
// FromDb
export const getSingleProduct = async (id: number) => {
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
  return products;
};
// export const getSingleProduct = unstable_cache(
//   getSingleProductFromDb,

//   ["singleProduct"],

//   {
//     tags: ["product"],
//   }
// );
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
  } catch (error: unknown) {
    throw new Error("Failed to save user XXX.");
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
  } catch (error: unknown) {
    throw new Error("Failed to upload user.");
  }
}
export const getUser = unstable_cache(getUserFromDb, ["singleUser"], {
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
  } catch (error: unknown) {
    throw new Error("Error saving user data in database");
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
  } catch (error: unknown) {
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
  } catch (error: unknown) {
    throw new Error("Error saving address data in database");
  }
}
// export async function getAddressFromDb(
//   userId: number
// ): Promise<Address | null> {
//   try {
//     const address = await prisma.address.findUnique({
//       where: {
//         userId: userId,
//       },
//     });
//     return address;
//   } catch (error: unknown) {
//     throw new Error("Failed to get address.");
//   }
// }

export const getStockProductsFromDb = async (
  ids: Array<number>,
  values: Array<string>
) => {
  try {
    const selectValues: { [key: string]: boolean } = {};
    console.log("selectValues", selectValues);
    values.forEach((value) => {
      selectValues[value] = true;
    });

    const products = await prisma.stock.findMany({
      where: { id: { in: ids } },
      select: selectValues,
    });

    return products;
  } catch (error: unknown) {
    throw new Error("Failed to upload user.");
  }
};

export const getStockProducts = unstable_cache(
  getStockProductsFromDb,
  ["stockProducts-list"],
  {
    tags: ["stock"],
  }
);
