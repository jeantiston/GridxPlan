import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDrag, useDrop } from 'react-dnd'
import { Link } from 'react-router-dom'

import ITEM_TYPE from '../data/types'
import styles from '../styles/gridgallery.module.css'

const GridImage = ({ id, index, moveCard }) => {
    const ref = useRef(null)
    const dispatch = useDispatch();
    
    const [{ handlerId }, drop] = useDrop({
        accept: ITEM_TYPE,
        collect(monitor) {
            return {
                handlerId: monitor.getHandlerId()
            };
        },
        hover(item, monitor) {
            if (!ref.current) {
                return;
            }
            const dragIndex = item.index;
            const hoverIndex = index;

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return;
            }
            // Determine rectangle on screen
            const hoverBoundingRect = ref.current?.getBoundingClientRect();
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
            // Determine mouse position
            const clientOffset = monitor.getClientOffset();
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top;
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            // console.log("hoverClientY: ", hoverClientY)
            // console.log("hoverMiddleY: ", hoverMiddleY)
            
            // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            //     return;
            // }
            // Dragging upwards
            // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            //     return;
            // }
            // Time to actually perform the action
            dispatch(moveCard({dragIndex: dragIndex, hoverIndex: hoverIndex}))
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex;
        }
    })

    const [{ isDragging }, drag] = useDrag({
        item: { type: ITEM_TYPE, id, index },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const opacity = isDragging ? 0 : 1
    drag(drop(ref))

    return (
        <div style={{opacity}} ref={ref} data-handler-id={handlerId}>
            <Link to={"/edit/"+ id.toString()}>
                    <img className={styles.gridCell} src={"https://picsum.photos/300?random=" + id.toString()} alt="random picsum" />
            </Link>
        </div>
    )
}

export default GridImage