import React from "react";
import subio from "../../../../src/Media/subio.ico";
import bajo from "../../../../src/Media/bajo.ico";
import igual from "../../../../src/Media/igual.png";

const Comparador = ({ data: tweets }) => {
  function List() {
    var value =
      tweets[tweets.length - 8].sad +
      tweets[tweets.length - 8].neutral +
      tweets[tweets.length - 8].good;
    const listItems = tweets
      .slice(tweets.length - 7, tweets.length)
      .map((tweetsDay) => (
        <p key={tweetsDay.day}>
          {value < tweetsDay.sad + tweetsDay.neutral + tweetsDay.good ? (
            <img src={subio} className="icon" />
          ) : value > tweetsDay.sad + tweetsDay.neutral + tweetsDay.good ? (
            <img src={bajo} className="responsive-img icon" />
          ) : (
            <img src={igual} className="responsive-img icon" />
          )}
          {tweetsDay.day.split("T")[0]} :
          {(value = tweetsDay.sad + tweetsDay.neutral + tweetsDay.good)}
        </p>
      ));
    return <ul>{listItems}</ul>;
  }
  return (
    <div className="card">
      <p>Cantidad de tweets en los ultimos 7 dias</p>
      <List />
    </div>
  );
};

export default Comparador;
