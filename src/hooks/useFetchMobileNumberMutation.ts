import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from 'axios'

interface phoneNumberType{
    phone_number:string
}
export const useFetchMobileNumber = () => {
  const fetcher = async (phoneNumber: phoneNumberType) => {
    const { data } = await axios.post('https://stage-api.sanaap.co/api/v2/app/DEY/agent/verification/signup/create_otp/', phoneNumber)
    return data
  }
  const mutate  = useMutation({
    mutationKey: ['postPhoneNumber'],
    mutationFn: fetcher,
    onSuccess: (data) => {
      toast.success(data.message)
    },
    
  })

  return mutate 
}
