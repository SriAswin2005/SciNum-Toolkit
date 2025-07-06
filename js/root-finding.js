// Root Finding Methods

function runFixedPoint() {
    const funcStr = document.getElementById('fp-function').value;
    const x0 = parseFloat(document.getElementById('fp-initial').value);
    const tolerance = parseFloat(document.getElementById('fp-tolerance').value);
    const maxIter = parseInt(document.getElementById('fp-max-iter').value);

    try {
        const result = fixedPointIteration(funcStr, x0, tolerance, maxIter);
        displayIterationResults(result);
        plotConvergence(result);
    } catch (e) {
        displayError(e.message);
    }
}

function fixedPointIteration(funcStr, x0, tolerance, maxIter) {
    const iterations = [];
    let x = x0;
    let error = Infinity;
    let i = 0;

    iterations.push({ iteration: 0, x: x0, error: 0 });

    while (error > tolerance && i < maxIter) {
        const xNew = evaluateFunction(funcStr, x);
        error = Math.abs(xNew - x);
        i++;
        iterations.push({ iteration: i, x: xNew, error: error });
        x = xNew;
    }

    return {
        method: 'Fixed Point Iteration',
        iterations: iterations,
        converged: error <= tolerance,
        root: x,
        finalError: error
    };
}

function runNewtonRaphson() {
    const funcStr = document.getElementById('nr-function').value;
    const derivStr = document.getElementById('nr-derivative').value;
    const x0 = parseFloat(document.getElementById('nr-initial').value);
    const tolerance = parseFloat(document.getElementById('nr-tolerance').value);
    const maxIter = parseInt(document.getElementById('nr-max-iter').value);

    try {
        const result = newtonRaphsonMethod(funcStr, derivStr, x0, tolerance, maxIter);
        displayIterationResults(result);
        plotConvergence(result);
    } catch (e) {
        displayError(e.message);
    }
}

function newtonRaphsonMethod(funcStr, derivStr, x0, tolerance, maxIter) {
    const iterations = [];
    let x = x0;
    let error = Infinity;
    let i = 0;

    iterations.push({ iteration: 0, x: x0, error: 0 });

    while (error > tolerance && i < maxIter) {
        const fx = evaluateFunction(funcStr, x);
        const fpx = evaluateFunction(derivStr, x);

        if (Math.abs(fpx) < 1e-14) {
            throw new Error('Derivative is zero - method fails');
        }

        const xNew = x - fx / fpx;
        error = Math.abs(xNew - x);
        i++;
        iterations.push({ iteration: i, x: xNew, error: error });
        x = xNew;
    }

    return {
        method: 'Newton-Raphson Method',
        iterations: iterations,
        converged: error <= tolerance,
        root: x,
        finalError: error
    };
}

function runBisection() {
    const funcStr = document.getElementById('bis-function').value;
    const a = parseFloat(document.getElementById('bis-a').value);
    const b = parseFloat(document.getElementById('bis-b').value);
    const tolerance = parseFloat(document.getElementById('bis-tolerance').value);
    const maxIter = parseInt(document.getElementById('bis-max-iter').value);

    try {
        const result = bisectionMethod(funcStr, a, b, tolerance, maxIter);
        displayIterationResults(result);
        plotConvergence(result);
    } catch (e) {
        displayError(e.message);
    }
}

function bisectionMethod(funcStr, a, b, tolerance, maxIter) {
    const fa = evaluateFunction(funcStr, a);
    const fb = evaluateFunction(funcStr, b);

    if (fa * fb > 0) {
        throw new Error('Function values at endpoints must have opposite signs');
    }

    const iterations = [];
    let left = a, right = b;
    let error = Math.abs(right - left);
    let i = 0;

    while (error > tolerance && i < maxIter) {
        const mid = (left + right) / 2;
        const fmid = evaluateFunction(funcStr, mid);

        iterations.push({ iteration: i, x: mid, error: error });

        if (fa * fmid < 0) {
            right = mid;
        } else {
            left = mid;
        }

        error = Math.abs(right - left);
        i++;
    }

    return {
        method: 'Bisection Method',
        iterations: iterations,
        converged: error <= tolerance,
        root: (left + right) / 2,
        finalError: error
    };
}

function runSecant() {
    const funcStr = document.getElementById('sec-function').value;
    const x0 = parseFloat(document.getElementById('sec-initial0').value);
    const x1 = parseFloat(document.getElementById('sec-initial1').value);
    const tolerance = parseFloat(document.getElementById('sec-tolerance').value);
    const maxIter = parseInt(document.getElementById('sec-max-iter').value);

    try {
        const result = secantMethod(funcStr, x0, x1, tolerance, maxIter);
        displayIterationResults(result);
        plotConvergence(result);
    } catch (e) {
        displayError(e.message);
    }
}

function secantMethod(funcStr, x0, x1, tolerance, maxIter) {
    const iterations = [];
    let xPrev = x0;
    let x = x1;
    let error = Math.abs(x - xPrev);
    let i = 0;

    iterations.push({ iteration: 0, x: x0, error: 0 });
    iterations.push({ iteration: 1, x: x1, error: error });

    while (error > tolerance && i < maxIter) {
        const fx = evaluateFunction(funcStr, x);
        const fxPrev = evaluateFunction(funcStr, xPrev);

        if (Math.abs(fx - fxPrev) < 1e-14) {
            throw new Error('Function values are too close - method fails');
        }

        const xNew = x - fx * (x - xPrev) / (fx - fxPrev);
        error = Math.abs(xNew - x);
        i++;
        iterations.push({ iteration: i + 1, x: xNew, error: error });

        xPrev = x;
        x = xNew;
    }

    return {
        method: 'Secant Method',
        iterations: iterations,
        converged: error <= tolerance,
        root: x,
        finalError: error
    };
}
