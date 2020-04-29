import React from 'react';
import { Modal } from './Modal';
import { AddRunForm } from './AddRunForm';

const API = 'http://localhost:8000'

export class AddRun extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currWeather: null,
            showAddRun: false
        }
        this.getCurrWeather = this.getCurrWeather.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleAddRun = this.handleAddRun.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    componentDidMount() {
        //KGTODO: will the weather update enough?
        this.getCurrWeather();
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
            console.log(data)
            this.setState({
                currWeather: data
            })
        }.bind(this))
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

    handleSubmit(e) {
        //KGTODO: use formData.append
        const formData = new FormData(e.target);
        const date = Date.now();
        var params = 'userId=1&date=' + date + '&';
        for (var [key, val] of formData.entries()) {
            params += key + '=' + val + '&';
        }
        params = params.slice(0, -1);
        this.saveWorkout(params);
    }

    //KGTODO: same struct as codeacademy handleClick does setState?
    handleAddRun(e) {
        this.setState({
            showAddRun: true
        })
    }

    handleCancel(e) {
        this.setState({
            showAddRun: false
        })
    }

    render() {
        return (
            <div>
                <button className="action" onClick={this.handleAddRun}>
                    Add Run
                </button>
                <Modal show={this.state.showAddRun}>
                    <h2>Add Run</h2>
                    <AddRunForm onSubmit={this.handleSubmit} onCancel={this.handleCancel} currWeather={this.state.currWeather} />
                </Modal>
            </div>
        )
    }
}