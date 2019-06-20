import React, { Component } from 'react';

import {ReactComponent as BCFIcon} from 'assets/BCFLogo.svg';
import {ReactComponent as BMFIcon} from 'assets/BMFLogo.svg';

import './Markers.css';

class SingleControllerMarker extends Component<{}, State> {

  constructor(props) {
    super(props);
  }

  render() {
  	let { errors, warnings, product } = this.props.data;

  	let color = '';
  	let number = 0;

  	if (errors > 0) {
  		color = '#F41919';
  		number = errors;
  	}
  	else if (warnings > 0) {
  		color = '#EEDF18';
  		number = warnings;
  	}
  	else {
  		color = '#34E817';
  		number = 0;
  	}

  	return (
  		<div className='single-marker'>
  			{product === 'BCF' &&
  				<div className='bcf-marker'>
  					<BCFIcon className='bcf-marker-svg' fill={color} />
  					<div className='bcf-number'>
						{number}
					</div>
				</div>
  			}
  			{product === 'BMF' &&
  				<div className='bmf-marker'>
  					<BMFIcon className='bmf-marker-svg' fill={color} />
  					<div className='bmf-number'>
						{number}
					</div>
				</div>
  			}
  			
  		</div>
  	);
  }
}

export default SingleControllerMarker;