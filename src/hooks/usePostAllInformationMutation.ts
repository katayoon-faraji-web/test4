import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'axios'


interface propsType{
   address:string
   agency_type:string
   agent_code:string
   city_code:string
   county:string
   first_name:string
   last_name:string
   insurance_branch:string
   phone:string
   phone_number:string
   province:string
   Name:string
}
export const usePostAllInformationToSignup = () => {
  const fetcher = async (info:propsType) => {
    const { data } = await axios.post('https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/check_agency_code/', info)
    return data
  }

  const mutate  = useMutation({
    mutationKey: ['postAllInformation'],
    mutationFn: fetcher,
    onSuccess: (data) => {
      toast.success(data.message)
    },
   
  })

  return mutate 
}
