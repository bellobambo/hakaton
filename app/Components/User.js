"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function User() {
  const { user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user === undefined) return;

    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  return null;
}

export default User;
