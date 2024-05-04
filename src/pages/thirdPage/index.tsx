import { Box ,Button, Stack, TextField,Typography} from "@mui/material"
import React, { useEffect, useState } from 'react';
import Alert from '@mui/material/Alert';
import { useFormik  ,FormikErrors} from 'formik';
import { useAppSelector ,useAppDispatch } from "../../hooks/reduxHooks";
import { setFirstName } from "../../redux/reducers/userInforSlice";
import { setLastName } from "../../redux/reducers/userInforSlice";
import { setWindowWidth } from "../../redux/reducers/windowReducer";
import { useNavigate } from "react-router";
interface FormValues {
    firstname: string
    lastname: string
}
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});

const ThirdPage = () =>{
    const userInformation = useAppSelector((state) => state.userInfo)
    const windowWidthInfo = useAppSelector((state) => state.windowWidth.value)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [errorMessageFirstName,errorMessageFirstNameSet] = useState<string>('')
    const [errorMessageLastName,errorMessageLastNameSet] = useState<string>('')

    let w = window.innerWidth
    window.addEventListener('resize',()=>{
        w = window.innerWidth
        dispatch(setWindowWidth(w))
    })
    
    const initialValues:FormValues = {
        firstname: '',
        lastname: '',
    };

    const validate =( values:FormValues) => {
        const errors:FormikErrors<FormValues> = {};
        if (!values.firstname) {
            errorMessageFirstNameSet('نام خود را وارد کنید')
          } else if (!/([ا-ی])/g.test(values.firstname) || values.firstname.length<3) {
            errorMessageFirstNameSet('نام شما باید به فارسی و شامل حداقل سه کاراکتر باشد')
          }
          else{
            errorMessageFirstNameSet('')
          }
        if (!values.lastname) {
          errorMessageLastNameSet("نام خانوادگی خود را وارد کنید")
        } else if (!/([ا-ی])/g.test(values.lastname) || values.lastname.length<3) {
          errorMessageLastNameSet('نام شما باید به فارسی و شامل حداقل سه کاراکتر باشد')
        }
        else{
            errorMessageLastNameSet('')
          }
        return errors;
    };

    const onSubmit = (values:FormValues):void => {
        event?.preventDefault()
        if(!values.firstname || !values.lastname){
          if(!values.firstname){
            errorMessageFirstNameSet('نام خود را وارد کنید')
          }if(values.lastname){
            errorMessageLastNameSet('نام خانوادگی خود را وارد کنید')
          }
        }
        else{
          dispatch(setFirstName(values.firstname))
          dispatch(setLastName(values.lastname))
          navigate('/code-verification/user-personal-information-form/user-others-information-form')
        }
    };

    const formik = useFormik(
        {
          initialValues,
          validate,
          onSubmit
    });
   
    return(
        <Box sx={{width:"100%",height:'100vh',display:'flex',justifyContent:'center',alignItems:"center",position:'absolute',top:'0',left:"0",background:"#E6E6E6"}}>
            <Box sx={{width:windowWidthInfo<=900?"80%":'40%',height:"60%",background:"white",padding:"10px",marginTop:"100px",borderRadius:"20px",display:'flex',flexWrap:'wrap',justifyContent:'center',alignContent:"start",position:'absolute',zIndex:"200"}}>
            <form onSubmit={formik.handleSubmit} className="w-[60%] flex flex-wrap justify-center content-center">
                  <CacheProvider value={cacheRtl}>
                    <div dir="rtl">
                      <TextField
                        name="firstname"
                        error={!!errorMessageFirstName} 
                        helperText={errorMessageFirstName}  
                        FormHelperTextProps={{style:{fontFamily:'font1',fontSize:"15px"}}} 
                        InputLabelProps={{style: {fontSize: 20,fontFamily:'font1',color:'#676767'}}} 
                        label= 'نام ' 
                        InputProps={{style:{fontFamily:'font1' ,fontSize:'20px'}}}
                        sx={{width:windowWidthInfo<=900?'300px':'400px',fontFamily:"font1",marginTop:"50px" ,fontSize:'20px',color:'#676767'}}
                        type="text"
                        spellCheck={false}
                        onChange={formik.handleChange}
                        value={formik.values.firstname}
                      />
                      <TextField
                        name="lastname"
                        error={!!errorMessageLastName} helperText={errorMessageLastName}
                        FormHelperTextProps={{style:{fontFamily:'font1',fontSize:"15px"}}} 
                        InputLabelProps={{style: {fontSize: 20,fontFamily:'font1',color:'#676767'}}} 
                        label= 'نام خانوادگی '
                        InputProps={{style:{fontFamily:'font1' ,fontSize:'20px'}}}
                        sx={{width:windowWidthInfo<=900?'300px':'400px',fontFamily:"font1",marginTop:"50px" ,fontSize:'20px',color:'#676767'}}
                        type="text"
                        spellCheck={false} 
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                      />
                    </div>
                  </CacheProvider>
                  <Box sx={{width:"100%",display:'flex',justifyContent:'center',marginTop:'50px'}}>
                      <Button type="submit" variant="contained" sx={{background:'#008e9c' ,width:windowWidthInfo<=900?"300px":'400px',borderRadius:"10px",fontFamily:'font1' ,fontSize:'20px'}}>ادامه</Button>
                  </Box>               
                 </form>
            </Box>
        </Box>
    )
}
export default ThirdPage;

const BasicAlerts= ({text}:{text:string}):React.ReactNode => {
    return (
      <Stack sx={{ width: '100%' }} spacing={4}>
        <Alert severity="error">{text}</Alert>
      </Stack>
    );
  }

  


