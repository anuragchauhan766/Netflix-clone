import React from "react";
import Hero from "../components/Hero";
import Row from "../components/Row";
import requests from "../api/request";

function Home() {
  return (
    <>
      <Hero />
      <Row title="Up Coming" fetchUrl={requests.Upcoming} />;
      <Row title="Popular" fetchUrl={requests.Popular} />;
      <Row title="Trending" fetchUrl={requests.Trending} />;
      <Row title="Top Rated" fetchUrl={requests.Toprated} />;
      <Row title="Horror" fetchUrl={requests.Horror} />;
    </>
  );
}

export default Home;
