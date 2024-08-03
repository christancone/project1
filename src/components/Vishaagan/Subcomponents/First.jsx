import './First.css';
import React from 'react'
import MediaCard from './MediaCard';
import MenuAppBar from './MenuAppBar';
import BasicLineChart from './BasicLineChart';

const First = () => {
  return (
    <div> 
<div ><h2 className='heading'>Welcome To Dashboard</h2></div>
 <MediaCard/>
 <BasicLineChart/>
    </div>
  )
}

export default First