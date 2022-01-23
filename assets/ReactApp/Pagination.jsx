import React, {useState, useEffect} from "react"


export default function Pagination(props) {

    const getNumber = (string) => {
        if (string) {
            let tab = string.split("=")
            return tab[tab.length -1]
        }
    }

    let [page, setPage] = useState(props.activePage)
    let [previous, setPrevious] = useState()
    let [next, setNext] = useState()

    useEffect ( () => {
        console.log("la page renvoyée: ", page)
        setPrevious(getNumber(props.view["hydra:previous"]))
        setNext(getNumber(props.view["hydra:next"]))
        props.onPage(page)
    }, [page])

    
    
    console.log('avant: ', previous)
    console.log('après: ', next)
    console.log('la page actuele: ', page)
    console.log('la d ernière: ', getNumber(props.view["hydra:last"]))
    console.log('pas la dernière: ', page != getNumber(props.view["hydra:last"]))
    return ( <div>
        <div>la page envoyée de cardlist: {props.activePage}</div>
        <ul className="animalsPagination d-flex list-unstyled">
        {props.view["hydra:previous"] && <li onClick={ () => setPage(page - 1)}>Pécédent</li>}
        {(page != getNumber(props.view["hydra:first"])) && <li className="derniere">{getNumber(props.view["hydra:first"])}</li>}
        {page - 1 > 2 && <li>...</li>}
        { page - 1 > getNumber(props.view["hydra:first"]) && <li>{page - 1 }</li>}
        { page - 3 > getNumber(props.view["hydra:first"]) && <li>{page - 2 }</li>}
        <li className="actualPage text-primary">{page}</li>
        {page + 1 < getNumber(props.view["hydra:last"]) && <li>{page + 1}</li>}
        {page + 3 < getNumber(props.view["hydra:last"]) && <li>{page + 2}</li>}
        {(getNumber(props.view["hydra:last"]) - page) > 2 && <li>...</li>}
        {(page != getNumber(props.view["hydra:last"])) && <li className="derniere">{getNumber(props.view["hydra:last"])}</li>}
        {props.view["hydra:next"] && <li onClick={ () => setPage(page + 1)}>Suivant</li>}
        </ul>
    </div>
    )
}
