import React from 'react';
import { WiHumidity } from 'react-icons/wi';
import { WiStrongWind } from 'react-icons/wi';
import "./form.css";

export class EditRunForm extends React.Component {
    getDateString(milliseconds) {
        const date = new Date(milliseconds);
        return /*date.toLocaleString('default', {weekday: 'short'}) + ', ' +*/ date.toLocaleString('default', {month: 'short'}) + ' ' + date.getDate();
    }

    render() {
        const run = this.props.run || {};
        const selectedExtras = JSON.parse(run.extras) || [];
        const unselectedExtras = this.props.extras.filter(extra => !selectedExtras.includes(extra));
        return (
            <div>
                <div className="editdescription">
                    {run.temperature}°C
                    <br/>
                    Feels like {run.feelsLike}°C
                    <div className="centervertical">
                        {run.description} {'\u00A0 \u00A0'}
                        <div className="weathericon"><WiHumidity /></div>
                        {run.humidity}% {'\u00A0 \u00A0'}
                        <div className="weathericon"><WiStrongWind /> </div>
                        {run.windSpeed} km/hr
                    </div>
                </div>
                <div className="date">{this.getDateString(run.date)}</div>
                <form onSubmit={this.props.onSubmit}>
                <label htmlFor="topLayer">Top Layer</label>
                <input type="text" defaultValue={run.topLayer} id="topLayer" name="topLayer" />
                <br />
                <label htmlFor="bottomLayer">Bottom Layer</label>
                <input type="text" defaultValue={run.bottomLayer} id="bottomLayer" name="bottomLayer" />
                <br />
                {selectedExtras.map((extra, index) => (
                    <div className="inline" key={index}>
                        <label htmlFor={extra}>{extra}</label>
                        <input type="checkbox" id={extra} value={extra} name="extras" defaultChecked/>
                    </div>
                ))}
                {unselectedExtras.map((extra, index) => (
                    <div className="inline" key={index}>
                        <label htmlFor={extra}>{extra}</label>
                        <input type="checkbox" id={extra} value={extra} name="extras"/>
                    </div>
                ))}
                {unselectedExtras.length || selectedExtras.length ? <br /> : <div></div>}
                <label htmlFor="notes">Notes</label>
                <br />
                <textarea id="notes" defaultValue={run.notes} name="notes" rows="2" cols="30"></textarea>
                <br />
                <button className="action" onClick={this.props.onDelete}>Delete</button>
                <input type="submit" className="action" name="submit" value="Save" />
            </form>
            </div>
        )
    }
}