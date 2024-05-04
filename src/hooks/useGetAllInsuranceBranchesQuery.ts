import { useMutation, useQuery } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'axios'
import errorHandler from './errorHandler'
import { useAppSelector } from './reduxHooks'
import { queryClient } from '../main'



interface propsType{
    province:number
}
export const useGetAllInsuranceBranches = (province:number) => {
  const userInformation = useAppSelector((state) => state.userInfo)
  // alert(`${province}`);

  const fetcher = async () => {
    const { data } = await axios.get(`https://stage-api.sanaap.co/api/v2/app/selection_item/insurance_branch/wop_list/?name=73&insurance=DEY&province=8`)
    return data.response
  }

  const query  = useQuery({
    queryKey: ['getInsuranceBranches'],
    queryFn: fetcher,
    
  })

  return query; 
}
