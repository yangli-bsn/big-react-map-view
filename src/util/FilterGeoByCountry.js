import {fromJS} from 'immutable';

import worldMap from 'data/custom.geo.json';
import { dataLayer } from 'data/dataLayer';
import MapStyle from 'data/style.json';

export default function FilterGeoByCountry(countries) {
	let finalCountries = [];
	worldMap.features.forEach((feature, index) => {
		if (countries.includes(feature.properties.name)) {
			finalCountries.push(feature);
		}
	});

	let countryGeo = {
		type: 'FeatureCollection',
		features: finalCountries
	};

	let mapStyle = fromJS(MapStyle);

    mapStyle = mapStyle
    .setIn(['sources', 'countries'], fromJS({type: 'geojson', data: countryGeo}))
    // Add point layer to map
    .set('layers', mapStyle.get('layers').push(dataLayer));

    return mapStyle;
}
