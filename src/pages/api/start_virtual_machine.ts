// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { exec } from "node:child_process";
import { clean_input } from "./util/clean_input";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // For now I will only support windows
    const platform = process.platform;
    const manager_path = process.env.VBOX_MANAGE_PATH;
    let vm_name: string = req.body.vm_name;
    vm_name = clean_input(vm_name);

    if (platform == "win32") {
      // run the `ls` command using exec
      exec(`\"${manager_path}\" startvm ${vm_name}`, (err, output) => {
        if (err) {
          console.error("could not execute command: ", err);
        }
        return res.json(err);
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
