import { useQuery } from '@tanstack/react-query'
import axios from 'axios'


export const useAllProvinces = () => {
  const fetcher = async () => {
    const { data } = await axios.get('https://stage-api.sanaap.co/base/provinces_wop/')
    return data
  }

  const query  = useQuery({
    queryKey: ['getAllProvinces'],
    queryFn: fetcher,
    
  })

  return query 
}
