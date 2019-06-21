import React from 'react';

import './MapLegend.css';

import {ReactComponent as BCFIcon} from 'assets/BCFLogo.svg';
import {ReactComponent as BMFIcon} from 'assets/BMFLogo.svg';

class MapLegend extends React.Component {
	render() {
		return (
			<div className='map-legends'>
				<div className='single-legend'>
					<div className='multiple-controller-legend' />
					Multiple Controllers
				</div>
				<div className='single-legend'>
					<BCFIcon className='single-controller-legend' />
					Big Cloud Fabric
				</div>
				<div className='single-legend'>
					<BMFIcon className='single-controller-legend' />
					Big Monitoring Fabric
				</div>
			</div>
		);
	}
}

export default MapLegend;