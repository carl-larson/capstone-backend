import React from 'react'
import { Switch, Route, Redirect } from 'react-router'
// import { Switch, Route } from 'react-router'
import Cookies from 'js-cookie'

import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
import PlayerPage from '../components/PlayerPage'
import Farkle from '../components/farkle/Farkle'
import FarkleRules from '../components/farkle/FarkleRules'

const checkAuth = () => {
    const cookiesUsername = Cookies.get("username")
    return cookiesUsername ? true : false
}

const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={(props) => checkAuth()
            ? <Component {...props} />
            : <Redirect to="/login" />}
        />
    )
}

const Router = () => {
    return(
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <ProtectedRoute path='/playerpage' component={PlayerPage} />
            <Route path='/farkle' component={Farkle} />
            <Route path='/farklerules' component={FarkleRules}/>
            {/* <ProtectedRoute path='/farkle' component={Farkle}/> */}
        </Switch>
    )
}

export default Router