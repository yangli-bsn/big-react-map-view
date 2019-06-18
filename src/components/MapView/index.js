import React, { Component } from 'react';
import ReactMapGL from 'react-map-gl';
import WebMercatorViewport from 'viewport-mercator-project';

import {SVGOverlay, BaseControl} from 'react-map-gl';

import data from 'data';

import 'mapbox-gl/dist/mapbox-gl.css';
import './MapView.css';

class CustomMarker extends BaseControl {

  _render() {
    const {longitude, latitude} = this.props;

    const [x, y] = this._context.viewport.project([longitude, latitude]);

    const markerStyle = {
      position: 'absolute',
      background: '#fff',
      left: x,
      top: y
    };

    return (
      <div ref={this._containerRef}
        style={markerStyle}>
        ({longitude}, {latitude})
      </div>
    );
  }
}

class MapView extends Component<{}, State> {

  constructor() {
    super();

    // Calculate initial bounds
    let bounds = [[180, 90],[-180, -90]];

    data.map((point, index) => {
      if (point.position.lng < bounds[0][0]) {
        bounds[0][0] = point.position.lng;
      }
      if (point.position.lat < bounds[0][1]) {
        bounds[0][1] = point.position.lat;
      }
      if (point.position.lng > bounds[1][0]) {
        bounds[1][0] = point.position.lng;
      }
      if (point.position.lat > bounds[1][1]) {
        bounds[1][1] = point.position.lat;
      }
    });

    const newViewport = new WebMercatorViewport({width: window.innerWidth, height: window.innerHeight});
    let opts = {
      padding: 100,
    };
    let finalViewport = newViewport.fitBounds(bounds, opts);

    this.state = {
      viewport: finalViewport
    };

    this.mapboxAccessToken = 'pk.eyJ1IjoieWFuZ2xpLWJzbiIsImEiOiJjangwdmxpbHkwMTd2NDRubzhvNHdxZW04In0.bQ2IgPrUd89S71Y5aeYWGQ';

  }

  componentDidMount() {
    //this.setState({viewport: this.calculateViewport()});
  }

  redraw({project}, position) {
    const [cx, cy] = project([position.lng, position.lat]);
    return (
      <rect x={cx} y={cy} width='30' height='30' style={{strokeWidth: 3, stroke: 'black'}} />
    );
  }

  render() {
    return (
      <ReactMapGL
        mapStyle='mapbox://styles/yangli-bsn/cjx0vo1lk44z81cmbfpbz6u74'
        mapboxApiAccessToken={this.mapboxAccessToken}
        {...this.state.viewport}
        onViewportChange={(viewport) => this.setState({viewport})}
      >
        {
          data.map((point, index) => {
            return (
               <CustomMarker
                longitude={point.position.lng}
                latitude={point.position.lat}/>
            );
          })
        }
      </ReactMapGL>
    );
  }
}

export default MapView;