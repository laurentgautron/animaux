import React, { useEffect,useState } from "react";
import { imageAnimal } from "../services/datas";
import { init } from "../services/utils";

export function Images(props) {

    const [imageList, setImageList] = useState([])
    const [addImage, setAddImage] = useState(false)
    const [indexImage, setIndexImage] = useState(0)
    const [file, setFile] = useState()
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

    const handleChange = (ev) => {
        setFile(ev.target.files[0])
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        let formData = new FormData()
        formData.append("file", file)
        fetch('api/animals/' + props.id + "/image", {
            method: "POST",
            body: formData
        })
        .then(response =>  response.json())
        .then(rep => console.log('la reponse: ', rep))
    }

    const changeImage = (step) => {
        console.log('le step: ', step)
        setIndexImage( index => (index + step+ imageList.length) % imageList.length )
    }

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
            <form name="form" id="form" onSubmit={handleSubmit}>
                <label htmlFor="file">choisir un fichier</label>
                <input type="file" name="file" id="file" onChange={handleChange}/>
                <button type="submit">Ajouter</button>
            </form>
        }
        <button onClick={() => setAddImage(true)}>ajouter une image</button>
    </div>

}