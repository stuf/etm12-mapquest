import * as React from 'karet';
import * as U from 'karet.util';
import * as L from 'partial.lenses';
import * as K from 'kefir';

import './App.scss';

import { watchCurrentPosition } from './core/location';

const App = () => {
  const pos = watchCurrentPosition().toProperty();

  const asSixDec = L.reread(n => n.toFixed(6));

  const err = U.thru(
    pos,
    U.ignoreValues,
    U.flatMapErrors(K.constant),
    U.toProperty,
  );

  err.onValue(e => alert(e));

  return (
    <main>
      <div className="position">
        <div className="value">
          {U.view(['coords', 'latitude', asSixDec], pos)}
        </div>
        <div className="value">
          {U.view(['coords', 'longitude', asSixDec], pos)}
        </div>
      </div>
    </main>
  );
};

export default App;
