import React from 'react'
import styles from './login.module.css'
import { connect } from 'react-redux'
import { doGoogleLoginAction, logOutAction } from '../../redux/userDuck'

function LoginPage({ fetching, loggedIn, doGoogleLoginAction, logOutAction }) {

    const doLogin = () => {
        doGoogleLoginAction()
    }
    const logOut = () => {
        logOutAction()
    }
    if (fetching) return <h2>Cargando...</h2>

    return (
        <div className={styles.container}>
            {!loggedIn ?
                <h1>Inicia Sesión con Google</h1> :
                <h1>Cierra tu sesión</h1>
            }
            {!loggedIn ?
                <button onClick={doLogin}>Iniciar</button> :
                <button onClick={logOut}>Cerrar Sesión</button>
            }
        </div>
    )
}

function mapStateToProps({ user }) {
    return {
        fetching: user.fetching,
        loggedIn: user.loggedIn
    }
}

export default connect(mapStateToProps, { doGoogleLoginAction, logOutAction })(LoginPage)