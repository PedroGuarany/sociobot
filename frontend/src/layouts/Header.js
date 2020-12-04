import React from 'react'
import img from '../img/robot.jpg'
import '../App.css'
import '../../node_modules/bootstrap/dist/css/bootstrap.css'


function Header() {
    return (
        <header>
            <img className="profile-image" src={img} alt="._."></img>
            <p>CareBot</p>
        </header>
    )
}

export default Header