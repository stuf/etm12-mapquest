import * as React from 'karet';
import * as U from 'karet.util';
import * as K from 'kefir';

import { watchCurrentPosition } from './core/location';

const App = () => {
  const pos = watchCurrentPosition().toProperty();

  const err = U.thru(
    pos,
    U.ignoreValues,
    U.flatMapErrors(K.constant),
    U.toProperty,
  );

  err.onValue(e => alert(e));

  return (
    <main>
      <fieldset>
        <legend>Debug</legend>

        <pre>
          <code>{U.stringify(pos, null, 2)}</code>
        </pre>

        <pre>
          <code>{U.stringify(err, null, 2)}</code>
        </pre>
      </fieldset>
    </main>
  );
};

export default App;
