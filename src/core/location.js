import * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as K from 'kefir';

const tsFwd = n => new Date(n);
const tsBwd = d => +d;

const tsI = L.iso(tsFwd, tsBwd);

const positionL = L.pickIn({
  coords: L.props('latitude', 'longitude', 'heading'),
  timestamp: tsI,
});

const GeolocationErrors = {
  1: 'PERMISSION_DENIED',
  2: 'POSITION_UNAVAILABLE',
  3: 'TIMEOUT',
};

export const getCurrentPosition = () => {
  const bus = U.bus();

  navigator.geolocation.getCurrentPosition(
    pos => bus.push(L.get(positionL, pos)),
    err => bus.error(GeolocationErrors[err.code]),
  );

  return U.toProperty(bus);
};

export const watchCurrentPosition = () => {
  const bus = U.bus();

  navigator.geolocation.watchPosition(
    pos => bus.push(L.get(positionL, pos)),
    err => bus.error(GeolocationErrors[err.code]),
  );

  return U.toProperty(bus);
};
