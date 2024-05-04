import {Typography} from "@mui/material"
import { useEffect, useState } from 'react';

// const Timer = () =>{
//     const [resendTimeMin,resendTimeMinSet] = useState<string>('01')
//     const [resendTimeSec,resendTimeSecSet] = useState<string>('59')
//     useEffect(()=>{
//         setInterval(()=>{
//             let sec:number =  Number(resendTimeSec)-1;
//             resendTimeSecSet(sec.toString())
//             if (sec < 0){
//                 sec = 59
//                 resendTimeMinSet('00')
//             }
//         },1000)
//     },[resendTimeSec,resendTimeMin])
//     return(
//         <Typography  className="row" sx={{fontFamily:"font1",fontWeight:'300',width:'100%',fontSize:'15px',color:'grey'}}>ارسال مجدد کد {resendTimeMin}:{resendTimeSec}</Typography>

//     )
// }
// export default Timer;



const Timer = () => {
  const [seconds, setSeconds] = useState<number>(59);
  const [minutes, setMinutes] = useState<number>(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 0) {
            if(minutes==0){
                setMinutes(1);
            }else{
                setMinutes(0);
            }
            setSeconds(prevSeconds => prevSeconds +59);
          return 0;
        } 
        else {
          return prevSeconds -1;
        }
      });

    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
        <Typography  className="row" sx={{fontFamily:"font1",fontWeight:'300',width:'100%',fontSize:'15px',color:'grey'}}> 0{minutes}:{seconds} ارسال مجدد کد</Typography>

   
  );
};

export default Timer;
