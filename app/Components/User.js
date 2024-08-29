"use client";

import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function User() {
  const { user } = useUser();

  const router = useRouter();

  useEffect(() => {
    console.log(user, "current user");
  }, [user]);

  if (!user) {
    router.push("/");
  }

  return null;
}

export default User;
