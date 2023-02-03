import axios from 'axios'
import { updateDB, getFavorites } from '../firebase'
import { saveStorage } from './userDuck'
// Constants
const initialData = {
    fetching: false,
    charactersArray: [],
    currentCharacter: {},
    favorites: [],
    fetchingFavorites: false,
}

const URL = "https://rickandmortyapi.com/api/character"

const GET_CHARACTERS = "GET_CHARACTERS"
const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"
const REMOVE_CHARACTERS = "REMOVE_CHARACTERS"
const ADD_TO_FAVORITES = "ADD_TO_FAVORITES"

const GET_FAVORITES = "GET_FAVORITES"
const GET_FAVORITES_SUCCESS = "GET_FAVORITES_SUCCESS"
const GET_FAVORITES_ERROR = "GET_FAVORITES_ERROR"


// Reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case REMOVE_CHARACTERS:
            return { ...state, charactersArray: action.payload }
        case GET_CHARACTERS:
            return { ...state, fetching: true }

        case GET_CHARACTERS_ERROR:
            return { ...state, fetching: false, error: action.payload }

        case GET_CHARACTERS_SUCCESS:
            return { ...state, charactersArray: action.payload, fetching: false }

        case ADD_TO_FAVORITES:
            return { ...state, ...action.payload }

        case GET_FAVORITES:
            return { ...state, fetchingFavorites: true }

        case GET_FAVORITES_SUCCESS:
            return { ...state, fetchingFavorites: false, favorites: action.payload }

        case GET_FAVORITES_ERROR:
            return { ...state, fetchingFavorites: false, error: action.payload }

        default:
            return { ...state }
    }
}

// Actions (thunks)

export const retrieveFavoritesAction = () => (dispatch, getState) => {
    dispatch({
        type: GET_FAVORITES
    })

    let { uid } = getState().user


    return getFavorites(uid)
        .then(res => {
            dispatch({
                type: GET_FAVORITES_SUCCESS,
                payload: res ? [...res] : []
            })
        }
        )
        .catch(e => {
            dispatch({
                type: GET_FAVORITES_ERROR,
                payload: e.message
            })
        })
}

export const addToFavoritesAction = () => (dispatch, getState) => {
    let { charactersArray, favorites } = getState().characters
    let character = charactersArray.shift()
    favorites.push(character)
    const { uid } = getState().user
    updateDB(favorites, uid)
    saveStorage(getState())
    dispatch({
        type: ADD_TO_FAVORITES,
        payload: { charactersArray: [...charactersArray], favorites: [...favorites] }
    })
}

export const removeCharacterAction = () => (dispatch, getState) => {
    let charactersArray = getState().characters.charactersArray
    charactersArray.shift()
    dispatch({
        type: REMOVE_CHARACTERS,
        payload: [...charactersArray]
    })
}

export const getCharacterAction = () => (dispatch, getState) => {
    dispatch({
        type: GET_CHARACTERS,
    })

    return axios.get(URL)
        .then(res => {
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                payload: res.data.results
            })
        })
        .catch(err => {
            dispatch({
                type: GET_CHARACTERS_ERROR,
                payload: err.response.message
            })
        })

}