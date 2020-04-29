import React from 'react';
import "./form.css";

export class AddRunForm extends React.Component {
    pad(n) {
        return (n < 10) ? "0" + n : n;
    }
    getDate() {
        const today = new Date();
        const month = this.pad(today.getMonth() + 1);
        const date = this.pad(today.getDate());
        return today.getFullYear() + '-' + month + '-' + date;
    }

    getTemperature() {
        return Math.round((this.props.currWeather.main.temp - 273.15) * 100) / 100;
    }

    getFeelsLike() {
        return Math.round((this.props.currWeather.main.feels_like - 273.15) * 100) / 100;
    }

    getHumidity() {
        return this.props.currWeather.main.humidity;
    }
    
    render() {
        //KGTODO: edit to use name='extras', which varies based on user input
        return (
            <form onSubmit={this.props.onSubmit}>
                <label htmlFor="temperature">Temperature (°C) </label>
                <input type="number" defaultValue={this.getTemperature()} id="temperature" name="temperature" />
                <br />
                <label htmlFor="feelslike">Feels Like (°C) </label>
                <input type="number" defaultValue={this.getFeelsLike()} id="feelslike" name="feelslike" />
                <br />
                <label htmlFor="humidity">Humidity (%)</label>
                <input type="number" defaultValue={this.getHumidity()} id="humidity" name="humidity" />
                <br />
                <label htmlFor="topLayer">Top Layer</label>
                <input type="text" id="topLayer" name="topLayer" />
                <br />
                <label htmlFor="bottomLayer">Bottom Layer</label>
                <input type="text" id="bottomLayer" name="bottomLayer" />
                <br />
                <label htmlFor="headband">Headband</label>
                <input type="checkbox" id="headband" name="headband" />
                <label htmlFor="gloves">Gloves</label>
                <input type="checkbox" id="gloves" name="gloves" />
                <label htmlFor="runninghat">Running Hat</label>
                <input type="checkbox" id="runninghat" name="runninghat" />
                <br />
                <label htmlFor="notes">Notes</label>
                <br />
                <textarea id="notes" name="notes" rows="2" cols="30"></textarea>
                <br />
                <button className="action" onClick={this.props.onCancel}>Cancel</button>
                <input type="submit" className="action" name="submit" value="Add" />
            </form>
        )
    }
}