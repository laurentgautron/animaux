import React, {useState} from 'react'


const Modale = ({visible, animalId, context, del, changeId, children}) => {

    const [show, setShow] = useState(visible)

    const handleClick = () => {
        setShow(false)
        del()
        if (changeId) {
            changeId(0)
        }
    }

    const url = '/login/' + animalId
    return (show && <div className="overlay">
            <div className='bg-danger wrapper d-flex flex-column justify-content-center align-items-center'>
                {(context == "change" || context == "add") && <div className='text-center'>
                    <h1>vous devez vous connecter pour faire cette opération</h1>
                    <a className="btn btn-primary mt-4" href={url}>Se connecter</a>
                </div>}
                {(context === "destruction") && <div className='text-center'>
                    <h1>{children}</h1>
                    <button onClick={handleClick} className="btn btn-secondary">oui</button>
                </div>}
                <button onClick={() => setShow(s => !s)} className="shotModale btn btn-secondary">x</button>
            </div>
        </div>
    )
} 

export default Modale