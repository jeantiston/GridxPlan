import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faEdit, faComment } from '@fortawesome/free-solid-svg-icons'

import styles from '../styles/postbar.module.css'

const PostBar = ({ children, editSection, setEditSection }) => {

    const isActive = (currentPath) => {

        if( editSection && currentPath === 'edit' ){
            return [styles.menuText, styles.active].join(" ")
        } 
        else if ( !editSection && currentPath === 'preview' ){
            return [styles.menuText, styles.active].join(" ")
        }
        else {
            return styles.menuText
        }

        
    }

    
    return (
        
        <div>
            <div className={styles.flex}>
                <div><p>Save</p></div>
                <div><FontAwesomeIcon icon={faTrash} size="lg" /></div>
            </div>
            
            { children }

            <div className={styles.flexBottom} >
                <div className={styles.menuItem} onClick={() => setEditSection(true)} >
                    <FontAwesomeIcon icon={faEdit} size="lg" className={ isActive("edit") } />
                    <sub className={ isActive("edit") }>edit</sub>
                </div>

                <div className={styles.menuItem} onClick={() => setEditSection(false)} >
                    <FontAwesomeIcon icon={faComment} size="lg" className={ isActive("preview") } />
                    <sub className={ isActive("preview") }>comments</sub>
                </div>
            </div>
        </div>

        
    )
}

export default PostBar