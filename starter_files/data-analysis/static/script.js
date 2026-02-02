document.addEventListener('DOMContentLoaded', () => {
    fetchData();
});

let allLeads = [];
let currentPage = 1;
const rowsPerPage = 10;
let filteredLeads = [];

async function fetchData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        
        if (data.error) {
            console.error(data.error);
            return;
        }

        updateMetrics(data.metrics);
        initCharts(data.metrics);
        
        allLeads = data.leads;
        filteredLeads = allLeads;
        renderTable();
        
        setupPagination();
        setupSearch();

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateMetrics(metrics) {
    document.getElementById('total-leads').textContent = metrics.total.toLocaleString();
    
    // Safely handle missing keys
    const hot = metrics.segments['Hot'] || 0;
    const warm = metrics.segments['Warm'] || 0;
    const cold = metrics.segments['Cold'] || 0;

    document.getElementById('hot-leads').textContent = hot.toLocaleString();
    document.getElementById('warm-leads').textContent = warm.toLocaleString();
    document.getElementById('cold-leads').textContent = cold.toLocaleString();
}

function initCharts(metrics) {
    // 1. Segmentation Pie Chart
    const segCtx = document.getElementById('segmentChart').getContext('2d');
    new Chart(segCtx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(metrics.segments),
            datasets: [{
                data: Object.values(metrics.segments),
                backgroundColor: ['#e11d48', '#f59e0b', '#3b82f6'], // Hot (Red), Warm (Amber), Cold (Blue)
                borderWidth: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' }
            }
        }
    });

    // 2. Top Companies Bar Chart
    const compCtx = document.getElementById('companyChart').getContext('2d');
    new Chart(compCtx, {
        type: 'bar',
        data: {
            labels: Object.keys(metrics.top_companies),
            datasets: [{
                label: 'Leads',
                data: Object.values(metrics.top_companies),
                backgroundColor: '#4f46e5',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });

    // 3. Top Countries (Horizontal Bar)
    const countryCtx = document.getElementById('countryChart').getContext('2d');
    // Take top 5 for cleaner chart
    const topCountries = Object.entries(metrics.top_countries).slice(0, 5);
    new Chart(countryCtx, {
        type: 'bar',
        indexAxis: 'y',
        data: {
            labels: topCountries.map(x => x[0]),
            datasets: [{
                label: 'Leads',
                data: topCountries.map(x => x[1]),
                backgroundColor: '#10b981',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: { beginAtZero: true }
            }
        }
    });
}

function renderTable() {
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = filteredLeads.slice(start, end);
    
    const tbody = document.querySelector('#leadsTable tbody');
    tbody.innerHTML = '';

    pageData.forEach(lead => {
        const row = document.createElement('tr');
        
        let segmentClass = 'segment-cold';
        if (lead.Priority_Segment === 'Hot') segmentClass = 'segment-hot';
        if (lead.Priority_Segment === 'Warm') segmentClass = 'segment-warm';

        row.innerHTML = `
            <td>${lead['First Name']} ${lead['Last Name']}</td>
            <td>${lead.Company}</td>
            <td>${lead.Title}</td>
            <td>${lead.Country}</td>
            <td>${lead['Lead Score']}</td>
            <td><span class="segment-badge ${segmentClass}">${lead.Priority_Segment}</span></td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById('pageInfo').textContent = `Page ${currentPage} of ${Math.ceil(filteredLeads.length / rowsPerPage)}`;
    
    document.getElementById('prevBtn').disabled = currentPage === 1;
    document.getElementById('nextBtn').disabled = currentPage >= Math.ceil(filteredLeads.length / rowsPerPage);
}

function setupPagination() {
    document.getElementById('prevBtn').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
        }
    });

    document.getElementById('nextBtn').addEventListener('click', () => {
        if (currentPage < Math.ceil(filteredLeads.length / rowsPerPage)) {
            currentPage++;
            renderTable();
        }
    });
}

function setupSearch() {
    const input = document.getElementById('searchInput');
    input.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        filteredLeads = allLeads.filter(lead => {
            return (
                (lead['First Name'] && lead['First Name'].toLowerCase().includes(term)) ||
                (lead['Last Name'] && lead['Last Name'].toLowerCase().includes(term)) ||
                (lead.Company && lead.Company.toLowerCase().includes(term)) ||
                (lead.Country && lead.Country.toLowerCase().includes(term))
            );
        });
        currentPage = 1;
        renderTable();
    });
}
