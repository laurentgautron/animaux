import React, { useEffect,useState } from "react";
import { imageAnimal } from "../services/datas";
import { init } from "../services/utils";

export function Images(props) {

    const [imageList, setImageList] = useState([])
    const [addImage, setAddImage] = useState(false)
    const [indexImage, setIndexImage] = useState(0)
    const url = "api/image_animals?animal=" + props.id

    useEffect ( () => {
        console.log('url pour images: ', url)
        fetch(url, {
            method: 'GET',
            hedaers: {'Content-Type': 'application/json'}
        })
        .then(response => {
            return response.json()
        })
        .then(resp => {
            setImageList(resp)
        })
    },[])

    const handleSubmit = (ev) => {
        const file = document.getElementById('file').files[0]
        console.log('le fichier: ', file)
        ev.preventDefault()
        fetch('api/animals/' + props.id + "/image", {
            method: "POST",
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            body: {file: file}
        })
        .then(response => {
            console.log(response)
            response.json()
        })
        .then(rep => console.log('la reponse: ', rep))
    }

    const changeImage = (step) => {
        console.log('le step: ', step)
        setIndexImage( index => (index + step+ imageList.length) % imageList.length )
    }

    console.log('le index: ', indexImage)
    return <div className="images">
        <h1>{props.children}</h1>
        { imageList.length !== 0 &&
            <div className="d-flex">
                { indexImage > 0 && <button onClick={() => changeImage(-1)}>&lt;</button>}
                <img src={imageList[indexImage]["imageUrl"]} alt="" />
                { indexImage < imageList.length - 1 && <button onClick={() => changeImage(1)}>&gt;</button>}
            </div>
        }
        { addImage &&
            <form onSubmit={handleSubmit}>
                <label htmlFor="file">choisir un fichier</label>
                <input type="file" name="file" id="file" />
                <button type="submit">Ajouter</button>
            </form>
        }
        <button onClick={() => setAddImage(true)}>ajouter une image</button>
    </div>

}