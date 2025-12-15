import { useState } from 'react';
import axios from 'axios';

export default function useAPI() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const callAPI = async (url, method = 'GET', data = null, config = {}) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios({
        url,
        method,
        data, 
        ...config,
      });     
      setLoading(false);
      return response;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return { callAPI, loading, error };
}
