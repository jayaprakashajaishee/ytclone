import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetchData: (
  config: any
) => [
  any,
  boolean,
  any,
  React.Dispatch<React.SetStateAction<any>>,
  React.Dispatch<React.SetStateAction<any>>,
  React.Dispatch<React.SetStateAction<any>>
] = (config) => {
  const [data, setData] = useState();
  const [error, setError] = useState();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    axios
      .request(config)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, [config]);

  return [data, loading, error, setData, setLoading, setError];
};

export default useFetchData;
