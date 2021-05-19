import React, { useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { moveCell, selectGrid } from '../reducers/gridSlice'
import { useDrag, useDrop } from 'react-dnd'
import { Link } from 'react-router-dom'

import ITEM_TYPE from '../data/types'
import styles from '../styles/gridgallery.module.css'

const GridImage = ({ id, url, index }) => {
    const ref = useRef(null)
    const dispatch = useDispatch();
    const grid = useSelector(selectGrid)
    let posts = [...grid]

    
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

            // Time to actually perform the action
            const dragCard = posts[dragIndex]

            posts.splice(dragIndex, 1)
            posts.splice(hoverIndex, 0, dragCard)

            dispatch(moveCell(posts))
            
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
                    <img className={styles.gridCell} src={url} alt="random picsum" />
            </Link>
        </div>
    )
}

export default GridImage