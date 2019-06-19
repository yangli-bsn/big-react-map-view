import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

import {fromJS} from 'immutable';

import { SVGOverlay, BaseControl, Marker } from 'react-map-gl';
import MapStyle from 'data/style.json';
import { dataLayer } from 'data/dataLayer';

import CustomMarker from './CustomMarker';
import Cluster from './Cluster';

import CountryFilter from 'util/CountryFilter';
import FilterGeoByCountry from 'util/FilterGeoByCountry';
import worldMap from 'data/custom.geo.json';
import CalculateBounds from 'util/CalculateBounds';

import data from 'data';

import 'mapbox-gl/dist/mapbox-gl.css';
import './MapView.css';

class MapView extends Component<{}, State> {

  constructor() {
    super();

    let viewport = CalculateBounds(data); 

    let countries = data.map((point, index) => {
      return point.country;
    });
    let countryGeo = FilterGeoByCountry(countries);
    console.log(countryGeo);

    let mapStyle = fromJS(MapStyle);

    mapStyle = mapStyle
    .setIn(['sources', 'countries'], fromJS({type: 'geojson', data: countryGeo}))
    // Add point layer to map
    .set('layers', mapStyle.get('layers').push(dataLayer));

    this.state = {
      mapStyle: mapStyle,
      viewport: viewport,
      countries: []
    };

    this.mapboxAccessToken = 'pk.eyJ1IjoieWFuZ2xpLWJzbiIsImEiOiJjangwdmxpbHkwMTd2NDRubzhvNHdxZW04In0.bQ2IgPrUd89S71Y5aeYWGQ';
    this.updateCountries = this.updateCountries.bind(this);

    /*let points = data.map((point, index) => {
      return {longitude: point.position.lng, latitude: point.position.lat};
    });
    CountryFilter(points, this.updateCountries);*/
  }

  componentDidMount() {
    //this.setState({viewport: this.calculateViewport()});
  }

  updateCountries(countries) {
    this.setState({countries: countries});
    console.log(countries);
  }

  render() {
    let map = this.state.map;
    let points = data.map((point, index) => {
      return {longitude: point.position.lng, latitude: point.position.lat};
    });

    return (
      <ReactMapGL
        mapStyle={this.state.mapStyle}
        mapboxApiAccessToken={this.mapboxAccessToken}
        ref={ref => (this.mapRef = ref)}
        onLoad={() => this.setState({ map: this.mapRef.getMap() })}
        onViewportChange={(viewport) => this.setState({viewport})}
        {...this.state.viewport}
      >
        {map && (
          <Cluster
            map={map}
            radius={20}
            extent={512}
            nodeSize={40}
            element={clusterProps => (
              <div style={{backgroundColor: 'white', height: '20px', width: '20px'}} />
            )}
          >
            {/* every item should has a 
            uniqe key other wise cluster will not rerender on change */}
            { points.map((point, i) => (
              <Marker
                key={i}
                longitude={point.longitude}
                latitude={point.latitude}
              >
                <div style={{backgroundColor: 'black', height: '20px', width: '20px'}} />
              </Marker>
            ))}
          </Cluster>
        )}
      </ReactMapGL>
    );
  }
}

export default MapView;