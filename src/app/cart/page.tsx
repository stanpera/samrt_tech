import CartProduct from "@/components/CartProduct";
import TotalProduct from "@/components/TotalProduct";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Cart = () => {
  return (
    <main
      className="flex flex-col flex-1 items-center pb-20
    "
    >
      <div className="self-start px-10 py-2.5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-12 p-10">
        <CartProduct />
        <TotalProduct />
      </div>
    </main>
  );
};

export default Cart;
