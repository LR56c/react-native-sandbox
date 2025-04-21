export function getLatestGames (){
  return fetch('https://www.freetogame.com/api/games')
      .then((response) => response.json())
}

export function  getGameDetails(id){
  return fetch(`https://www.freetogame.com/api/game?id=${id}`).then((response) => response.json())
}
