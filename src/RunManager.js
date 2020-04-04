import React from 'react';
import { Run } from './Run';
import { Modal } from './Modal';
import { AddRunForm } from './AddRunForm';
import { EditRun } from './EditRun';

const API = 'http://localhost:8000';

export class RunManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            runs: [],
            editingRun: null,
            currWeather: null,
            showAddRun: false,
            showEditRun: false,
        }
        this.getWorkouts = this.getWorkouts.bind(this);
        this.getCurrWeather = this.getCurrWeather.bind(this);
        this.handleAddRun = this.handleAddRun.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUpdateRun = this.handleUpdateRun.bind(this);
        this.handleDeleteRun = this.handleDeleteRun.bind(this);
    }

    componentDidMount() {
        this.getWorkouts();
        //KGTODO: will the weather update enough?
        this.getCurrWeather();
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

    fetchCurrWeather() {
        var key = 'cfa60c427275f8728cc2d1a469c4edb2';
        //KGTODO: make this variable
        var city = 'Revelstoke'
        return fetch('https://api.openweathermap.org/data/2.5/weather?q=' + city + '&appid=' + key)
            .then(function (response) { return response.json() })
    }

    getCurrWeather() {
        this.fetchCurrWeather().then(function (data) {
            console.error(data)
            //KGTODO: store a weather obj w desc, wind, etc
            this.setState({
                currWeather: data
            })
        }.bind(this))
    }

    //KGTODO: same struct as codeacademy handleClick does setState?
    handleAddRun(e) {
        this.setState({
            showAddRun: true,
            showEditRun: false
        })
    }

    saveWorkout(params) {
        //KGTODO: edit db to store new params --> variable params?
        fetch(API + '/api/workout/', {
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

    handleSubmit(e) {
        const formData = new FormData(e.target);
        const date = Date.now();
        var params = 'userId=1&date=' + date + '&';
        for (var [key, val] of formData.entries()) {
            params += key + '=' + val + '&';
        }
        params = params.slice(0, -1);
        this.saveWorkout(params);
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
                <button onClick={this.handleAddRun}>
                    Add Run
                    </button>
                <Modal show={this.state.showAddRun}>
                    <AddRunForm onSubmit={this.handleSubmit} currWeather={this.state.currWeather} />
                </Modal>
                <Modal show={this.state.showEditRun}>
                    <EditRun run={this.state.editingRun} onSubmit={this.handleUpdateRun} onDelete={this.handleDeleteRun} />
                </Modal>
            </div>
        )
    }
}