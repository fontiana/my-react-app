import React from 'react';
import { observe, streamProps, Region } from 'frint-react';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { removeTodo, updateTodo } from '../actions/todos';
import { Edit, Remove } from './Icons';

class Item extends React.Component {
  render() {
    const { todo } = this.props;

    return (
      <div className="col">
        <div className="task">
          <div className="task-header">
            <h4>{todo.title}</h4>
            <span className="icons" onClick={() => this.props.edit(todo)}>
              <Edit />
            </span>
            <span className="icons" onClick={() => this.props.removeTodo(todo.id)}>
              <Remove />
            </span>
          </div>
          <div className="task-body">
            <p>{todo.description}</p>
          </div>
        </div>
        {this.props.showEditForm && (
          <p>
            <input
              className="u-full-width"
              type="text"
              placeholder="my todo title..."
              id="todoItemInput"
              value={this.props.inputValue}
              onChange={(e) => this.props.changeInput(e.target.value)}
            />

            <button
              type="button"
              className="button-primary"
              onClick={() => this.props.submit(todo.id, this.props.inputValue)}
            >
              Submit
            </button>

            [<a href="javascript:" onClick={() => this.props.cancelEdit()}>cancel</a>]
          </p>
        )}
      </div>
    );
  }
}

export default observe(function (app) {
  const showEditForm$ = new BehaviorSubject(false); // start with hidden form
  const formInput$ = new BehaviorSubject('');
  const store = app.get('store');

  const cancelEdit = () => {
    formInput$.next(''); // clear input field value
    showEditForm$.next(false);
  };

  return streamProps()
    // dispatchable actions against store
    .setDispatch(
      { removeTodo },
      store
    )

    // stream values
    .set(
      showEditForm$,
      (showEditForm) => ({ showEditForm })
    )
    .set(
      formInput$,
      (inputValue) => ({ inputValue })
    )

    // form actions
    .set({
      edit: (todo) => {
        formInput$.next(todo.title); // set input field value
        showEditForm$.next(true);
      },
      changeInput: (value) => {
        formInput$.next(value);
      },
      cancelEdit,
      submit: (id, newTitle) => {
        store.dispatch(updateTodo(id, newTitle, "changed description"));
        cancelEdit();
      }
    })

    // final observable
    .get$();
})(Item);
