/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
//import 'bootswatch/dist/superhero/bootstrap.css'
import './styles/app.scss';



// start the Stimulus application
import './bootstrap';
import React from 'react'
import ReactDOM from 'react-dom'
import HelloApp from './ReactApp/HelloApp'

if (document.getElementById("root")) {
    const id = parseInt(document.getElementById('root').dataset.id, 10)
    if (id === 0) {
        console.log('pas id: ', id)
        ReactDOM.render(<HelloApp />, document.getElementById("root"))
        
    } else {
        console.log('un id: ', id)
        ReactDOM.render(<HelloApp  id={id}/>, document.getElementById("root"))
    }
}

