import React, { PureComponent } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { Input } from 'antd';

import './App.css';

window.mymap = Map;
console.log(Map.geometry);
const mapState = { center: [55.76, 37.64], zoom: 10 };

class App extends PureComponent {
  state = {
    placemarks: [
      {
        name: 'Это метка',
        coordinates: [55.751574, 37.573856],
      },
    ],
  };

  addPlacemark = (name) => {
    this.setState(prevState => ({
      placemarks: [...prevState.placemarks, {
        name: name,
        coordinates: [55.76, 37.64],
      }],
    }));
  };
  
  MyMap = () => (
    <Map state={mapState}>
      {this.state.placemarks.map((placemark, i) => (
        <Placemark
          key={`${placemark.name}-${i}`}
          geometry={{coordinates: placemark.coordinates}}
          properties={{balloonContent: placemark.name}}
          options={{draggable: true,}}
        />
      ))}
    </Map>
  );
  render() {
    return (
      <div className="App">
        <Input
          placeholder="Введите название точки"
          onPressEnter={this.addPlacemark}
        />
        <YMaps>
          {this.MyMap()}
        </YMaps>
      </div>
    );
  }
}

export default App;