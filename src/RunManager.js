import React from 'react';
import { Run } from './Run';
import { AddRun } from './AddRun';
import { EditRun } from './EditRun';
import { Modal } from './Modal';

const API = 'http://localhost:8000';

export class RunManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            runs: [],
            editingRun: null,
            currWeather: null,
            showEditRun: false,
        }
        this.getWorkouts = this.getWorkouts.bind(this);
        this.handleUpdateRun = this.handleUpdateRun.bind(this);
        this.handleDeleteRun = this.handleDeleteRun.bind(this);
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
            this.setState({
                loading: false,
                runs: response.data || []
            })
        }.bind(this));
    }

    updateWorkout(id, params) {
        //KGTODO: edit db to store new params --> variable params?
        fetch(API + '/api/updateworkout/' + id, {
            method: 'POST',
            headers: {
                "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
            },
            body: params,
            mode: 'no-cors'
        }).then(function (data) {
            console.log('Request succeeded with JSON response', data);
        }).catch(function (error) {
            console.log('Request failed', error)
        })
    }

    deleteWorkout(id) {
        fetch('http://localhost:8000/api/workout/delete/' + id)
            .then(function (data) {
                console.log('Request succeeded with JSON response', data);
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }

    handleEditRun(run) {
        this.setState({
            editingRun: run,
            showEditRun: true,
            showAddRun: false
        })
    }

    handleUpdateRun(e) {
        const formData = new FormData(e.target);
        const run = this.state.editingRun;
        var params = 'userId=' + run.userId + '&date=' + run.date + '&temperature=' + run.temperature + '&';
        for (var [key, val] of formData.entries()) {
            params += key + '=' + val + '&';
        }
        params = params.slice(0, -1);
        this.updateWorkout(run.id, params);
    }

    handleDeleteRun(e) {
        this.deleteWorkout(this.state.editingRun.id)
        this.setState({
            editingRun: null,
            showEditRun: false
        })
        this.getWorkouts();
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <h1>Runs</h1>
                </header>
                <div>
                    {this.state.runs.map((run, index) => (
                        <div key={index}>
                            <button onClick={e => this.handleEditRun(run)}>
                                <Run run={run} />
                            </button>
                            <br />
                        </div>
                    ))}
                </div>
                <AddRun />
                <Modal show={this.state.showEditRun}>
                    <EditRun run={this.state.editingRun} onSubmit={this.handleUpdateRun} onDelete={this.handleDeleteRun} />
                </Modal>
            </div>
        )
    }
}