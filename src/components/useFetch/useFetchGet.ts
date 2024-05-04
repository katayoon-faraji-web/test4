import axios from "axios";
import { useState, useEffect } from "react";
interface Props {
    url?: string;
  }
function useFetchGet({url}:Props){
  const [data, setData] = useState<any>(null);
  
    axios.get(url).then((response) => {
      setData(response)
      console.log(response.status, response.data.token);
    });
  return data;
};

export default useFetchGet;