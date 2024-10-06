import React from 'react'
import './Dashboard.css'
import Navbar from '../Components/Navbar';

import r1 from '../assets/r1.png';
import r2 from '../assets/r2.png';
import r3 from '../assets/r3.png';


const Dashboard = () => {
    <Navbar />
    return (
        <div className="dashboard">
            <div className="content">
                <h1>Hi, Parent</h1>
                <h2>Your Childs, total history appear here</h2>
            </div>

            <div className="tables">
                <div className="food">
                    <table>
                        <tr>
                            <th>Take Food</th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td></td>
                            <td className='bold'>Breakfast</td>
                            <td className='bold'>Lunch</td>
                        </tr>
                        <tr>
                            <td className='bold'>30 Sep 2024</td>
                            <td className='green'>Complete</td>
                            <td className='green'>Complete</td>
                        </tr>
                        <tr>
                            <td className='bold'>1 Oct 2024</td>
                            <td className='green'>Complete</td>
                            <td className='green'>Complete</td>
                        </tr>
                        <tr>
                            <td className='bold'>2 Oct 2024</td>
                            <td className='green'>Complete</td>
                            <td className='green'>Complete</td>
                        </tr>
                        <tr>
                            <td className='bold'>3 Oct 2024</td>
                            <td className='green'>Complete</td>
                            <td className='green'>Complete</td>
                        </tr>
                    </table>
                </div>


                <div className="food">
                    <table>
                        <tr>
                            <th>Take nap</th>
                            <th></th>
                            <th></th>
                        </tr>
                        <tr>
                            <td></td>
                            <td className='bold'>Total nap time</td>
                            <td className='bold'></td>
                        </tr>
                        <tr>
                            <td className='bold'>30 Sep 2024</td>
                            <td className='green'>01 hr</td>
                        </tr>
                        <tr>
                            <td className='bold'>1 Oct 2024</td>
                            <td className='green'>01 hr 30 mins</td>
                        </tr>
                        <tr>
                            <td className='bold'>2 Oct 2024</td>
                            <td className='green'>02 hrs</td>
                        </tr>
                        <tr>
                            <td className='bold'>3 Oct 2024</td>
                            <td className='green'>03 hrs</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;