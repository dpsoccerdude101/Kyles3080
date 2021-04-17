(() => {
  const nvidiaModels = ["6429440", "6432400"];
  let log = 0;
  const queryAPI = async (model) => {
    log = log == 0 ? 1 : 0;
    const response = await fetch(
      `https://us-central1-kyle-s-3080.cloudfunctions.net/api/findInStock/`,
      {
        method: "post",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ model: model }),
      }
    );
    if (response.ok) {
      const responseJSON = await response.json();
      console.dir(responseJSON);
      clearInterval(repeatRun);
    } else console.log("Error Code: " + response.status);
  };
  const repeatRun = setInterval(() => queryAPI(nvidiaModels[log]), 3000);
})();
