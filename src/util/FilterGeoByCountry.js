import worldMap from 'data/custom.geo.json';

export default function FilterGeoByCountry(countries) {
	let finalCountries = [];
	worldMap.features.forEach((feature, index) => {
		if (countries.includes(feature.properties.name)) {
			finalCountries.push(feature);
		}
	});

	return {
		type: 'FeatureCollection',
		features: finalCountries
	};
}
