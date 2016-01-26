import Experiment from '../models/experiment'

/*
 * action types
 */
import {
  REQUEST_EXPERIMENTS,
  RECEIVE_EXPERIMENTS,
  EXPERIMENTS_FAIL,
  ADD_EXPERIMENT,
  UPDATE_EXPERIMENT,
  DELETE_EXPERIMENT,
  SET_EXPERIMENTS_VISIBILITY_FILTER,
} from '../constants/experiments'

/*
 * action creators
 */
function requestExperiments() {
  return {
    type: REQUEST_EXPERIMENTS
  }
}

function createExperiment(experiment) {
  return {
    type: ADD_EXPERIMENT,
    experiment
  }
}

function updateExperiment(experiment, id) {
  return {
    type: UPDATE_EXPERIMENT,
    experiment,
    receivedAt: Date.now()
  }
}

function receiveExperiments(experiments) {
  return {
    type: RECEIVE_EXPERIMENTS,
    items: experiments
  }
}

function notifyDeleteExperiment(id) {
  return {
    type: DELETE_EXPERIMENT,
    id: id
  }
}

export function setVisibilityFilter(filter) {
  return { type: SET_EXPERIMENT_VISIBILITY_FILTER, filter }
}

export function addExperiment(name) {
  return (dispatch) => {
    let experiment = {
      name,
      beeingProcessed: true,
    };

    dispatch(createExperiment(experiment, null));

    return dispatch(serverSyncExperiment(experiment, null))
  }
}

function serverSyncExperiment(data, id) {
  return dispatch => {
    return putRecord(data, id)
      .then((response) => {
        let experiment = response.data;
        dispatch(updateExperiment(experiment, experiment.id))
      })
  }
}

function serverDeleteExperiment(id) {
  return dispatch => {
    return deleteRecord(id)
      .then(() => dispatch(notifyDeleteExperimento(id)))
  }
}

function experimentsFail(err) {
  return {
    type: EXPERIMENTS_FAIL,
    error: err
  }
}

export function fetchExperiments() {
  return dispatch => {
    dispatch(requestExperiments())
    return Experiment.query().find().then(
      (experiments) => dispatch(receiveExperiments(experiments)),
      (err) => {
        let body = err.data;
        dispatch(experimentsFail(body))
      }
    );
  }
}

function deleteExperiment(id) {
  return (dispatch, getState) => {
    let { experiments } = getState(),
      rawExperiment = experiments.items.find(item => item.id === id),
      experiment = Object.assign({}, rawExperiment, {
        beeingProcessed: true,
      });

    dispatch(updateExperiment(experiment, id))

    return dispatch(serverDeleteExperiment(id))
  }
}

export function safeDeleteExperiment(id) {
  return (dispatch, getState) => {
    let { experiments: { items } } = getState(),
      targetExperiment = items.find(experiment => experiment.id === id);

    if (!targetExperiment.beeingProcessed) {
      return dispatch(deleteExperiment(id))
    }
  }
}

export function safeUpdateExperiment(id, data) {
  return (dispatch, getState) => {
    let { experiments: { items } } = getState(),
      targetExperiment = items.find(experiment => experiment.id === id);

    if (!targetExperiment.beeingProcessed) {
      let experiment = Object.assign({}, targetExperiment, data, {
        beeingProcessed: true,
      });

      dispatch(updateExperiment(experiment, id))

      return dispatch(serverSyncExperiment(experiment, id))
    }
  }
}
