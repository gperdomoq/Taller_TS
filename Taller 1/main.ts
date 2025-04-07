import { Serie, series } from './data.js';

function renderSeriesTable(): void {
    const tableBody = document.getElementById("series-table-body");
    if (!tableBody) return;
    
    series.forEach(serie => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <th class="table-light" scope="row">${serie.id}</th>
            <td class="table-light"><a href="#">${serie.name}</a></td>
            <td class="table-light">${serie.channel}</td>
            <td class="table-light">${serie.seasons}</td>
        `;
        tableBody.appendChild(row);
    });
    calculateSeasonsAverage();
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