// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { exec } from "node:child_process";
import { exec_async } from "./util/execute_command";
import { clean_input } from "./util/clean_input";

const output_to_list = (output: string): string[] => {
  const snapshots = output.trim().split("\n");
  const regex = /Name:\s(\S+).+\n?/;

  if (output.includes("This machine does not have any snapshots")) {
    return [];
  }

  return snapshots.map((snapshot) => {
    // Each snapshot is of form: Name: CLEAN (UUID: 7d27be32-9fbf-466e-88cb-808f10bc64e4) *
    const matched = snapshot.match(regex);
    return matched ? matched[1] : "";
  });
};

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // For now I will only support windows
    const platform = process.platform;
    const manager_path = process.env.VBOX_MANAGE_PATH;
    let vm_name = req.body.vm_name;
    vm_name = clean_input(vm_name);

    if (platform == "win32") {
      const { stderr: err, stdout: output } = await exec_async(
        `\"${manager_path}\" snapshot ${vm_name} list`
      );
      if (err) {
        console.error("could not execute command: ", err);
        return res.status(500).json({ error: err });
      }
      return res.status(200).json(output_to_list(output));
    } else {
      return res.status(500).json({
        error: "Unsupported platform...",
      });
    }
  } else {
    return res.status(400).json({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};
