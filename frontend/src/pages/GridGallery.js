// import React, {useState, useCallback} from 'react'
import { useSelector } from 'react-redux'
import { moveCard, selectGrid } from '../reducers/gridSlice'
import { DndProvider, TouchTransition, MouseTransition } from 'react-dnd-multi-backend'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
// import update from 'immutability-helper'

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

    const images = useSelector(selectGrid)

    // const [images, setImages] = useState([
    //     {
    //         id: 1,
    //         url: "https://picsum.photos/id/1/300"
    //     },
    //     {
    //         id: 2,
    //         url: "https://picsum.photos/id/2/300"
    //     },
    //     {
    //         id: 3,
    //         url: "https://picsum.photos/id/3/300"
    //     },
    //     {
    //         id: 4,
    //         url: "https://picsum.photos/id/4/300"
    //     },
    //     {
    //         id: 5,
    //         url: "https://picsum.photos/id/5/300"
    //     },
    //     {
    //         id: 6,
    //         url: "https://picsum.photos/id/6/300"
    //     },
    //     {
    //         id: 7,
    //         url: "https://picsum.photos/id/7/300"
    //     },
    // ]);

    // const moveCard = useCallback((dragIndex, hoverIndex) => {
    //     const dragCard = images[dragIndex];
    //     setImages(update(images, {
    //         $splice: [
    //             [dragIndex, 1],
    //             [hoverIndex, 0, dragCard],
    //         ],
    //     }));
    // }, [images]);

    const renderCard = (image, index) => {
        return (
                <GridImage key={image.id} index={index} id={image.id} moveCard={moveCard} />
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