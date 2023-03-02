import React from "react";
import { base_fetch } from "./base_fetch";

const start_virtual_machine = (vm_name: string) => async () => {
  const endpoint = "/api/start_virtual_machine";
  const body = { vm_name };
  return await base_fetch(endpoint, body);
};

export { start_virtual_machine };
