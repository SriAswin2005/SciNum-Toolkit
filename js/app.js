// Main application initialization and orchestration

// Application state
const AppState = {
    initialized: false,
    currentSection: 'dashboard',
    currentMethod: null,
    currentLinearMethod: null
};

// Initialize application
function initializeApp() {
    if (AppState.initialized) return;

    try {
        // Show dashboard by default
        showSection('dashboard');

        // Generate initial matrix inputs
        generateMatrixInputs();
        generateEigenMatrixInputs();

        // Initialize first method panels
        setTimeout(() => {
            selectMethod('fixed-point');
            selectLinearMethod('gaussian');
        }, 100);

        // Set up event listeners
        setupEventListeners();

        AppState.initialized = true;
        console.log('✓ Numerical Methods App initialized successfully');
    } catch (error) {
        console.error('Error initializing app:', error);
        showErrorMessage('Failed to initialize application', 'main-content');
    }
}

// Set up global event listeners
function setupEventListeners() {
    // Matrix size change listeners
    const matrixSizeSelect = document.getElementById('matrix-size');
    if (matrixSizeSelect) {
        matrixSizeSelect.addEventListener('change', generateMatrixInputs);
    }

    const eigenMatrixSizeSelect = document.getElementById('eigen-matrix-size');
    if (eigenMatrixSizeSelect) {
        eigenMatrixSizeSelect.addEventListener('change', generateEigenMatrixInputs);
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', handleKeyboardShortcuts);

    // Form validation
    setupFormValidation();
}

// Handle keyboard shortcuts
function handleKeyboardShortcuts(event) {
    if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
            case '1':
                event.preventDefault();
                showSection('root-finding');
                break;
            case '2':
                event.preventDefault();
                showSection('linear-systems');
                break;
            case '3':
                event.preventDefault();
                showSection('eigenvalue');
                break;
            case '4':
                event.preventDefault();
                showSection('convergence');
                break;
        }
    }
}

// Set up form validation
function setupFormValidation() {
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', validateNumberInput);
    });
}

// Validate number inputs
function validateNumberInput(event) {
    const input = event.target;
    const value = input.value;

    if (value && isNaN(parseFloat(value))) {
        input.setCustomValidity('Please enter a valid number');
        input.classList.add('invalid');
    } else {
        input.setCustomValidity('');
        input.classList.remove('invalid');
    }
}

// Utility functions for app management
function resetAllCharts() {
    if (convergenceChart) {
        convergenceChart.destroy();
        convergenceChart = null;
    }
    if (linearConvergenceChart) {
        linearConvergenceChart.destroy();
        linearConvergenceChart = null;
    }
    if (eigenConvergenceChart) {
        eigenConvergenceChart.destroy();
        eigenConvergenceChart = null;
    }
    if (comparisonChart) {
        comparisonChart.destroy();
        comparisonChart = null;
    }
}

function clearAllResults() {
    const resultContainers = [
        'iterations-table',
        'linear-solution',
        'eigen-solution'
    ];

    resultContainers.forEach(id => {
        const container = document.getElementById(id);
        if (container) {
            container.innerHTML = '';
        }
    });
}

// Export functions for debugging (if needed)
window.AppDebug = {
    state: AppState,
    resetCharts: resetAllCharts,
    clearResults: clearAllResults,
    reinitialize: () => {
        AppState.initialized = false;
        initializeApp();
    }
};

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause any animations
        console.log('App hidden');
    } else {
        // Page is visible, resume
        console.log('App visible');
    }
});
