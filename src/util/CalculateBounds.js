import WebMercatorViewport from 'viewport-mercator-project';

export default function CalculateBounds(data) {
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
  return finalViewport;
}
