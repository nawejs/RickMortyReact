import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './components/home/HomePage'
import FavPage from './components/favs/FavPage'
import LoginPage from './components/login/LoginPage'

import { connect } from 'react-redux'

// function PrivateRoute({ path, component, ...rest }) {
//     let storage = localStorage.getItem("storage")
//     storage = JSON.parse(storage)
//     if (storage && storage.user) return <Route path={path} component={component} />
//     else return <Redirect to="/login" {...rest} />
// }

function PrivateRoute({ path, component, loggedIn, ...rest }) {
    return loggedIn ?
        <Route path={path} component={component} /> : <Redirect to="/login" {...rest} />
}

function Routes({ loggedIn }) {
    return (
        <Switch>
            <PrivateRoute exact path="/" component={Home} loggedIn={loggedIn} />
            <PrivateRoute path="/favs" component={FavPage} loggedIn={loggedIn} />
            <Route path="/login" component={LoginPage} loggedIn={loggedIn} />
        </Switch>
    )
}
function mapStateToProps({ user }) {
    return {
        loggedIn: user.loggedIn
    }
}

export default connect(mapStateToProps, {})(Routes)