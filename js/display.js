// Display functions and chart management

function displayIterationResults(result) {
    const tableDiv = document.getElementById('iterations-table');

    let html = '<table class="iterations-table">';
    html += '<thead><tr><th>Iteration</th><th>x</th><th>Error</th></tr></thead>';
    html += '<tbody>';

    result.iterations.forEach(iter => {
        html += `<tr>
            <td>${iter.iteration}</td>
            <td>${iter.x.toFixed(8)}</td>
            <td>${iter.error.toExponential(4)}</td>
        </tr>`;
    });

    html += '</tbody></table>';

    html += `<p><strong>Final Root:</strong> ${result.root.toFixed(8)}</p>`;
    html += `<p><strong>Iterations:</strong> ${result.iterations.length}</p>`;
    html += `<p><strong>Final Error:</strong> ${result.finalError.toExponential(4)}</p>`;

    tableDiv.innerHTML = html;
}

function plotConvergence(result) {
    const ctx = document.getElementById('convergence-chart').getContext('2d');

    if (convergenceChart) {
        convergenceChart.destroy();
    }

    const data = {
        labels: result.iterations.map(iter => iter.iteration),
        datasets: [{
            label: 'Error',
            data: result.iterations.map(iter => iter.error),
            borderColor: chartColors[0],
            backgroundColor: chartColors[0] + '20',
            fill: false,
            tension: 0.1
        }]
    };

    convergenceChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Error (log scale)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Iteration'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: `${result.method} Convergence`
                }
            }
        }
    });
}

function plotEigenConvergence(result) {
    const ctx = document.getElementById('eigen-convergence-chart').getContext('2d');

    if (eigenConvergenceChart) {
        eigenConvergenceChart.destroy();
    }

    const data = {
        labels: result.iterations.map(iter => iter.iteration),
        datasets: [{
            label: 'Eigenvalue',
            data: result.iterations.map(iter => iter.eigenvalue),
            borderColor: chartColors[0],
            backgroundColor: chartColors[0] + '20',
            fill: false,
            tension: 0.1
        }]
    };

    eigenConvergenceChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    title: {
                        display: true,
                        text: 'Eigenvalue'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Iteration'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Eigenvalue Convergence'
                }
            }
        }
    });
}

function displayError(message) {
    const tableDiv = document.getElementById('iterations-table');
    tableDiv.innerHTML = `<div class="error-message">${message}</div>`;
}

function generateComparisonChart() {
    const ctx = document.getElementById('comparison-chart').getContext('2d');

    if (comparisonChart) {
        comparisonChart.destroy();
    }

    // Generate sample convergence data for comparison
    const iterations = Array.from({length: 15}, (_, i) => i + 1);

    // Simulate different convergence rates
    const linearData = iterations.map(i => Math.pow(0.5, i));
    const quadraticData = iterations.map(i => Math.pow(0.1, Math.pow(2, i-1)));
    const superlinearData = iterations.map(i => Math.pow(0.1, Math.pow(1.618, i-1)));

    // Limit data to prevent underflow
    const limitedQuadraticData = quadraticData.map(val => Math.max(val, 1e-15));
    const limitedSuperlinearData = superlinearData.map(val => Math.max(val, 1e-15));

    const data = {
        labels: iterations,
        datasets: [
            {
                label: 'Linear (Bisection)',
                data: linearData,
                borderColor: chartColors[0],
                backgroundColor: chartColors[0] + '20',
                fill: false,
                tension: 0.1
            },
            {
                label: 'Superlinear (Secant)',
                data: limitedSuperlinearData,
                borderColor: chartColors[1],
                backgroundColor: chartColors[1] + '20',
                fill: false,
                tension: 0.1
            },
            {
                label: 'Quadratic (Newton-Raphson)',
                data: limitedQuadraticData,
                borderColor: chartColors[2],
                backgroundColor: chartColors[2] + '20',
                fill: false,
                tension: 0.1
            }
        ]
    };

    comparisonChart = new Chart(ctx, {
        type: 'line',
        data: data,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    type: 'logarithmic',
                    title: {
                        display: true,
                        text: 'Error (log scale)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Iteration'
                    }
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Convergence Rate Comparison'
                }
            }
        }
    });
}

// Status and message utilities
function showLoadingState(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('loading');
    }
}

function hideLoadingState(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('loading');
    }
}

function showSuccessMessage(message, containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<div class="success-message">${message}</div>`;
    }
}

function showErrorMessage(message, containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `<div class="error-message">${message}</div>`;
    }
}
