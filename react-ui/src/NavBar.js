import React, { useState } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
const NavBar = () => {
    return (
        <React.Fragment>
            <AppBar sx={{ background: "#063970" }}>
                <Toolbar>
                    <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                   React Application
                </Typography>
                
                </Toolbar>
            </AppBar>
        </React.Fragment>
    );
};
export default NavBar;