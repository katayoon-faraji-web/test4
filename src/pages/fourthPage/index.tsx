import { Box ,Button, TextField ,Autocomplete,Typography,Paper,FormHelperText,} from "@mui/material"
import  { useState } from 'react';
import { useFormik  ,FormikErrors} from 'formik';
import { useAppSelector ,useAppDispatch } from "../../hooks/reduxHooks";
import { useAllProvinces } from "../../hooks/useAllProvinceQuery";
import { usePostAgencyCode } from "../../hooks/usePostAgencyCodeMutation";
import { useNavigate } from "react-router";
import { setAgencyType, setInsuranceBranch, setPhone, setProvinceName } from "../../redux/reducers/userInforSlice";
import { setProvinceId } from "../../redux/reducers/userInforSlice";
import { useGetCities } from "../../hooks/useGetCitiesQuery";
import { setCityName } from "../../redux/reducers/userInforSlice";
import { setCityCode } from "../../redux/reducers/userInforSlice";
import { useEffect } from "react";
import { useGetAllInsuranceBranches } from "../../hooks/useGetAllInsuranceBranchesQuery";
import { setAddress } from "../../redux/reducers/userInforSlice";
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { setWindowWidth } from "../../redux/reducers/windowReducer";
import { setAgentCode } from "../../redux/reducers/userInforSlice";
import { setAgentName } from "../../redux/reducers/userInforSlice";
import { usePostAllInformationToSignup } from "../../hooks/usePostAllInformationMutation";

const cacheRtl = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
});


interface FormValues {
    agency_code:string,
    county:string,
    address:string,
    province:string,
    province_id:number,
    insurance_branch:string,
    city_code:string,
    phone:string,
    agency_type:string,
    Name?:string,
}


