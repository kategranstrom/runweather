import React from 'react';
import { Modal } from './Modal';
import { EditRunForm } from './EditRunForm';

export class EditRun extends React.Component {
    constructor(props) {
        super(props);
        this.handleUpdateRun = this.handleUpdateRun.bind(this);
        this.handleDeleteRun = this.handleDeleteRun.bind(this);
    }

    updateWorkout(id, params) {
        //KGTODO: edit db to store new params --> variable params?
        fetch('api/updateworkout/' + id, {
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
        fetch('api/workout/delete/' + id)
            .then(function (data) {
                console.log('Request succeeded with JSON response', data);
            })
            .catch(function (error) {
                console.log('Request failed', error);
            });
    }

    handleUpdateRun(e) {
        const formData = new FormData(e.target);
        const extras = formData.getAll('extras');
        formData.set('extras', JSON.stringify(extras));
        const run = this.props.run;
        var params = 'userId=' + run.userId + '&date=' + run.date + '&temperature=' + run.temperature + '&';
        for (var [key, val] of formData.entries()) {
            params += key + '=' + val + '&';
        }
        params = params.slice(0, -1);
        this.updateWorkout(run.id, params);
        e.preventDefault();
        this.props.update();
    }

    handleDeleteRun(e) {
        this.deleteWorkout(this.props.run.id)
        this.props.update();
    }

    render() {
        const showEditRun = this.props.run ? true : false;
        return (
            <Modal show={showEditRun}>
                <EditRunForm run={this.props.run} extras={this.props.extras} onSubmit={this.handleUpdateRun} onDelete={this.handleDeleteRun} />
            </Modal>
        )
    }
}