import React from 'react';
import { Region, observe } from 'frint-react';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

class Root extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="twelve columns">
            <h3>Main</h3>

            <hr />

            <Region
              name="main"
              data={{
                hi: `available from props of 'main' region`,
                showSidebar: this.props.showSidebar
              }}
            />

            <hr />
        
          </div>

        </div>
      </div>
    );
  }
}

export default observe(function (app) {
  const sidebarToggle$ = (new BehaviorSubject(true))
    .map((toggleValue) => {
      return {
        showSidebar: toggleValue,
      };
    });

  const actions$ = Observable.of({
    toggle: (value) => {
      sidebarToggle$.next(value);
    }
  });

  const services$ = Observable.of({
    foo: app.get('foo'),
    bar: app.get('bar'),
    baz: app.get('baz'),
  });

  return sidebarToggle$
    .merge(actions$)
    .merge(services$)
    .scan((props, emitted) => {
      return {
        ...props,
        ...emitted,
      };
    }, {
      // start with these props
      appName: app.getName(),
    });
})(Root);
