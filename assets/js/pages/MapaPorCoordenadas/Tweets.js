import React from "react";

import "../../../css/mapa.css";

const Tweets = ({ tweets }) => {
  const acomodarTweets = (ts) => {
    let comentarios;
    if (ts != null) {
      comentarios = JSON.parse(ts);
      if (comentarios.statuses.length != 0) {
        return comentarios.statuses;
      } else return null;
    } else {
      return [];
    }
  };
  return (
    <ul className="panelTweets">
      {acomodarTweets(tweets) == null ? (
        <div className="panelNotFound">
          <span
            className="closebtn"
            onclick="this.parentElement.style.display='none';"
          >
            &times;
          </span>
          <strong>Error!</strong> No se encontrador tweets con que contengan los
          filtros espeficicados. Repita la operacion con diferentes filtros.
        </div>
      ) : (
        acomodarTweets(tweets).map((noticia) => (
          <div className="bloque-tweet">
            <blockquote>
              <ul id="sortable">
                <li>
                  <div className="media">
                    <div className="media-body">
                      <img
                        src={noticia.user.profile_image_url}
                        className="circle responsive-img"
                      />
                      <div className=" offset-md-2 ">
                        <p className="nombre">{noticia.user.name}</p>
                        <a id={noticia.id} className="usuario">
                          @{noticia.user.screen_name}
                        </a>
                        <br />
                        <a>{noticia.text}</a>
                        <div>{noticia.created_at}</div>
                        <div>{noticia.user.location}</div>
                      </div>
                    </div>
                  </div>
                </li>
              </ul>
            </blockquote>
          </div>
        ))
      )}
    </ul>
  );
};

export default Tweets;
