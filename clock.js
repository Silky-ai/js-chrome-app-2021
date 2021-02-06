const clockContainer = document.querySelector(".js-clock");
const clockTitle = clockContainer.querySelector(".js-title");

function getTime() {
  const date = new Date();
  const miniutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();

  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    miniutes < 10 ? `0${miniutes}` : miniutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;
}
function init() {
  setInterval(getTime, 1000);
}

init();
