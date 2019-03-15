import React from 'react';
import { observe, streamProps, Region } from 'frint-react';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import Logger from '../services/Logger.js';

class Modal extends React.Component {
    render() {
        const { isClosed } = this.props;
        if (isClosed) { //Next time I'll do a fade out animation
            return null;
        }

        return (
            <div className="modal modal-overlay">
                <div className="modal-window">
                    <div className="modal-content">
                        <h4>Add new task</h4>

                        <label>Title</label>
                        <input type="text" />
                        <label>Description</label>
                        <textarea type="text" rows="6"></textarea>
                        <a className="button" href="#">Add Task</a>

                        <button className="close-button" aria-label="Close modal"
                            type="button" onClick={() => this.props.close()}>
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
};

export default observe(function () {
    const isClosed$ = new BehaviorSubject(false);

    const close = () => {
        isClosed$.next(true);
        Logger.debug("Close modal");
    };

    return streamProps()
        .set(
            isClosed$,
            (isClosed) => ({ isClosed })
        )
        .set({
            close: close
        })
        .get$();
})(Modal);