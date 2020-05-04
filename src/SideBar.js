import React from 'react';
import { MdDehaze } from 'react-icons/md';
import { MdCheck } from 'react-icons/md';
import { MdHighlightOff } from 'react-icons/md';
import { MdAdd } from 'react-icons/md';
import './sidebar.css';

export class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarOpen: false,
            newExtra: ''
        }
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
        this.handleChange = this.handleChange.bind(this);
        this.addExtra = this.addExtra.bind(this);;
        this.deleteExtra = this.deleteExtra.bind(this);
    }

    handleToggleSidebar() {
        this.setState({
            sideBarOpen: !this.state.sideBarOpen
        });
    }

    handleChange(e) {
        this.setState({newExtra: e.target.value})
    }

    addExtra(e) {
        e.preventDefault();
        if(this.state.newExtra === '') return;
        let newExtras = this.props.extras;
        newExtras.push(this.state.newExtra);
        this.setState({
            newExtra: ''
        })
        this.props.onChangeExtras(newExtras);
    }

    deleteExtra(extra) {
        let newExtras = this.props.extras;
        newExtras.splice(newExtras.indexOf(extra), 1);
        this.props.onChangeExtras(newExtras);
    }

    render() {
        const check = (
            <div className="check">
                <MdCheck />
            </div>
        );
        const sidebar = (
            <div className="sidebar">
                <div className="listitem">
                    Sort By
                </div>
                <div className="subsortby" onClick={() => this.props.onChangeSortBy('date')}>
                    {this.props.sortBy === "date" ? check : <div className="spacer"></div>}
                    Date
                </div>
                <div className="subsortby" onClick={() => this.props.onChangeSortBy('temperature')}>
                    {this.props.sortBy === "temperature" ? check : <div className="spacer"></div>}
                    Temperature
                </div>
                <div className="subsortby" onClick={() => this.props.onChangeSortBy('mostrelevant')}>
                    {this.props.sortBy === "mostrelevant" ? check : <div className="spacer"></div>}
                    Most Relevant
                </div>
                <div className="listitem">
                    Also Track
                </div>
                {this.props.extras.map((extra, index) => (
                    <div className="subalsotrack" key={index}>
                        {extra}
                        <div className="righticon" onClick={() => this.deleteExtra(extra)}> <MdHighlightOff /> </div>
                    </div>
                ))}
                <form onSubmit={this.addExtra}>
                    <div className="lefticon" onClick={this.addExtra}> <MdAdd /> </div>
                    <input type="text" value={this.state.newExtra} onChange={this.handleChange} placeholder = "Add new..." className="subalsotrack" />
                </form>
            </div>
        );
        return (
            <div>
                <div className="menuicon" onClick={this.handleToggleSidebar}>
                    <MdDehaze />
                </div>
                {this.state.sideBarOpen ? sidebar : <div></div>}
            </div>
        )
    }
}