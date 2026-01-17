/* =================================================================
//                 HOSTELCARE MASTER JAVASCRIPT (script.js)
// ================================================================= */

// --- DATA ---
const MEDICINE_DATA = {
    // Original Medicines
    "crocin": { name: "Crocin (500mg)", properties: "Active: Paracetamol/Acetaminophen. Class: Analgesic, Antipyretic.", uses: ["Relief from pain (headache, toothache, muscle ache).", "Reduces fever."], dosage: ["Adults: 500mg - 1000mg every 4-6 hours.", "Max 4000mg/day."] },
    "dolo": { name: "Dolo 650", properties: "Active: Paracetamol (650mg). Class: Analgesic, Antipyretic.", uses: ["Treatment of severe fever and pain.", "Body pain."], dosage: ["Adults: One tablet (650mg) every 6 hours."] },
    "combiflam": { name: "Combiflam", properties: "Active: Ibuprofen (400mg) & Paracetamol (325mg). Class: NSAID, Analgesic.", uses: ["Relief from moderate pain, joint pain, muscle sprains.", "Reduces inflammation."], dosage: ["Adults: 1 tablet every 6-8 hours with food."] },
    "allegra": { name: "Allegra 120mg", properties: "Active: Fexofenadine. Class: Non-sedating Antihistamine.", uses: ["Relief of seasonal allergy symptoms (runny nose, sneezing).", "Chronic hives."], dosage: ["Adults: 120mg tablet once a day."] },
    "ors": { name: "ORS (Oral Rehydration Salts)", properties: "Active: Sodium Chloride, Potassium Chloride, Glucose. Class: Electrolyte Replacer.", uses: ["Prevents dehydration due to diarrhea, vomiting, or excessive sweating."], dosage: ["Dissolve one sachet in 1 liter of clean water. Sip slowly."] },

    // NEW ADDITIONS
    "paracetamol": { name: "Paracetamol (Generic)", properties: "Active: Acetaminophen. Class: Analgesic, Antipyretic.", uses: ["General relief from mild to moderate pain.", "Reduces common fever."], dosage: ["Adults: 500mg every 4-6 hours as needed."] },
    "digene": { name: "Digene (Gel/Tablet)", properties: "Active: Magnesium/Aluminium Hydroxide, Simethicone. Class: Antacid, Anti-flatulent.", uses: ["Relief from acidity, heartburn, gas, and indigestion."], dosage: ["Adults: 1-2 teaspoons or tablets after meals or at bedtime."] },
    "omez": { name: "Omez (Omeprazole 20mg)", properties: "Active: Omeprazole. Class: Proton Pump Inhibitor (PPI).", uses: ["Treats heartburn, acid reflux, and stomach ulcers.", "Reduces stomach acid."], dosage: ["Adults: 20mg once a day, before food."] },
    "vicks": { name: "Vicks Action 500", properties: "Active: Paracetamol, Caffeine, Phenylephrine. Class: Cold & Flu Relief.", uses: ["Treats symptoms of the common cold, including headache, body ache, and nasal congestion."], dosage: ["Adults: 1 tablet every 4-6 hours."] },
    "iodex": { name: "Iodex Balm", properties: "Active: Methyl Salicylate, Menthol. Class: Topical Analgesic.", uses: ["Fast relief from joint pain, back pain, and muscle sprains (for external use only)."], dosage: ["Apply a small amount to the affected area and rub gently."] },
    "zandu": { name: "Zandu Balm", properties: "Active: Mentha, Eucalyptus, Clove Oil. Class: Topical Analgesic.", uses: ["Relief from headache, cold, and body ache.", "Soothes strained muscles."], dosage: ["Rub on forehead for headache or chest for cold symptoms."] }
};

