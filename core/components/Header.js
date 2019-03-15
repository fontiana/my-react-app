import React from 'react';

import AddIcon from './AddIcon';

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
                            <AddIcon />
                            <span>add task</span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
};
export default Header;