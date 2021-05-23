import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt, faTag, faFileImage, faHashtag, faShareAlt, faCog } from '@fortawesome/free-solid-svg-icons'

import ImageUpload from './ImageUpload'
import styles from '../styles/bottommenu.module.css'

const BottomMenu = () => {
    const menuMap = [
        {
            'name': 'planner',
            'path': '/',
            'icon': faCalendarAlt
        },
        // {   'name': 'status',
        //     'path': '/',
        //     'icon': faTag
        // },
        // {   'name': 'add image',
        //     'path': '/add',
        //     'icon': faFileImage
        // },
        // {   'name': 'hashtags',
        //     'path': '/hashtags',
        //     'icon': faHashtag
        // },
        {   'name': 'share',
            'path': '/share',
            'icon': faShareAlt
        },
        {
            'name': 'settings',
            'path': '/settings',
            'icon': faCog
        }
    ]

    const location = useLocation()

    const isActive = (path) => {
        if (path === location.pathname) {
            return styles.active
        }
    }

    const menuItems = menuMap.map( item => {
            return (
                <NavLink exact to={item.path} activeClassName={styles.active} key={item.name}>
                    <div className={styles.menuItem} >
                        <FontAwesomeIcon icon={item.icon} size="2x" className={ [styles.icon, isActive(item.path)].join(" ") } />
                        <sub className={[styles.menuText, isActive(item.path)].join(" ")}>{ item.name }</sub>
                    </div>
                </NavLink>
            )
        })

    return (
        <div className={styles.wrapper}>
            <div className={styles.flex}>
                <ImageUpload />
                { menuItems }
            </div>
        </div>
    )
}

export default BottomMenu