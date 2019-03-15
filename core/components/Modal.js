import React from 'react';

class Modal extends React.Component {
    render() {

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

                        <button className="close-button" aria-label="Close modal" type="button">
                            <span aria-hidden="true">×</span>
                        </button>
                    </div>
                </div>
            </div>
        )
    }
};

export default Modal;