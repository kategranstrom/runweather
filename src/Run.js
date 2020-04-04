import React from 'react';

export class Run extends React.Component {

    getDateString(milliseconds) {
        const date = new Date(milliseconds);
        return date.toDateString();
    }

    render() {
        const run = this.props.run;
        return (
            <div>
                <p>
                    {this.getDateString(run.date)}
                </p>
                <p>
                    {run.temperature}: {run.topLayer}
                </p>
            </div>
        )
    }
}