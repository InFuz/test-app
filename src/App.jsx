import React, { PureComponent } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { Input, List, Icon } from 'antd';

import './App.css';

let myMap = null;
const mapState = { center: [55.76, 37.64], zoom: 10 };

class App extends PureComponent {
  state = {
    newPlacemarksName: '',
    placemarks: [
      {
        name: 'Это метка',
        coordinates: [55.751574, 37.573856],
      },
    ],
  };

  addPlacemark = () => {
    this.setState(prevState => ({
      placemarks: [...prevState.placemarks, {
        name: this.state.newPlacemarksName,
        coordinates: myMap.getCenter(),
      }],
    }));
  };

  removePlacemark = (index) => {
    this.setState(prevState => ({
      placemarks: prevState.placemarks.filter((placemark, i) => (i !== index ? placemark : undefined))
    }));
  };

  onChangePlacemarksName = (e) => {
    this.setState({ newPlacemarksName: e.target.value });
  };
  
  MyMap = (placemarks) => (
    <Map instanceRef={(map) => {myMap = map}} state={mapState}>
      {placemarks.map((placemark, i) => (
        <Placemark
          key={`${placemark.name}-${i}`}
          geometry={{coordinates: placemark.coordinates}}
          properties={{balloonContent: placemark.name}}
          options={{draggable: true,}}
        />
      ))}
    </Map>
  );
//TODO обновление координат точки при перетаскивании, соединение линией
  render() {
    return (
      <div className="App">
        <Input
          placeholder="Введите название точки"
          onChange={this.onChangePlacemarksName}
          onPressEnter={() => this.addPlacemark()}
        />
        <YMaps onApiAvaliable={(ymaps) => null}>
          {this.MyMap(this.state.placemarks)}
        </YMaps>
        <List
          size="small"
          bordered
          dataSource={this.state.placemarks}
          renderItem={(item, i) => (
            <List.Item>
              {i}{item.name}<Icon onClick={() => this.removePlacemark(i)} type="close-circle" />
            </List.Item>
          )}
        />
      </div>
    );
  }
}

export default App;