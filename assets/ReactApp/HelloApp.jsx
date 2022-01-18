import React from "react";

class HelloApp extends React.Component {
    render() {
        return (
           <div className="form-group my-5">
               <form className="animalResearch d-flex">
                   <input type="text" name="animalName" className="mx-3 p-1" placeholder="Ex: Lion"/>
                   <button type="submit" className="btn btn-info">Rechercher</button>
               </form>
           </div>
        )
    }
}

export default HelloApp