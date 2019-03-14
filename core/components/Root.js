import React from 'react';
import { Region, observe } from 'frint-react';
import AddIcon from './AddIcon';
import '../../styles/main.less';

class Root extends React.Component {
  render() {
    return (
      <div id="page-background">
        <div className="top-bar">
          <div className="top-bar-inner">
            <div className="top-bar-left">
              <h1>todo</h1>
            </div>
            <div className="top-bar-right">
              <span className="icons">
                <AddIcon />
                <span>add task</span>
              </span>
            </div>
          </div>
        </div>
        <div className="content">
          <div className="editor">
            <Region
              name="main"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default observe()(Root);
