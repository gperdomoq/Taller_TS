import { Serie, series } from './data.js';

function renderSeriesTable(): void {
    const tableBody = document.getElementById("series-table-body");
    if (!tableBody) return;
    
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
            const id = parseInt((event.target as HTMLElement).getAttribute("data-id")!);
            const selectedSerie = series.find(s => s.id === id);
            if (selectedSerie) {
                showSerieDetail(selectedSerie);
            }
        });
    });

    calculateSeasonsAverage();
}

function showSerieDetail(serie: Serie): void {
    const detailCard = document.getElementById("series-detail");
    const img = document.getElementById("series-img") as HTMLImageElement;
    const title = document.getElementById("series-title");
    const desc = document.getElementById("series-desc");
    const link = document.getElementById("series-link") as HTMLAnchorElement;

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

function calculateSeasonsAverage(): void {
    const seasons = series.map(serie => serie.seasons);
    const average = seasons.length ? Math.round(seasons.reduce((a, b) => a + b, 0) / seasons.length) : 0;

    const averageText = document.createElement("p");
    averageText.innerHTML = `Seasons average: ${average}`;
    averageText.classList.add("mt-3");

    document.getElementById("average-container")?.appendChild(averageText);
}

document.addEventListener("DOMContentLoaded", renderSeriesTable);