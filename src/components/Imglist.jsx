import * as React from 'react';
import { imglist } from '../assets';
import './Imglist.css';
import Titles from './Titles';
import NText from './NText';

export default function Imglist(){

    return(
    <>
     
        
        <div className="img">
        <div className="key">
            <Titles  TText='Key Features'/>
            <NText TText='Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae voluptas minima, illo consequuntur sunt temporibus reprehenderit porro. Quae, fugit dolorum.'/> 
        </div> 
            <img src={imglist}/></div>


    </>
    )



}