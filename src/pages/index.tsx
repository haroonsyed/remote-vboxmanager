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
