import React from 'react';
import { Polyline } from 'react-yandex-maps';

export default function MyPolyline({placemarks}) {
  const coordinatesArray = placemarks.map((p) => p.coordinates);
  return (
    <Polyline
      geometry={{
        coordinates: coordinatesArray,
      }}
      options={{
        balloonCloseButton: false,
        strokeColor: '#000000',
        strokeWidth: 4,
        strokeOpacity: 0.5,
      }}
    />
  );
}
