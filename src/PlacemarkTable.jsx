import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const reorder =  (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  
  // change background colour if dragging
  background: isDragging ? 'lightgreen' : 'grey',
  
  // styles we need to apply on draggables
  ...draggableStyle
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : 'lightgrey',
  padding: grid,
  width: 250
});
      
export default function PlacemarkTable({placemarks, updatePlacemarksOrder}) {
  const onDragEnd = (result) => {
    if(!result.destination) {
       return; 
    }
    
    const items = reorder(
      placemarks,
      result.source.index, 
      result.destination.index
    );

    updatePlacemarksOrder(items);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {placemarks.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={item.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <div>
                    <div
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        provided.draggableProps.style,
                        snapshot.isDragging
                      )}
                    >
                      {item.name}
                    </div>
                    {provided.placeholder}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

