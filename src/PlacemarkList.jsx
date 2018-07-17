import React from 'react';
import { List, Icon } from 'antd';

export default function MyPolyline({placemarks, removePlacemark}) {
  const listItem = (p, i) => (
    <List.Item>
      {p.name}
      <Icon
        onClick={() => removePlacemark(i)}
        type="close-circle"
      />
    </List.Item>
  );
  return (
    <List
      size="small"
      bordered
      dataSource={placemarks}
      renderItem={(p, i) => listItem(p, i)}
    />
  );
}
