import { get_snapshots_virtual_machine } from "@/fetch/get_snapshots_virtual_machine";
import { restore_snapshot_virtual_machine } from "@/fetch/restore_snapshot_virtual_machine";
import { useFetch } from "@/hooks/useFetch";
import React from "react";
import Modal from "./Modal";
import SnapshotAdder from "./SnapshotAdder";

type props = {
  vm_name: string;
  isHidden: boolean;
  statusRefreshCount: number;
};

const Snapshots: React.FC<props> = (props) => {
  const { vm_name, isHidden, statusRefreshCount } = props;
  const [alert, setAlert] = React.useState<string>("");
  const { isLoading, data: snapshots } = useFetch(
    get_snapshots_virtual_machine(vm_name),
    [statusRefreshCount]
  );

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
    setAlert(
      `Snapshot ${snapshot_name} for ${vm_name.toUpperCase()} restored!`
    );
  };

  console.log(snapshots);

  return (
    <>
      <div className="snapshots-container ml-5 bg-slate-600 items-center text-white font-semibold">
        {Array.isArray(snapshots) &&
          snapshots.map((snapshot, index) => (
            <div className="snapshot-container" key={snapshot}>
              <div className="snapshot flex items-center h-12 w-full ">
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
            </div>
          ))}
        <SnapshotAdder vm_name={vm_name} />
      </div>
      <Modal text={alert} />
    </>
  );
};

export default Snapshots;
