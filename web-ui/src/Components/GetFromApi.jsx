import { useState, useEffect } from 'react'
const axios = require('axios').default

export async function getFixedAssets(url){
  const response = await axios.get(url)
  return response.data
}

export default function getFromApi(url){
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getFromUrl() {
      try {
        const {data} = await axios.get(url);
        setApiData(data);
      } catch (apiError) {
        setError(apiError);
      }
    }
    getFromUrl()
  }, []);
  return {apiData, error }
};
