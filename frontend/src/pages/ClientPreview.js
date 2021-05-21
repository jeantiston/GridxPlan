import React, { useEffect } from 'react'
import { useParams, Link } from "react-router-dom";

import { useSelector, useDispatch } from 'react-redux'
import { selectGrid, fetchPosts } from '../reducers/gridSlice'
import styles from '../styles/gridgallery.module.css'

const ClientPreview = () => {
    const { username } = useParams()

    const dispatch = useDispatch()
    const gridStatus = useSelector(state => state.grid.status)

    useEffect(() => {
        if (gridStatus === 'idle'){
            dispatch(fetchPosts(username))
        }
    },[gridStatus, dispatch])

    const images = useSelector(selectGrid)
    const renderCard = image => {
        return (
                <Link to={`/preview/${username}/${image.postId}`} >
                    <img key={image.postId} className={styles.gridCell} src={image.image} />
                </Link>
            );
    };

    return (
        <div className={styles.grid}>
            { images.map((card, i) => renderCard(card, i)) }
            <div className={styles.bottomBar} ></div>
        </div>
    )
}

export default ClientPreview