// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { exec } from "node:child_process";

const output_to_list = (output: string): string[] => {
  const vms = output.trim().split("\n");
  const regex = /"(.+)".+\n?/;

  return vms.map((vm) => {
    // Each vm is of form "reptilian_clean" {849ba973-3d1d-40bb-9a68-266349847c48}
    const matched = vm.match(regex);
    return matched ? matched[1] : "";
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // For now I will only support windows
    const platform = process.platform;
    const manager_path = process.env.VBOX_MANAGE_PATH;

    if (platform == "win32") {
      // run the `ls` command using exec
      exec(`\"${manager_path}\" list runningvms`, (err, output) => {
        if (err) {
          console.error("could not execute command: ", err);
          return res.json(err);
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
