import React from 'react';

export class Run extends React.Component {

    getDateString(milliseconds) {
        const date = new Date(milliseconds);
        return date.toDateString();
    }

    render() {
        const item = this.props.item;
        return (
            <div>
                <p>
                    {this.getDateString(item.date)}
                </p>
                <p>
                    {item.temperature}: {item.topLayer}
                </p>
            </div>
        )
    }
}