import React from 'react'

const Modale = ({hide, visible}) => visible ? 
    <div>
        <h1>bonjour</h1>
        <p onClick={hide}>x</p>
    </div>
:null 

export default Modale