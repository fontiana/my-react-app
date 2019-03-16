import React from 'react';
import { observe, streamProps } from 'frint-react';
import PropTypes from 'prop-types';

import {
  openModal,
  closeModal
} from '../actions/modal';

class Root extends React.Component {
  static propTypes = {
    modal: PropTypes.bool,
    openModal: PropTypes.func,
    closeModal: PropTypes.func,
    regionProps: PropTypes.object,
    logger: PropTypes.object,
  };

  render() {
    this.props.logger.debug("Rendering App-modal");
    return (
      <div className={`modal modal-overlay ${this.props.modal ? 'is-opened' : ''}`}>
        <div className="modal-window">
          <div className="modal-content">
            <h4>Add new task</h4>

            <label>Title</label>
            <input type="text" />
            <label>Description</label>
            <textarea type="text" rows="6"></textarea>
            <a className="button" href="#">Add Task</a>

            <button
              className="close-button"
              aria-label="Close modal"
              type="button"
              onClick={() => this.props.closeModal()}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default observe(function (app) { // eslint-disable-line func-names
  return streamProps({}) // start with defualt props
    // map state to this Component's props
    .set(
      app.get('store').getState$(),
      state => ({ modal: state.modal.value })
    )

    // map Region's props to this Component's props
    .set(
      app.get('region').getProps$(),
      regionProps => ({ regionProps })
    )

    // map dispatchable actions
    .setDispatch({
      openModal,
      closeModal
    },
      app.get('store')
    )

    // services
    .set({
      logger: app.get('logger')
    })

    // return composed Observable
    .get$();
})(Root);
