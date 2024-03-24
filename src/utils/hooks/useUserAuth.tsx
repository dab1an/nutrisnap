"use client";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

export const useUserAuth = () => {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getUser() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { userData: user, loading };
};
