import React from 'react'
import styles from './favs.module.css'
import Card from '../card/Card'
import { connect } from 'react-redux'

function FavPage({ favorites, characters = [0] }) {
    function renderCharacter(char, i) {
        return (
            <Card hide {...char} key={i} />
        )
    }

    return (
        <div className={styles.container}>
            <h2>Favoritos</h2>
            {favorites.map(renderCharacter)}
            {!favorites.length && <h3>No hay personajes agregados</h3>}
        </div>
    )
}

const mapStateToProps = ({ characters }) => {
    return {
        favorites: characters.favorites
    }
}

export default connect(mapStateToProps, {})(FavPage)