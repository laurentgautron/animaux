import React from 'react'


const Modale = ({hide, visible, animalId}) => {

    const idTab = animalId.split('/')
    const url = '/login/' + idTab[idTab.length - 1]
    return (visible && <div className='bg-warning'>
        <h1>vou devez vous connecter pour faire cette opération</h1>
        <a href={url}>Se connecter</a>
        <div onClick={hide}>x</div>
    </div>)

} 

export default Modale