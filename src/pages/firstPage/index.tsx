import { Box,Typography ,TextField,Button} from "@mui/material";
import React, { FC, useEffect} from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useFetchMobileNumber } from "../../hooks/useFetchMobileNumberMutation";
import { useAppSelector ,useAppDispatch } from "../../hooks/reduxHooks";
import { setUserPhoneNumber } from "../../redux/reducers/userInforSlice";
import { setWindowWidth } from "../../redux/reducers/windowReducer";

const FirstPage:FC = ():React.ReactNode =>{

    const navigate = useNavigate()
    const [errorMessagePost, setErrorMessagePost] = useState('')
    const [phoneNumber , phoneNumberValSet] = useState<string>('')
    const { mutate,isSuccess } = useFetchMobileNumber()
    const userInformation = useAppSelector((state) => state.userInfo)
    const windowWidthInfo = useAppSelector((state) => state.windowWidth.value)
    const dispatch = useAppDispatch()

    let w = window.innerWidth
    window.addEventListener('resize',()=>{
        w = window.innerWidth
        dispatch(setWindowWidth(w))
        console.log(w);
    })

    const phoneSubmit = () =>{
        if((phoneNumber.search(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/))>=0){
            setErrorMessagePost("")
            mutate({phone_number:phoneNumber})
            if(isSuccess){
                dispatch(setUserPhoneNumber(phoneNumber))
            }
        }
        else {
            return setErrorMessagePost('لطفا شماره موبایل خود را به درستی وارد نمایید')
          }
    }
    if(isSuccess){
        
        dispatch(setUserPhoneNumber(phoneNumber))
        navigate('/code-verification')
    }
    useEffect(()=>{
        console.log(userInformation);
        
    },[userInformation])
 
    return(
        <Box sx={{width:"100%",height:'100vh',display:'flex',justifyContent:'center',alignItems:"center",position:'absolute',top:'0',left:"0",background:"#E6E6E6"}}>
                <Box sx={{width:windowWidthInfo<=900?"80%":'40%',height:"60%",background:"white",padding:"20px",marginTop:"100px",borderRadius:"20px",display:'flex',flexWrap:'wrap',justifyContent:'center',alignContent:"start",position:'absolute',zIndex:'200'}}>
                    <Typography  className="row" sx={{fontFamily:"font1",fontWeight:'600',width:'100%',fontSize:windowWidthInfo<=900?'20px':'25px'}}>شماره موبایل خود را وارد نمایید</Typography>
                    <Typography  className="row" sx={{fontFamily:"font1",fontWeight:'300',width:'100%',fontSize:windowWidthInfo<=900?'18px':'20px',marginTop:'10px'}}>کد تایید برای شما ارسال خواهد شد</Typography>
                    <TextField  error={!!errorMessagePost} helperText={errorMessagePost} FormHelperTextProps={{style:{fontFamily:'font1',fontSize:"15px"}}} InputLabelProps={{style: {fontSize: 20,fontFamily:'font1',color:'textsecondary'}}} value={phoneNumber} onChange={(e) => phoneNumberValSet(e.target.value)} label= 'تلفن همراه' sx={{width:windowWidthInfo<=900?'300px':'400px',fontFamily:"font1",marginTop:"50px" ,fontSize:'20px'}}   />
                    <Box sx={{width:"100%",display:'flex',justifyContent:'center',marginTop:'50px'}}>
                        <Button onClick={phoneSubmit} variant="contained" sx={{background:'#008e9c' ,width:windowWidthInfo<=900?"300px":'400px',borderRadius:"10px",fontFamily:'font1' ,fontSize:'20px'}}>ادامه</Button>
                    </Box>
                </Box>
            
        </Box>
    )
}
export default FirstPage;

