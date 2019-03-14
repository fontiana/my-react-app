import React from 'react';
import { observe, streamProps, Region } from 'frint-react';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import EditIcon from './EditIcon';
import { removeTodo, updateTodo } from '../actions/todos';

class Item extends React.Component {
  render() {
    const { todo } = this.props;

    return (
      <div className="col">
        <div className="task" onMouseEnter={() => this.props.showOptions()}>
          <div className="task-header">
            <h4>{todo.title}</h4>
            <EditIcon />
          </div>
          <div className="task-body">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Morbi non vulputate ipsum, sed iaculis nisl. Nam lacinia,
                lectus id iaculis scelerisque, elit nibh sagittis ante,
                                    sit amet semper turpis turpis at arcu.</p>
          </div>
        </div>
      </div>

      // <div style={{ background: '#f1f1f1', border: '1px solid #e1e1e1', marginBottom: '15px', padding: '15px', borderRadius: '4px' }}>
      //   {!this.props.showEditForm && (
      //     <p>
      //       {todo.title}

      //       [<a href="javascript:" onClick={() => this.props.edit(todo)}>edit</a>]
      //       [<a href="javascript:" onClick={() => this.props.removeTodo(todo.id)}>x</a>]
      //     </p>
      //   )}

      //   {this.props.showEditForm && (
      //     <p>
      //       <input
      //         className="u-full-width"
      //         type="text"
      //         placeholder="my todo title..."
      //         id="todoItemInput"
      //         value={this.props.inputValue}
      //         onChange={(e) => this.props.changeInput(e.target.value)}
      //       />

      //       <button
      //         type="button"
      //         className="button-primary"
      //         onClick={() => this.props.submit(todo.id, this.props.inputValue)}
      //       >
      //         Submit
      //       </button>

      //       [<a href="javascript:" onClick={() => this.props.cancelEdit()}>cancel</a>]
      //     </p>
      //   )}
      // </div>
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
      showOptions: () => {
        console.log("Showing icons");
      },
      edit: (todo) => {
        formInput$.next(todo.title); // set input field value
        showEditForm$.next(true);
      },
      changeInput: (value) => {
        formInput$.next(value);
      },
      cancelEdit,
      submit: (id, newTitle) => {
        store.dispatch(updateTodo(id, newTitle));
        cancelEdit();
      }
    })

    // final observable
    .get$();
})(Item);
