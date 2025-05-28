"use server";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import AddToCart from "@/components/productDetails/AddToCart";
import ProductInfo from "@/components/productDetails/ProductInfo";
import { Product } from "@/types";


export default async function ProductDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    console.log(id);
    const response = await fetch(`${process.env.APP_URL}/api/products/${id}`); // najpierw z await!

    if (!response.ok) {
      return (
        <main className="flex flex-col w-full h-full items-center justify-center max-w-[1440px] ">
          <p className="text-icons">
            Error while downloading specific product data.
          </p>
        </main>
      );
    }

    const data: Product = await response.json();

    return (
      <main className="flex flex-col w-full max-w-[1440px] ">
        <div className="self-center sm:self-start px-5 sm:px-10 py-2.5">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/products-menu">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{data?.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="flex flex-col xl:flex-row gap-8 p-5 sm:p-10 items-center lx:items-start">
          <ProductInfo product={data} />
          <AddToCart product={data} />
        </div>
      </main>
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      return (
        <p className="text-icons">
          An error occurred while loading specific product data -{" "}
          {error.message}.
        </p>
      );
    } else {
      return (
        <p className="text-icons">
          An error occurred while loading specific product data.
        </p>
      );
    }
  }
}

// export default ProductDetails;
