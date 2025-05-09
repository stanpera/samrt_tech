export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/",
    "/profile/:path*",
    "/products-menu/:path*",
    "/products/:path*",
    "/contact/:path*",
    "/cart/:path*",
    "/register/completed",
    
  ],
};
