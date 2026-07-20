let DATA = {};

fetch("./data/stores.json")
  .then((response) => response.json())
  .then((data) => {
    DATA = data;
    init();
  })
  .catch((error) => {
    console.error("Không load được dữ liệu:", error);
  });

function init() {
  const brandSelect = document.getElementById("brand");
  const hospitalSelect = document.getElementById("hospital");
  const result = document.getElementById("result");

  brandSelect.addEventListener("change", () => {
    hospitalSelect.innerHTML = '<option value="">-- Chọn bệnh viện --</option>';

    result.innerHTML = "";

    if (!brandSelect.value) return;

    DATA[brandSelect.value].forEach((item, index) => {
      hospitalSelect.innerHTML += `
        <option value="${index}">
          ${item.hospital}
        </option>
      `;
    });
  });

  hospitalSelect.addEventListener("change", () => {
    result.innerHTML = "";

    if (hospitalSelect.value === "") return;

    const item = DATA[brandSelect.value][hospitalSelect.value];

    let html = `
      <h3 class="result-title">
        📍 Cửa hàng gần nhất
      </h3>

      <div class="store-card">

        <h3>${item.main.name}</h3>

        <p>${item.main.address}</p>

        <span class="badge">
          Khuyến nghị đổi quà tại đây
        </span>

      </div>
    `;

    if (item.optional.length) {
      html += `
        <div class="optional-title">
          Hoặc có thể đổi tại
        </div>
      `;

      item.optional.forEach((store) => {
        html += `
          <div class="store-card alt">

            <h3>${store.name}</h3>

            <p>${store.address}</p>

          </div>
        `;
      });
    }

    result.innerHTML = html;
  });
}
