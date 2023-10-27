import { Box} from "@mui/material";
import React, { useState } from "react";
import SidebarAdm from './Sidebar';
import Top from './HeaderTop'
import Profile from "../../pages/Profile";



const Layout= (Component) => ({...props}) => {

    // const [showSidebar, setShowSidebar] = useState(true);
    // const handleToggleSidebar = (value) => {
    //   setShowSidebar(value);
    // };

    return(
        <>
            {/* <Profile /> */}
            <div style={{display:'flex', minHeight: "100vh"}}>
                {/* <SidebarAdm showSidebar={showSidebar} /> */}
                <SidebarAdm />
                <Box sx={{width: "100%", bgcolor: "#fafafa"}}>
                    {/* <Top toggleSidebar={handleToggleSidebar} showSidebar={showSidebar} /> */}
                    {/* <Top /> */}
                    <Box sx={{p:3}}>
                        <Component {...props} />
                    </Box>
                </Box>
            </div>
                
        </>       
    );
}

export default Layout