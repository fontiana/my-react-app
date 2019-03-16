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
  return streamProps({})
    //Self
    .set(
      app.get('store').getState$(),
      state => ({ modal: state.modal.value })
    )
    .set(
      app.get('region').getProps$(),
      regionProps => ({ regionProps })
    )
    .setDispatch({
      openModal,
      closeModal
    },
      app.get('store')
    )
    .set({
      logger: app.get('logger')
    })

    // other app: TodosApp
    .set(
      app.getAppOnceAvailable$('TodosApp'),
      todosApp => todosApp.get('store').getState$(),
      todosAppState => ({ todos: todosAppState.todos.value })
    )
    .set(
      app.getAppOnceAvailable$('TodosApp'),
      todosApp => todosApp.get('store'),
      todosAppStore => ({
        addTodo: todos => todosAppStore.dispatch({
          type: 'TODOS_ADD',
          todos
        })
      })
    )

    .get$();  // return composed Observable
})(Root);
