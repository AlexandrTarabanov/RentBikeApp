import React, {Component} from 'react';
import axios from 'axios';

const Bike = props => (
    <tr>
        <td>{props.bike.bikename}</td>
        <td>{props.bike.biketype}</td>
        <td>{props.bike.bikeprice}</td>
        <td>
            <a href="#" onClick={() => {
                props.rentBike(props.bike._id)
            }}>
                <button type="submit" className="btn btn-primary" data-toggle="button" aria-pressed="false"
                        style={{marginRight: 20}}>
                    Rent
                </button>
            </a>
            <a href="#" onClick={() => {
                props.deleteBike(props.bike._id)
            }}>
                <button type="submit" className="btn btn-primary" data-toggle="button" aria-pressed="false">
                    Delete
                </button>
            </a>

        </td>
    </tr>
)

export default class BikeList extends Component {
    constructor(props) {
        super(props);

        this.deleteBike = this.deleteBike.bind(this)
        this.rentBike = this.rentBike.bind(this)

        this.state = {bikes: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/bike/')
            .then(response => {
                this.setState({bikes: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteBike(id) {
        axios.delete('http://localhost:5000/bike/' + id)
            .then(response => {
                console.log(response.data)
            });

        this.setState({
            bikes: this.state.bikes.filter(el => el._id !== id)
        })
    }

    rentBike(id) {
        axios.get('http://localhost:5000/rent/')
            .then(response => {
                if (response.data.length > 0) {
                    this.setState({
                        rents: response.data.map(rent => rent.rentname),
                    })
                }
            })
            .catch((error) => {
                console.log(error);
            })

        //
        let Rented = JSON.stringify(this.state.rents.filter(el => el._id !== id))
        localStorage.setItem('Rented cancel', Rented)
        console.log(JSON.parse(localStorage.getItem('Rented')))
        let RentedItem = JSON.parse(localStorage.getItem('Rented'))
        let rent = {
            rentname: RentedItem.rentname,
            renttype: RentedItem.renttype,
            rentprice: RentedItem.rentprice
        }
        axios.post('http://localhost:5000/bike/add', rent)
            .then(res => console.log(res.data));
        axios.delete('http://localhost:5000/bike/' + id)
            .then(response => {
                console.log(response.data)
            });

        this.setState({
            rents: this.state.rents.filter(el => el._id !== id)
        })

    }

    bikeList() {
        return this.state.bikes.map(currentbike => {
            return <Bike bike={currentbike} deleteBike={this.deleteBike} rentBike={this.rentBike}
                         key={currentbike._id}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>BikeList</h3>
                <table className="table">
                    <thead className="thead-light">
                    <tr>
                        <th>Bikename</th>
                        <th>Biketype</th>
                        <th>Bikeprice</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.bikeList()}
                    </tbody>
                </table>
            </div>
        )
    }
}