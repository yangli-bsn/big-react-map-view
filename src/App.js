import React from 'react';

import MapView from 'components/MapView';
import ListView from 'components/ListView';

import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <MapView />
      </div>
    );
  }
}

export default App;
