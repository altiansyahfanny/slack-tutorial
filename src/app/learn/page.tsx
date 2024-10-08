"use client";
import { Suspense } from "react";
import User from "./user";

const LearnPage = () => {
  return (
    <div>
      <h1>Page</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <User />
      </Suspense>
    </div>
  );
};

export default LearnPage;
