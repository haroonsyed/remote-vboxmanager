import { LoginScreen } from "@/components/LoginScreen";
import NavBar from "@/components/NavBar";
import VirtualMachine from "@/components/VirtualMachine";
import { get_virtual_machines } from "@/fetch/get_virtual_machines";
import { useFetch } from "@/hooks/useFetch";

export default function Home() {
  const { isLoading, data: virtual_machines } = useFetch(
    get_virtual_machines(),
    []
  );

  console.log(virtual_machines);

  return (
    <div className="bg-gray-800 flex flex-col min-h-screen">
      <NavBar />
      <div className="vm_container w-11/12 flex items-center mx-auto mt-10">
        {virtual_machines &&
          virtual_machines.map((vm_name) => {
            return <VirtualMachine vm_name={vm_name} key={vm_name} />;
          })}
      </div>
    </div>
  );
}
