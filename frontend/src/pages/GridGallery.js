import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { moveCard, selectGrid, fetchPosts } from '../reducers/gridSlice'
import { DndProvider, TouchTransition, MouseTransition } from 'react-dnd-multi-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'

import GridImage from '../components/GridImage'
import styles from '../styles/gridgallery.module.css'

const GridGallery = () => {

    const HTML5toTouch = {
        backends: [
        {
            id: 'html5',
            backend: HTML5Backend,
            transition: MouseTransition,
            preview: true,
        },
        {
            id: 'touch',
            backend: TouchBackend,
            options: {enableMouseEvents: true},
            preview: true,
            transition: TouchTransition,
        },
        ],
    }

    const dispatch = useDispatch()

    const images = useSelector(selectGrid)

    const gridStatus = useSelector(state => state.grid.status)

    useEffect(() => {
        if (gridStatus === 'idle') {
            // console.log("he1y")

            dispatch(fetchPosts())
        }
    }, [gridStatus, dispatch])

    const renderCard = (image, index) => {
        console.log(images)
        console.log("render")
        return (
                <GridImage key={image.id} index={index} id={image.postId} url={image.image} moveCard={moveCard} />
            );
    };

    return (
        <DndProvider options={HTML5toTouch} >
            <div className={styles.grid}>
                { images.map((card, i) => renderCard(card, i)) }
            </div>
        </DndProvider>
    )
}

export default GridGallery