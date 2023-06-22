import React from "react";
import { Box } from "@mui/material";
import {FaTwitter, FaLinkedin, FaFacebook, FaGithub, FaPhone, FaTelegram} from 'react-icons/fa'


const Footer= () => {
    return(
        <>
            <Box sx={{bgcolor: "rgba(0,0,0,.7)", height:"60px", display: 'flex', justifyContent: "content", alignItem: "center"}}>
               <Box sx= {{color: "#fafafa"}}>
                    <>
                        <h3>Designed By Ketsebaot Ertumo</h3>
                        <a href="https://www.linkedin.com/in/ketsebaot-ertumo-133346245"><FaLinkedin /></a>
                        <a href="https://m.facebook.com/Ketsebaot-Ertumo-Erdako"><FaFacebook /></a>
                        <a href="https://github.com/Ketsebaot-Ertumo"><FaGithub /></a>
                        <a href="https://t.me/Ketsi_E.E"><FaTelegram /></a>
                    </>
                </Box> 
            </Box>

        </>
    );
}
export default Footer;





   


