import React from 'react';

export class AddRunForm extends React.Component {
    pad(n) {
        return (n < 10) ? "0" + n : n;
    }
    getDate() {
        const today = new Date();
        const month = this.pad(today.getMonth() + 1);
        const date = this.pad(today.getDate());
        return today.getFullYear() + '-' + month + '-' + date;
    }
    
    render() {
        return (
            <form onSubmit={this.props.onSubmit}>
                <label htmlFor="date">Date:</label>
                <input type="date" defaultValue={this.getDate()} id="date" name="date" />
                <input type="submit" name="submit" value="Add" />
            </form>
        )
    }
}