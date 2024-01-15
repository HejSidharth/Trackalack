import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ClerkProvider } from "@clerk/clerk-react";
import {dark} from "@clerk/themes";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { supabase } from "./supabaseClient.js";


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
console.log(PUBLISHABLE_KEY);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider supabaseClient={supabase}>
    <ClerkProvider 
    appearance={{
      baseTheme: dark
    }} 
    publishableKey={PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
    </SessionContextProvider>

  </React.StrictMode>
);
