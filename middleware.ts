import { withAuth } from "next-auth/middleware";

// Apply the withAuth middleware to the default export of this module
export default withAuth({
  pages: {
    // Redirect users to the home page ("/") for sign-in
    signIn: "/",
  },
});

export const config = { 
  // Defined match patterns for routes that should use authentication
  matcher: [
    "/conversations/:path*",
    "/users/:path*",
  ]
};
