import React, {useState} from 'react'


const Modale = ({visible, animalId, context, del, changeId}) => {

    const [show, setShow] = useState(visible)

    const handleClick = () => {
        setShow(s => !s)
        del()
        changeId(0)
    }

    const url = '/login/' + animalId


    return (show && <div className="overlay">
            <div className='bg-warning wrapper d-flex flex-column justify-content-center align-items-center'>
                {context === "change" && <div className='text-center'>
                    <h1>vous devez vous connecter pour faire cette opération</h1>
                    <a href={url}>Se connecter</a>
                </div>}
                {context === "destruction" && <div className='text-center'>
                    <h1>vous voulez détruire cette fiche ?</h1>
                    <button onClick={handleClick}>oui</button>
                </div>}
                <div onClick={() => setShow(s => !s)} className="shotModale">x</div>
            </div>
        </div>
    )
} 

export default Modale