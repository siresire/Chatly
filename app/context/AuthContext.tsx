"use client";

import { SessionProvider } from "next-auth/react";

//  used to wrap the entire app in the _app.tsx file and redirect to the login page if the user is not logged in
export interface AuthContextProps {
  children: React.ReactNode;
}

//  
export default function AuthContext({ 
  children
}: AuthContextProps) {
  return <SessionProvider>{children}</SessionProvider>;
}
//  sessionprovider is a next auth component that provides the session object to all the components in the app