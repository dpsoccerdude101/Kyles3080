(() => {
  const nvidiaModels = ["6429440", "6432400"];
  const elem = document.querySelector(".fade-in-text");
  let log = 0;
  const queryAPI = async (model) => {
    log = log == 0 ? 1 : 0;
    const response = await fetch(
      "https://us-central1-kyle-s-3080.cloudfunctions.net/api/findInStock/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ model: model }),
      }
    );
    if (response.ok) {
      const responseJSON = await response.json();
      console.dir(responseJSON.response);
      if (responseJSON.response == `Hi, the item is not available`)
        elem.innerText = "No, the item is not in stock yet.";
      else {
        clearInterval(repeatRun);
        elem.innerText = "Yes, the item is in stock!";
      }
    } else console.log("Error Code: " + response.status);
  };
  const repeatRun = setInterval(() => queryAPI(nvidiaModels[log]), 3000);
})();
