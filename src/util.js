import { SyntheticEvent } from 'react';
import * as U from 'karet.util';
import * as R from 'ramda';

//

// Events

/**
 * @type {(e: SyntheticEvent) => SyntheticEvent}
 */
export const persistEvent = U.tapPartial(e => e.persist());
