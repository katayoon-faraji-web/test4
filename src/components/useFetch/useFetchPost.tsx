import axios from "axios";
// import { useAuth } from "../../context/context";
interface Props<T> {
    Url?:string;
    bodyPost?:string;
  } 


function useFetchPost<T>({Url,bodyPost}:Props<T>){
  console.log(Url,bodyPost);
  // const user = useAuth();
    axios({
      method: 'post',
      url: Url,
      data: {
        phone_number:bodyPost,
      },
      headers :{'Content-Type':'application/json'}
    })
      .then(function (response) {
        console.log(response);

        // user.handleSetUserPhone(bodyPost)

        return response;
      });
  

};

export default useFetchPost;