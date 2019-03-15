import React from 'react';

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
                        <span className="icons">
                            <Add />
                            <span>add task</span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
};
export default Header;