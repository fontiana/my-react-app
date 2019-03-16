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

            <input
              type="text"
              id="todoInput"
              value={this.props.inputValue}
              onChange={(e) => this.props.changeInput(e.target.value)}
            />

            <label>Description</label>
            <textarea type="text" rows="6"></textarea>

            <a
              className="button"
              onClick={() => this.props.addTodo(this.props.inputValue, "description to be defined")}
            >
              Add Todo
            </a>

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
  // start with default props
  return streamProps({})  
    .set( // map state to this Component's props
      app.get('store').getState$(),
      state => ({ modal: state.modal.value })
    ).set( // map Region's props to this Component's props
      app.get('region').getProps$(),
      regionProps => ({ regionProps })
    ).setDispatch({ // map dispatchable actions
      openModal,
      closeModal
    },
      app.get('store')
    ).set({  // services
      logger: app.get('logger')
    }).get$();  // return composed Observable
})(Root);
