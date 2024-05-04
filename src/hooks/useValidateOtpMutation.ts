import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'axios'


interface propsType{
    code:string
    phone_number:string
}
export const useValidateOtp = () => {
  const fetcher = async (otp:propsType) => {
    const { data } = await axios.post('https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/validate_otp/', otp)
    return data
  }

  const mutate  = useMutation({
    mutationKey: ['postCode'],
    mutationFn: fetcher,
    onSuccess: (data) => {
      toast.success(data.message)
    },
   
  })

  return mutate 
}
