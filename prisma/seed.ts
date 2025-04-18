import prisma from "@/lib/prisma";
import {
  InitialBrands,
  InitialCategories,
  initialImages,
  initialProducts,
} from "./initialData";


async function main() {
  const brands = await prisma.brand.createMany({
    data: InitialBrands,
    skipDuplicates: true,
  });
  const categories = await prisma.category.createMany({
    data: InitialCategories,
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
