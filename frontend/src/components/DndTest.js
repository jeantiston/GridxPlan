import React from 'react'
import { DndProvider, useDrag } from 'react-dnd'
import { ItemTypes } from '../utils/items'
import { HTML5Backend } from 'react-dnd-html5-backend'

const DndTest = () => {

    const[{extraProps}, drag] = useDrag({
        item: {
            type: ItemTypes.CARD
        }
    })

    return(
        <div>
            <h1>Dnd Test</h1>
            <DndProvider backend={HTML5Backend}  >
                

            </DndProvider>
        </div>
    )
}

export default DndTest;