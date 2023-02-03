import { loginWithGoogle, signOutGoogle } from '../firebase'
import { retrieveFavoritesAction } from './charactersDuck'

// Constants
let initialData = {
    loggedIn: false,
    fetching: false
}

const LOGIN = "LOGIN";
const LOGIN_SUCCESS = "LOGIN_SUCCESS";
const LOGIN_ERROR = "LOGIN_ERROR";
const LOG_OUT = "LOG_OUT"

// Reducers
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case LOGIN:
            return { ...state, fetching: true }
        case LOGIN_SUCCESS:
            return { ...state, fetching: false, ...action.payload, loggedIn: true }
        case LOGIN_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case LOG_OUT:
            return { ...initialData }
        default:
            return state
    }
}
// Auxiliar Function
export function saveStorage(storage) {
    console.log("saveStorage()", storage)
    localStorage.storage = JSON.stringify(storage)
}

// Actions (action creator)

export const doGoogleLoginAction = () => (dispatch, getState) => {

    dispatch({
        type: LOGIN
    })
    loginWithGoogle()
        .then(user => {

            dispatch({
                type: LOGIN_SUCCESS,
                payload: {
                    uid: user.uid,
                    displayName: user.displayName,
                    email: user.email,
                    photoURL: user.photoURL
                }
            })

            saveStorage(getState())
            dispatch(retrieveFavoritesAction(dispatch, getState))
        })
        .catch(error => {
            dispatch({
                type: LOGIN_ERROR,
                payload: error.message
            })
        })
}

export const logOutAction = () => dispatch => {
    signOutGoogle()
    dispatch({
        type: LOG_OUT
    })
    localStorage.removeItem("storage")
}

export const restoreSessionAction = () => (dispatch) => {
    let storage = localStorage.getItem("storage")
    storage = JSON.parse(storage)
    if (storage && storage.user) {
        dispatch({
            type: LOGIN_SUCCESS,
            payload: storage.user
        })
    }
}