const SYMPTOM_DATA = {
    "Fever": { name: "Fever", description: "Elevated body temperature", icon: "🌡️", 
        questions: [{ text: "What is your approximate body temperature?", options: ["99°F - 100°F (Low-grade)", "100°F - 102°F (Moderate)", "Above 102°F (High)"], diagnosis_score: [1, 3, 5] }, { text: "Do you have any severe symptoms?", options: ["Yes, severe symptoms", "No, just general discomfort"], diagnosis_score: [5, 1] }, { text: "How long have you had the fever?", options: ["Less than 24 hours", "1 to 3 days", "More than 3 days"], diagnosis_score: [1, 2, 3] }],
        results: { "Mild Viral": { score_range: [3, 5], title: "Mild Viral Infection", description: "Likely a common viral infection. Focus on symptomatic relief.", causes: ["Viral exposure"], prevention: ["Maintain good hygiene"], cure: ["Rest, Hydration, Crocin (Paracetamol)"] }, "Urgent Care": { score_range: [6, 15], title: "Seek Urgent Medical Advice", description: "Due to high fever or severe symptoms, please consult a doctor immediately.", causes: ["Possible infection, Flu"], prevention: ["N/A - Immediate action is required."], cure: ["CALL EMERGENCY. Follow doctor's instructions."] } }
    },
    "Cold & Cough": { name: "Cold & Cough", description: "Runny nose, sneezing, coughing", icon: "🤧", 
        questions: [{ text: "Is your cough dry or chesty (phlegm)?", options: ["Dry", "Chesty"], diagnosis_score: [1, 2] }, { text: "Are you having difficulty breathing?", options: ["Yes, severe", "No, just congestion"], diagnosis_score: [4, 1] }, { text: "Do you have a sore throat?", options: ["Yes", "No"], diagnosis_score: [1, 0] }],
        results: { "Common Cold": { score_range: [2, 5], title: "Common Cold", description: "Usually self-limiting. Manage symptoms and rest.", causes: ["Rhinovirus"], prevention: ["Vitamin C, Rest"], cure: ["Allegra (for runny nose), throat lozenges."] }, "Chest Infection": { score_range: [6, 10], title: "Possible Chest Infection", description: "If symptoms are severe or persistent, see a doctor.", causes: ["Influenza, Bronchitis"], prevention: ["Vaccination, avoiding smoke"], cure: ["Consult Doctor for antibiotics/further advice."] } }
    },
    "Headache": { name: "Headache", description: "Pain in head or neck area", icon: "🤕", 
        questions: [{ text: "What is the intensity of the pain (1-10)?", options: ["1-4 (Mild)", "5-7 (Moderate)", "8-10 (Severe)"], diagnosis_score: [1, 3, 5] }, { text: "Is the headache accompanied by vomiting or stiff neck?", options: ["Yes (Red Flag)", "No, localized pain"], diagnosis_score: [5, 1] }, { text: "Do you suspect this is due to eye strain or dehydration?", options: ["Yes, likely lifestyle-related", "No, feels unusual"], diagnosis_score: [1, 3] }],
        results: { "Tension Headache": { score_range: [3, 7], title: "Tension or Stress Headache", description: "Common, often due to stress, dehydration, or poor posture.", causes: ["Stress, Fatigue, Dehydration"], prevention: ["Improve sleep, reduce screen time"], cure: ["Rest, water, Crocin or Dolo (Paracetamol)"] }, "Migraine/Warning": { score_range: [8, 15], title: "Possible Migraine or Warning Sign", description: "If severe or recurring, see a doctor.", causes: ["Neurological factors, Diet"], prevention: ["Avoid triggers"], cure: ["Consult Doctor."] } }
    },
    "Stomach Pain": { name: "Stomach Pain", description: "Abdominal discomfort or pain", icon: "🤢", 
        questions: [{ text: "What type of pain are you experiencing?", options: ["Cramps / Spasms", "Burning sensation (Acidity)", "Sharp pain (Localized)"], diagnosis_score: [2, 3, 5] }, { text: "Is the pain accompanied by vomiting or diarrhea?", options: ["Yes, severe", "No, just pain"], diagnosis_score: [4, 1] }, { text: "Have you recently eaten oily or spoiled food?", options: ["Yes, likely food-related", "No, ongoing issue"], diagnosis_score: [2, 3] }],
        results: { "Indigestion": { score_range: [3, 7], title: "Simple Indigestion/Gas", description: "Likely caused by diet or eating too fast.", causes: ["Poor diet, Eating quickly"], prevention: ["Eat slowly, avoid fizzy drinks"], cure: ["Digene (Antacid), warm water, light walk."] }, "Severe Pain/Infection": { score_range: [8, 15], title: "Seek Medical Attention", description: "Sharp or severe pain requires professional evaluation.", causes: ["Infection, Ulcer"], prevention: ["N/A - Immediate consultation needed."], cure: ["Consult Doctor immediately for diagnosis and treatment."] } }
    },
    "Food Poisoning": { name: "Food Poisoning", description: "Nausea, vomiting after eating", icon: "🤮", 
        questions: [{ text: "When did you consume the suspected food?", options: ["Less than 6 hours ago", "6-24 hours ago", "More than 24 hours ago"], diagnosis_score: [3, 2, 1] }, { text: "Are you able to keep any fluids down?", options: ["Yes, somewhat", "No, constant vomiting/diarrhea"], diagnosis_score: [1, 4] }, { text: "Do you have a fever?", options: ["Yes", "No"], diagnosis_score: [2, 1] }],
        results: { "Mild Case": { score_range: [3, 5], title: "Mild Food Poisoning", description: "Focus on rehydration. Symptoms should subside within 24 hours.", causes: ["Bacterial contamination"], prevention: ["Wash hands, eat fresh food"], cure: ["ORS, Digene, bland diet."] }, "Severe Dehydration": { score_range: [6, 15], title: "Severe Dehydration Risk", description: "If you cannot keep fluids down, seek immediate medical attention.", causes: ["Toxins, Severe Bacterial Strain"], prevention: ["N/A - Immediate action."], cure: ["IV fluids may be necessary. Contact Doctor."] } }
    },
    "Dehydration": { name: "Dehydration", description: "Fatigue, dry mouth, dizziness", icon: "💧", 
        questions: [{ text: "What might have caused dehydration?", options: ["Heat / Sun exposure", "Heavy exercise", "Vomiting / Diarrhea", "Forgot to drink water"], diagnosis_score: [2, 2, 4, 1] }, { text: "Are you feeling extremely thirsty and tired?", options: ["Yes", "No"], diagnosis_score: [2, 0] }, { text: "Are your lips or mouth visibly dry?", options: ["Yes", "No"], diagnosis_score: [2, 0] }],
        results: { "Mild Dehydration": { score_range: [1, 4], title: "Mild Dehydration", description: "Increase fluid intake immediately.", causes: ["Low water intake"], prevention: ["Carry a water bottle"], cure: ["Drink water/ORS, rest."] }, "Moderate/Severe": { score_range: [5, 15], title: "Moderate to Severe Dehydration", description: "If dizziness/fatigue is severe, see a doctor for IV fluids.", causes: ["Heat stroke, prolonged illness"], prevention: ["N/A"], cure: ["ORS or IV fluids. Consult Doctor."] } }
    }
};

