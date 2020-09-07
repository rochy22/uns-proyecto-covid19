import Sentiment from "sentiment";

export function analisisTexto(tweets) {
  let sad = 0;
  let good = 0;
  let neutral = 0;

  tweets.map((data) => {
    var sentiment = new Sentiment();
    var result = sentiment.analyze(data.text);
    if (result.comparative > 0) {
      sad = sad + 1;
    } else if (result.comparative == 0) {
      neutral = neutral + 1;
    } else {
      good = good + 1;
    }
  });
  return [sad, neutral, good];
}

export function contadorHashtags(tweets, totalActual) {
  let messageMap = new Map();

  tweets.map((data2) => {
    if (data2.entities.hashtags.length > 0) {
      data2.entities.hashtags.map((textHashtag) => {
        messageMap.set(
          textHashtag.text,
          messageMap.has(textHashtag.text)
            ? messageMap.get(textHashtag.text) + 1
            : 1
        );
      });
    }
  });

  for (let [key, value] of totalActual) {
    messageMap.set(
      key,
      messageMap.has(key) ? messageMap.get(key) + value : value
    );
  }

  messageMap.delete("M");
  messageMap.delete("a");
  messageMap.delete("p");
  return messageMap;
}

export function updateDay(dia, mes, año) {
  var returnDay = dia + 1;
  var returnMes = mes;
  var returnAño = año;
  if (dia == 30 && (mes == 4 || mes == 6 || mes == 9 || mes == 11)) {
    returnDay = 1;
    returnMes = mes + 1;
  } else if (dia == 28 && mes == 2) {
    returnDay = 1;
    returnMes = mes + 1;
  } else if (dia == 31) {
    if (mes == 12) {
      returnDay = 1;
      returnMes = 1;
      returnAño = año + 1;
    } else {
      returnDay = 1;
      returnMes = mes + 1;
      returnAño = año + 1;
    }
  }
  return [returnDay, returnMes, returnAño];
}
