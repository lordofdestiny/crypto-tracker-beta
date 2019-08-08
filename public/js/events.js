const buttons = Array.from(document.getElementsByClassName("changeCoin"));

buttons.forEach(button => {
  button.addEventListener("click", async function() {
    console.log(this);
    if (!this.classList.contains("active")) {
      buttons.forEach(button => {
        button.classList.remove("active");
      });
      this.classList.add("active");

      const coin = this.attributes["data-coin"].value;
      sessionStorage.setItem("coin", coin);
      removeLine(myChart);
      newLine(myChart);

      await updateCoin();
    }
  });
});

const updateCoin = async () => {
  const coin = sessionStorage.getItem("coin");
  const currency = sessionStorage.getItem("currency");

  const getValue = axios({
    url: "/value",
    params: { coin, currency }
  });

  try {
    const response = await getValue;
    const value = response.data[currency];

    document.getElementById("coinName").innerHTML = coin;
    document.getElementById(
      "coinValue"
    ).innerHTML = `$ ${value.toLocaleString()}`;
  } catch (error) {
    console.log(error);
  }
};

setInterval(updateCoin, 10000);