// --- GLOBAL STATE & NAVIGATION ---
let currentPage = 'home-section';

function showPage(sectionId, element) {
    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active-page-section');
    });
    document.getElementById(sectionId).classList.add('active-page-section');
    currentPage = sectionId;
    
    // Update navigation active state
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active-link'));
    
    // Find the corresponding navigation link and set it as active
    let targetLink = document.querySelector(`[data-section="${sectionId}"]`);
    if (targetLink) targetLink.classList.add('active-link');

    window.scrollTo(0, 0); 
}

// --- EMERGENCY / APPOINTMENTS ---
window.handleDoctorAppointment = function(doctorName) {

    if (!isUserLoggedIn()) {
        alert("Please sign in to book an appointment.");
        showPage("auth-section");
        return;
    }

    const confirmed = confirm(
        `Do you want to book an appointment with ${doctorName}?`
    );

    if (confirmed) {
        alert(`Appointment booked successfully with ${doctorName}!`);
    }
};


window.handleEmergencyCall = function(number) {
    window.open(`tel:${number}`); 
    alert(`Calling ${number} - Please wait.`);
}

// --- MEDICINE SCANNER LOGIC ---
function displayMedicineInfo(medicineKey) {
    const data = MEDICINE_DATA[medicineKey];
    const resultsBox = document.getElementById('medicine-results');
    const noResultBox = document.getElementById('no-result');

    if (!data || !resultsBox || !noResultBox) return;

    document.getElementById('result-medicine-name').textContent = data.name;
    document.getElementById('result-properties').textContent = data.properties;

    const populateList = (ulElementId, items) => {
        const ulElement = document.getElementById(ulElementId);
        if (!ulElement) return;
        ulElement.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ulElement.appendChild(li);
        });
    };

    populateList('result-uses', data.uses);
    populateList('result-dosage', data.dosage);

    resultsBox.style.display = 'block';
    noResultBox.style.display = 'none';
}

