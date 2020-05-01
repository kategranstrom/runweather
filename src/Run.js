import React from 'react';

export class Run extends React.Component {

    getDateString(milliseconds) {
        const date = new Date(milliseconds);
        return /*date.toLocaleString('default', {weekday: 'short'}) + ', ' +*/ date.toLocaleString('default', {month: 'short'}) + ' ' + date.getDate();
    }

    render() {
        const run = this.props.run;
        return (
            <div>
                <div className="weather">
                    {run.temperature}°C
                </div>
                <div className="date">
                    {this.getDateString(run.date)}
                </div>
                <div className="description">
                    {run.topLayer} headband shorts
                </div>
            </div>
        )
    }
}