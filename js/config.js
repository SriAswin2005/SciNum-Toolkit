// Global variables and configuration
let convergenceChart = null;
let linearConvergenceChart = null;
let eigenConvergenceChart = null;
let comparisonChart = null;

// Chart.js colors
const chartColors = ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F', '#DB4545', '#D2BA4C', '#964325', '#944454', '#13343B'];

// Configuration constants
const CONFIG = {
    DEFAULT_TOLERANCE: 1e-6,
    DEFAULT_MAX_ITERATIONS: 50,
    CHART_HEIGHT: 300,
    MATRIX_CELL_SIZE: 60
};
