// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu?.classList.remove('active');
        hamburger?.classList.remove('active');
    });
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Active Navigation on Scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.about-card, .project-card, .contact-item, .collection-card-large, .hero-eyebrow, .hero-title, .hero-subtitle, .hero-cta, .hero-stats').forEach(el => {
    observer.observe(el);
});

// Dynamic Year in Footer
const yearElement = document.querySelector('.footer-copyright');
if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} Kiran Babu. All rights reserved.`;
}

// Typing Effect for Hero Title (Optional Enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';

    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Parallax Effect for Hero Background
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const orbs = document.querySelectorAll('.gradient-orb');

    orbs.forEach((orb, index) => {
        const speed = 0.5 + (index * 0.2);
        orb.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Project Card Tilt Effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Loading Animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Copy Email to Clipboard
const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
emailLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        const email = link.getAttribute('href').replace('mailto:', '');

        if (navigator.clipboard) {
            navigator.clipboard.writeText(email).then(() => {
                // Show toast notification
                showToast('Email copied to clipboard!');
            });
        }
    });
});

// Toast Notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 2rem;
        right: 2rem;
        background: var(--primary);
        color: white;
        padding: 1rem 2rem;
        border-radius: 12px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Add CSS for toast animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

console.log('🚀 Portfolio loaded successfully!');
console.log('Built with ❤️ by Kiran Babu');

// Track Resume Download
document.getElementById('downloadResume')?.addEventListener('click', () => {
    // Track with Google Analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
            'event_category': 'Resume',
            'event_label': 'PDF Download'
        });
    }
    console.log('Resume downloaded');
    showToast('Resume download started!');
});

// Theme Toggle Functionality
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.html = document.documentElement;
        this.init();
    }

    init() {
        // Load saved theme or default to dark
        const savedTheme = localStorage.getItem('theme') || 'dark';
        this.setTheme(savedTheme, false);

        // Add event listener
        this.themeToggle?.addEventListener('click', () => this.toggleTheme());
    }

    setTheme(theme, save = true) {
        this.html.setAttribute('data-theme', theme);

        // Update icon
        const icon = this.themeToggle?.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }

        // Save to localStorage
        if (save) {
            localStorage.setItem('theme', theme);
        }

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
    }

    toggleTheme() {
        const currentTheme = this.html.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);

        // Track with analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'theme_toggle', {
                'event_category': 'UI',
                'event_label': newTheme
            });
        }
    }

    getTheme() {
        return this.html.getAttribute('data-theme');
    }
}

// Initialize theme manager
const themeManager = new ThemeManager();

// Project Filtering & Search
class ProjectFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.searchInput = document.getElementById('projectSearch');
        this.projects = document.querySelectorAll('.project-card');

        this.currentFilter = 'all';
        this.currentSearch = '';

        this.init();
    }

    init() {
        if (!this.searchInput && !this.filterBtns.length && !this.projects.length) return;

        // Filter Buttons
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all
                this.filterBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');

                this.currentFilter = btn.getAttribute('data-filter');
                this.filterProjects();
            });
        });

        // Search Input
        this.searchInput?.addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase();
            this.filterProjects();
        });
    }

    filterProjects() {
        this.projects.forEach(project => {
            const categories = project.getAttribute('data-category') || '';
            const title = project.querySelector('.project-title')?.textContent.toLowerCase() || '';
            const description = project.querySelector('.project-description')?.textContent.toLowerCase() || '';
            const tags = Array.from(project.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase()).join(' ');

            const matchesFilter = this.currentFilter === 'all' || categories.includes(this.currentFilter);
            const matchesSearch = title.includes(this.currentSearch) ||
                description.includes(this.currentSearch) ||
                tags.includes(this.currentSearch);

            if (matchesFilter && matchesSearch) {
                project.classList.remove('hidden');
                project.classList.add('animate-in');
            } else {
                project.classList.add('hidden');
                project.classList.remove('animate-in');
            }
        });
    }
}

class BlogFilter {
    constructor() {
        this.filterBtns = document.querySelectorAll('.blog-categories .filter-btn');
        this.searchInput = document.getElementById('blogSearch');
        this.articles = document.querySelectorAll('.blog-card');

        this.currentFilter = 'all';
        this.currentSearch = '';

        this.init();
    }

    init() {
        if (!this.articles.length) return;

        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.getAttribute('data-filter');
                this.filterArticles();
            });
        });

        this.searchInput?.addEventListener('input', (e) => {
            this.currentSearch = e.target.value.toLowerCase();
            this.filterArticles();
        });
    }

    filterArticles() {
        this.articles.forEach(article => {
            const category = article.getAttribute('data-category') || '';
            const title = article.querySelector('.blog-title')?.textContent.toLowerCase() || '';
            const tags = Array.from(article.querySelectorAll('.tag')).map(t => t.textContent.toLowerCase()).join(' ');

            const matchesFilter = this.currentFilter === 'all' || category.includes(this.currentFilter);
            const matchesSearch = title.includes(this.currentSearch) || tags.includes(this.currentSearch);

            if (matchesFilter && matchesSearch) {
                article.style.display = 'block';
                setTimeout(() => article.style.opacity = '1', 10);
            } else {
                article.style.opacity = '0';
                setTimeout(() => article.style.display = 'none', 500);
            }
        });
    }
}

// Initialize Filters
const projectFilter = new ProjectFilter();
const blogFilter = new BlogFilter();

// GitHub API Integration
class GitHubAPI {
    constructor(username) {
        this.username = username;
        this.baseUrl = 'https://api.github.com';
        this.init();
    }

    async init() {
        try {
            const [user, repos] = await Promise.all([
                this.fetchUser(),
                this.fetchRepos()
            ]);

            this.updateHeroStats(user, repos);
            this.updateProjectStats(repos);
        } catch (error) {
            console.error('GitHub API Error:', error);
        }
    }

    async fetchUser() {
        const response = await fetch(`${this.baseUrl}/users/${this.username}`);
        if (!response.ok) throw new Error('User not found');
        return await response.json();
    }

    async fetchRepos() {
        const response = await fetch(`${this.baseUrl}/users/${this.username}/repos?per_page=100`);
        if (!response.ok) throw new Error('Repos not found');
        return await response.json();
    }

    updateHeroStats(user, repos) {
        // Update Repos Count
        const reposEl = document.getElementById('stat-repos');
        if (reposEl) reposEl.textContent = user.public_repos + '+';

        // Calculate Total Stars & Forks (approximate from top 100 recent repos)
        // Note: For exact total commits/contributions we'd need a different API or scraper, 
        // so we'll stick to what we can get reliably.

        // We can update the "Contributions" stat if we want to change it to "Total Repos" or similar, 
        // but "Contributions" usually implies commits which needs GraphQL auth.
        // Let's stick to updating what we can.
    }

    updateProjectStats(repos) {
        // Map repo names to their stats elements
        const projectMap = {
            'bhindi-saas-clone': 'bhindi-saas-clone',
            'awesome-ai-vibe-coding': 'awesome-ai-vibe-coding',
            'awesome-public-apis': 'awesome-public-apis',
            'awesome-chatgpt-prompts': 'awesome-chatgpt-prompts',
            'awesome-llm-apps': 'awesome-llm-apps',
            'awesome-mcp-servers': 'awesome-mcp-servers',
            'Gemini_AutomatorOS': 'gemini-automatoros'
        };

        repos.forEach(repo => {
            if (projectMap[repo.name]) {
                const id = projectMap[repo.name];

                // Update Stars
                const starsEl = document.getElementById(`stars-${id}`);
                if (starsEl) {
                    starsEl.innerHTML = `<i class="fas fa-star"></i> ${this.formatCount(repo.stargazers_count)}`;
                }

                // Update Forks
                const forksEl = document.getElementById(`forks-${id}`);
                if (forksEl) {
                    forksEl.innerHTML = `<i class="fas fa-code-branch"></i> ${this.formatCount(repo.forks_count)}`;
                }
            }
        });
    }

    formatCount(count) {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'k';
        }
        return count;
    }
}

// Testimonial Slider
class TestimonialSlider {
    constructor() {
        this.track = document.querySelector('.testimonial-track');
        this.cards = document.querySelectorAll('.testimonial-card');
        this.nextBtn = document.querySelector('.slider-btn.next');
        this.prevBtn = document.querySelector('.slider-btn.prev');
        this.dots = document.querySelectorAll('.dot');

        this.currentIndex = 0;
        this.totalSlides = this.cards.length;
        this.autoPlayInterval = null;

        this.init();
    }

    init() {
        if (!this.track) return;

        // Navigation Buttons
        this.nextBtn?.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoPlay();
        });

        this.prevBtn?.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoPlay();
        });

        // Dots Navigation
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.resetAutoPlay();
            });
        });

        // Touch/Swipe Support
        let touchStartX = 0;
        let touchEndX = 0;

        this.track.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });

        this.track.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe(touchStartX, touchEndX);
        });

        // Auto Play
        this.startAutoPlay();

        // Pause on Hover
        this.track.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.track.addEventListener('mouseleave', () => this.startAutoPlay());
    }

    handleSwipe(start, end) {
        if (start - end > 50) {
            this.nextSlide(); // Swipe Left
            this.resetAutoPlay();
        }
        if (end - start > 50) {
            this.prevSlide(); // Swipe Right
            this.resetAutoPlay();
        }
    }

    nextSlide() {
        this.currentIndex = (this.currentIndex + 1) % this.totalSlides;
        this.updateSlider();
    }

    prevSlide() {
        this.currentIndex = (this.currentIndex - 1 + this.totalSlides) % this.totalSlides;
        this.updateSlider();
    }

    goToSlide(index) {
        this.currentIndex = index;
        this.updateSlider();
    }

    updateSlider() {
        // Move Track
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;

        // Update Dots
        this.dots.forEach((dot, index) => {
            if (index === this.currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    startAutoPlay() {
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    }

    stopAutoPlay() {
        clearInterval(this.autoPlayInterval);
    }

    resetAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
}

// Newsletter Subscription
const newsletterForm = document.getElementById('newsletterForm');
const newsletterMessage = document.getElementById('newsletterMessage');

newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('subscriberEmail').value;

    // Simulate API call
    const button = newsletterForm.querySelector('button');
    const originalText = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';

    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
        newsletterForm.style.display = 'none';
        newsletterMessage.classList.remove('hidden');
        showToast('Thanks for subscribing!');

        // Track event
        if (typeof gtag !== 'undefined') {
            gtag('event', 'newsletter_signup', {
                'event_category': 'Engagement',
                'event_label': email
            });
        }
    }, 1500);
});

// Multi-step Contact Form
class MultiStepForm {
    constructor() {
        this.form = document.getElementById('contactForm');
        this.steps = document.querySelectorAll('.form-step');
        this.progressSteps = document.querySelectorAll('.progress-step');
        this.nextBtns = document.querySelectorAll('.next-step');
        this.prevBtns = document.querySelectorAll('.prev-step');
        this.successMsg = document.getElementById('formSuccess');
        this.resetBtn = document.querySelector('.reset-form');

        this.currentStep = 0;
        this.init();
    }

    init() {
        if (!this.form) return;

        this.nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (this.validateStep()) {
                    this.currentStep++;
                    this.updateStep();
                }
            });
        });

        this.prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.currentStep--;
                this.updateStep();
            });
        });

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });

        this.resetBtn?.addEventListener('click', () => this.resetForm());
    }

    validateStep() {
        const currentInputs = this.steps[this.currentStep].querySelectorAll('input, textarea, select');
        let valid = true;
        currentInputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value.trim()) {
                valid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        return valid;
    }

    updateStep() {
        this.steps.forEach((step, index) => {
            step.classList.toggle('active', index === this.currentStep);
        });

        this.progressSteps.forEach((step, index) => {
            step.classList.toggle('active', index <= this.currentStep);
        });
    }

    async submitForm() {
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Simulate API call
        setTimeout(() => {
            this.form.classList.add('hidden');
            this.successMsg.classList.remove('hidden');
            showToast('Message sent successfully!');

            // Track event
            if (typeof gtag !== 'undefined') {
                gtag('event', 'contact_form_submit', {
                    'event_category': 'Contact',
                    'event_label': document.getElementById('projectType').value
                });
            }
        }, 2000);
    }

    resetForm() {
        this.form.reset();
        this.currentStep = 0;
        this.updateStep();
        this.form.classList.remove('hidden');
        this.successMsg.classList.add('hidden');
    }
}

// Initialize Components
const testimonialSlider = new TestimonialSlider();
const github = new GitHubAPI('itskiranbabu');
const multiStepForm = new MultiStepForm();

/**
 * SkillsHub Manager
 * Handles skill category switching and animations
 */
class SkillsHub {
    constructor() {
        this.tabs = document.querySelectorAll('.skill-tab');
        this.grids = document.querySelectorAll('.skill-grid');

        if (this.tabs.length > 0) {
            this.init();
        }
    }

    init() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const category = tab.getAttribute('data-category');
                this.switchCategory(category, tab);
            });
        });
    }

    switchCategory(category, activeTab) {
        // Update Tabs
        this.tabs.forEach(tab => tab.classList.remove('active'));
        activeTab.classList.add('active');

        // Update Grids
        this.grids.forEach(grid => {
            grid.classList.remove('active');
            if (grid.id === category) {
                grid.classList.add('active');
            }
        });
    }
}

// Initialize Skills Hub
document.addEventListener('DOMContentLoaded', () => {
    new SkillsHub();
});
