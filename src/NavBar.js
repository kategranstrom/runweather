import React from 'react'
import { AddRun } from './AddRun';
import { MdAdd } from 'react-icons/md';
import './navbar.css'

export class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showAddRun: false
        }
        this.toggleAddRun = this.toggleAddRun.bind(this);
        this.update = this.update.bind(this);
    }

    toggleAddRun(e) {
        this.setState({
            showAddRun: !this.state.showAddRun
        })
    }

    update() {
        this.toggleAddRun();
        this.props.update();
    }

    render() {
        return (
            <div>
                <div className="navbar">
                    <div className="navitem" onClick={this.toggleAddRun}>
                        <div className="navicon"> <MdAdd /> </div>
                        Add Run
                    </div>
                </div>
                <AddRun showAddRun={this.state.showAddRun} onCancel={this.toggleAddRun} update={this.update} extras={this.props.extras}/>
            </div>
        )
    }
}