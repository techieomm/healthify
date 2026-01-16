Healthify - Personal Health Dashboard
Healthify is a sleek, responsive health monitoring application built with HTML5, Bootstrap 5, and JavaScript. It allows users to track critical vitals like Blood Pressure (Systolic/Diastolic), Blood Sugar, Thyroid levels, and Cholesterol with real-time visualization and PDF reporting.

Features
Vitals Tracking: Log and view historical data for BP, Sugar, Thyroid, and Cholesterol.
Dual-Input BP Logging: Capture both Systolic and Diastolic values for accurate Blood Pressure monitoring.
Real-time Analytics: Interactive line charts powered by Chart.js to visualize health trends over time.
PDF Export: Generate a professional patient report using jsPDF and html2canvas.
Responsive Design: Fully mobile-friendly layout using the latest Bootstrap 5 framework.
Persistent Data: Currently uses Browser LocalStorage for demo purposes.

TECH STACK:
Component,Technology
Frontend,"HTML5, CSS3, JavaScript (ES6+)"
Styling,"Bootstrap 5, Bootstrap Icons"
Charts,Chart.js
Exporting,"jsPDF, html2canvas"
Database,MongoDB (Planned/Ready)

PROJECT STRUCTURE
healthify-dashboard/
├── index.html          # Main dashboard file (Single-file solution)
├── README.md           # Documentation
└── (Future Backend)
    ├── server.js       # Node.js/Express server
    └── models/
        └── Vital.js    # Mongoose schema for vitals
