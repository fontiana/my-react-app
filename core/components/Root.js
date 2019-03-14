import React from 'react';
import { Region, observe } from 'frint-react';

import Header from './Header';
import '../../styles/main.less';

class Root extends React.Component {
  render() {
    return (
      <div id="page-background">
        <Header/>
        <Region name="main" />
      </div>
    );
  }
}

export default observe()(Root);
