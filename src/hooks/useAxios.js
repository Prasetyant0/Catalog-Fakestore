import { useState, useEffect, useCallback } from 'react';

const useAxios = (axiosInstance, config) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Stringify config object to create a stable dependency for useCallback/useEffect
  const stringifiedConfig = JSON.stringify(config);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Parse the stringified config back to an object for the request
      const requestConfig = JSON.parse(stringifiedConfig);
      const response = await axiosInstance.request(requestConfig);
      setData(response.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [axiosInstance, stringifiedConfig]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = () => {
    fetchData();
  };

  return { data, error, loading, refetch };
};

export default useAxios;
