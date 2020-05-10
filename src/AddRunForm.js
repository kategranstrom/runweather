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

    getWindSpeed() {
        return this.props.currWeather.wind.speed*3.6;
    }

    getDescrption() {
        return this.props.currWeather.weather[0].description;
    }

    render() {
        //KGTODO: edit to use name='extras', which varies based on user input
        return (
            <form onSubmit={this.props.onSubmit}>
                <label htmlFor="temperature">Temperature (°C) </label>
                <input type="number" max="100" className="hasDefault" defaultValue={this.getTemperature()} id="temperature" name="temperature" />
                <br />
                <label htmlFor="feelsLike">Feels Like (°C) </label>
                <input type="number" className="hasDefault" defaultValue={this.getFeelsLike()} id="feelsLike" name="feelsLike" />
                <br />
                <label htmlFor="humidity">Humidity (%)</label>
                <input type="number" className="hasDefault" defaultValue={this.getHumidity()} id="humidity" name="humidity" />
                <br />
                <label htmlFor="windSpeed">Wind Speed (km/h)</label>
                <input type="number" className="hasDefault" defaultValue={this.getWindSpeed()} id="windSpeed" name="windSpeed" />
                <br />
                <label htmlFor="description">Description</label>
                <input type="text" maxsize="4" className="hasDefault" defaultValue={this.getDescrption()} id="description" name="description" />
                <br />
                <label htmlFor="topLayer">Top Layer</label>
                <input type="text" id="topLayer" name="topLayer" />
                <br />
                <label htmlFor="bottomLayer">Bottom Layer</label>
                <input type="text" id="bottomLayer" name="bottomLayer" />
                <br />
                {this.props.extras.map((extra, index) => (
                    <div className="inline" key={index}>
                        <label htmlFor={extra}>{extra}</label>
                        <input type="checkbox" id={extra} value={extra} name="extras" />
                    </div>
                ))}
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