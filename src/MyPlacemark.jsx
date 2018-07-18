import React from 'react';
import { Placemark } from 'react-yandex-maps';

export default function MyPlacemark({placemarks, handleOnDragEnd}) {
  return (
    <div>
      {placemarks.map((p, i) => (
        <Placemark
          key={p.id}
          geometry={{coordinates: p.coordinates}}
          properties={{
            hintContent: p.name,
            balloonContent: p.name,
          }}
          options={{draggable: true,}}
          onDragEnd={(e) => handleOnDragEnd(e, i)}
        />
    ))}
    </div>
  );
}
