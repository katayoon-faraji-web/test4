import { Link, Outlet } from "react-router-dom";
import './index.css'
import { Box } from "@mui/material";
import React, { FC, ReactNode } from "react";
interface propsType{
    children:ReactNode
}
const Layout = () =>{

    return(
        <main className="w-full flex flex-wrap justify-center content-start h-fit">
            <Box  sx={{width:"100%",height:"300px",background:"#008e9c",display:"flex",justifyContent:"center",alignItems:"start",borderRadius:' 0 0 40px 40px',position:'relative',top:'0' ,zIndex:'100'}} >
                    <img src="images/Day.png" alt="" />
            </Box>

            {/* {children} */}
            <Outlet/>
        </main>
    )
}
export default Layout;