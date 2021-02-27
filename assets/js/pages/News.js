import React, { Component } from "react";
import axios from "axios";
import Check from "../../../src/Media/check.png";
import "../../css/news.css";

class News extends Component {
  constructor() {
    super();
    this.state = {
      news: [],
      paises: ["Argentina", "Estados Unidos", "España"],
      loading: true,
    };
  }

  componentDidMount() {
    this.getNoticias();
  }

  getJson(diario) {
    return JSON.parse(diario).statuses;
  }

  getNoticias() {
    axios.get(`/api/news`).then((news) => {
      this.setState({ news: news.data, loading: false });
    });
  }

  render() {
    const loading = this.state.loading;
    let i;
    return (
      <div>
        <section className="row-section">
          <div className="row-section">
            <div>
              <h2 className="text-center">
                <span>NOTICIAS DEL MUNDO</span>
              </h2>
            </div>
            {loading ? (
              <div className={"panel text-center"}>
                <span className="fa fa-spin fa-spinner fa-4x"></span>
              </div>
            ) : (
              this.state.news.map((pais, index) => (
                <div className="panelNoticias">
                  <div className={"tweets-groups"}>
                    <h3 id={index} className={"contries"}>
                      {this.state.paises[index]}
                    </h3>
                    {pais.map((diario) => {
                      return JSON.parse(diario).statuses.length != 0 ? (
                        <blockquote className=" row-block">
                          {JSON.parse(diario).statuses.map((noticia) => {
                            return (
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
                                          <p className="nombreDiario">
                                            {noticia.user.name}
                                          </p>
                                          <img
                                            src={Check}
                                            className="circle responsive-img check"
                                          />
                                          <a
                                            id={noticia.id}
                                            className="nombreDiario"
                                          >
                                            @{noticia.user.screen_name}
                                          </a>
                                          <br />
                                          <a>{noticia.text}</a>
                                          <p>{noticia.created_at}</p>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                </ul>
                              </blockquote>
                            );
                          })}
                        </blockquote>
                      ) : null;
                    })}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </div>
    );
  }
}
export default News;
