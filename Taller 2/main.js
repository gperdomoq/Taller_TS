import { series } from './data.js';
function renderSeriesTable() {
    const tableBody = document.getElementById("series-table-body");
    if (!tableBody)
        return;
    series.forEach(serie => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th class="table-light" scope="row">${serie.id}</th>
            <td class="table-light"><a href="#" class="serie-link" data-id="${serie.id}">${serie.name}</a></td>
            <td class="table-light">${serie.channel}</td>
            <td class="table-light">${serie.seasons}</td>
        `;
        tableBody.appendChild(row);
    });
    const links = document.querySelectorAll(".serie-link");
    links.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const id = parseInt(event.target.getAttribute("data-id"));
            const selectedSerie = series.find(s => s.id === id);
            if (selectedSerie) {
                showSerieDetail(selectedSerie);
            }
        });
    });
    calculateSeasonsAverage();
}
function showSerieDetail(serie) {
    const detailCard = document.getElementById("series-detail");
    const img = document.getElementById("series-img");
    const title = document.getElementById("series-title");
    const desc = document.getElementById("series-desc");
    const link = document.getElementById("series-link");
    if (detailCard && img && title && desc && link) {
        img.src = serie.image;
        img.alt = `Image of ${serie.name}`;
        title.textContent = serie.name;
        desc.textContent = serie.description;
        link.href = serie.url;
        link.textContent = "More info";
        detailCard.style.display = "block";
    }
}
function calculateSeasonsAverage() {
    var _a;
    const seasons = series.map(serie => serie.seasons);
    const average = seasons.length ? Math.round(seasons.reduce((a, b) => a + b, 0) / seasons.length) : 0;
    const averageText = document.createElement("p");
    averageText.innerHTML = `Seasons average: ${average}`;
    averageText.classList.add("mt-3");
    (_a = document.getElementById("average-container")) === null || _a === void 0 ? void 0 : _a.appendChild(averageText);
}
document.addEventListener("DOMContentLoaded", renderSeriesTable);
