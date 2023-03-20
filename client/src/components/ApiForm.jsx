import React from "react";

const ApiForm = ({inputs, handleChange, onSubmit}) => {


    return (
        <div className="apiForm">   
            <form onSubmit={onSubmit}>
                <label htmlFor="numImages">Number of Images</label>
                <input type="number" name="numImages" value={inputs.numImages} onChange={handleChange} />
                <label htmlFor="width">Width</label>
                <input type="number" name="width" value={inputs.width} onChange={handleChange} />
                <label htmlFor="height">Height</label>
                <input type="number" name="height" value={inputs.height} onChange={handleChange} />
                <label htmlFor="imageType">Image Type</label>
                <select name="imageType" value={inputs.imageType} onChange={handleChange}>
                    <option value="png">PNG</option>
                    <option value="jpg">JPG</option>
                    <option value="gif">GIF</option>
                </select>
                <label htmlFor="imageCategory">Image Category</label>
                <select name="imageCategory" value={inputs.imageCategory} onChange={handleChange}>

                    <option value="abstract">Abstract</option>
                    <option value="animals">Animals</option>
                    <option value="business">Business</option>
                    <option value="cats">Cats</option>
                    <option value="city">City</option>
                    <option value="food">Food</option>
                    <option value="nightlife">Nightlife</option>
                    <option value="fashion">Fashion</option>
                    <option value="people">People</option>
                    <option value="nature">Nature</option>
                    <option value="sports">Sports</option>
                    <option value="technics">Technics</option>
                    <option value="transport">Transport</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
        
    )

}


export default ApiForm;
