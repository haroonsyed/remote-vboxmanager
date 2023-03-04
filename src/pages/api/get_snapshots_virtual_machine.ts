// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { exec } from "node:child_process";

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
    vm_name = vm_name ? vm_name.split(" ")[0] : "";

    if (platform == "win32") {
      // run the `ls` command using exec
      exec(`\"${manager_path}\" snapshot ${vm_name} list`, (err, output) => {
        if (err) {
          console.error("could not execute command: ", err);
          return res.json({ error: err });
        }
        res.json(output_to_list(output));
      });
    } else {
      res.json({
        error: "Unsupported platform...",
      });
    }
  } else {
    res.json({
      error:
        "You must be signed in to view the protected content on this page.",
    });
  }
};
