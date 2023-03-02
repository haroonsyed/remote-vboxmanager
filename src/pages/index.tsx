import { LoginScreen } from "@/components/LoginScreen";
import { get_virtual_machines } from "@/fetch/get_virtual_machines";
import { useFetch } from "@/hooks/useFetch";

export default function Home() {
  const { isLoading, data: virtual_machines } = useFetch(
    get_virtual_machines,
    []
  );

  console.log(virtual_machines);

  return (
    <>
      <h1>Welcome to Sshawarma's Remote VBOXManager</h1>
    </>
  );
}
