import React from 'react';
import { MdDehaze } from 'react-icons/md';
import { MdCheck } from 'react-icons/md';
import './sidebar.css';

export class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarOpen: false
        }
        this.handleToggleSidebar = this.handleToggleSidebar.bind(this)
    }

    handleToggleSidebar() {
        this.setState({
            sideBarOpen: !this.state.sideBarOpen
        });
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
                <div className="subitem" onClick={() => this.props.onChangeSortBy('date')}>
                    {this.props.sortBy === "date" ? check : <div className="spacer"></div>}
                    Date
                </div>
                <div className="subitem" onClick={() => this.props.onChangeSortBy('temperature')}>
                    {this.props.sortBy === "temperature" ? check : <div className="spacer"></div>}
                    Temperature
                </div>
            </div>
        );
        return (
            <div>
                <div className="icon" onClick={this.handleToggleSidebar}>
                    <MdDehaze />
                </div>
                {this.state.sideBarOpen ? sidebar : <div></div>}
            </div>
        )
    }
}