import React from "react";
import { base_url } from "./base_url";

export const base_fetch = async (endpoint: string, body: object) => {
  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  return res.json();
};
