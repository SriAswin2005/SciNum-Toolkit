// Navigation and section management functions

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionId).classList.add('active');

    // Update nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });

    // Initialize section-specific content
    if (sectionId === 'linear-systems') {
        generateMatrixInputs();
    } else if (sectionId === 'eigenvalue') {
        generateEigenMatrixInputs();
    }
}

function selectMethod(methodId) {
    // Update button states
    document.querySelectorAll('.method-selector .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Hide all method panels
    document.querySelectorAll('.method-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Show selected method panel
    document.getElementById(methodId).classList.add('active');
}

function selectLinearMethod(methodId) {
    // Update button states
    document.querySelectorAll('.method-selector .btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');

    // Hide all method panels
    document.querySelectorAll('.linear-content .method-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Show selected method panel
    document.getElementById(methodId).classList.add('active');
}
