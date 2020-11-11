import React, {Component} from 'react';
import axios from 'axios';

const Rent = props => (
    <tr>
        <td>{props.rent.rentname}</td>
        <td>{props.rent.renttype}</td>
        <td>{props.rent.rentprice}</td>
        <td>
            <a href="#" onClick={() => {
                props.cancelRent(props.rent._id)
            }}>
                <button type="submit" className="btn btn-primary" data-toggle="button" aria-pressed="false">
                    Cancel rent
                </button>
            </a>
        </td>
    </tr>
)

export default class RentList extends Component {
    constructor(props) {
        super(props);

        this.cancelRent = this.cancelRent.bind(this)
        this.state = {rents: []};

    }

    componentDidMount() {
        const Rented = localStorage.getItem('Rented')
        axios.get('http://localhost:5000/rent/')
            .then(response => {
                this.setState({rents: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    cancelRent(id) {
        axios.get('http://localhost:5000/bike/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        bikes: response.data.map(bike => bike.bikename),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

        let RentedCancel = JSON.stringify(this.state.rents.filter(el => el._id !== id))
        localStorage.setItem('Rented cancel', RentedCancel)
        let RentedItem = JSON.parse(localStorage.getItem('Rented cancel'))
        let bike = {
            bikename: RentedItem.rentname,
            biketype: RentedItem.renttype,
            bikeprice: RentedItem.rentprice
        }
        console.log(bike)
        axios.post('http://localhost:5000/bike/add', bike)
            .then(res => console.log(res.data));
        axios.delete('http://localhost:5000/rent/' + id)
            .then(response => {
                console.log(response.data)
            });

        this.setState({
            rents: this.state.rents.filter(el => el._id !== id)
        })

    }
    rentList() {
        return this.state.rents.map(currentrent => {
            return <Rent rent={currentrent} cancelRent={this.cancelRent} key={currentrent._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>RentList</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Bikename</th>
                        <th>Biketype</th>
                        <th>Bikeprice</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.rentList()}
                    </tbody>
                </table>
            </div>
        )
    }
}