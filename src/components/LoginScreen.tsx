import React, { PropsWithChildren } from "react";
import { signIn, getSession } from "next-auth/react";
import LoadingScreen from "./LoadingScreen";
const RequireLogin: React.FC<PropsWithChildren> = (props) => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  const attemptLogin = async () => {
    const session = await getSession();
    if (!session) {
      await signIn();
    }
    setIsLoggedIn(true);
  };

  React.useEffect(() => {
    attemptLogin();
  }, []);

  if (isLoggedIn) {
    return <>{props.children}</>;
  } else {
    return <LoadingScreen />;
  }
};

export { RequireLogin as LoginScreen };
