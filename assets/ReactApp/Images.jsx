import React, { useEffect,useState } from "react";
import AnimalServices from "../services/animals-services";
import Modale from "./Modale";

export function Images(props) {

    const [imageList, setImageList] = useState([])
    const [addImage, setAddImage] = useState(false)
    const [wantDelete, setWantDelete] = useState(false)
    const [indexImage, setIndexImage] = useState(0)
    const [file, setFile] = useState()
    const [visible, setVisible] = useState(false)
    const [modaleKey, setModaleKey] = useState(1)

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
            console.log('la liste animaux images: ', resp)
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
            setModaleKey(m => m+1)
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
        .then(response => {
            if (response.ok) {
                props.changeKey('image')
            }
        })
    }

    const changeImage = (step) => {
        setIndexImage( index => (index + step+ imageList.length) % imageList.length )
    }

    const handleDelete = async () => {
        if (await AnimalServices.checkconnexion()) {
            setWantDelete(true)
        }
        setVisible(true) 
        setModaleKey(m => m+1)
    }

    const del = () => {
        console.log('bonjour delete')
        fetch('api/image_animals/' + imageList[indexImage]['id'], {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                props.changeKey("image")
            }
        })
    }

    let toggleButtonAddImage = addImage ? 
                        null : 
                        <button className="btn btn-primary" onClick={handleAddImage}>
                            ajouter une image
                        </button>

    return <div className="images">
        <h1 className="my-5">{props.children}</h1>
        { imageList.length !== 0 ? <div className="d-flex flex-column align-items-center">
            <button className="btn btn-primary mb-5" onClick={handleDelete}>supprimer</button>
            <div className="pictures d-flex justify-content-center align-items-center">
                { indexImage > 0 && 
                    <button className="btn" onClick={() => changeImage(-1)}>&lt;</button>
                }
                <img src={imageList[indexImage]["imageUrl"]} alt="" />
                { indexImage < imageList.length - 1 && 
                    <button className="btn" onClick={() => changeImage(1)}>&gt;</button>
                }
            </div>
        </div>
            : <div className="mb-5">
                pas d'images
            </div>
        }
        { addImage &&
            <form onSubmit={handleSubmit}>
                <label htmlFor="file">choisir une image à ajouter</label>
                <input type="file" name="file" id="file" onChange={handleChange}/>
                <button className="btn btn-primary" type="submit">Ajouter</button>
            </form>
        }
        {toggleButtonAddImage}
        {!wantDelete ?
            <Modale visible={visible}
                    context="add"
                    animalId={props.id}
                    key={modaleKey}
            />
        :
            <Modale visible={visible}
                    animalId={props.id}
                    del={del}
                    context="destruction"
                    key={modaleKey}
            />
        }
    </div>

}