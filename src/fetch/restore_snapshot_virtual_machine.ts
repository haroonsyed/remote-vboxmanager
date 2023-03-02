import React from "react";
import { base_fetch } from "./base_fetch";

const restore_snapshot_virtual_machine =
  (vm_name: string, snapshot_name: string) => async () => {
    const endpoint = "/api/restore_snapshot_virtual_machine";
    const body = { vm_name, snapshot_name };
    return await base_fetch(endpoint, body);
  };

export { restore_snapshot_virtual_machine };
