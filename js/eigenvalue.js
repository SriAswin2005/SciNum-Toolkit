// Eigenvalue Methods

function generateEigenMatrixInputs() {
    const size = parseInt(document.getElementById('eigen-matrix-size').value);
    const container = document.getElementById('eigen-matrix-inputs');

    let html = '<div class="matrix-container">';
    html += '<div class="matrix-label">A =</div>';
    html += `<div class="matrix-grid size-${size}">`;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            html += `<input type="number" step="any" class="matrix-cell" id="ea${i}${j}" placeholder="0">`;
        }
    }

    html += '</div>';
    html += '</div>';

    html += '<button class="btn btn--primary" onclick="loadSampleEigenMatrix()">Load Sample Matrix</button>';

    container.innerHTML = html;
}

function loadSampleEigenMatrix() {
    const size = parseInt(document.getElementById('eigen-matrix-size').value);

    if (size === 3) {
        // Sample symmetric matrix
        const sampleMatrix = [
            [4, -1, 0],
            [-1, 4, -1],
            [0, -1, 4]
        ];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                document.getElementById(`ea${i}${j}`).value = sampleMatrix[i][j];
            }
        }
    } else if (size === 2) {
        // Sample 2x2 matrix
        const sampleMatrix = [
            [3, 1],
            [1, 3]
        ];

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 2; j++) {
                document.getElementById(`ea${i}${j}`).value = sampleMatrix[i][j];
            }
        }
    } else {
        // Generate identity matrix for other sizes
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                document.getElementById(`ea${i}${j}`).value = (i === j) ? 1 : 0;
            }
        }
    }
}

function runPowerMethod() {
    try {
        const size = parseInt(document.getElementById('eigen-matrix-size').value);
        const tolerance = parseFloat(document.getElementById('eigen-tolerance').value);
        const maxIter = parseInt(document.getElementById('eigen-max-iter').value);

        // Get matrix
        const matrix = [];
        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const val = parseFloat(document.getElementById(`ea${i}${j}`).value) || 0;
                row.push(val);
            }
            matrix.push(row);
        }

        const result = powerMethod(matrix, tolerance, maxIter);
        displayEigenResults(result);
        plotEigenConvergence(result);
    } catch (e) {
        displayEigenError(e.message);
    }
}

function powerMethod(matrix, tolerance, maxIter) {
    const n = matrix.length;
    const iterations = [];

    // Get initial vector
    let x = [];
    for (let i = 0; i < n; i++) {
        x.push(1.0); // Start with [1, 1, ..., 1]
    }

    // Normalize initial vector
    x = normalizeVector(x);

    let eigenvalue = 0;
    let error = Infinity;
    let i = 0;

    iterations.push({ iteration: 0, eigenvalue: 0, eigenvector: [...x], error: 0 });

    while (error > tolerance && i < maxIter) {
        // y = A * x
        const y = multiplyMatrixVector(matrix, x);

        // Find largest component by magnitude
        const maxIndex = findMaxAbsIndex(y);
        const newEigenvalue = y[maxIndex];

        // Normalize eigenvector
        const newX = normalizeVector(y);

        // Calculate error
        error = Math.abs(newEigenvalue - eigenvalue);

        i++;
        iterations.push({
            iteration: i,
            eigenvalue: newEigenvalue,
            eigenvector: [...newX],
            error: error
        });

        eigenvalue = newEigenvalue;
        x = newX;
    }

    return {
        method: 'Power Method',
        iterations: iterations,
        converged: error <= tolerance,
        eigenvalue: eigenvalue,
        eigenvector: x,
        finalError: error
    };
}

function displayEigenResults(result) {
    const container = document.getElementById('eigen-solution');

    let html = `<h3>Results (${result.method})</h3>`;

    html += '<div class="eigen-result-item">';
    html += '<h4>Dominant Eigenvalue</h4>';
    html += `<div class="value">${result.eigenvalue.toFixed(8)}</div>`;
    html += '</div>';

    html += '<div class="eigen-result-item">';
    html += '<h4>Corresponding Eigenvector</h4>';
    html += '<div class="value">[';
    result.eigenvector.forEach((val, i) => {
        html += val.toFixed(6);
        if (i < result.eigenvector.length - 1) html += ', ';
    });
    html += ']</div>';
    html += '</div>';

    html += `<p><strong>Iterations:</strong> ${result.iterations.length}</p>`;
    html += `<p><strong>Final Error:</strong> ${result.finalError.toExponential(4)}</p>`;

    container.innerHTML = html;
}

function displayEigenError(message) {
    const container = document.getElementById('eigen-solution');
    container.innerHTML = `<div class="error-message">${message}</div>`;
}
