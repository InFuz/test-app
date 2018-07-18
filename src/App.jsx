import React, { PureComponent } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
import Input from 'antd/lib/input';
import uniqueId from 'lodash/uniqueId';
import cn from 'classnames';

import PlacemarkTable from './PlacemarkTable';
import MyPlacemark from './MyPlacemark';
import MyPolyline from './MyPolyline';
import './App.css';

const mapState = { center: [54.3098716, 48.3797855], zoom: 14 };

export default class App extends PureComponent {
  state = {
    myMap: null,
    mapWidth: document.documentElement.clientWidth - 250,
    mapHeight: document.documentElement.clientHeight,
    newPlacemarksName: '',
    placemarks: [],
  };

  updateDimensions = () => {
    this.setState({
      mapWidth: document.documentElement.clientWidth - 250,
      mapHeight: document.documentElement.clientHeight,
    });
  }

  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  addPlacemark = () => {
    const { newPlacemarksName } = this.state;
    if (newPlacemarksName) {
      this.setState(prevState => ({
        placemarks: [...prevState.placemarks, {
          id: uniqueId(),
          name: newPlacemarksName ,
          coordinates: prevState.myMap.getCenter(),
        }],
        newPlacemarksName: '',
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
    const position = this.state.myMap.options.get('projection').fromGlobalPixels(
      this.state.myMap.converter.pageToGlobal(e.get('position')), this.state.myMap.getZoom()
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

  updatePlacemarksOrder = (state) => {
    this.setState({ placemarks: state });
  };
  
  render() {
    const leftBlockClass = cn({
      'none': !this.state.myMap,
    });
    const {
      placemarks,
      mapWidth,
      mapHeight,
      newPlacemarksName,
    } = this.state;
    return (
      <div className="app">
        <div className={leftBlockClass}>
          <Input
            placeholder="Введите название новой точки"
            value={newPlacemarksName}
            onChange={this.onChangeNewPlacemarksName}
            onPressEnter={this.addPlacemark}
          />
          <PlacemarkTable
            placemarks={placemarks}
            updatePlacemarksOrder={this.updatePlacemarksOrder}
            removePlacemark={this.removePlacemark}
          />
        </div> 
        <YMaps>
          <Map
            instanceRef={(map) => {this.setState({ myMap: map });}}
            state={mapState}
            width={mapWidth}
            height={mapHeight}
          >
            <MyPlacemark
              placemarks={placemarks}
              handleOnDragEnd={this.handleOnDragEnd}
            />
            <MyPolyline placemarks={placemarks} />
          </Map>
        </YMaps>
      </div>
    );
  }
}
