import React from "react";
import { base_fetch } from "./base_fetch";

const get_virtual_machines = async () => {
  const endpoint = "/api/get_virtual_machines";
  const body = {};
  return await base_fetch(endpoint, body);
};

export { get_virtual_machines };
