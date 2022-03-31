import React, { useEffect,useState } from "react";

export function Images(props) {

    const[imageList, setImageList] = useState([]);
    const url = "api/image_animals?animal=" + props.id

    useEffect ( () => {
        console.log('url pour images: ', url)
        fetch(url, {
            method: 'GET',
            hedaers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            console.log('la response json: ', response)
            return response.json()
        })
        .then(resp => {
            console.log('la reponse: ', resp)
            setImageList(resp)
        })
    },[])

    return <div className="images">
        { imageList &&
            <ul>
                {imageList.map( image => {
                    return <li key={image.imageUrl}><img src={image.imageUrl}></img></li>
                })}
            </ul>
        }
    </div>

}