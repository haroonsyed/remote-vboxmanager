import React from "react";
import { base_fetch } from "./base_fetch";

const get_snapshots_virtual_machine =
  (vm_name: string) => async (): Promise<string[]> => {
    const endpoint = "/api/get_snapshots_virtual_machine";
    const body = { vm_name };
    return await base_fetch(endpoint, body);
  };

export { get_snapshots_virtual_machine };
