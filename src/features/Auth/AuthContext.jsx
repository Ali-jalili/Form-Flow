/** @format */

import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { supabase } from "../../lib/supabaseClient";

const AuthContext = createContext();

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { data: listener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) return setUser(session.user);
        else {
          setUser(null);
        }

        setIsLoading(false);
      },
    );

    supabase.auth.getSession().then(({ data: session }) => {
      if (session?.user) {
        setUser(session.user);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  async function handleLogin(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw error;
    }

    setUser(data.user);

    return data.user;
  }

  async function handleSignup(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });

    if (error) throw error;
    return data.user;
  }

  async function handlelogout() {
    await supabase.auth.signOut();
  }

  const value = { user, isLoading, handleLogin, handleSignup, handlelogout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export { AuthProvider, AuthContext };
