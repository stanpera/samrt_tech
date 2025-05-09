import prisma from "@/lib/prisma";
import {
  InitialAddresses,
  initialBrands,
  initialCategories,
  initialImages,
  initialProducts,
  initialStocks,
  initialUsers,
} from "./initialData";

async function main() {
  const brands = await prisma.brand.createMany({
    data: initialBrands,
    skipDuplicates: true,
  });
  const categories = await prisma.category.createMany({
    data: initialCategories,
    skipDuplicates: true,
  });
  const products = await prisma.product.createMany({
    data: initialProducts,
    skipDuplicates: true,
  });
  const images = await prisma.image.createMany({
    data: initialImages,
    skipDuplicates: true,
  });
  const stocks = await prisma.stock.createMany({
    data: initialStocks,
    skipDuplicates: true,
  });
  const users = await prisma.user.createMany({
    data: initialUsers,
    skipDuplicates: true,
  });
  const addresses = await prisma.address.createMany({
    data: InitialAddresses,
    skipDuplicates: true,
  });
  console.log("Dane początkowe zostały wprowadzone.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
