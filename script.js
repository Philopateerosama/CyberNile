// Loading Animation
window.addEventListener('load', () => {
    const loading = document.querySelector('.loading');
    if (loading) {
        loading.style.display = 'none';
    }
});

// Mobile Menu
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar') && navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
    }
});

// Theme Toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
const currentTheme = localStorage.getItem('theme');

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}

toggleSwitch.addEventListener('change', switchTheme, false);

// GSAP Animations
gsap.registerPlugin(ScrollTrigger);

// Hero Section Animation
gsap.from('.hero h1', {
    duration: 1,
    y: 50,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.hero .subtitle', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.3,
    ease: 'power3.out'
});

gsap.from('.cta-button', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 0.6,
    ease: 'power3.out'
});

// Section Animations
const sections = document.querySelectorAll('.section');

sections.forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top center+=100',
            toggleActions: 'play none none reverse'
        },
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
    });
});

// Quiz Implementation
const quizData = [
    {
        question: "What interests you most about cybersecurity?",
        options: [
            "Finding vulnerabilities in systems",
            "Protecting networks from attacks",
            "Analyzing malicious software",
            "Creating secure systems"
        ],
        paths: ["pen-testing", "network-security", "malware-analysis", "security-engineering"]
    },
    {
        question: "How do you prefer to work?",
        options: [
            "Independently, solving complex puzzles",
            "In a team, coordinating security efforts",
            "Researching and analyzing data",
            "Building and implementing solutions"
        ],
        paths: ["pen-testing", "network-security", "malware-analysis", "security-engineering"]
    },
    {
        question: "What's your technical background?",
        options: [
            "Basic programming knowledge",
            "Network administration",
            "System administration",
            "Software development"
        ],
        paths: ["pen-testing", "network-security", "malware-analysis", "security-engineering"]
    }
];

const careerPaths = {
    "pen-testing": {
        title: "Penetration Testing",
        description: "You might enjoy a career in penetration testing! This field involves ethical hacking to identify and fix security vulnerabilities.",
        resources: [
            "Learn basic programming (Python, Bash)",
            "Study networking fundamentals",
            "Get familiar with Linux",
            "Practice on platforms like HackTheBox"
        ]
    },
    "network-security": {
        title: "Network Security",
        description: "Network security could be your path! This field focuses on protecting networks from unauthorized access and attacks.",
        resources: [
            "Learn about network protocols",
            "Study firewall configurations",
            "Understand IDS/IPS systems",
            "Get familiar with SIEM tools"
        ]
    },
    "malware-analysis": {
        title: "Malware Analysis",
        description: "Malware analysis might be your calling! This field involves studying malicious software to prevent and mitigate attacks.",
        resources: [
            "Learn reverse engineering",
            "Study assembly language",
            "Understand malware behavior",
            "Practice with malware samples in safe environments"
        ]
    },
    "security-engineering": {
        title: "Security Engineering",
        description: "Security engineering could be your perfect match! This field focuses on building secure systems and applications.",
        resources: [
            "Learn secure coding practices",
            "Study application security",
            "Understand security architecture",
            "Get familiar with security frameworks"
        ]
    }
};

let currentQuestion = 0;
let userAnswers = [];

function startQuiz() {
    document.getElementById('start-quiz').style.display = 'none';
    showQuestion();
}

function showQuestion() {
    const quizContainer = document.getElementById('quiz-questions');
    const question = quizData[currentQuestion];
    
    let html = `
        <div class="quiz-question">
            <h3>${question.question}</h3>
            <div class="quiz-options">
    `;
    
    question.options.forEach((option, index) => {
        html += `
            <button class="quiz-option" onclick="selectOption(${index})">
                ${option}
            </button>
        `;
    });
    
    html += `
            </div>
        </div>
    `;
    
    quizContainer.innerHTML = html;
}

function selectOption(index) {
    userAnswers.push(quizData[currentQuestion].paths[index]);
    currentQuestion++;
    
    if (currentQuestion < quizData.length) {
        showQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    const result = calculateResult();
    const quizContainer = document.getElementById('quiz-questions');
    
    let html = `
        <div class="quiz-result">
            <h3>${result.title}</h3>
            <p>${result.description}</p>
            <h4>Recommended Learning Path:</h4>
            <ul>
    `;
    
    result.resources.forEach(resource => {
        html += `<li>${resource}</li>`;
    });
    
    html += `
            </ul>
            <button class="cta-button" onclick="restartQuiz()">Take Quiz Again</button>
        </div>
    `;
    
    quizContainer.innerHTML = html;
}

function calculateResult() {
    const pathCounts = {};
    userAnswers.forEach(path => {
        pathCounts[path] = (pathCounts[path] || 0) + 1;
    });
    
    const mostCommonPath = Object.keys(pathCounts).reduce((a, b) => 
        pathCounts[a] > pathCounts[b] ? a : b
    );
    
    return careerPaths[mostCommonPath];
}

function restartQuiz() {
    currentQuestion = 0;
    userAnswers = [];
    startQuiz();
}

// Initialize quiz
document.getElementById('start-quiz').addEventListener('click', startQuiz);

// Newsletter Form
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = this.querySelector('input[type="email"]').value;
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
}); 