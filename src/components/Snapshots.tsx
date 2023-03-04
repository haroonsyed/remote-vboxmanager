import { get_snapshots_virtual_machine } from "@/fetch/get_snapshots_virtual_machine";
import { restore_snapshot_virtual_machine } from "@/fetch/restore_snapshot_virtual_machine";
import { useFetch } from "@/hooks/useFetch";
import React from "react";

type props = {
  vm_name: string;
  isHidden: boolean;
};

const Snapshots: React.FC<props> = (props) => {
  const { vm_name, isHidden } = props;
  const [statusRefreshCount, setStatusRefreshCount] = React.useState(0);
  const { isLoading, data: snapshots } = useFetch(
    get_snapshots_virtual_machine(vm_name),
    [statusRefreshCount]
  );

  React.useEffect(() => {
    const interval = setInterval(() => {
      setStatusRefreshCount((prev) => prev + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  if (isHidden) {
    return <></>;
  }

  const handleDeleteButtonClick = async (snapshot_name: string) => {
    console.log(
      "Deleting snapshot" + snapshot_name + " (not implemented yet)."
    );
  };

  const handleRestoreButtonClick = async (snapshot_name: string) => {
    await restore_snapshot_virtual_machine(vm_name, snapshot_name)();
  };

  return (
    <div className="snapshots-container ml-5 bg-slate-600 items-center  text-white font-semibold">
      {snapshots &&
        snapshots.map((snapshot, index) => (
          <>
            <div
              className="snapshot flex items-center h-12 w-full "
              key={snapshot}
            >
              <div className="h1 ml-5 font-bold">{snapshot}</div>
              <button
                className="ml-auto text-center bg-red-600 hover:bg-red-500 flex rounded px-2 h-7"
                onClick={() => handleDeleteButtonClick(snapshot)}
              >
                Delete Snapshot
              </button>
              <button
                className="mx-3 text-center bg-green-500 hover:bg-green-400 flex rounded px-2 h-7"
                onClick={() => handleRestoreButtonClick(snapshot)}
              >
                Restore Snapshot
              </button>
            </div>
            {index != snapshots.length - 1 && <div className="border" />}
          </>
        ))}
    </div>
  );
};

export default Snapshots;
