import React from 'react';
import { Region, observe } from 'frint-react';

import Header from './Header';
import '../../styles/main.less';

class Root extends React.Component {
  render() {
    return (
      <div id="page-background">
        <Header/>
        <div className="content">
          <div className="editor">
            <Region name="main" />
          </div>
        </div>
      </div>
    );
  }
}

export default observe()(Root);
