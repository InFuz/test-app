import React, { PureComponent } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import { Input } from 'antd';

import PlacemarkTable from './PlacemarkTable';
import PlacemarkList from './PlacemarkList';
import MyPlacemark from './MyPlacemark';
import MyPolyline from './MyPolyline';
import './App.css';

let myMap = null;
const mapState = { center: [55.76, 37.64], zoom: 10 };

export default class App extends PureComponent {
  state = {
    newPlacemarksName: '',
    placemarks: [
      {
        name: 'Это метка',
        coordinates: [55.751574, 37.573856],
      },
      {
        name: 'Это метка',
        coordinates: [55.741574, 37.583856],
      },
    ],
  };

  addPlacemark = () => {
    const { newPlacemarksName } = this.state;
    if (newPlacemarksName) {
      this.setState(prevState => ({
        placemarks: [...prevState.placemarks, {
          name: newPlacemarksName ,
          coordinates: myMap.getCenter(),
        }],
      }));
    }
  };

  removePlacemark = (index) => {
    this.setState(prevState => ({
      placemarks: prevState.placemarks.filter((placemark, i) => (i !== index ? placemark : undefined))
    }));
  };

  onChangeNewPlacemarksName = (e) => {
    this.setState({ newPlacemarksName: e.target.value });
  };

  handleOnDragEnd = (e, index) => {
    const position = myMap.options.get('projection').fromGlobalPixels(
      myMap.converter.pageToGlobal(e.get('position')), myMap.getZoom()
    );
    this.setState(prevState => ({
      placemarks: prevState.placemarks.map((placemark, i) => {
        if (i === index ){
          placemark.coordinates = position;
        }
        return placemark;
      })
    }));
  };
  
  render() {
    const { placemarks } = this.state;
    return (
      <div className="app">
        <Input
          placeholder="Введите название точки"
          onChange={this.onChangeNewPlacemarksName}
          onPressEnter={() => this.addPlacemark()}
        />
        <YMaps>
          <Map instanceRef={(map) => {myMap = map}} state={mapState}>
            <MyPlacemark
              placemarks={placemarks}
              handleOnDragEnd={this.handleOnDragEnd}
            />
            <MyPolyline placemarks={placemarks} />
          </Map>
        </YMaps>
        <PlacemarkList
          placemarks={placemarks}
          removePlacemark={this.removePlacemark}
        />
        <PlacemarkTable placemarks={placemarks} />
      </div>
    );
  }
}
