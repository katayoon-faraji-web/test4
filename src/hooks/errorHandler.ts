import { AxiosError } from 'axios'
import { toast } from 'react-hot-toast'

interface ErrorResponse {
  errors?: { [key: string]: string[] }
}

 const toastErrorHandler = (err: AxiosError<ErrorResponse> | unknown) => {
  const errorObject = (err as AxiosError<ErrorResponse>)?.response?.data?.errors

  if (errorObject) {
    for (const field in errorObject) {
      if (errorObject.hasOwnProperty(field)) {
        const errors = errorObject[field]
        errors.forEach((error: string) => {
          toast.error(error)
        })
      }
    }
  }
}
export default toastErrorHandler;