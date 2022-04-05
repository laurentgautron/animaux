import React, { useEffect,useState } from "react";
import AnimalServices from "../services/animals-services";
import { imageAnimal } from "../services/datas";
import { init } from "../services/utils";
import Modale from "./Modale";

export function Images(props) {

    const [imageList, setImageList] = useState([])
    const [addImage, setAddImage] = useState(false)
    const [indexImage, setIndexImage] = useState(0)
    const [file, setFile] = useState()
    const [visible, setVisible] = useState(false)
    const [modaleKey, setMdaleKey] = useState(1)
    const url = "api/image_animals?animal=" + props.id

    useEffect (() => {
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

    const handleAddImage = async () => {
        if (await AnimalServices.checkconnexion()) {
            setAddImage(true)
        } else {
            setVisible(true)
            setMdaleKey(m => m+1)
        }
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
        <h1 className="my-5">{props.children}</h1>
        { imageList.length !== 0 ?
            <div className="pictures d-flex justify-content-center align-items-center">
                { indexImage > 0 && 
                    <button className="btn" onClick={() => changeImage(-1)}>&lt;</button>
                }
                <img src={imageList[indexImage]["imageUrl"]} alt="" />
                { indexImage < imageList.length - 1 && 
                    <button className="btn" onClick={() => changeImage(1)}>&gt;</button>
                }
            </div>
            : <div className="mb-5">
                pas d'images
            </div>
        }
        { addImage &&
            <form name="form" id="form" onSubmit={handleSubmit}>
                <label htmlFor="file">choisir un fichier</label>
                <input type="file" name="file" id="file" onChange={handleChange}/>
                <button className="btn btn-primary" type="submit">Ajouter</button>
            </form>
        }
        <button className="btn btn-primary" onClick={handleAddImage}>ajouter une image</button>
        <Modale visible={visible}
                context="add"
                animalId={props.id}
                key={modaleKey}
        />
    </div>

}