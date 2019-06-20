import React, { Component } from 'react';

import {ReactComponent as BCFIcon} from 'assets/BCFLogo.svg';
import {ReactComponent as BMFIcon} from 'assets/BMFLogo.svg';

import './Markers.css';

class SingleControllerMarker extends Component<{}, State> {

  constructor(props) {
    super(props);
  }

  render() {
  	console.log(this.props.product);
  	return (
  		<div className='single-marker'>
  			{this.props.product === 'BCF' &&
  				<BCFIcon className='bcf-marker-svg' />
  			}
  			{this.props.product === 'BMF' &&
  				<BMFIcon className='bmf-marker-svg' />
  			}
  		</div>
  	);
  }
}

export default SingleControllerMarker;