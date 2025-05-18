const API_URL = 'http://localhost:3000/workouts'; // json-server endpoint
const quotes = [
    "Każdy krok przybliża Cię do celu!",
    "Twoja wytrwałość to Twoja siła!",
    "Małe kroki prowadzą do wielkich wyników!",
    "Nie musisz być wielki, by zacząć. Zacznij, by być wielki!",
    "Ruch to inwestycja w siebie.",
    "Nie poddawaj się - efekty przyjdą z czasem.",
    "Twój największy rywal to Ty sam z wczoraj.",
    "Regeneracja jest tak samo ważna jak trening.",
    "Pamiętaj o nawodnieniu podczas ćwiczeń.",
    "Zadbaj o rozgrzewkę przed każdym treningiem.",
    "Nie licz powtórzeń, rób je najlepiej jak potrafisz.",
    "Zdrowe ciało to szczęśliwy umysł.",
    "Każdy trening przybliża Cię do lepszej wersji siebie.",
    "Nie szukaj wymówek - szukaj możliwości.",
    "Dieta to 70% sukcesu, trening 30%.",
    "Odpoczynek to część procesu - nie zaniedbuj go."
];

document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initializeTheme();
    // Other initializations
    loadWorkouts();
    setupEventListeners();
    updateMotivationalQuote();
    const items = document.querySelectorAll('.carousel-item');
    if (items.length > 0) {
        items[0].classList.add('active');
    }
});

// Initialize theme based on localStorage or system preference
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        updateThemeToggleButton(savedTheme === 'dark');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.body.classList.toggle('dark-mode', prefersDark);
        updateThemeToggleButton(prefersDark);
    }
}

// Update theme toggle button icon
function updateThemeToggleButton(isDark) {
    const toggleButton = document.getElementById('theme-toggle');
    toggleButton.textContent = isDark ? '☀️' : '🌙';
    toggleButton.setAttribute('aria-label', isDark ? 'Przełącz na tryb jasny' : 'Przełącz na tryb ciemny');
    toggleButton.setAttribute('title', isDark ? 'Przełącz na tryb jasny' : 'Przełącz na tryb ciemny');
}

// Event listeners
function setupEventListeners() {
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        updateThemeToggleButton(isDark);
    });
    
    // Form submission
    const form = document.getElementById('workout-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    } else {
        console.error('Formularz #workout-form nie znaleziony!');
    }
    
    // Filter and sort
    document.getElementById('filter-type').addEventListener('change', filterAndSortWorkouts);
    document.getElementById('sort-by').addEventListener('change', filterAndSortWorkouts);
    
    // Hamburger menu
    document.querySelector('.hamburger').addEventListener('click', toggleMenu);
    
    // Close menu on link click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
    });
    
    // Carousel
    document.querySelector('.carousel-prev').addEventListener('click', () => moveCarousel(-1));
    document.querySelector('.carousel-next').addEventListener('click', () => moveCarousel(1));
    
    // Motivational quote
    document.getElementById('new-quote').addEventListener('click', updateMotivationalQuote);
    
    // Dialog close
    document.getElementById('close-dialog').addEventListener('click', () => {
        document.getElementById('workout-dialog').close();
    });
}

// Form submission
async function handleFormSubmit(e) {
    try {
        e.preventDefault(); // Prevent default form submission (page reload)
        
        const form = e.target;
        const type = form.type.value;
        const duration = parseInt(form.duration.value);
        const calories = parseInt(form.calories.value);
        
        if (!type || duration <= 0 || calories < 0) {
            document.getElementById('form-error').textContent = 'Wypełnij poprawnie wszystkie pola!';
            return;
        }
        
        const workout = {
            id: Date.now(),
            type,
            duration,
            calories,
            date: new Date().toISOString()
        };
        
        // Save to backend
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(workout)
        });
        
        if (!response.ok) {
            throw new Error(`Błąd HTTP: ${response.status}`);
        }
        
        // Save to localStorage
        saveToLocalStorage(workout);
        
        // Show toast notification
        const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Dodano!';
    submitBtn.disabled = true;
    setTimeout(() => {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
        
        // Update UI
        form.reset();
        document.getElementById('form-error').textContent = '';
        loadWorkouts();
    } catch (error) {
        document.getElementById('form-error').textContent = 'Błąd podczas zapisywania treningu! Sprawdź, czy json-server działa.';
        console.error('Błąd w handleFormSubmit:', error);
    }
}

// Load workouts
async function loadWorkouts() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Błąd sieci');
        const workouts = await response.json();
        updateWorkoutTable(workouts);
    } catch (error) {
        const workouts = getFromLocalStorage();
        updateWorkoutTable(workouts);
        console.error('Błąd ładowania danych:', error);
    }
}

// Update workout table
function updateWorkoutTable(workouts) {
    const tbody = document.getElementById('workout-table-body');
    tbody.innerHTML = '';
    workouts.forEach(workout => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${workout.type}</td>
            <td>${workout.duration}</td>
            <td>${workout.calories}</td>
            <td>${new Date(workout.date).toLocaleDateString()}</td>
            <td><button data-id="${workout.id}" class="view-btn">Szczegóły</button></td>
        `;
        tbody.appendChild(row);
    });
    
    // Add event listeners for view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.addEventListener('click', () => showWorkoutDetails(btn.dataset.id));
    });
}

// Filter and sort workouts
function filterAndSortWorkouts() {
    const filterType = document.getElementById('filter-type').value;
    const sortBy = document.getElementById('sort-by').value;
    
    let workouts = getFromLocalStorage();
    
    // Filter
    if (filterType) {
        workouts = workouts.filter(w => w.type === filterType);
    }
    
    // Sort
    workouts.sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'duration-desc') return b.duration - a.duration;
        if (sortBy === 'duration-asc') return a.duration - b.duration;
    });
    
    updateWorkoutTable(workouts);
}

// LocalStorage
function saveToLocalStorage(workout) {
    const workouts = getFromLocalStorage();
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
}

function getFromLocalStorage() {
    return JSON.parse(localStorage.getItem('workouts') || '[]');
}

// Show workout details
function showWorkoutDetails(id) {
    const workouts = getFromLocalStorage();
    const workout = workouts.find(w => w.id == id);
    if (workout) {
        const dialog = document.getElementById('workout-dialog');
        document.getElementById('dialog-content').textContent = `
            Typ: ${workout.type}
            Czas: ${workout.duration} min
            Kalorie: ${workout.calories}
            Data: ${new Date(workout.date).toLocaleString()}
        `;
        dialog.showModal();
    }
}

// Toggle menu
function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    const btn = document.querySelector('.hamburger');
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isExpanded);
    menu.classList.toggle('active');
}

// Carousel
let carouselIndex = 0;
function moveCarousel(direction) {
    const items = document.querySelectorAll('.carousel-item');
    carouselIndex = (carouselIndex + direction + items.length) % items.length;
    items.forEach((item, i) => {
        item.classList.toggle('active', i === carouselIndex);
    });
}

// Motivational quote
function updateMotivationalQuote() {
    const quoteElement = document.getElementById('quote-text');
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.textContent = randomQuote;
}