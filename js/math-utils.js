// Mathematical utility functions

function evaluateFunction(funcStr, x) {
    try {
        // Replace common mathematical functions
        let func = funcStr.replace(/\^/g, '**')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/ln/g, 'Math.log')
            .replace(/log/g, 'Math.log10')
            .replace(/exp/g, 'Math.exp')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/abs/g, 'Math.abs')
            .replace(/e/g, 'Math.E')
            .replace(/pi/g, 'Math.PI');

        // Replace x with actual value
        func = func.replace(/x/g, x);
        return eval(func);
    } catch (e) {
        throw new Error('Invalid function expression');
    }
}

// Matrix utility functions
function multiplyMatrixVector(matrix, vector) {
    const result = [];
    for (let i = 0; i < matrix.length; i++) {
        let sum = 0;
        for (let j = 0; j < vector.length; j++) {
            sum += matrix[i][j] * vector[j];
        }
        result.push(sum);
    }
    return result;
}

function normalizeVector(vector) {
    const magnitude = Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
    if (magnitude === 0) return vector;
    return vector.map(val => val / magnitude);
}

function vectorMagnitude(vector) {
    return Math.sqrt(vector.reduce((sum, val) => sum + val * val, 0));
}

function findMaxAbsIndex(vector) {
    let maxIndex = 0;
    let maxValue = Math.abs(vector[0]);
    for (let i = 1; i < vector.length; i++) {
        if (Math.abs(vector[i]) > maxValue) {
            maxValue = Math.abs(vector[i]);
            maxIndex = i;
        }
    }
    return maxIndex;
}
