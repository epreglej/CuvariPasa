import React from 'react'
import axios from 'axios'

import { Helmet } from 'react-helmet'
import Navbar from './partials/navbar'
import Footer from './partials/footer'

import '../styles/home.css'
import '../styles/index.css'
import '../styles/moderation.css'
import '../styles/profile.css'
import '../styles/requestsAndOffers.css'

function MyDogs(){
    const [dogs, setDogs] = React.useState([])
    const [images, setImages] = React.useState([])


    React.useEffect(() => {
        let id = localStorage.getItem('id');
        axios.get('/api/dogs/my/' + id).then(response => {
            console.log(response.data);
            setDogs(response.data);
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    React.useEffect(() => {
        axios.get('/api/dogs/getPhoto/' + 12).then(response => response.json()).then(data => {
            console.log(data);
            setImages(data)
        }).catch(err => {
            alert(err.response.data.message);
        })
    }, []);

    return(
        <div className="page-container">
            <Helmet>
                <title>CuvariPasa | Moji psi</title>
            </Helmet>

            <Navbar/>

            <div className="profile-info background-blackolive">
                <div className="ro-page-content">
                    <div className='ro-bar'>
                        <span className='home-title'>
                            Moji psi   
                        </span>
                        <div className='ro-button-container'>
                            <a href="/dogs/register" className='button-href'>
                                <button className="button button-gradient">Dodaj psa</button>
                            </a>
                        </div>
                    </div>
                    <hr className='hr-color-apricot'/>
                    <div className='panel-container'>
                        {dogs && dogs.map(dog =>
                            <div className='panel-content background-white'>
                                <div className='panel-info-item'>
                                    <img src={`${dog.photo}`}></img>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Ime: </span>
                                    <span className='panel-info-item-value'>{dog.name}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Vrsta: </span>
                                    <span className='panel-info-item-value'>{dog.breed.name}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Datum rođenja: </span>
                                    <span className='panel-info-item-value'>{dog.dateOfBirth}</span>
                                </div>
                                <div className='panel-info-item'>
                                    <span className='panel-info-item-name'>Rating:  </span>
                                    <span className='panel-info-item-value'>{dog.ratingCount == 0 ? 0 : dog.ratingSum/dog.ratingCount}</span>
                                </div>
                            </div>
                        )}
                    </div>    
                </div>
            </div>
            <Footer/>
        </div>

    )
}

export default MyDogs;