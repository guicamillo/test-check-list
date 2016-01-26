import Parse from 'parse'
import {PARSE_APP_ID, PARSE_JS_KEY} from '../constants'

Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY)

class Experiment extends Parse.Object {
  constructor() {
    super('Experiment');
  }

  static query () {
    return new Parse.Query(this)
  }

  // some usefull methods
  isFullyCompleted () {
    return false;
  }
}

Parse.Object.registerSubclass('Experiment', Experiment);

export default Experiment
