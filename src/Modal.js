import React from 'react';

export class Modal extends React.Component {

    render() {
        if(!this.props.show) {
            return null;
        }
        return (
            <div className="modal" id="modal">
                <h2>Modal Window</h2>
                <div className="content">{this.props.children}</div>
                <div className="actions">
                    {/*<button onClick={this.props.onClose}>
                        Close
                    </button>*/}
                </div>
            </div>
        );
    }
}