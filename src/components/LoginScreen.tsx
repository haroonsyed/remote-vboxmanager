import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
const LoginScreen = () => {
  const { data: session } = useSession();

  React.useEffect(() => {
    if (!session) {
      signIn();
    }
  }, [session]);

  return <></>;
};

export { LoginScreen as LoginButton };
