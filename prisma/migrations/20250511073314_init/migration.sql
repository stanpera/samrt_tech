/*
  Warnings:

  - Added the required column `productProtection` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stockId` to the `order_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `orderNumber` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentMethod` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceFees` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingInsurance` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingMethod` to the `orders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `shippingPrice` to the `orders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "productProtection" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "stockId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "orderNumber" TEXT NOT NULL,
ADD COLUMN     "paymentMethod" TEXT NOT NULL,
ADD COLUMN     "serviceFees" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shippingInsurance" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shippingMethod" TEXT NOT NULL,
ADD COLUMN     "shippingPrice" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stocks"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
