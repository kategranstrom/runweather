import React from 'react';
import { MdDehaze } from 'react-icons/md';

export class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sideBarOpen: false
        }
    }

    handleToggleSidebar() {
        this.setState({
            sideBarOpen: !this.state.sideBarOpen
        });
    }

    render() {
        return (
            <MdDehaze />
        )
    }
}