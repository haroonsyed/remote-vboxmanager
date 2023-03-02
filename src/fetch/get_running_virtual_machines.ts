import React from "react";
import { base_fetch } from "./base_fetch";

const get_running_virtual_machines = () => async (): Promise<string[]> => {
  const endpoint = "/api/get_running_virtual_machines";
  const body = {};
  return await base_fetch(endpoint, body);
};

export { get_running_virtual_machines };
