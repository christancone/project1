import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import BasicButtons from './BasicButtons';
import "./NavBar.css";
import { logo } from '../assets';


export default function NavBar() {
    
    return (
      
      <>
      
      <img className='logo' src={logo}/>
      
        <div className='navbar'>
            
            <Stack spacing={2} direction="row">
            <BasicButtons hovercolor = "#858383" bgcolor = '#FFFFFF' name = "Home" fontcolor="black"/>
            <BasicButtons hovercolor = "#858383" bgcolor = '#FFFFFF' name = "About" fontcolor= "black"/>
            <BasicButtons hovercolor = "#858383" bgcolor = '#FFFFFF' name = "Contact" fontcolor = "black"/>
            <BasicButtons hovercolor = "#858383" bgcolor = '#6A41AE' name = "Sign In"/>
            </Stack>
            <hr className='hr1'/>
        </div>

       
      </>
    );
  }