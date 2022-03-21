/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './bootstrap';
import './styles/app.scss';
import React from 'react'
import ReactDOM from 'react-dom'
import HelloApp from './ReactApp/HelloApp'

if (document.getElementById("root")) {
    const id = parseInt(document.getElementById('root').dataset.id, 10)
    ReactDOM.render(
        <React.StrictMode>
            <HelloApp id={id}/>
        </React.StrictMode>, 
    document.getElementById("root"))
}