const FourthPage = () =>{
    const userInformation = useAppSelector((state) => state.userInfo)
    const windowWidthInfo = useAppSelector((state) => state.windowWidth.value)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [selectedProvince,selectedProvinceSet] = useState<newProvinceType>({id:0,name:''})
    const [selectedCity,selectedCitySet] = useState<{name:string,fanavaran_code:number}>({fanavaran_code:0,name:''})
    const [selectedInsuranceBranch,selectedInsuranceBranchSet] = useState<{name:string}>({name:''})
   
    const { data: AllProvinces, isLoading: proviceIsLoadign ,isSuccess:provinceIsSuccess } = useAllProvinces()
    let { data: AllCities, isLoading: cityIsLoadign ,isSuccess:cityIsSuccess ,refetch:refetchAllCities } = useGetCities((selectedProvince.id))
    let { data: AllInsuranceBranches ,isSuccess:insuranceIsSuccess,refetch:refetchAllInsuranceBranches } = useGetAllInsuranceBranches((selectedProvince.id))
    let { mutate:postAgencyCode,isSuccess:agencyCodeIsSuccess,isPending:agentCodePending  } = usePostAgencyCode()
    let { mutate:postAllInformation,isSuccess:AllInformationIsSuccess } = usePostAllInformationToSignup()

    const [errorMessageAgencyCode,errorMessageAgencyCodeSet] = useState<string>('')
    const [errorMessageProvince,errorMessageProvinceSet] = useState<string>('')
    const [errorMessageCounty,errorMessageCountySet] = useState<string>('')
    const [errorMessageAddress,errorMessageAddressSet] = useState<string>('')
    const [errorMessageInsuranceBranch,errorMessageInsuranceBranchSet] = useState<string>('')
    const [errorMessageCityCode,errorMessageCityCodeSet] = useState<string>('')
    const [errorMessagePhone,errorMessagePhoneSet] = useState<string>('')
    const [errorMessageAgencyType,errorMessageAgencyTypeSet] = useState<string>('')
    const [errorMessageName,errorMessageNameSet] = useState<string>('')
    
    let w = window.innerWidth
    window.addEventListener('resize',()=>{
        w = window.innerWidth
        dispatch(setWindowWidth(w))
        console.log(w);
    })

    interface provinceType{
        id:number,
        name:string,
        is_active?:boolean,
        code?:string,
        name_split?:string
    }

    interface newProvinceType{
        id?:number,
        name:string,
    }

    const allProvinces:newProvinceType[] = []
    if(provinceIsSuccess){
        AllProvinces.map((val:provinceType)=>{
            allProvinces.push({id:val.id,name:val.name}) 
        })
    }
    
    const initialValues:FormValues = {
        agency_code: '',
        county:'',
        address:'',
        province:'',
        province_id:0,
        insurance_branch:'',
        city_code:'',
        phone:'',
        agency_type:'',
        Name:'',
    };

    const validate =( values:FormValues) => {
        const errors:FormikErrors<FormValues> = {};
        if (!values.agency_code) {
            errorMessageAgencyCodeSet('وارد کردن کد نمایندگی الزامی است')
        } else if (!/([0-9])/g.test(values.agency_code) ) {
            errorMessageAgencyCodeSet("کد نمایندگی باید فقط شامل عدد باشد")
        }
        else{ 
            errorMessageAgencyCodeSet('')
        }
        if (!values.address) {
            errorMessageAddressSet('وارد کردن آدرس الزامی است')
        } 
        else if (!/([ا-ی])/g.test(values.address) ) {
            errorMessageAddressSet(" ادرس باید به فارسی وارد شود")
        }
        else{
            errorMessageAddressSet('')
        }
        
        if (!values.city_code) {
            errorMessageCityCodeSet("کد تلفن ثابت")
        } 
        else if(!/([0-9])/g.test(values.city_code) || values.city_code.length>3){
            errorMessageCityCodeSet(" 3 کاراکتر عددی")
        }
        else{
            errorMessageCityCodeSet('')
        }
        if (!values.phone) {
            errorMessagePhoneSet('وارد کردن تلفن ثابت الزامی است')
        } 
        else if(!/([0-9])/g.test(values.phone) || values.phone.length>7){
            errorMessagePhoneSet(" تلفن ثابت باید شامل 7 کارکتر عددی باشد")
        }
        else{
            errorMessagePhoneSet('')
        }
        if (!values.Name && values.agency_type=='legal') {
            errorMessageNameSet('وارد کردن  نام نمایندگی الزامی است')
        } 
        else if (!/([ا-ی])/g.test(values.Name) && values.agency_type=='legal' ) {
            errorMessageAddressSet("نام نمایندگی به فارسی وارد شود.")
        }
        else{
            errorMessageNameSet('')
        }
        return errors;
    };
    

    const onSubmit = (values:FormValues):void => {
        event?.preventDefault()
        dispatch(setAgentCode(values.agency_code))
        dispatch(setAddress(values.address))
        dispatch(setPhone(values.phone))
        dispatch(setCityCode(values.city_code))
        dispatch(setAgentName(values?.Name))
        if(!userInformation.province_id){
            errorMessageProvinceSet(' انتخاب کردن استان الزامی است')
        }else{
            errorMessageProvinceSet('')
        }
        if(!userInformation.county){
            errorMessageCountySet(' انتخاب کردن شهرالزامی است')
        }else{
            errorMessageCountySet('')
        }
        if(!userInformation.insurance_branch){
            errorMessageInsuranceBranchSet(' انتخاب کردن شعبه بیمه الزامی است')
        }else{
            errorMessageInsuranceBranchSet('')
        }
        if(!userInformation.agency_type){
            errorMessageAgencyTypeSet(' انتخاب کردن نوع نمایندگی الزامی است')
        }else{
            errorMessageAgencyTypeSet('')
        }
        if(userInformation.agency_type=='legal' && !userInformation.Name){
            errorMessageNameSet(' وارد کردن نام نمایندگی الزامی است')
        }else{
            errorMessageNameSet('')
        }
        if(userInformation.province_id && userInformation.county && userInformation.insurance_branch && userInformation.agency_type){
            if(userInformation.agency_type=='legal' ){
                if( userInformation.Name!=''){
                    postAllInformation({
                        address:userInformation.address,
                        agency_type:userInformation.agency_type,
                        agent_code:userInformation.agent_code,
                        city_code:userInformation.city_code,
                        county:userInformation.county,
                        first_name:userInformation.first_name,
                        last_name:userInformation.last_name,
                        insurance_branch:userInformation.insurance_branch,
                        phone:userInformation.phone,
                        phone_number:userInformation.phone_number,
                        province:userInformation.province_id,
                        Name:userInformation.Name,
                    })
                }

            }else{
                postAllInformation({
                    address:userInformation.address,
                    agency_type:userInformation.agency_type,
                    agent_code:userInformation.agent_code,
                    city_code:userInformation.city_code,
                    county:userInformation.county,
                    first_name:userInformation.first_name,
                    last_name:userInformation.last_name,
                    insurance_branch:userInformation.insurance_branch,
                    phone:userInformation.phone,
                    phone_number:userInformation.phone_number,
                    province:userInformation.province_id,
                    Name:userInformation.Name,
                })

            }
               
        }
        
    };

    const formik = useFormik(
        {
          initialValues,
          validate,
          onSubmit
    });

    const provinceHandleChange = (value: newProvinceType): void => {
        selectedProvinceSet(value)
        refetchAllCities()
        refetchAllInsuranceBranches()
    }

    const cityHandleChange = (value: {name:string,fanavaran_code:number}): void => {
        selectedCitySet(value)
    }

    const check_agent_code = () =>{
        postAgencyCode(formik.values.agency_code)
        if(!agentCodePending){
            if(agencyCodeIsSuccess==false && formik.values.agency_code){
                errorMessageAgencyCodeSet('کد نمایندگی قبلا ثبت شده است')
            }else{
                errorMessageAgencyCodeSet('')
                dispatch(setAgentCode(formik.values.agency_code))
            }
        }
    }
    useEffect(()=>{
        if(agencyCodeIsSuccess==false && formik.values.agency_code
        ){
            errorMessageAgencyCodeSet('کد نمایندگی قبلا ثبت شده است')
        }else{
            errorMessageAgencyCodeSet('')
            dispatch(setAgentCode(formik.values.agency_code))
        }
    },[agencyCodeIsSuccess])

    useEffect(()=>{
        console.log(selectedProvince);
        dispatch(setProvinceId((selectedProvince.id)))
        dispatch(setProvinceName(selectedProvince.name))
        refetchAllCities()
        refetchAllInsuranceBranches()
        
    },[selectedProvince])

    useEffect(()=>{
        console.log(selectedCity);
        dispatch(setCityName(selectedCity.name))
    },[selectedCity])

    useEffect(()=>{
        dispatch(setInsuranceBranch(selectedInsuranceBranch.name))
    },[selectedInsuranceBranch])
    useEffect(()=>{
        if(AllInformationIsSuccess){
            navigate('/code-verification/user-personal-information-form/user-others-information-form/user-signup-successfully')
        }
    },[AllInformationIsSuccess])


      
    return(
        <Box sx={{width:"100%",height:'170vh',display:'flex',justifyContent:'center',alignItems:"center",position:'absolute',top:'0',left:"0",background:"#E6E6E6"}}>
            <Box sx={{width:windowWidthInfo<=900?"90%":'40%',height:"fit",background:"white",padding:"10px",borderRadius:"20px",display:'flex',flexWrap:'wrap',justifyContent:'center',alignContent:"start",position:'absolute',zIndex:"200"}}>
                <form dir="rtl" onSubmit={formik.handleSubmit} className="w-[60%] flex flex-wrap justify-center content-center">
                <CacheProvider value={cacheRtl}>
                    <div dir="rtl">
                    <TextField
                        id="agency-code-textfield"
                        name="agency_code"
                        error={!!errorMessageAgencyCode} 
                        helperText={errorMessageAgencyCode} 
                        InputProps={{style:{fontFamily:'font1' ,fontSize:'20px'}}} 
                        FormHelperTextProps={{style:{fontFamily:'font1',fontSize:"15px"}}} InputLabelProps={{style: {fontSize: 20,fontFamily:'font1',color:'#676767'}}} label= 'کد نمایندگی' sx={{width:windowWidthInfo<=900?'300px':'400px',fontFamily:"font1",marginTop:"50px" ,fontSize:'20px',color:'#676767'}}
                        type="text"
                        spellCheck={false}
                        onChange={formik.handleChange}
                        value={formik.values.agency_code}
                        onBlur={(e)=>{check_agent_code()}}
                    />
                  
                    <FormControl error={!errorMessageProvince}>
                            <Autocomplete
                              ListboxProps={{style:{direction:'rtl',display:'flex',flexWrap:'wrap',justifyContent:'start'}}}
                              value={selectedProvince}
                              onChange={(_, value) => provinceHandleChange(value)}
                              options={allProvinces}
                              autoComplete={true}
                              getOptionLabel={(option) => option?.name ?? ''}
                              noOptionsText="موردی یافت نشد" 
                              sx={{
                                  
                                  width: windowWidthInfo <= 900 ? '300px' : '400px',
                                  fontFamily: "font1",
                                  marginTop: "15px",
                                  fontSize: '20px',
                                  color:'#676767',
                                  direction: 'rtl' // This line sets the direction to RTL
                              }}
                              renderInput={(params) => (
                                  <TextField
                                      {...params} 
                                      label="استان" 
                                      InputLabelProps={{ style: { fontSize: 20, fontFamily: 'font1', color: '#676767' } }} 
                                      InputProps={{ ...params.InputProps, style: { fontFamily: "font1",direction:'rtl' ,color:"#676767",fontSize:'20px'} }} 
                                  />
                              )}
                              PaperComponent={(props) => (
                                  <Paper
                                    sx={{
                                      ">*": {
                                          width:'100%',
                                          display:"flex",
                                          flexWrap:"wrap",
                                          justifyContent:"center",
                                          direction:'rtl',
                                          fontFamily:'font1',
                                          textAlign:'end',
                                          color:"#676767",
                                          ">*":{
                                              width:'100%',
                                              display:"flex",
                                              justifyContent:"end",
                                          }
                                      },
      
                                    }}
                                    {...props}
                                  />
                                )}
                               
                            />
                            <FormHelperText
                                sx={{
                                color: "#d32f2f",
                                fontFamily:'font1',
                                fontSize:"14px"
                                }}
                            >
                                {errorMessageProvince}
                            </FormHelperText>
                        </FormControl>
                        <FormControl error={!errorMessageCounty}>
                            <Autocomplete
                            ListboxProps={{style:{direction:'rtl',display:'flex',flexWrap:'wrap',justifyContent:'start'}}}
                            value={selectedCity}
                            onChange={(_,value) => cityHandleChange(value)}
                            loading={cityIsLoadign || proviceIsLoadign}
                            loadingText="لطفا صبر کنید ..."
                            options={cityIsSuccess && AllCities || []}
                            getOptionLabel={(option) => option?. name ?? ''}
                            noOptionsText="موردی یافت نشد"
                            sx={{
                                width: windowWidthInfo <= 900 ? '300px' : '400px',
                                fontFamily: "font1",
                                marginTop: "15px",
                                fontSize: '20px',
                                direction: 'rtl', 
                                color:"#676767"
                            }}
                            disabled={userInformation.province? false : true}
                            renderInput={(params) => (
                                <TextField
                                    {...params} 
                                    label="شهر" 
                                    InputLabelProps={{ style: { fontSize: 20, fontFamily: 'font1', color: '#676767' } }} 
                                    InputProps={{ ...params.InputProps, style: { fontFamily: "font1",direction:'rtl',color:"#676767",fontSize:'20px'} }} 
                                />
                            )}
                            PaperComponent={(props) => (
                                <Paper
                                sx={{
                                
                                    ">*": {
                                        width:'100%',
                                        display:"flex",
                                        flexWrap:"wrap",
                                        justifyContent:"center",
                                        direction:'rtl',
                                        fontFamily:'font1',
                                        textAlign:'end',
                                        color:'#676767',
                                        ">*":{
                                            width:'100%',
                                            display:"flex",
                                            justifyContent:"end",
                                        }
                                    },
                                

                                }}
                                {...props}
                                />
                            )}
                            style={{ direction: "rtl" }}                     
                             />
                            
                            <FormHelperText
                                sx={{
                                color: "#d32f2f",
                                fontFamily:'font1',
                                fontSize:"14px"
                                }}
                            >
                                {errorMessageCounty}
                            </FormHelperText>
                        </FormControl>
  
                    <TextField
                        
                        id="address-multiline"
                        label="آدرس"
                        name="address"
                        multiline
                        rows={7}
                        InputProps={{style:{fontFamily:'font1' ,fontSize:'20px'}}}
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        variant="outlined"
                        FormHelperTextProps={{style:{fontFamily:'font1',fontSize:"15px"}}} 
                        InputLabelProps={{style: {fontSize: 20,fontFamily:'font1',color:'#676767'}}}  
                        sx={{width:windowWidthInfo<=900?'300px':'400px',fontFamily:"font1",marginTop:"15px" ,fontSize:'20px',color:'#676767',fontSize:'20px'}}
                        error={!!errorMessageAddress} 
                        helperText={errorMessageAddress}  

                    />
                     <FormControl error={!errorMessageInsuranceBranch}>
                        <Autocomplete
                            ListboxProps={{style:{direction:'rtl',display:'flex',flexWrap:'wrap',justifyContent:'start'}}}

                            value={selectedInsuranceBranch}
                            onChange={(_,value) => selectedInsuranceBranchSet(value)}
                            options={insuranceIsSuccess && AllInsuranceBranches || []}
                            getOptionLabel={(option) => option?. name ?? ''}
                            noOptionsText="موردی یافت نشد"
                            sx={{
                            
                                width: windowWidthInfo <= 900 ? '300px' : '400px',
                                fontFamily: "font1",
                                marginTop: "15px",
                                fontSize: '20px',
                                direction: 'rtl', 
                                color:'#676767'
                            }}
                            disabled={userInformation.province? false : true}
                            renderInput={(params) => (
                                <TextField
                                    {...params} 
                                    label="شعبه بیمه" 
                                    InputLabelProps={{ style: { fontSize: 20, fontFamily: 'font1', color: '#676767' } }} 
                                    InputProps={{ ...params.InputProps, style: { fontFamily: "font1",direction:'rtl',color:'#676767',fontSize:'20px' } }} 
                                />
                            )}
                            PaperComponent={(props) => (
                                <Paper
                                sx={{
                                
                                    ">*": {
                                        width:'100%',
                                        display:"flex",
                                        flexWrap:"wrap",
                                        justifyContent:"center",
                                        direction:'rtl',
                                        fontFamily:'font1',
                                        textAlign:'end',
                                        color:'#676767',
                                        ">*":{
                                            width:'100%',
                                            display:"flex",
                                            justifyContent:"end",
                                        }
                                    },

                                }}
                                {...props}
                                />
                            )}
                            style={{ direction: "rtl" }}                   
                             />
                            
                            <FormHelperText
                                sx={{
                                color: "#d32f2f",
                                fontFamily:'font1',
                                fontSize:"14px"
                                }}
                            >
                                {errorMessageInsuranceBranch}
                            </FormHelperText>
                        </FormControl>
                   
                    <Box sx={{width:'100%',display:"flex",justifyContent:'space-between'}}>
                        <TextField
                            InputProps={{style:{fontFamily:'font1' ,fontSize:'20px'}}}
                            id="phone-textfield"
                            label="تلفن ثابت"
                            name="phone"
                            error={!!errorMessagePhone} 
                            helperText={errorMessagePhone}  
                            FormHelperTextProps={{style:{fontFamily:'font1',fontSize:"15px"}}} InputLabelProps={{style: {fontSize: 20,fontFamily:'font1',color:'#676767'}}}  sx={{width:windowWidthInfo<=900?'70%':'75%',fontFamily:"font1",marginTop:"15px" ,fontSize:'20px',color:'#676767'}}                        
                            type="text"
                            spellCheck={false}
                            onChange={formik.handleChange}
                            value={formik.values.phone}

                        />
                        <TextField
                            InputProps={{style:{fontFamily:'font1' ,fontSize:'20px'}}}
                            id="city-code-textfield"
                            label="تلفن ثابت"
                            name="city_code"
                            error={!!errorMessageCityCode} 
                            helperText={errorMessageCityCode} 
                            FormHelperTextProps={{style:{fontFamily:'font1',fontSize:"15px"}}} InputLabelProps={{style: {fontSize: 15,fontFamily:'font1',color:'#676767'}}}  sx={{width:windowWidthInfo<=900?'25%':'20%',fontFamily:"font1",marginTop:"15px" ,fontSize:'20px',color:'#676767'}}                        
                            type="text"
                            spellCheck={false}
                            onChange={formik.handleChange}
                            value={formik.values.city_code}
                        />
                    </Box>
                    <Box sx={{width:"100%",display:'flex',justifyContent:'center',marginTop:'20px',marginRight:'10px'}}>
                        <FormControl sx={{display:'flex' ,width:'100%'}}>
                            <FormLabel id="demo-radio-buttons-group-label" sx={{fontFamily:'font1',fontSize:'20px',width:'100px',color:"#676767"}}>نوع نمایندگی :</FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-radio-buttons-group-label"
                                defaultValue="real"
                                name="radio-buttons-group"
                                sx={{display:'flex' ,width:'250px',justifyItems:'end' ,fontFamily:'font1'}}
                                onChange={(e)=>{dispatch(setAgencyType(e.target.value))}}
                            >
                                <FormControlLabel sx={{width:"100px",fontFamily:'font1'}} label={<Typography sx={{fontFamily:'font1',fontSize:"18px",color:'#676767'}}>حقیقی</Typography>} value="real" control={<Radio sx={{color:'grey','&$checked': {color: '#4B8DF8' }}} />} />
                                <FormControlLabel sx={{width:"100px",fontFamily:'font1'}} label={<Typography sx={{fontFamily:'font1',fontSize:"18px",color:'#676767'}}>حقوقی</Typography>} value="legal" control={<Radio sx={{color:'blgreyack','&$checked': {color: '#4B8DF8' }}} />} />
                            </RadioGroup>
                        </FormControl>
                        
                    </Box> 
                    <TextField
                            InputProps={{style:{fontFamily:'font1' ,fontSize:'20px'}}}
                            id="agency-name-textfield"
                            label="نام نمایندگی"
                            name="Name"
                            error={!!errorMessageName} 
                            helperText={errorMessageName}  
                            FormHelperTextProps={{style:{fontFamily:'font1',fontSize:"15px"}}} InputLabelProps={{style: {fontSize: 20,fontFamily:'font1',color:'#676767'}}}  sx={{width:windowWidthInfo<=900?'300px':'400px',fontFamily:"font1",marginTop:"15px" ,fontSize:'20px',color:'#676767',transition:".5s",display:userInformation.agency_type=='legal'?'flex':'none'}}
                            type="text"
                            spellCheck={false}
                            onChange={formik.handleChange}
                            value={formik.values.Name}
                        />
                    </div>
                  </CacheProvider>
                    
                    <Box sx={{width:"100%",display:'flex',justifyContent:'center',marginY:'20px'}}>
                        <Button type="submit" variant="contained" sx={{background:'#008e9c' ,width:'100%',borderRadius:"10px",fontFamily:'font1' ,fontSize:'20px'}}>ثبت نام</Button>
                    </Box>               
                </form>
            </Box>
        </Box>

        
    )
}
export default FourthPage;



  


