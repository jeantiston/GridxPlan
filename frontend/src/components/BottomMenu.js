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

    // const currentAccount = useSelector(selectCurrentAccount)
    // const dispatch = useDispatch()

    // const handleChange = (e) => {
    //     // if (e.target.files[0].size < 1024){
    //         console.log(e.target.files[0])
    //         // setImage({image: e.target.files})
    //     // }

    //     let formData = new FormData()
    //     formData.append('image', e.target.files[0])
    //     formData.append('account', currentAccount.username)

    //     fetch('/api/post/add', {
    //         method: 'POST',
    //         body: formData
    //     }).then( response => response.json())
    //     .then( response => {
    //         console.log("response")
    //         console.log(response)
    //         const post = {
    //             image: response.image,
    //             postId: parseInt(response.id)
    //         }
    //         dispatch(addCell(post))

    //     })
    // }
    

    return (
        <div className={styles.wrapper}>
            <div className={styles.flex}>
                {/* <input id="image-upload" type="file" accept="image/*" onChange={handleChange} name="image" />
                <label for="image-upload" >
                    <div className={styles.menuItem} >
                            <FontAwesomeIcon icon={faFileImage} size="2x" className={ styles.icon } />
                            <sub className={styles.menuText}>add image</sub>
                    </div>
                </label> */}

                <ImageUpload />

                { menuItems }
            </div>
        </div>
    )
}

export default BottomMenu