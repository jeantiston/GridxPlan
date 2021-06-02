import React from 'react';
import logo from '../assets/gridxplanner-logo.svg'

import TopBarStyles from '../styles/topbar.module.css'

const TopBar = () => {
    return (
        <div className={TopBarStyles.flex}>
            <div>
                <img className={TopBarStyles.logo} src={logo} alt="GridXPlanner logo" />
            </div>
        </div>
    )
}

export default TopBar