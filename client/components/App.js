import React, { useEffect } from "react"
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom"
import { hot } from "react-hot-loader/root"
import "foundation-sites"
import $ from "jquery"
import "../assets/scss/main.scss"

import NavBar from './NavBar.js'

const App = props => {
  useEffect(() => {
    $(document).foundation()
  }, [])

  return (
    <BrowserRouter>
      <Route path='/' component={NavBar} />
    </BrowserRouter>
  )
}

export default hot(App)
