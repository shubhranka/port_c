// Portfolio Content & Scroll Animations

// Portfolio data (for potential dynamic loading)
const portfolioData = {
    profile: {
        name: 'SHUBHRANKA VARMA',
        title: 'Software Engineer',
        location: 'Bengaluru, Karnataka, India',
        email: 'shubhrankavarma@gmail.com',
        phone: '+91 83190 60608',
        summary: 'Software Engineer with 4+ years of experience specializing in Cloud-Native Architecture, distributed systems, and infrastructure security.'
    },
    links: {
        github: 'https://github.com/shubhranka',
        linkedin: 'https://linkedin.com',
        leetcode: 'https://leetcode.com/u/shubhrankavarma/',
        codeforces: 'https://codeforces.com/profile/shubhrankavarma',
        portfolio: 'https://shubhranka.github.io/portfolio'
    },
    skills: {
        languages: ['Java', 'JavaScript', 'TypeScript', 'Python', 'Golang', 'SQL'],
        cloud: ['AWS (Lambda, IAM, Security Hub, CloudTrail, Config)', 'Kubernetes (EKS)', 'Docker', 'Terraform', 'CloudFormation', 'IaC', 'Serverless'],
        backend: ['Node.js', 'RESTful APIs', 'Kafka', 'Distributed Systems', 'Event-Driven Architecture', 'Microservices', 'Linux'],
        platforms: ['Next.js', 'React', 'MongoDB', 'Redis', 'WebRTC', 'WebSockets']
    },
    experience: [
        {
            company: 'SourceFuse',
            title: 'Software Engineer',
            location: 'Remote',
            period: 'Jan 2025 - Present',
            achievements: [
                'Architected secure cloud infrastructure from the ground up using Kubernetes (EKS), Redis, and Kafka',
                'Leading a 4-person engineering team, driving design meetings with stakeholders',
                'Developed a complex system handling 120+ intents with smart routing, reducing wait time by 40%'
            ]
        },
        {
            company: 'Innovenes',
            title: 'Software Engineer',
            location: 'Bengaluru, IN',
            period: 'Jan 2023 - Sept 2024',
            achievements: [
                'Deployed scalable applications on AWS (CloudFront, S3, EKS), achieving 99.9% uptime',
                'Designed and integrated RESTful APIs using Next.js and Go',
                'Enforced multi-tenant design principles, cutting latency by 25%'
            ]
        },
        {
            company: 'AVRL',
            title: 'Software Engineer',
            location: 'Bengaluru, IN',
            period: 'Aug 2021 - Jan 2023',
            achievements: [
                'Developed event-driven architectures with Kafka and Node.js, boosting reliability by 35%',
                'Designed collaborative tools and Chrome extensions for 100+ users'
            ]
        }
    ],
    projects: [
        {
            name: 'Chalkky',
            tech: 'NextJs, React, Clerk, Convex, MongoDB',
            description: 'Implemented live-tracking with WebRTC and WebSockets, supporting over 20 concurrent users. 50% improvement in team collaboration.',
            url: 'https://chalky-sigma.vercel.app/'
        },
        {
            name: 'Jupyter Clone',
            tech: 'ReactJs, JavaScript',
            description: 'Led a team of 3 developers to create an interactive coding platform inspired by Jupyter Notebooks.',
            url: 'https://delightful-churros-a7a2b6.netlify.app/'
        },
        {
            name: 'HTTPS Socket Server',
            tech: 'Java, CLI',
            description: 'Designed an integrated HTTPS server, reducing response times by 50%. Handled over 10,000 simultaneous connections.',
            url: 'https://github.com/shubhranka/https-socket-server'
        },
        {
            name: 'Screen Recorder Extension',
            tech: 'Chrome Extension, GoLang',
            description: 'Devised a tool to demystify complex algorithms, increasing educational outreach by 50%.',
            url: 'https://github.com/shubhranka/tiny_recorder'
        }
    ],
    certifications: [
        { name: 'Convolution Neural Network', id: 'ORHIL83LAZFF' },
        { name: 'Object-Oriented Design', id: 'RLS8Z6BWM90T' },
        { name: 'Improving Deep Neural Networks', id: '8MD6FILLZS1D', subtitle: 'Hyperparameter Tuning, Regularization and Optimization' }
    ]
};

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add animation class to elements
    const animateElements = document.querySelectorAll(
        '.content-card, .skill-category, .timeline-item, .project-card, .cert-card, .contact-item'
    );

    animateElements.forEach(el => {
        el.classList.add('scroll-animate');
        observer.observe(el);
    });
}

// Smooth scroll for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        } else {
            navbar.style.background = 'linear-gradient(to bottom, rgba(10, 10, 15, 0.9), transparent)';
        }

        lastScroll = currentScroll;
    });
}

// Typing effect for hero section (optional enhancement)
function initTypingEffect() {
    const tagline = document.querySelector('.tagline');
    if (!tagline) return;

    const text = tagline.textContent;
    tagline.textContent = '';
    let index = 0;

    function type() {
        if (index < text.length) {
            tagline.textContent += text.charAt(index);
            index++;
            setTimeout(type, 30);
        }
    }

    setTimeout(type, 1000);
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initSmoothScroll();
    initNavbarScroll();
    initTypingEffect();

    // Make data available globally for potential dynamic updates
    window.portfolioData = portfolioData;
});

// Export for potential use
window.portfolioContent = {
    initScrollAnimations,
    initSmoothScroll,
    initNavbarScroll,
    initTypingEffect
};
