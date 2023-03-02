import React from "react";
import { base_fetch } from "./base_fetch";

const take_snapshot_virtual_machine =
  (vm_name: string, snapshot_name: string) => async (): Promise<string> => {
    const endpoint = "/api/take_snapshot_virtual_machine";
    const body = { vm_name, snapshot_name };
    return await base_fetch(endpoint, body);
  };

export { take_snapshot_virtual_machine };
