import React from 'react';
import { observe } from 'frint-react';
import { Observable } from 'rxjs/Observable';
import { concatMap } from 'rxjs/operator/concatMap';
import { map } from 'rxjs/operator/map';
import { merge } from 'rxjs/operator/merge';
import { scan } from 'rxjs/operator/scan';
import PropTypes from 'prop-types';

import { Add } from './Icons';

import {
  changeColor
} from '../actions/color';

import {
  GREEN_COLOR,
  RED_COLOR,
  ORANGE_COLOR,
  CHANGE_COLOR_ASYNC
} from '../constants';

class Root extends React.Component {
  static propTypes = {
    color: PropTypes.string,
    modal: PropTypes.bool,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    changeColor: PropTypes.func,
    changeColorAsync: PropTypes.func,
    regionProps: PropTypes.object
  };

  render() {
    const codeStyle = {
      color: this.props.color,
      backgroundColor: this.props.color
    };

    return (
      <div className="top-bar">
        <div className="top-bar-inner">
          <div className="top-bar-left">
            <h1>todo</h1>
          </div>
          <div className="top-bar-right">
            <span
              className="icons"
              onClick={() => this.props.openModal('ADD')}
            >
              <Add />
              <span>add task</span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}


export default observe(function (app) { // eslint-disable-line func-names
  // self
  const store = app.get('store');
  const region = app.get('region');

  const state$ = store.getState$()
    :: map((state) => {
    return {
      color: state.color.value,
    };
  });

  const regionProps$ = region.getProps$()
    :: map((regionProps) => {
    return {
      regionProps,
    };
  });

  const actions$ = Observable.of({
    changeColor: (...args) => {
      return store.dispatch(changeColor(...args));
    },
    changeColorAsync: (color) => {
      return store.dispatch({
        type: CHANGE_COLOR_ASYNC,
        color,
      });
    },
  });

  const services$ = Observable.of({
    logger: app.get('logger')
  });

  // other app: ModalApp
  const modalApp$ = app.getAppOnceAvailable$('ModalApp');
  const modalAppState$ = modalApp$
    :: concatMap((modalApp) => {
    return modalApp
      .get('store')
      .getState$();
  })
    :: map((modelState) => {
    return {
      modal: modelState.modal.value
    };
  });

  const modalAppActions$ = modalApp$
    :: map((modalApp) => {
    const modalStore = modalApp.get('store');
    return {
      openModal: (method) => {
        return modalStore.dispatch({ type: 'OPEN_MODAL', method });
      }
    };
  });

  // combine them all into props
  return state$
    :: merge(regionProps$)
    :: merge(actions$)
    :: merge(services$)
    :: merge(modalAppState$)
    :: merge(modalAppActions$)
    :: scan((props, emitted) => {
    return {
      ...props,
      ...emitted,
    };
  }, {
      // default props to start with
      modal: false,
    });
})(Root);
