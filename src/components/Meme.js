import React from "react";
import memesData from "../memesData";

export default function Meme() {
    
    const [meme, setMeme] = React.useState({
        topText: "",
        bottomText: "",
        randomImage: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = React.useState([])

    React.useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes) )
    }, [])

    const [memeText, setMemeText] = React.useState(
        {
            topText: "",
            bottomText: ""
        }
    )

    function handleChange(event) {
        const {name, value} = event.target
        setMemeText(prevMemeData => {
            return {
                ...prevMemeData,
                [name]: value
            }
        })
    }
     
    function getMemeImage(){
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage: url
        }))
    }
    
    return (
        <main>
            <div className="form">
                <input 
                    type="text" 
                    placeholder="Top text"
                    className="form--input"
                    name="topText"
                    value={memeText.topText}
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="Bottom text"
                    className="form--input"
                    name="bottomText"
                    value={memeText.bottomText}
                    onChange={handleChange}
                />
                <button 
                    className="form--button"
                    onClick={getMemeImage}
                >
                    Get a new meme image 🖼
                </button>
            </div>
            <div className="meme">
                <img src={meme.randomImage} alt="" className="meme--image"/>
                <h2 className="meme--text top">{memeText.topText}</h2>
                <h2 className="meme--text bottom">{memeText.bottomText}</h2>
            </div>
        </main>
    )
}