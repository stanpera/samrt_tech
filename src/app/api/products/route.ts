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
        technicalSpecs: true,
        price: true,
        stock: true,
        categoryId: true,
        brandId: true,
        images: true,
        category: true,
      },
    });

    const totalCount = await prisma.product.count({
      where: filter,
    });

    return NextResponse.json({ products, totalCount }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error retrieving specific products. Please try again later.",
      },
      { status: 500 }
    );
  }
}
