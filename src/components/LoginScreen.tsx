import React from "react";
import { signIn, getSession } from "next-auth/react";
const LoginScreen = () => {
  const attemptLogin = async () => {
    const session = await getSession();
    if (!session) {
      await signIn();
    }
  };

  React.useEffect(() => {
    attemptLogin();
  }, []);

  return <></>;
};

export { LoginScreen };
