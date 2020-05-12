import React from 'react';
import { WiHumidity } from 'react-icons/wi';
import { WiStrongWind } from 'react-icons/wi';

export class Run extends React.Component {

    getDateString(milliseconds) {
        const date = new Date(milliseconds);
        return /*date.toLocaleString('default', {weekday: 'short'}) + ', ' +*/ date.toLocaleString('default', {month: 'short'}) + ' ' + date.getDate();
    }

    getOutfitDescription() {
        const run = this.props.run;
        const extras = JSON.parse(run.extras);
        let outfit = '';
        if (run.topLayer) {
            outfit += run.topLayer + ', ';
        }
        if (run.bottomLayer) {
            outfit += run.bottomLayer + ', ';
        }
        extras.forEach(extra => {
            outfit += extra.toLowerCase() + ', ';
        })
        outfit = outfit.slice(0, -2);
        return outfit;
    }

    render() {
        const run = this.props.run;
        return (
            <div>
                <div className="weather">
                    {run.temperature}°C
                    <br/>
                    <span className="carddescription">{run.description}</span>
                </div>
                <div className="date">
                    {this.getDateString(run.date)}
                </div>
                <div className="carddescription">
                    <div className="weathericon"><WiHumidity /></div>
                    {run.humidity}% {'\u00A0 \u00A0'}
                    <div className="weathericon"><WiStrongWind /> </div>
                    {run.windSpeed} km/hr
                </div>
                <div className="carddescription">
                    {this.getOutfitDescription()}
                </div>
            </div>
        )
    }
}