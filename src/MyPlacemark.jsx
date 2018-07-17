import React from 'react';
import { Placemark } from 'react-yandex-maps';

export default function MyPlacemark({placemarks, handleOnDragEnd}) {
  return (
    <div>
      {placemarks.map((p, i) => (
        <Placemark
          key={`${p.name}-${i}`}
          geometry={{coordinates: p.coordinates}}
          properties={{balloonContent: p.name}}
          options={{draggable: true,}}
          onDragEnd={(e) => handleOnDragEnd(e, i)}
        />
    ))}
    </div>
  );
}
