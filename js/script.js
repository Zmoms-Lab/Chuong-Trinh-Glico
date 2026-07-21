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
  const provinceSelect = document.getElementById("province");
  const hospitalSelect = document.getElementById("hospital");
  const result = document.getElementById("result");

  let currentHospitals = [];

  // Chọn loại voucher
  brandSelect.addEventListener("change", () => {
    result.innerHTML = "";

    provinceSelect.disabled = true;
    hospitalSelect.disabled = true;

    provinceSelect.innerHTML = `
      <option value="">-- Chọn tỉnh/thành phố --</option>
    `;

    hospitalSelect.innerHTML = `
      <option value="">-- Chọn bệnh viện --</option>
    `;

    const brand = brandSelect.value;

    if (!brand) return;

    const provinces = [
      ...new Set(DATA[brand].map((item) => item.province)),
    ].sort();

    provinces.forEach((province) => {
      provinceSelect.innerHTML += `
        <option value="${province}">
          ${province}
        </option>
      `;
    });

    provinceSelect.disabled = false;
  });

  // Chọn tỉnh
  provinceSelect.addEventListener("change", () => {
    result.innerHTML = "";

    hospitalSelect.innerHTML = `
      <option value="">-- Chọn bệnh viện --</option>
    `;

    const brand = brandSelect.value;
    const province = provinceSelect.value;

    if (!province) {
      hospitalSelect.disabled = true;
      return;
    }

    currentHospitals = DATA[brand].filter((item) => item.province === province);

    currentHospitals.forEach((item, index) => {
      hospitalSelect.innerHTML += `
        <option value="${index}">
          ${item.hospital}
        </option>
      `;
    });

    hospitalSelect.disabled = false;
  });

  // Chọn bệnh viện
  hospitalSelect.addEventListener("change", () => {
    result.innerHTML = "";

    const index = hospitalSelect.value;

    if (index === "") return;

    const hospital = currentHospitals[index];

    let html = `
      <h3 class="result-title">
        📍 Cửa hàng đổi quà gần nhất
      </h3>

      <div class="store-card">
        <h3>${hospital.main.name}</h3>
        <p>${hospital.main.address}</p>

        <span class="badge">
          ⭐ Cửa hàng khuyến nghị
        </span>
      </div>
    `;

    if (hospital.optional?.length) {
      html += `
        <div class="optional-title">
          Hoặc mẹ có thể đổi tại:
        </div>
      `;

      hospital.optional.forEach((store) => {
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
