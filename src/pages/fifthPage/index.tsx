
import { Box ,Typography,Button} from "@mui/material";
import {prefixer} from 'stylis';
import {CacheProvider} from '@emotion/react';
import createCache from '@emotion/cache';
import rtlPlugin from 'stylis-plugin-rtl';
import { useAppSelector } from "../../hooks/reduxHooks";
import { useNavigate } from "react-router";

const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
  
const FifthPage = () =>{
    const navigate = useNavigate()
    const windowWidthInfo = useAppSelector((state) => state.windowWidth.value)
    const goToFirstPage = () =>{
        navigate('/')
        
    }

    return(
        <Box sx={{width:"100%",height:'100vh',display:'flex',justifyContent:'center',alignItems:"center",position:'absolute',top:'0',left:"0",background:"transparent",overflow:'hidden',backgroundColor:'#E6E6E6'}}>
            <Box sx={{width:'100%',height:"250px",background:"white",padding:"10px",marginTop:"100px",borderRadius:"20px",display:'flex',flexWrap:'wrap',justifyContent:'center',alignContent:"start" ,position:'absolute',bottom:"0",zIndex:'200'}}>
            <CacheProvider value={cacheRtl}>
                <div dir="rtl">
                    <Box sx={{width:"100%",height:'200px',display:'flex',flexWrap:'wrap',justifyContent:"start",padding:'10px'}}>
                        <Typography  className="row" sx={{fontFamily:"font1",fontWeight:'400',width:'100%',fontSize:windowWidthInfo<=900?'20px':'25px',textAlign:'start',display:'flex',justifyContent:'start'}}>نمایند محترم : </Typography>
                        <Typography  className="row" sx={{fontFamily:"font1",fontWeight:'300',width:'100%',fontSize:windowWidthInfo<=900?'18px':'20px',marginTop:'10px',textAlign:'start',display:'flex',justifyContent:'start'}}>درخواست ثبت نام شما در حال بررسی است، در صورت تایید اطلاعات، اپلیکیشن مورد نظر فعال خواهد شد .</Typography>                    
                        <Box sx={{width:"100%",display:'flex',justifyContent:'center',marginY:'20px'}}>
                            <Button onClick={goToFirstPage} variant="contained" sx={{background:'#008e9c' ,width:'100%',borderRadius:"10px",fontFamily:'font1' ,fontSize:'20px'}}>ورود با حساب کاربری دیگر</Button>
                        </Box>  
                    </Box>
                </div>
            </CacheProvider>
                
            </Box>
        </Box>
    )
}
export default FifthPage;