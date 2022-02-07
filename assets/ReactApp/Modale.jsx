import React from 'react'


const Modale = ({hide, visible, animalId, context, del}) => {

    const handleClick = () => {
        hide()
        del()
    }

    const idTab = animalId.split('/')
    const url = '/login/' + idTab[idTab.length - 1]

    return (visible && <div className='bg-warning'>
        {context === "change" && <div>
            <h1>vou devez vous connecter pour faire cette opération</h1>
            <a href={url}>Se connecter</a>
        </div>}
        {context === "destruction" && <div>
            <h1>Vous voulez détruire cette fiche ?</h1>
            <button onClick={handleClick}>oui</button>
        </div>}
        <div onClick={hide}>x</div>
    </div>)

} 

export default Modale