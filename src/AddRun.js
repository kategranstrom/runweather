import React from 'react';
import { fetchCurrWeather } from './Utils'
import { Modal } from './Modal';
import { AddRunForm } from './AddRunForm';

export class AddRun extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currWeather: null,
        }
        this.getCurrWeather = this.getCurrWeather.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        //KGTODO: will the weather update enough?
        this.getCurrWeather();
    }

    getCurrWeather() {
        fetchCurrWeather().then(function (data) {
            this.setState({
                currWeather: data
            })
        }.bind(this))
    }

    saveWorkout(params) {
        //KGTODO: edit db to store new params --> variable params?
        fetch('api/workout/', {
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
        formData.append('userId', 1);
        formData.append('date', Date.now())
        const extras = formData.getAll('extras');
        formData.set('extras', JSON.stringify(extras));
        var params = '';
        for (var [key, val] of formData.entries()) {
            params += key + '=' + val + '&';
        }
        params = params.slice(0, -1);
        this.saveWorkout(params);
        e.preventDefault();
        this.props.update();
    }

    render() {
        return (
            <Modal show={this.props.showAddRun}>
                <h2>Add Workout</h2>
                <AddRunForm onSubmit={this.handleSubmit} onCancel={this.props.onCancel} currWeather={this.state.currWeather} extras={this.props.extras} />
            </Modal>
        )
    }
}