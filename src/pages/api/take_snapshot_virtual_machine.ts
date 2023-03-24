// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { exec } from "node:child_process";
import { clean_input } from "./util/clean_input";

const MAX_SNAPSHOTS = 20;

const get_number_of_snapshots = async (vm_name: string): Promise<number> => {
  const manager_path = process.env.VBOX_MANAGE_PATH;

  return new Promise((resolve) => {
    exec(`\"${manager_path}\" snapshot ${vm_name} list`, (err, output) => {
      if (err) {
        console.error("could not execute command: ", err);
        resolve(MAX_SNAPSHOTS);
        return;
      }
      const snapshotCount = output.split("\n").length - 1;
      resolve(snapshotCount);
    });
  });
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (session) {
    // For now I will only support windows
    const platform = process.platform;
    const manager_path = process.env.VBOX_MANAGE_PATH;
    let vm_name = req.body.vm_name;
    vm_name = clean_input(vm_name);
    let snapshot_name = req.body.snapshot_name;
    snapshot_name = clean_input(snapshot_name);

    const number_of_snapshots = await get_number_of_snapshots(vm_name);
    if (number_of_snapshots > MAX_SNAPSHOTS) {
      return res.json({ error: "Too many snapshots taken!" });
    }

    if (platform == "win32") {
      // run the `ls` command using exec
      exec(
        `\"${manager_path}\" snapshot ${vm_name} take ${snapshot_name}`,
        (err, output) => {
          if (err) {
            console.error("could not execute command: ", err);
          }
          return res.json(err);
        }
      );
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
