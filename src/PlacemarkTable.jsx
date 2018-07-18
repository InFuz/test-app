import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Icon from 'antd/lib/icon';

const reorder =  (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 8;
const getItemStyle = (draggableStyle, isDragging) => ({
  userSelect: 'none',
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  color: 'white',
  background: isDragging ? '#009ce8' : 'grey',
  
  ...draggableStyle
});
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightgrey' : 'lightgrey',
  padding: grid,
  width: 250
});
      
export default function PlacemarkTable({placemarks, updatePlacemarksOrder, removePlacemark}) {
  const hadleOnDragEnd = (result) => {
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
    <DragDropContext onDragEnd={hadleOnDragEnd}>
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
                      className='item'
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      style={getItemStyle(
                        provided.draggableProps.style,
                        snapshot.isDragging
                      )}
                    >
                      {item.name}
                      <Icon
                        className='item__icon'
                        onClick={() => removePlacemark(index)}
                        type="close-circle"
                      />
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

