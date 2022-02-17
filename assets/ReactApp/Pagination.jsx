import React, {useState, useEffect} from "react"

export default function Pagination(props) {

    const getNumber = (string) => {
        if (string) {
            let tab = string.split("=")
            return parseInt(tab[tab.length -1], 10)
        }
    }
    
    const [page, setPage] = useState(1)
    let [last, first] = ['','']
    if (props.view !== undefined) {
        last = getNumber(props.view["hydra:last"])
        first = getNumber(props.view["hydra:first"])
        console.log('le last du if; ', last)
    }

    const makeUrl = (page) => {
        if (props.view["hydra:last"])  {
            console.log('le last: ', props.view["hydra:last"])
            let urlTab = props.view["@id"].split("=")
            urlTab[urlTab.length - 1] = page
            console.log('la page: ', urlTab.join('='))
            return urlTab.join("=")
        }
    }
    
    useEffect ( () => {
        if (props.view !== undefined && props.view["hydra:last"]) {
            props.onPage(makeUrl(page))
        }
    }, [page])
    
    return ( <div className="d-flex ms-4">
        {props.view !== undefined && props.view["hydra:last"] &&
            <nav>
                <ul className="animalsPagination  d-flex flex-column flex-sm-row text-center list-unstyled ms-4">
                {(first !== undefined && first !== page) && <a href="#beginning"><li onClick={ () => setPage(page - 1)}>Précédent</li></a>}
                {(first === undefined || first === page) && <a href="#beginning"><li className="disabled">Précédent</li></a>}
                <ul className="d-flex list-unstyled">
                    {(page !== first) && <a href="#beginning"><li onClick={ () => setPage(first)}>{first}</li></a>}
                    {page - 1 > 2 && <li>...</li>}
                    { page - 1 > first && <a href="#beginning"><li onClick={ () => setPage(page - 1)}>{page - 1 }</li></a>}
                    { page - 3 > first && <a href="#beginning"><li onClick={ () => setPage(page - 2)}>{page - 2 }</li></a>}
                    <li className="actualPage">{page}</li>
                    {page + 1 < last && <a href="#beginning"><li onClick={ () => setPage(page + 1)}>{page + 1}</li></a>}
                    {page + 3 < last && <a href="#beginning"><li onClick={ () => setPage(page + 2)}>{page + 2}</li></a>}
                    {(last - page) > 2 && <li>...</li>}
                    {page !== last && <a href="#beginning"><li onClick={ () => setPage(last)}>{last}</li></a>}
                </ul>
                {(last === undefined || page === last) && <a href="#beginning"><li className="disabled">Suivant</li></a>}
                {(last !== undefined && last !== page) && <a href="#beginning"><li onClick={ () => setPage(page + 1) }>Suivant</li></a>}
                </ul>
            </nav>
        }
    </div>
    )
}