window.handleMedicineSearch = function() {
    const searchInput = document.getElementById('medicine-search-input');
    const query = searchInput.value.trim().toLowerCase();

    document.getElementById('medicine-results').style.display = 'none';
    document.getElementById('no-result').style.display = 'none';

    if (query.length < 2) {
        alert('Please enter at least 2 characters to search.');
        return;
    }

    // Find a key that contains the query or is contained by the query
    // This allows for flexible search (e.g., searching "paracetamol" matches the "paracetamol" key)
    const foundKey = Object.keys(MEDICINE_DATA).find(key => query.includes(key) || key.includes(query));
    
    if (foundKey) {
        displayMedicineInfo(foundKey);
    } else {
        document.getElementById('no-result').style.display = 'block';
    }
}

window.handleImageUpload = function(event) {
    if (event.target.files.length > 0) {
        // --- SIMULATED IMAGE SCAN RESULT ---
        // For demonstration, a successful scan will show results for Dolo.
        alert(`Image uploaded: ${event.target.files[0].name}. \n\nSimulating analysis... Displaying results for 'Dolo'.`);
        displayMedicineInfo('dolo'); 
    }
}

// --- SYMPTOM CHECKER LOGIC ---
let currentSymptomKey = '';
let currentQuestionIndex = 0;
let score = 0;
const TOTAL_QUESTIONS = 3; 

function resetChecker() {
    currentQuestionIndex = 0;
    score = 0;
}

function showStep(stepNumber) {
    document.querySelectorAll('#symptom-checker-section .checker-step').forEach(step => {
        step.style.display = 'none';
        step.classList.remove('active');
    });
    const stepElement = document.getElementById(`step-${stepNumber}`);
    if (stepElement) {
        stepElement.style.display = 'block';
        setTimeout(() => {
            stepElement.classList.add('active');
        }, 10);
        window.scrollTo(0, 0); 
    }
}

window.goBackToStep1 = function() {
    resetChecker();
    showStep(1);
}

function loadQuestion(index) {
    const symptomData = SYMPTOM_DATA[currentSymptomKey];
    if (!symptomData || index >= TOTAL_QUESTIONS) return; 

    currentQuestionIndex = index; 
    const question = symptomData.questions[index];

    document.getElementById('question-disease-title').textContent = symptomData.name;
    document.getElementById('current-question-text').textContent = question.text;
    document.getElementById('question-counter').textContent = `Question ${index + 1} of ${TOTAL_QUESTIONS}`;
    
    const percentage = Math.round(((index + 1) / TOTAL_QUESTIONS) * 100);
    document.getElementById('progress-percentage').textContent = `${percentage}%`;
    const progressBar = document.getElementById('progress-bar');
    if (progressBar) progressBar.style.width = `${percentage}%`;

    const answerOptionsContainer = document.getElementById('answer-options');
    answerOptionsContainer.innerHTML = ''; 
    
    question.options.forEach((option, i) => {
        const button = document.createElement('button');
        button.classList.add('answer-option-btn');
        button.textContent = option;
        // Safely check if diagnosis_score exists for the option
        if (question.diagnosis_score && question.diagnosis_score[i] !== undefined) {
            button.dataset.score = question.diagnosis_score[i];
        } else {
            button.dataset.score = 0; 
        }
        answerOptionsContainer.appendChild(button);
    });
}

function handleAnswer(button) {
    const points = parseInt(button.dataset.score);
    
    button.parentNode.querySelectorAll('.answer-option-btn').forEach(b => b.classList.remove('selected'));
    button.classList.add('selected');

    setTimeout(() => {
        score += points;
        if (currentQuestionIndex < TOTAL_QUESTIONS - 1) {
            loadQuestion(currentQuestionIndex + 1);
        } else {
            displayResult();
            showStep(3);
        }
    }, 300);
}

