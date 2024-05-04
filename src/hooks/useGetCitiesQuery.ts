import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'axios'
import errorHandler from './errorHandler'
import { useAppSelector } from './reduxHooks'
import { queryClient } from '../main'



interface propsType{
    province:number
}
export const useGetCities = (province:number) => {
  const userInformation = useAppSelector((state) => state.userInfo)
  // alert(`${province}`);
  const fetcher = async () => {
    const { data } = await axios.get(`https://stage-api.sanaap.co/base/counties_wop/?province=${province}`)
    return data
  }

  const query  = useQuery({
    queryKey: ['getCitites'],
    queryFn: fetcher,    
  })

  return query; 
}
