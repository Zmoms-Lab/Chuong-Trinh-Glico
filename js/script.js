const searchInput = document.getElementById("search");

searchInput.addEventListener("keyup", function () {
  const keyword = this.value.toLowerCase();

  const stores = document.querySelectorAll(".store");

  stores.forEach((store) => {
    const text = store.innerText.toLowerCase();

    if (text.includes(keyword)) {
      store.style.display = "block";
    } else {
      store.style.display = "none";
    }
  });
});
