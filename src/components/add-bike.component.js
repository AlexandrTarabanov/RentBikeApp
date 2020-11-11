import React, {Component} from 'react'
import axios from 'axios';


export default class AddBike extends Component {
    constructor(props) {
        super(props);

        this.onChangeBikename = this.onChangeBikename.bind(this);
        this.onChangeBiketype = this.onChangeBiketype.bind(this);
        this.onChangeBikeprice = this.onChangeBikeprice.bind(this);
        this.onSubmit = this.onSubmit.bind(this)

        this.state = {
            bikename: '',
            biketype: '',
            bikeprice: 0,
            bikes: []
        }
    }

    componentDidMount() {
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

    }

    onChangeBikename(e) {
        this.setState({
            bikename: e.target.value
        })
    }

    onChangeBiketype(e) {
        this.setState({
            biketype: e.target.value
        })
    }

    onChangeBikeprice(e) {
        this.setState({
            bikeprice: e.target.value
        })
    }

    onSubmit(e) {
        e.preventDefault();

        const bike = {
            bikename: this.state.bikename,
            biketype: this.state.biketype,
            bikeprice: this.state.bikeprice
        }

        console.log(bike);

        axios.post('http://localhost:5000/bike/add', bike)
            .then(res => console.log(res.data));

        window.location = '/';
    }

    render() {
        return (
            <div>
                <h3>Add bike</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-3">
                            <label>Bike name</label>
                            <input type="text"
                                   required
                                   value={this.state.bikename}
                                   onChange={this.onChangeBikename}
                                   className="form-control"/>
                        </div>
                        <div className="form-group col-md-3">
                            <label htmlFor="inputState">Bike type</label>
                            <select type='text'
                                    required
                                    value={this.state.biketype}
                                    onChange={this.onChangeBiketype}
                                    className="form-control">
                                <option value='Mountain'>Change...</option>
                                <option value='Mountain'>Mountain</option>
                                <option value='Trial'>Trial</option>
                                <option value='Road'>Road</option>
                                <option value='City'>City</option>
                            </select>
                        </div>
                        <div className="form-group col-md-3">
                            <label>Rent price</label>
                            <input type="text"
                                   required
                                   value={this.state.bikeprice}
                                   onChange={this.onChangeBikeprice}
                                   className="form-control"/>
                        </div>
                        <div>
                            <button type="submit" className="btn btn-primary" data-toggle="button" aria-pressed="false"
                                    style={{margin: 30}}>
                                Add Bike
                            </button>
                        </div>
                    </div>


                </form>
            </div>
        )
    }
}