import React, { Component } from "react";
// Css
import logo from "../../../src/Media/home1.png";
import banner2 from "../../../src/Media/home2.png";
import banner3 from "../../../src/Media/home3.png";
import banner4 from "../../../src/Media/home4.png";
import incubacion from "../../../src/Media/home5.png";
import banner6 from "../../../src/Media/home6.png";

const Home = () => (
  <div>
    <div className="panelLogo">
      <div>
        <img className="logo" src={logo} alt="Logo" />
      </div>
      <div className=" Panel_banners">
        <img className="banner" src={banner2} alt="Logo" />
        <img className="riesgo" src={banner6} alt="Logo" />
        <img className="banner" src={banner3} alt="Logo" />
        <img className="incubacion" src={incubacion} alt="Logo" />

        <img className="banner2" src={banner4} alt="Logo" />
      </div>
    </div>
    <hr class="solid" />

    <div className="panelCentral">
      <div className="informacion .col-sm-4">
        <h3>¿COMÓ SE ORIGINÓ EL CORONAVIRUS?</h3>
        Los coronavirus son una extensa familia de virus que pueden causar
        enfermedades tanto en animales como en humanos. En los humanos, se sabe
        que varios coronavirus causan infecciones respiratorias que pueden ir
        desde el resfriado común hasta enfermedades más graves como el síndrome
        respiratorio de Oriente Medio (MERS) y el síndrome respiratorio agudo
        severo (SRAS). El coronavirus que se ha descubierto más recientemente
        causa la enfermedad por coronavirus COVID-19.
      </div>
      <div className="informacion .col-sm-4">
        <h3>¿QUÉ ES LA COVID-19? </h3>
        La COVID‑19 es la enfermedad infecciosa causada por el coronavirus que
        se ha descubierto más recientemente. Tanto este nuevo virus como la
        enfermedad que provoca eran desconocidos antes de que estallara el brote
        en Wuhan (China) en diciembre de 2019. Actualmente la COVID‑19 es una
        pandemia que afecta a muchos países de todo el mundo.
      </div>
      <div className="informacion .col-sm-4">
        <h3>¿QUÉ ES EL CORONAVIRUS?</h3>
        Los coronavirus (CoV) son una amplia familia de virus que pueden causar
        diversas afecciones, desde el resfriado común hasta enfermedades más
        graves, como ocurre con el coronavirus causante del síndrome
        respiratorio de Oriente Medio (MERS-CoV) y el que ocasiona el síndrome
        respiratorio agudo severo (SRAS-CoV). Un nuevo coronavirus es una nueva
        cepa de coronavirus que no se había encontrado antes en el ser humano.
      </div>
    </div>
  </div>
);

export default Home;
