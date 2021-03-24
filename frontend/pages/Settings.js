import React from 'react'
import { useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPowerOff } from '@fortawesome/free-solid-svg-icons'

import styles from '../styles/settings.module.css'

const Settings = () => {
    const { register, handleSubmit, errors } = useForm();
    const onSubmit = data => console.log(data);
    console.log(errors);

    return (
        <div className={styles.settings}>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.editPost}>
            {/* <h1>Settings</h1> */}
                <div className={styles.form}>
                    <div className={styles.list}>
                        <h2> Team </h2>
                        <p>jack (jack@socialmedia.agency)</p>
                        <p>molly (molly@socialmedia.agecy)</p>
                        <p>mike (mike@socialmedia.agency)</p>
                    </div>
                    <input type="email" placeholder="email" name="teammate" ref={register} />
                </div>

                <div className={styles.form}>
                    <div className={styles.list}>
                        <h2> Accounts </h2>
                        <p>@prettypatio</p>
                        <p>@flyingfiesta</p>
                        <p>@excitingemu</p>
                    </div>
                    <input type="text" placeholder="instagram username" name="account" ref={register} />
                </div>
            </form>
            <div className={styles.logoutButton}>
                <FontAwesomeIcon icon={faPowerOff} size="2x" />
                <sub className={styles.sub}>logout</sub>
            </div>
        </div>
    )
}

export default Settings