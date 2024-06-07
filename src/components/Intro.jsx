import * as React from 'react';
import './Intro.css';
import {Titles,NText} from './';
import { group1 } from '../assets';

export default function Intro(){

    return(

     <>
     
         <div className='t1'>
             <Titles TText="Tiny Toes"/>

             <div className='t2'>
                 <NText />
             </div>
             
             
         </div>
         <img className='group1' src={group1}/>

         
    
     </>
    )
}