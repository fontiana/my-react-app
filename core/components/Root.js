import React from 'react';
import { observe } from 'frint-react';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operator/map';
import { merge } from 'rxjs/operator/merge';
import { scan } from 'rxjs/operator/scan';
import { addTodo } from '../actions/todos';

import Task from './Task';
import Header from './Header';
import Modal from './Modal';
import '../../styles/main.less';

class Root extends React.Component {
  render() {
    return (
      <div id="page-background">
        <Modal 
          isClosed={this.props.isClosed$} />
        <Header />
        <div className="content">
          <div className="editor">
            <div className="row-columns">
              {this.props.todos.map((todo, index) => (
                <Task
                  key={`todo-${index}`}
                  todo={todo}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default observe(function (app) { // eslint-disable-line func-names
  const store = app.get('store');

  const state$ = store.getState$()
      :: map((state) => {
    return {
      todos: state.todos.records
    };
  });

  const isClosed$ = new BehaviorSubject(true);

  const formInput$ = new BehaviorSubject('')
    :: map((inputValue) => {
    return {
      inputValue,
    };
  });

  const clearInput = () => formInput$.next('');
  const changeInput = value => formInput$.next(value);

  const actions$ = Observable.of({
    addTodo: (...args) => {
      clearInput();
      return store.dispatch(addTodo(...args));
    },
    changeInput,
    clearInput
  });

  return state$
    :: merge(actions$, formInput$, isClosed$)
    :: scan((props, emitted) => {
    return {
      ...props,
      ...emitted,
    };
  }, {
      todos: [],
    });
})(Root);
