import React from 'react';
import "./modal.css";
export class Modal extends React.Component {

    render() {
        if(!this.props.show) {
            return null;
        }
        return (
            <div className="overlay">
                <div className="modal" id="modal">
                    <div className="content">{this.props.children}</div>
                </div>
            </div>
        );
    }
}