function displayResult() {
    const results = SYMPTOM_DATA[currentSymptomKey].results;
    let finalDiagnosis = { 
        title: "No clear match found", 
        description: "Please check your symptoms again or consult a professional.", 
        causes: ["Insufficient data"], prevention: ["Check symptoms again"], cure: ["Contact a Doctor"] 
    };

    for (const key in results) {
        const result = results[key];
        if (score >= result.score_range[0] && score <= result.score_range[1]) {
            finalDiagnosis = result;
            break;
        }
    }
    
    document.getElementById('result-title').innerHTML = `Predicted: <span class="highlight-result">${finalDiagnosis.title}</span>`;
    document.getElementById('result-description').textContent = finalDiagnosis.description;

    const populateResultList = (elementId, items) => {
        const ul = document.getElementById(elementId);
        if(!ul) return;
        ul.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            ul.appendChild(li);
        });
    };

    populateResultList('result-causes', finalDiagnosis.causes);
    populateResultList('result-prevention', finalDiagnosis.prevention);
    populateResultList('result-cure', finalDiagnosis.cure);
}


// --- MASTER INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navigation Setup
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if(e.target.dataset.section) {
                showPage(e.target.dataset.section, e.target);
            }
        });
    });

    // 2. Symptom Checker Initialization (Dynamic Cards)
    const symptomListContainer = document.getElementById('symptom-list-container');
    if (symptomListContainer) {
        Object.keys(SYMPTOM_DATA).forEach(key => {
            const data = SYMPTOM_DATA[key];
            const card = document.createElement('div');
            card.classList.add('symptom-list-card');
            card.dataset.symptom = key;
            
            card.innerHTML = `
                <div class="symptom-icon-text">
                    <span style="font-size: 1.8rem; margin-right: 15px;">${data.icon}</span>
                    <div>
                        <h4>${data.name}</h4>
                        <p>${data.description}</p>
                    </div>
                </div>
                <div class="symptom-arrow">
                    <i class="fas fa-arrow-right"></i>
                </div>
            `;
            
            card.addEventListener('click', () => {
                currentSymptomKey = key;
                resetChecker();
                loadQuestion(0);
                showStep(2); 
            });
            symptomListContainer.appendChild(card);
        });
    }

    // 3. Attach Answer Listener for Step 2
    const answerOptionsContainer = document.getElementById('answer-options');
    if (answerOptionsContainer) {
         answerOptionsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('answer-option-btn')) {
                handleAnswer(e.target);
            }
        });
    }

    // 4. Medicine Scanner Setup
    const searchBtn = document.getElementById('medicine-search-btn');
    const searchInput = document.getElementById('medicine-search-input');
    if (searchBtn && searchInput) {
        searchBtn.addEventListener('click', handleMedicineSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); 
                handleMedicineSearch();
            }
        });
    }
    
    // 5. Doctor/Emergency Setup
    document.querySelectorAll('.book-now-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            handleDoctorAppointment(btn.dataset.doctor);
        });
    });
    document.getElementById('emergency-nav-btn').addEventListener('click', () => handleEmergencyCall('112'));

    // 6. Auth Tabs Setup
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active-tab'));
            e.target.classList.add('active-tab');

            document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active-form'));
            document.getElementById(`${e.target.dataset.tab}-form`).classList.add('active-form');
        });
    });
    
    // Set initial page view
    showPage('home-section', document.querySelector('[data-section="home-section"]'));

});
// ================= AUTH LOGIC =================

// Check login on page load
function checkAuth() {
    const user = JSON.parse(localStorage.getItem("healthifyUser"));
    const authBtn = document.getElementById("auth-nav-btn");

    if (user) {
        authBtn.textContent = "Logout";
        authBtn.onclick = handleLogout;
    } else {
        authBtn.textContent = "Sign In";
        authBtn.onclick = () => showPage("auth-section");
    }
}

// Sign Up
function handleSignUp() {
    const name = document.getElementById("signup-name").value.trim();
    const email = document.getElementById("signup-email").value.trim();
    const password = document.getElementById("signup-password").value.trim();

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    setLoggedInUser({ name, email });

    alert(`Welcome ${name}!`);
    showPage("home-section"); // DASHBOARD
    updateAuthUI();
}


