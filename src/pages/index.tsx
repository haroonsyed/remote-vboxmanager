import { LoginScreen } from "@/components/LoginScreen";
import NavBar from "@/components/NavBar";
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
    </div>
  );
}
