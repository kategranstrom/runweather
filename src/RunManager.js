import React from 'react';
import { Run } from './Run';
import { SideBar } from './SideBar';
import { NavBar } from './NavBar';
import { EditRun } from './EditRun';
import { fetchCurrWeather } from './Utils';

export class RunManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            runs: [],
            sortBy: 'mostrelevant',
            extras: ['Gloves', 'Headband', 'Running Hat'],
            editingRun: null
        }
        this.getWorkouts = this.getWorkouts.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.changeSortBy = this.changeSortBy.bind(this);
        this.changeExtras = this.changeExtras.bind(this);
    }

    componentDidMount() {
        this.getWorkouts();
    }

    fetchWorkouts() {
        return fetch('api/workouts')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    return response.json().then(function (data) {
                        return data;
                    });
                }
            )
            .catch(function (err) {
                console.log('Fetch Error :-S', err);
            });
    }

    getWorkouts() {
        this.fetchWorkouts().then(function (response) {
            const runs = response.data || [];
            this.sortRuns(runs).then(function (runs) {
                this.setState({
                    loading: false,
                    runs: runs
                })
            }.bind(this));
        }.bind(this));
    }

    sortRuns(runs) {
        if(this.state.sortBy ===  'mostrelevant') {
            return fetchCurrWeather().then(function(data) {
                const feelsLike = ((data.main.feels_like - 273.15) * 100) / 100;
                return runs.sort((a, b) => Math.abs(a['feelsLike'] - feelsLike) - Math.abs(b['feelsLike'] - feelsLike));
            });
        } else {
            return Promise.resolve(runs.sort((a, b) => b[this.state.sortBy] - a[this.state.sortBy]));
        }
    }

    handleEditRun(run) {
        this.setState({
            editingRun: run
        })
    }

    handleDelete() {
        this.setState({
            editingRun: null
        })
        this.getWorkouts();
    }

    changeSortBy(newSortBy) {
        this.setState({
            sortBy: newSortBy
        })
        this.getWorkouts();
    }

    changeExtras(newExtras) {
        this.setState({
            extras: newExtras
        })
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <SideBar sortBy={this.state.sortBy} onChangeSortBy={this.changeSortBy} extras={this.state.extras} onChangeExtras={this.changeExtras}/>
                    <h1>Workouts</h1>
                    <div className="subheader">
                        Add a workout + what you wish you wore
                        <br />
                        Sorted by relevance to current weather
                    </div>
                </header>
                <div className="content-wrapper">
                    {this.state.runs.map((run, index) => (
                        <div key={index}>
                            <button className="card" onClick={e => this.handleEditRun(run)}>
                                <Run run={run} />
                            </button>
                            <br />
                        </div>
                    ))}
                </div>
                <EditRun run={this.state.editingRun} extras={this.state.extras} update={this.handleDelete} />
                <NavBar update={this.getWorkouts} extras={this.state.extras}/>
            </div>
        )
    }
}