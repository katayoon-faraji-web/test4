import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'axios'

export const usePostAgencyCode = () => {
  const fetcher = async (agencyCode:string) => {
    const { data } = await axios.post('https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/check_agency_code/', {agent_code:agencyCode.toString()})
    return data
  }

  const mutate  = useMutation({
    mutationKey: ['postAgencyCode'],
    mutationFn: fetcher,
    // onSuccess: (data) => {
    //   toast.success(data.message)
    // },

  })

  return mutate 
}
