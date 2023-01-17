import { AxiosError } from 'axios'
import { showMessage } from 'react-native-flash-message'

export default function axiosErrorHandler(err: AxiosError<any>) {
  let errMsg = ""
  if(err.response)
    errMsg = err.response.data.message
  else 
    errMsg = err.toString()
  
  showMessage({message: errMsg, type: "danger"})
}
