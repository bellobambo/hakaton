"use client";

import { useUser } from "@clerk/nextjs";
import React, { useEffect } from "react";

function AuthUser() {
  const { user } = useUser();

  useEffect(() => {
    console.log(user, "current user");
  }, [user]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" mt-[40px]">
      <div className="flex justify-center items-center">
        Welcome, {user.firstName}!!!
      </div>
      <div className="flex justify-center items-center">
        <p>Fill The Form To Request For Your University ID</p>
      </div>
    </div>
  );
}

export default AuthUser;
