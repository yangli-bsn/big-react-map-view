import data from 'data';

import axios from 'axios';

export default function getCountriesWithControllers(positions, callback) {

	const instance = axios.create({
	  baseURL: 'https://api.mapbox.com',
	  timeout: 1000
	});

	let finalCountries = [];

	positions.forEach((position, index) => {
		instance.get('/geocoding/v5/mapbox.places/' + position.longitude +',' + position.latitude + '.json', {
			params: {
	      		access_token: 'pk.eyJ1IjoieWFuZ2xpLWJzbiIsImEiOiJjangwdmxpbHkwMTd2NDRubzhvNHdxZW04In0.bQ2IgPrUd89S71Y5aeYWGQ'
	      	}
	      })
		  .then(function (response) {
		    // handle success
		    console.log(response);
		    let finalIndex = response.data.features.length - 1;
		    finalCountries.push(response.data.features[finalIndex].place_name);
		    callback(finalCountries);
		  })
		  .catch(function (error) {
		    // handle error
		    console.log(error);
		  })
		  .finally(function () {
		    // always executed
		  });
	});

	return finalCountries;
	
}

