import { take_snapshot_virtual_machine } from "@/fetch/take_snapshot_virtual_machine";
import React, { useRef } from "react";
import Modal from "./Modal";

type props = {
  vm_name: string;
};

const SnapshotAdder: React.FC<props> = (props) => {
  const { vm_name } = props;
  const [modalText, setModalText] = React.useState("");
  const snapshotInputRef = useRef<HTMLInputElement | null>(null);

  const handleTakeSnapshotClick = async () => {
    const input = snapshotInputRef.current?.value;
    input && (await take_snapshot_virtual_machine(vm_name, input)());
    input && setModalText(`Successfully took snapshot: ${input}`);
  };

  return (
    <div className="container flex mx-5 w-full h-20 items-center">
      <input
        placeholder="Snapshot Name (no spaces)"
        className="text-gray-800 rounded focus:outline-none h-8 w-64 px-2"
        ref={snapshotInputRef}
      />
      <button
        className="px-5 bg-blue-500 hover:bg-blue-400 h-8 flex rounded ml-auto mr-8 items-center"
        onClick={handleTakeSnapshotClick}
      >
        Take Snapshot
      </button>
      <Modal text={modalText} />
    </div>
  );
};

export default SnapshotAdder;
