import { exec } from "child_process";
import { promisify } from "util";

const exec_async = promisify(exec);

export { exec_async };
