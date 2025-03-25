import React, { useEffect, useState } from 'react'
import '../Banner/Banner.css';
import pluseIcon from '../../asset/png_58yos.png';
import axios from "../../axios.js";
import requests from "../../Requests.js";

function Banner() {
    const [movie, setMovie] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    function truncate(string, n) {
        return string?.length > n ? string.substr(0, n-1) + "..." : string;
    }

    useEffect(() => {
        async function fetchData() {
            try {
                const request = await axios.get(requests.trending)
                setMovie(
                    request.data.results[
                        Math.floor(Math.random() * request.data.results.length - 1)
                    ]
                )
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchData()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    if (loading) return <div className="banner loading">Loading...</div>
    if (error) return <div className="banner error">Error: {error}</div>

    return (
        <div className='banner' 
            style={{
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`
            }}
        >
            <div className="banner__content">
                <div className="banner_title">
                    <h1>{movie?.title || ""}</h1>
                </div>
                <div className="banner__description">
                    <p>{truncate(movie?.overview || "", 150)}</p>
                </div>
                <div className="banner__button">
                    <div className="banner__buttons">
                        <button className='play__button'>Play</button>
                        <button className='joinPrime__button'>
                            Join Prime <br/> Watch Now
                        </button>
                    </div>
                    <div className="myList__icon">
                        <img src={pluseIcon} alt="Add to my list" />
                    </div>
                </div>
            </div>

            <div className="banner--fade__bottom"><div className="banner--fade__left"/></div>
        </div>
    )
}

export default Banner