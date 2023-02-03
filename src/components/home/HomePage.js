import React from 'react'
import Card from '../card/Card'
import styles from './home.module.css'
import { connect } from 'react-redux'
import { removeCharacterAction, addToFavoritesAction } from '../../redux/charactersDuck'

function Home({ characters, removeCharacter, addToFavoritesAction }) {

    function renderCharacter() {
        let character = characters[0]
        return (
            <Card
                leftClick={nextCharacter}
                rightClick={addToFavorites}
                {...character}
            />
        )
    }
    const nextCharacter = () => {
        removeCharacter()

    }

    const addToFavorites = () => {
        addToFavoritesAction()
    }

    return (
        <div className={styles.container}>
            <h2>Personajes de Rick y Morty</h2>
            <div>
                {renderCharacter()}
            </div>
        </div>
    )
}
function mapStateToProps(state) {
    return {
        characters: state.characters.charactersArray
    }
}
// function mapDispatchToProps() {}

export default connect(mapStateToProps, {
    removeCharacter: removeCharacterAction,
    addToFavoritesAction: addToFavoritesAction
})(Home)