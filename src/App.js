import React from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css"

import Navbar from './components/navbar.component'
import BikeList from './components/bike-list.component'
import AddBike from './components/add-bike.component'
import RentList from './components/rent-list.component'

function App() {

    return (
        <Router>
            <div className='container'>
                <Navbar/>
                <br/>
                <Route path='/' exect component={BikeList}/>
                <Route path='/add' exect component={AddBike}/>
                <Route path='/rented' exect component={RentList}/>
            </div>
        </Router>

    );
}

export default App;