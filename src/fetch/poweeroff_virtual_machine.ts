import React from "react";
import { base_fetch } from "./base_fetch";

const poweroff_virtual_machine =
  (vm_name: string) => async (): Promise<string> => {
    const endpoint = "/api/poweroff_virtual_machine";
    const body = { vm_name };
    return await base_fetch(endpoint, body);
  };

export { poweroff_virtual_machine };
