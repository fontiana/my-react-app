import React from 'react';
import { Region, observe } from 'frint-react';

import Header from './Header';
import Modal from './Modal';
import '../../styles/main.less';

class Root extends React.Component {
  render() {
    return (
      <div id="page-background">
        {/* <Modal /> */}
        <Header />
        <Region name="main" />
      </div>
    );
  }
}

export default observe()(Root);
