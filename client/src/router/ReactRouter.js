import React from 'react'
// import { Switch, Route, Redirect } from 'react-router'
import { Switch, Route } from 'react-router'
// import cookie from 'cookie'

import Home from '../components/Home'
import Login from '../components/Login'
import Signup from '../components/Signup'
import PlayerPage from '../components/PlayerPage'
import Farkle from '../components/farkle/Farkle'

// const checkAuth = () => {
//     const cookies = cookie.parse(document.cookie)
//     return cookies["username"] ? true : false
//     return true;
// }

// const ProtectedRoute = ({component: Component, ...rest}) => {
//     return (
//         <Route
//         {...rest}
//         render={(props) => checkAuth()
//             ? <Component {...props} />
//             : <Redirect to="/login" />}
//         />
//     )
// }

const Router = () => {
    return(
        <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={Signup} />
            <Route path='/playerpage' component={PlayerPage} />
            <Route path='/farkle' component={Farkle} />
            {/* <ProtectedRoute path='/farkle' component={Farkle}/> */}
        </Switch>
    )
}

export default Router