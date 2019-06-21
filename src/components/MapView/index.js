import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';

import { Marker, NavigationControl, FlyToInterpolator } from 'react-map-gl';

import Cluster from 'components/Cluster';

import SingleControllerMarker from 'components/Markers/SingleControllerMarker';
import MultipleControllerMarker from 'components/Markers/MultipleControllerMarker';

import CountryFilter from 'util/CountryFilter';
import FilterGeoByCountry from 'util/FilterGeoByCountry';
import CalculateBounds from 'util/CalculateBounds';

import data from 'data/ControllerData';

import 'mapbox-gl/dist/mapbox-gl.css';
import './MapView.css';

class MapView extends Component<{}, State> {

  constructor() {
    super();

    // Get viewport of existing controller points
    let viewport = CalculateBounds(data); 

    // Determine which country to color
    let countries = data.map((point, index) => {
      return point.country;
    });
    let mapStyle = FilterGeoByCountry(countries);

    this.state = {
      mapStyle: mapStyle,
      viewport: viewport,
      countries: []
    };

    this.mapboxAccessToken = 'pk.eyJ1IjoieWFuZ2xpLWJzbiIsImEiOiJjangwdmxpbHkwMTd2NDRubzhvNHdxZW04In0.bQ2IgPrUd89S71Y5aeYWGQ';
    this.updateCountries = this.updateCountries.bind(this);
    this.changeViewport = this.changeViewport.bind(this);

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
  }

  changeViewport(viewport) {
    let newViewport = this.state.viewport;
    Object.assign(newViewport, viewport);

    // Flyto animation
    newViewport.transitionDuration = 500;
    newViewport.transitionInterpolator = new FlyToInterpolator();

    this.setState({viewport: newViewport});
  }

  render() {
    let map = this.state.map;

    return (
      <ReactMapGL
        mapStyle={this.state.mapStyle}
        mapboxApiAccessToken={this.mapboxAccessToken}
        ref={ref => (this.mapRef = ref)}
        onLoad={() => this.setState({ map: this.mapRef.getMap() })}
        onViewportChange={(viewport) => this.setState({viewport})}
        {...this.state.viewport}
      >
        {/* Map Zoom Control */}
        <div style={{position: 'absolute', right: '2vw', bottom: '6vh'}}>
          <NavigationControl showCompass={false} />
        </div>

        {/* Controllers and multiple controllers aggregation */}
        {map && (
          <Cluster
            map={map}
            radius={20}
            extent={512}
            nodeSize={40}
            element={clusterProps => (
              <MultipleControllerMarker clusterData={clusterProps}
                                        clusterChildren={clusterProps.data}
                                        controllerData={data}
                                        changeViewport={this.changeViewport} />
            )}
          >
            {/* every item should has a 
            uniqe key other wise cluster will not rerender on change */}
            { data.map((controller, i) => (
              <Marker
                key={i}
                longitude={controller.position.lng}
                latitude={controller.position.lat}
                data={controller}
              >
                <SingleControllerMarker data={controller} />
              </Marker>
            ))}
          </Cluster>
        )}

      </ReactMapGL>
    );
  }
}

export default MapView;