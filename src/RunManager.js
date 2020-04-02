import React from 'react';
import { Run } from './Run'

const API = 'http://localhost:8000';

export class RunManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            workouts: [],
            error: null,
        }
        this.getWorkouts = this.getWorkouts.bind(this);
    }

    componentDidMount() {
        this.getWorkouts();
    }

    apiFetch() {
        return fetch(API + '/api/workouts')
            .then(
                function(response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    return;
                }
            
                // Examine the text in the response
                return response.json().then(function(data) {
                    console.log(data)
                    return data;
                });
                }
            )
            .catch(function(err) {
                console.log('Fetch Error :-S', err);
            });
    }

    getWorkouts() {
        console.log('getting workouts')
        this.apiFetch().then(function (response) {
            this.setState({
                loading: false,
                workouts: response.data || ['hi']
            })
        }.bind(this));
    }

    render() {
        return (
            <div>
                <header className="App-header">
                    <h1>Runs</h1>
                </header>
                    <div>
                        {this.state.workouts.map((item, index) => (
                            <Run key={index} item={item} />
                        ))}
                    </div>
            </div>
        )
    }
}