// Sign In
function handleSignIn() {
    const email = document.getElementById("signin-email").value.trim();
    const password = document.getElementById("signin-password").value.trim();

    if (!email || !password) {
        alert("Please enter email and password");
        return;
    }

    setLoggedInUser({ email });

    alert("Login successful!");
    showPage("home-section"); // DASHBOARD
    updateAuthUI();
}


// Logout
function handleLogout() {
    localStorage.removeItem("healthifyUser");
    alert("Logged out successfully");
    showPage("home-section");
    checkAuth();
}
checkAuth();
function isUserLoggedIn() {
    return localStorage.getItem("healthifyUser") !== null;
}
document.querySelectorAll('.book-now-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        handleDoctorAppointment(btn.dataset.doctor);
    });
});
function setLoggedInUser(user) {
    localStorage.setItem("healthifyUser", JSON.stringify(user));
}

function getLoggedInUser() {
    return JSON.parse(localStorage.getItem("healthifyUser"));
}

function isUserLoggedIn() {
    return getLoggedInUser() !== null;
}
function updateAuthUI() {
    const authBtn = document.getElementById("auth-nav-btn");
    const profileMenu = document.getElementById("profile-menu");
    const profileName = document.getElementById("profile-name");
    const user = JSON.parse(localStorage.getItem("healthifyUser"));

    if (user) {
        authBtn.style.display = "none";
        profileMenu.style.display = "block";
        profileName.textContent = user.name || "User";
    } else {
        authBtn.style.display = "block";
        profileMenu.style.display = "none";
        authBtn.onclick = () => showPage("auth-section");
    }
}


function handleLogout() {
    localStorage.removeItem("healthifyUser");
    alert("Logged out successfully");
    showPage("home-section");
    updateAuthUI();
}
updateAuthUI();
function getReportsKey() {
    const user = getLoggedInUser();
    return `healthReports_${user.email}`;
}

function addHealthReport() {
    if (!isUserLoggedIn()) {
        alert("Please sign in to add health reports");
        showPage("auth-section");
        return;
    }

    const title = document.getElementById("report-title").value;
    const date = document.getElementById("report-date").value;
    const notes = document.getElementById("report-notes").value;

    if (!title || !date) {
        alert("Please enter title and date");
        return;
    }

    const report = { title, date, notes };
    const key = getReportsKey();
    const reports = JSON.parse(localStorage.getItem(key)) || [];

    reports.push(report);
    localStorage.setItem(key, JSON.stringify(reports));

    document.getElementById("report-title").value = "";
    document.getElementById("report-date").value = "";
    document.getElementById("report-notes").value = "";

    renderReports();
}
function renderReports() {
    const container = document.getElementById("reports-list");
    if (!container || !isUserLoggedIn()) return;

    const key = getReportsKey();
    const reports = JSON.parse(localStorage.getItem(key)) || [];

    container.innerHTML = "";

    if (reports.length === 0) {
        container.innerHTML = "<p>No reports added yet.</p>";
        return;
    }

    reports.forEach(r => {
        const card = document.createElement("div");
        card.className = "info-card";
        card.innerHTML = `
            <h4>${r.title}</h4>
            <p><strong>Date:</strong> ${r.date}</p>
            <p>${r.notes || "No notes"}</p>
        `;
        container.appendChild(card);
    });
}
function showPage(sectionId) {
    if (sectionId === "health-reports-section" && !isUserLoggedIn()) {
        alert("Please sign in to view health reports");
        showPage("auth-section");
        return;
    }

    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.remove('active-page-section');
    });

    document.getElementById(sectionId).classList.add('active-page-section');
    window.scrollTo(0, 0);

    if (sectionId === "health-reports-section") {
        renderReports();
    }
}

function showWelcomeMessage() {
    const user = JSON.parse(localStorage.getItem("healthifyUser"));
    const welcomeText = document.getElementById("welcome-user");

    if (user && welcomeText) {
        welcomeText.textContent = `Welcome, ${user.name} 👋`;
        welcomeText.style.display = "block";
    }
}

function handleLogout() {
    localStorage.removeItem("healthifyUser");

    const welcomeText = document.getElementById("welcome-user");
    if (welcomeText) welcomeText.style.display = "none";

    alert("Logged out successfully");
    showPage("home-section");
    updateAuthUI();
}
updateAuthUI();
showWelcomeMessage();
