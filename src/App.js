import React from 'react';

import MapView from 'components/MapView';
import MapLegend from 'components/MapLegend';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
      	<MapLegend />
        <MapView />
      </div>
    );
  }
}

export default App;
