import './First.css';
import React from 'react';
import MediaCard from './MediaCard';
import MenuAppBar from './MenuAppBar';
import BasicLineChart from './BasicLineChart';
import BasicBars from './BasicBars';


const First = () => {
  return (
    <div> 
      <div><h2 className='heading'>Welcome To Dashboard</h2></div>
      <div className="container">
        <div className="item"><MediaCard /></div>
        <div className="charts">
          <div className="chart-item"><BasicBars /></div>
          <div className="chart-item"><BasicLineChart /></div>
        </div>
      </div>
    </div>
  );
}

export default First;
