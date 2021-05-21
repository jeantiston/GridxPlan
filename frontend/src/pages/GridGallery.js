import React, { useEffect } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { selectGrid, fetchPosts } from '../reducers/gridSlice'
import { fetchAccounts, selectAccountsStatus, selectCurrentAccount } from '../reducers/accountsSlice'

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

    const gridStatus = useSelector(state => state.grid.status)
    const accountsStatus = useSelector(selectAccountsStatus)
    const currentAccount = useSelector(selectCurrentAccount)

    useEffect(() => {
        if (accountsStatus === 'idle') {
            dispatch(fetchAccounts())
        }
    }, [accountsStatus, dispatch])

    useEffect(() => {
        if (gridStatus === 'idle' && accountsStatus === 'succeeded' && currentAccount) {
            dispatch(fetchPosts(currentAccount.username))
        }
    }, [currentAccount, accountsStatus, dispatch]) 

    const images = useSelector(selectGrid)
    const renderCard = (image, index) => {
        return (
                <GridImage key={image.postId} index={index} id={image.postId} url={image.image} />
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