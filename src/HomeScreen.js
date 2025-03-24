import React from 'react'
import Nav from './components/Nav/Nav'
import Banner from './components/Banner/Banner'
import Row from './components/Row/Row'
import requests from './Requests'
import Footer from './components/Footer/Footer'

function HomeScreen() {
  return (
    <div>
      <Nav />
      <Banner />
      <Row title="Popular Indian movies" fetchUrl={requests.trending} />
      <Row title="Popular action thrillers" fetchUrl={requests.action} />
      <Row title="Comady movies" fetchUrl={requests.ComedyMovies} />
      <Row title="Horror movies" fetchUrl={requests.HorrorMovies} />
      <Row title="Romantic movies" fetchUrl={requests.RomanceMovies} />
      <Row title="Documentaries" fetchUrl={requests.Documentaries} />4
      <Footer />
    </div>
  )
}

export default HomeScreen
