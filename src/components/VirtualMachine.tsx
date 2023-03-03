import React from "react";
import { PlayIcon, StopIcon } from "@heroicons/react/24/outline";
import { useFetch } from "@/hooks/useFetch";
import { get_running_virtual_machines } from "@/fetch/get_running_virtual_machines";
import { start_virtual_machine } from "@/fetch/start_virtual_machine";
import { poweroff_virtual_machine } from "@/fetch/poweeroff_virtual_machine";

type props = {
  vm_name: string;
};

const VirtualMachine: React.FC<props> = (props) => {
  const { vm_name } = props;

  const [statusRefreshCount, setStatusRefreshCount] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStatusRefreshCount((prev) => prev + 1);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { isLoading, data: running_virtual_machines } = useFetch(
    get_running_virtual_machines(),
    [statusRefreshCount]
  );

  const isRunning =
    running_virtual_machines && running_virtual_machines.includes(vm_name);

  const handleStartClick = async () => {
    await start_virtual_machine(vm_name)();
  };

  const handleStopClick = async () => {
    poweroff_virtual_machine(vm_name)();
  };

  return (
    <div className="mx-auto h-20 w-full bg-slate-700 mb-5 flex items-center px-5 rounded text-white font-bold font-sans">
      {/* Name */}
      <h3 className="">{vm_name.toUpperCase()}</h3>

      {/* Status */}
      <div className="status-container mx-auto flex items-center">
        <h4 className="pr-2 font-thin">{`Status:`}</h4>
        <div
          className={`status_circle h-5 w-5 ${
            isRunning ? "bg-green-400" : "bg-red-400"
          } rounded-full mt-0.5`}
        />
      </div>

      {/* Stop Button */}
      <StopIcon
        className="fill-red-400 h-10 y-10 px-2 rounded hover:fill-red-300 cursor-pointer"
        onClick={handleStopClick}
      />

      {/* Start Button */}
      <PlayIcon
        className="fill-green-400 h-10 y-10 px-2 rounded hover:fill-green-300 cursor-pointer"
        onClick={handleStartClick}
      />
    </div>
  );
};

export default VirtualMachine;
