window.onload = () => {
  console.log("UI LOADED");

  const btnStart = document.getElementById("btnStart");
  const btnStop = document.getElementById("btnStop");

  console.log(btnStart, btnStop);

  btnStart.onclick = () => {
    console.log("START CLICKED");
  };

  btnStop.onclick = () => {
    console.log("STOP CLICKED");
  };
};
