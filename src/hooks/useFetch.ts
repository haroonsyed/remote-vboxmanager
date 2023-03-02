import React from "react";

const useFetch = <T>(fetch_function: () => Promise<T>, dependencies: any) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [data, setData] = React.useState(null as T);

  React.useEffect(() => {
    fetch_function().then((fetch_data) => {
      setIsLoading(false);
      setData(fetch_data);
    });
  }, [...dependencies]);

  return { isLoading, data };
};

export { useFetch };
