import React from 'react'
import { Route, Switch, Redirect, Link } from 'react-router-dom'

import PetTypesList from './PetTypesList.js'
import AdoptablePetType from './AdoptablePetType'
import AdoptablePetTypeShow from './AdoptablePetTypeShow'
import SurrenderForm from './SurrenderForm'

const NavBar = props =>{
  return(
    <div>

      <Link to='/pets'>Welcome Page</Link>
      <Link to='/pets/cats'>Cats</Link>
      <Link to='/pets/dogs'>Dogs</Link>
      <Link to='/pets/foxes'>Foxes</Link>
      <Link to='/adoption/new'>Surrender Your Pet</Link>
      
      <Switch>
        <Route exact path='/'>
          <Redirect to='/pets' />
        </Route>
        <Route exact path='/pets' component={PetTypesList} />
        <Route exact path = '/pets/:type' component={AdoptablePetType} />
        <Route exact path ='/pets/:type/:id' component = {AdoptablePetTypeShow} />
        <Route exact path = '/adoptions/new' component = {SurrenderForm} />
      </Switch>
    </div>

    
  )
}

export default NavBar