import React from 'react';
import "./form.css";

export class EditRunForm extends React.Component {
    getDate(milliseconds) {
        const date = new Date(milliseconds);
        return date.toDateString();
    }

    render() {
        const run = this.props.run || {};
        return (
            <div>
                <h1>{this.getDate(run.date)}</h1>
                <p>Temp: {run.temperature} Feels like: {run.feelslike} Humidity: {run.humidity}</p>
                <form onSubmit={this.props.onSubmit}>
                <label htmlFor="topLayer">Top Layer</label>
                <input type="text" defaultValue={run.topLayer} id="topLayer" name="topLayer" />
                <br />
                <label htmlFor="bottomLayer">Bottom Layer</label>
                <input type="text" defaultValue={run.bottomLayer} id="bottomLayer" name="bottomLayer" />
                <br />
                <label htmlFor="headband">Headband</label>
                <input type="checkbox" defaultValue={run.headband} id="headband" name="headband" />
                <label htmlFor="gloves">Gloves</label>
                <input type="checkbox" defaultValue={run.gloves} id="gloves" name="gloves" />
                <label htmlFor="runninghat">Running Hat</label>
                <input type="checkbox" defaultValue={run.runningHat} id="runninghat" name="runninghat" />
                <br />
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