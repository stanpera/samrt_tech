import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const categoryId = searchParams.get("category") || "all";
  const minPrice = parseFloat(searchParams.get("minPrice") || "10");
  const maxPrice = parseFloat(searchParams.get("maxPrice") || "");
  const limit = parseInt(searchParams.get("limit") || "9");
  const offset = parseInt(searchParams.get("offset") || "0");
  const sortBy = searchParams.get("sortBy") || "latest";
  const brand = searchParams.get("brand") || "all";

  const filter = {
    ...(categoryId != "all"
      ? {
          categoryId: {
            in: categoryId
              .split(",")
              .map((cat) => parseInt(cat.trim()))
              .filter((cat) => cat),
          },
        }
      : {}),
    price: {
      gte: minPrice,
      ...(maxPrice ? { lte: maxPrice } : {}),
    },
    ...(brand != "all"
      ? {
          brandId: {
            in: brand
              .split(",")
              .map((b) => parseInt(b.trim()))
              .filter((b) => b),
          },
        }
      : {}),
  };
  let orderBy = {};
  switch (sortBy) {
    case "price_asc":
      orderBy = { price: "asc" };
      break;
    case "latest":
      orderBy = { createdAt: "desc" };
      break;
    case "price_desc":
    default:
      orderBy = { price: "desc" };
      break;
  }

  try {
    const products = await prisma.product.findMany({
      where: filter,
      orderBy: orderBy,
      take: limit,
      skip: offset,
      select: {
        id: true,
        name: true,
        price: true,
        categoryId: true,
        brandId: true,
        images: true,
        stocks: true,
        category: { select: { id: true, name: true } },
      },
    });

    const productsWithOneImage = products.map((product) => ({
      ...product,
      images: product.images.length > 0 ? [product.images[0]] : null,
    }));

    const totalCount = await prisma.product.count({
      where: filter,
    });

    return NextResponse.json(
      { productsWithOneImage, totalCount },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: error.message,
        },
        { status: 500 }
      );
    } else {
      return NextResponse.json(
        {
          error: "Error retrieving products data. Please try again later.",
        },
        { status: 500 }
      );
    }
  }
}
