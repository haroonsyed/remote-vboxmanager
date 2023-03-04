import { LoginScreen } from "@/components/LoginScreen";
import NavBar from "@/components/NavBar";
import VirtualMachine from "@/components/VirtualMachine";
import { get_virtual_machines } from "@/fetch/get_virtual_machines";
import { useFetch } from "@/hooks/useFetch";
import React from "react";

export default function Home() {
  const [statusRefreshCount, setStatusRefreshCount] = React.useState(0);
  const { isLoading, data: virtual_machines } = useFetch(
    get_virtual_machines(),
    [statusRefreshCount]
  );

  // Refresh loop
  React.useEffect(() => {
    const interval = setInterval(() => {
      setStatusRefreshCount((prev) => prev + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-800 flex flex-col min-h-screen">
      <NavBar />
      <div className="container w-11/12 items-center mx-auto mt-10">
        {virtual_machines &&
          virtual_machines.map((vm_name) => {
            return (
              <div className="vm_container mb-10" key={vm_name}>
                <VirtualMachine vm_name={vm_name} />
              </div>
            );
          })}
      </div>
    </div>
  );
}
