import React from 'react';
import { observe, streamProps, Region } from 'frint-react';

import { Add } from './Icons';

class Header extends React.Component {
    render() {
        return (
            <div className="top-bar">
                <div className="top-bar-inner">
                    <div className="top-bar-left">
                        <h1>todo</h1>
                    </div>
                    <div className="top-bar-right">
                        <span className="icons" onClick={() => this.props.open()}>
                            <Add />
                            <span>add task</span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
};
export default observe(function () {
    return streamProps()
        .set({
            open: () => {
                isClosed$.next(false);
                Logger.debug("open modal");
            }
        })
        .get$();
})(Header);