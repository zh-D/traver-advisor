import React, { useState, useEffect } from 'react'
import { CssBaseline, Grid } from '@material-ui/core'

import { getPlacesData, getWeatherData } from './api'

import Header from './components/Header'
import List from './components/List'
import Map from './components/Map'

function App() {
    const [places, setPlaces] = useState([])
    const [weatherData, setWeatherData] = useState([])
    const [filteredPlaces, setFilteredPlaces] = useState([])
    const [coordinates, setCoordinates] = useState({})
    const [bounds, setBounds] = useState({})
    const [childClicked, setChildClicked] = useState(null)
    const [type, setType] = useState("restaurants");
    const [rating, setRating] = useState("");

    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
            setCoordinates({ lat: latitude, lng: longitude })
        })
    }, [])

    useEffect(() => {
        const filteredPlaces = places.filter((place) => place.rating > rating)

        setFilteredPlaces(filteredPlaces)
    }, [rating])

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)
            const weatherDa= await getWeatherData(coordinates.lat, coordinates.lng)
            const placesDa = await getPlacesData(type, bounds.sw, bounds.ne)
            console.log('weather', weatherDa);
            console.log('places', placesDa);
            setWeatherData(weatherDa)
            setPlaces(placesDa?.filter((place) => place.name && place.num_reviews > 0))
            setFilteredPlaces([])
            setIsLoading(false)
        }

        if (bounds.sw && bounds.ne) {
            fetchData()
        }

    }, [type, bounds])
    return (
        <>
            <CssBaseline />
            <Header setCoordinates={setCoordinates} />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List
                        places={filteredPlaces.length ? filteredPlaces : places}
                        childClicked={childClicked}
                        isLoading={isLoading}
                        type={type}
                        setType={setType}
                        rating={rating}
                        setRating={setRating}
                    />
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map
                        setCoordinates={setCoordinates}
                        setBounds={setBounds}
                        coordinates={coordinates}
                        places={filteredPlaces.length ? filteredPlaces : places}
                        setChildClicked={setChildClicked}
                        weatherData={weatherData}
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default App
