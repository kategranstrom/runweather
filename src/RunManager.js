import React from 'react';
import { Run } from './Run';
import { SideBar } from './SideBar';
import { AddRun } from './AddRun';
import { EditRun } from './EditRun';

const API = 'http://localhost:8000';

export class RunManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            runs: [],
            sortBy: 'date',
            editingRun: null
        }
        this.getWorkouts = this.getWorkouts.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.changeSorting = this.changeSorting.bind(this);
    }

    componentDidMount() {
        this.getWorkouts();
    }

    fetchWorkouts() {
        return fetch(API + '/api/workouts')
            .then(
                function (response) {
                    if (response.status !== 200) {
                        console.log('Looks like there was a problem. Status Code: ' +
                            response.status);
                        return;
                    }

                    // Examine the text in the response
                    return response.json().then(function (data) {
                        console.log(data)
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
            const runs = response.data;
            runs.sort((a, b) => a[this.state.sortBy] - b[this.state.sortBy])
            this.setState({
                loading: false,
                runs: response.data || []
            })
        }.bind(this));
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
        this.getWorkouts()
    }

    changeSorting(newSortBy) {
        this.setState({
            sortBy: newSortBy
        })
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <h1>Runs</h1>
                </header>
                <SideBar onChangeSortBy={this.ChangeSortBy}/>
                <div className="content-wrapper">
                    {this.state.runs.map((run, index) => (
                        <div key={index}>
                            <button className="card" onClick={e => this.handleEditRun(run)}>
                                <Run run={run} />
                                <span className="ripple"></span>
                            </button>
                            <br />
                        </div>
                    ))}
                </div>
                <AddRun />
                <EditRun run={this.state.editingRun} update={this.handleDelete} />
            </div>
        )
    }
}