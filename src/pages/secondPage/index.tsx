import { Box ,Typography,Button} from "@mui/material"
import { useState } from 'react';
import OTPInp from "../../components/otpInp/otpInp";
import { useNavigate } from "react-router";
import { useAppSelector ,useAppDispatch } from "../../hooks/reduxHooks";
import { useValidateOtp } from "../../hooks/useValidateOtpMutation";
import { setWindowWidth } from "../../redux/reducers/windowReducer";
import Timer from "../../components/timer/timer";

const SecondPage = () =>{
    const userInformation = useAppSelector((state) => state.userInfo)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { mutate ,isSuccess } = useValidateOtp()
    const windowWidthInfo = useAppSelector((state) => state.windowWidth.value)
    let w = window.innerWidth
    window.addEventListener('resize',()=>{
        w = window.innerWidth
        dispatch(setWindowWidth(w))
        console.log(w);
    })
   
    const goToThirdPage = () =>{
        const otp = {
            phone_number : userInformation.phone_number,  
            code : '55555'
        }
        mutate(otp)
        if(isSuccess ){
            navigate('/code-verification/user-personal-information-form')
        }
        else{
            
        }
    }

    return(
        <Box sx={{width:"100%",height:'100vh',display:'flex',justifyContent:'center',alignItems:"center",position:'absolute',top:'0',left:"0",background:"#E6E6E6"}}>
            <Box sx={{width:windowWidthInfo<=900?"90%":'40%',height:"60%",background:"white",padding:"10px",marginTop:"100px",borderRadius:"20px",display:'flex',flexWrap:'wrap',justifyContent:'center',alignContent:"start",position:'absolute',zIndex:'200'}}>
                <Typography  className="row" sx={{fontFamily:"font1",fontWeight:'600',width:'100%',fontSize:windowWidthInfo<=900?'20px':'25px'}}>کد تایید را وارد نمایید</Typography>
                <Typography  className="row" sx={{fontFamily:"font1",fontWeight:'300',width:'100%',fontSize:windowWidthInfo<=900?'18px':'20px',marginTop:'10px'}}>{userInformation.phone_number}</Typography>
                <OTPInp/>
                <Box sx={{width:"100%",display:'flex',justifyContent:'center',marginTop:'50px'}}>
                <Timer/>
                </Box>
                <Box sx={{width:"100%",display:'flex',justifyContent:'center',marginTop:'50px'}}>
                    <Button onClick={goToThirdPage} variant="contained" sx={{background:'#008e9c' ,width:windowWidthInfo<=900?"300px":'400px',borderRadius:"10px",fontFamily:'font1' ,fontSize:'20px'}}>ادامه</Button>
                </Box>
            </Box>
        </Box>
    )
}
export default SecondPage;


