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
    const [featuredOption, setFeaturedOption] = useState(false)

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

    const handleChangeFeatured = (ev) => {
        let bool = ev.target.value === "yes" ? true : false
        setFeaturedOption(bool)
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
        formData.append("featured", featuredOption)
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
        setIndexImage( index => (index + step + imageList.length) % imageList.length )
    }

    const handleDelete = async () => {
        if (await AnimalServices.checkconnexion()) {
            setWantDelete(true)
        }
        setVisible(true) 
        setModaleKey(m => m+1)
    }

    const del = () => {
        console.log('bonjour delete: ', imageList)
        fetch('api/image_animals/' + imageList[indexImage]['id'], {
            method: "DELETE"
        })
        .then(response => {
            if (response.ok) {
                props.changeKey("image")
            }
        })
    }

    const handleFeatured = () => {
        console.log("j'envoie: ", imageList[indexImage])
        fetch("featured/image/" + imageList[indexImage]['id'])
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
            <button className="btn btn-primary mb-5" onClick={handleFeatured}>mettre en avant</button>
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
            <form onSubmit={handleSubmit} className="mb-5">
                <label htmlFor="file">choisir une image à ajouter</label>
                <input className="mb-4" type="file" name="file" id="file" onChange={handleChange}/>
                <p>mettre en avant ?</p>
                    <div className="form-check">
                        <input className="form-check-input" 
                               type="radio" 
                               name="featured" 
                               value="yes" 
                               id="yes"
                               checked={featuredOption === true} 
                               onChange={handleChangeFeatured}/>
                        <label className="form-check-label" htmlFor="yes">oui</label>
                    </div>
                    <div className="form-check">
                        <input className="form-check-input" 
                               type="radio" 
                               name="featured" 
                               value="no" 
                               id="no"
                               onChange={handleChangeFeatured}
                               checked={featuredOption === false}/>
                        <label className="form-check-label" htmlFor="no">non</label>
                    </div>
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
            >
            vous voulez détruire cette image ?
            </Modale>
        }
    </div>

}