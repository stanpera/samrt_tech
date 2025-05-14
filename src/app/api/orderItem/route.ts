"use server";
import { authOptions } from "@/lib/authOptions";
import { createOrder, createOrderItem, getProducts } from "@/lib/queries";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

interface OrderItemType {
  stockId: number;
  productId: number;
  quantity: number;
  message: string;
  productProtection: boolean;
  paymentMethod: string;
  shippingMethod: string;
}

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }

    const session = await getServerSession(authOptions);

    const activeUserId = Number(session?.user.id);

    if (!activeUserId) {
      return NextResponse.json({ error: "No authorization" }, { status: 403 });
    }

    const data: OrderItemType[] = await req.json();

    const productsIds = data.map((p) => p.productId);

    const products = await getProducts(productsIds, ["id", "price"]);

    const priceMap = new Map();
    products.forEach((p) => {
      priceMap.set(p.id, p.price);
    });

    const dataWithPrice = data.map((item) => ({
      ...item,
      price: priceMap.get(item.productId) ?? 0,
    }));

    const orderNumber = `order/${Date.now().toString()}/${uuidv4()
      .replace(/-/g, "")
      .slice(0, 9)}`;

    const totalAmount = dataWithPrice
      .map((d) => d.quantity)
      .reduce((acc, val) => acc + val, 0);

    const paymentMethod = dataWithPrice.findLast(
      (p) => p.paymentMethod
    )?.paymentMethod;

    const shippingMethod = dataWithPrice.findLast(
      (p) => p.shippingMethod
    )?.shippingMethod;

    const shippingPriceAndInsurence = dataWithPrice
      .map((p) => p.price * p.quantity * 0.01)
      .reduce((acc, val) => acc + val, 0);

    const serviceFees = dataWithPrice
      .map((p) => p.price * p.quantity * 0.005)
      .reduce((acc, val) => acc + val, 0)
      .toFixed(2);

    const order = {
      orderNumber: orderNumber,
      userId: activeUserId,
      status: "accepted",
      totalAmount: totalAmount,
      paymentMethod: paymentMethod ?? "stripe",
      shippingMethod: shippingMethod ?? "smartTechCourier",
      shippingPrice: parseFloat(shippingPriceAndInsurence.toFixed(2)),
      shippingInsurance: parseFloat(shippingPriceAndInsurence.toFixed(2)),
      serviceFees: parseFloat(serviceFees),
    };

    const orderId = await createOrder(order);

    const orderItem = dataWithPrice.map((p) => ({
      orderId: orderId,
      productId: p.productId,
      stockId: p.stockId,
      quantity: p.quantity,
      priceAtPurchase: p.price,
      productProtection: true
        ? parseFloat((p.price * p.quantity * 0.02).toFixed(2))
        : 0,
      message: p.message ? p.message : "",
    }));

    const itemsAmount = await createOrderItem(orderItem);

    return NextResponse.json(
      {
        orderId: orderId,
        message: `Order successfully completed - items amount: ${itemsAmount}`,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
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
          error:
            "Error retrieving stock products data. Please try again later.",
        },
        { status: 500 }
      );
    }
  }
}
