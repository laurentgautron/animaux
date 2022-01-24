import React, {useState, useEffect} from "react"


export default function Pagination(props) {

    const getNumber = (string) => {
        if (string) {
            let tab = string.split("=")
            return parseInt(tab[tab.length -1], 10)
        }
    }

    let [page, setPage] = useState(1)
    let last = getNumber(props.view["hydra:last"])
    let first =getNumber(props.view["hydra:first"])

    useEffect ( () => {
        // change animalPage in CardList component
        props.onPage(page)
    }, [page])

    return ( <div className="d-flex ms-4">
        {props.view != {} &&
        <nav>
            <ul className="animalsPagination  d-flex flex-column flex-sm-row text-center list-unstyled ms-4">
            {first !== page && <li onClick={ () => setPage(page - 1)}>Précédent</li>}
            {first === page && <li className="disabled">Précédent</li>}
            <ul className="d-flex list-unstyled">
                {(page !== first) && <li onClick={ () => setPage(first)}>{first}</li>}
                {page - 1 > 2 && <li>...</li>}
                { page - 1 > first && <li onClick={ () => setPage(page - 1)}>{page - 1 }</li>}
                { page - 3 > first && <li onClick={ () => setPage(page - 2)}>{page - 2 }</li>}
                <li className="actualPage">{page}</li>
                {page + 1 < last && <li onClick={ () => setPage(page + 1)}>{page + 1}</li>}
                {page + 3 < last && <li onClick={ () => setPage(page + 2)}>{page + 2}</li>}
                {(last - page) > 2 && <li>...</li>}
                {page !== last && <li onClick={ () => setPage(last)}>{last}</li>}
            </ul>
            {page === last && <li className="disabled">Suivant</li>}
            {last !== page && <li onClick={ () => setPage(page + 1) }>Suivant</li>}
            </ul>
        </nav>
        }
    </div>
    )
}
