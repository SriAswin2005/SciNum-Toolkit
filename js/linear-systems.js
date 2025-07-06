// Linear Systems and Matrix Operations

function generateMatrixInputs() {
    const size = parseInt(document.getElementById('matrix-size').value);
    const container = document.getElementById('matrix-inputs');

    let html = '<div class="matrix-container">';
    html += '<div class="matrix-label">A =</div>';
    html += `<div class="matrix-grid size-${size}">`;

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            html += `<input type="number" step="any" class="matrix-cell" id="a${i}${j}" placeholder="0">`;
        }
    }

    html += '</div>';
    html += '<div class="matrix-label">x =</div>';
    html += '<div class="rhs-vector">';

    for (let i = 0; i < size; i++) {
        html += `<input type="number" step="any" class="form-control" id="b${i}" placeholder="0">`;
    }

    html += '</div>';
    html += '</div>';

    html += '<button class="btn btn--primary" onclick="loadSampleMatrix()">Load Sample Matrix</button>';

    container.innerHTML = html;
}

function loadSampleMatrix() {
    const size = parseInt(document.getElementById('matrix-size').value);

    if (size === 3) {
        // Sample 3x3 matrix
        const sampleMatrix = [
            [4, -1, 2],
            [1, 5, -1],
            [2, -1, 3]
        ];
        const sampleRHS = [8, 4, 6];

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                document.getElementById(`a${i}${j}`).value = sampleMatrix[i][j];
            }
            document.getElementById(`b${i}`).value = sampleRHS[i];
        }
    } else {
        // Generate identity matrix for other sizes
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                document.getElementById(`a${i}${j}`).value = (i === j) ? 1 : 0;
            }
            document.getElementById(`b${i}`).value = i + 1;
        }
    }
}

function solveLinearSystem() {
    try {
        const size = parseInt(document.getElementById('matrix-size').value);

        // Get matrix and RHS
        const matrix = [];
        const rhs = [];

        for (let i = 0; i < size; i++) {
            const row = [];
            for (let j = 0; j < size; j++) {
                const val = parseFloat(document.getElementById(`a${i}${j}`).value) || 0;
                row.push(val);
            }
            matrix.push(row);
            rhs.push(parseFloat(document.getElementById(`b${i}`).value) || 0);
        }

        const result = gaussianElimination(matrix, rhs);
        displayLinearSolution(result);
    } catch (e) {
        displayLinearError(e.message);
    }
}

function gaussianElimination(matrix, rhs) {
    const n = matrix.length;
    const augmented = matrix.map((row, i) => [...row, rhs[i]]);

    // Forward elimination
    for (let i = 0; i < n; i++) {
        // Find pivot
        let maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(augmented[k][i]) > Math.abs(augmented[maxRow][i])) {
                maxRow = k;
            }
        }

        // Swap rows
        [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];

        // Check for zero pivot
        if (Math.abs(augmented[i][i]) < 1e-14) {
            throw new Error('Matrix is singular or nearly singular');
        }

        // Eliminate column
        for (let k = i + 1; k < n; k++) {
            const factor = augmented[k][i] / augmented[i][i];
            for (let j = i; j <= n; j++) {
                augmented[k][j] -= factor * augmented[i][j];
            }
        }
    }

    // Back substitution
    const solution = new Array(n);
    for (let i = n - 1; i >= 0; i--) {
        solution[i] = augmented[i][n];
        for (let j = i + 1; j < n; j++) {
            solution[i] -= augmented[i][j] * solution[j];
        }
        solution[i] /= augmented[i][i];
    }

    return {
        method: 'Gaussian Elimination',
        solution: solution,
        iterations: n // Number of elimination steps
    };
}

function displayLinearSolution(result) {
    const container = document.getElementById('linear-solution');

    let html = `<h3>Solution (${result.method})</h3>`;
    html += '<div class="solution-vector">';

    result.solution.forEach((val, i) => {
        html += `x<sub>${i+1}</sub> = ${val.toFixed(8)}<br>`;
    });

    html += '</div>';

    container.innerHTML = html;
}

function displayLinearError(message) {
    const container = document.getElementById('linear-solution');
    container.innerHTML = `<div class="error-message">${message}</div>`;
}
