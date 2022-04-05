import React, {useState} from 'react'


const Modale = ({visible, animalId, context, del, changeId}) => {

    const [show, setShow] = useState(visible)

    const handleClick = () => {
        setShow(s => !s)
        del()
        changeId(0)
    }

    const url = '/login/' + animalId

    console.log('dans la modale: ', show)
    return (show && <div className="overlay">
            {console.log('faut connecter')}
            <div className='bg-danger wrapper d-flex flex-column justify-content-center align-items-center'>
                {context === "change" | context === 'add' && <div className='text-center'>
                    <h1>vous devez vous connecter pour faire cette opération</h1>
                    <a href={url}>Se connecter</a>
                </div>}
                {(context === "destruction") && <div className='text-center'>
                    <h1>vous voulez détruire cette fiche ?</h1>
                    <button onClick={handleClick} className="btn btn-secondary">oui</button>
                </div>}
                <button onClick={() => setShow(s => !s)} className="shotModale btn btn-secondary">x</button>
            </div>
        </div>
    )
} 

export default Modale