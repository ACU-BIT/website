/* ════════════════════════════════════════════════
   Portfolio JS — Reda Mohamed Mohamed
   ════════════════════════════════════════════════ */

/* ── Certificate data ─────────────────────────────
   FIX: Use relative filenames only (no Windows paths).
   Place all certificate images in the same folder
   as index.html and list their filenames below.
   ─────────────────────────────────────────────── */
const certificates = [
    {
        id: 1,
        title: "Professional Financial Accountant Course",
        image: "WhatsApp Image 2026-04-16 at 2.57.51 PM.jpeg"   // rename your image files to cert1.jpeg, cert2.jpeg etc.
    },
    {
        id: 2,
        title: "Microsoft Excel Certificate",
        image: "WhatsApp Image 2026-04-16 at 2.57.51 PM (3).jpeg"
    },
    {
        id: 3,
        title: "Two Years of Experience in Financial Accounting",
        image: "WhatsApp Image 2026-04-16 at 2.57.51 PM (2).jpeg"
    },
    {
        id: 4,
        title: "Financial Accountant Certificate",
        image: "WhatsApp Image 2026-04-16 at 2.57.51 PM (1).jpeg"
    },
    {
        id: 5,
        title: "Certificate of Appreciation from the Army",
        image: "WhatsApp Image 2026-04-16 at 2.57.52 PM.jpeg"
    },
    {
        id: 6,
        title: "Military Service Certificate",
        image: "WhatsApp Image 2026-04-16 at 2.57.50 PM (3).jpeg"
    },
    {
        id: 7,
        title: "Certificate of experience",
        image: "WhatsApp Image 2026-04-16 at 2.57.50 PM (1).jpeg"
    }
];

/* ── Render certificate grid ──────────────────── */
function renderCertificates() {
    const grid = document.getElementById('cert-grid');
    if (!grid) return;

    grid.innerHTML = '';

    certificates.forEach(cert => {
        const card = document.createElement('div');
        card.className = 'cert-card fade-in-up';
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', 'View certificate: ' + cert.title);

        card.innerHTML = `
            <div class="cert-thumb">
                <img
                    src="${cert.image}"
                    alt="${cert.title}"
                    loading="lazy"
                    onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'"
                >
                <div class="cert-thumb-fallback" style="display:none">
                    <i class="fas fa-certificate" style="font-size:2rem; color:#3b82f6; opacity:0.5"></i>
                    <span>Image not found</span>
                    <code style="font-size:0.7rem; color:#475569">${cert.image}</code>
                </div>
            </div>
            <h4>${cert.title}</h4>
        `;

        card.onclick = () => showCertModal(cert.id);
        card.onkeydown = (e) => { if (e.key === 'Enter' || e.key === ' ') showCertModal(cert.id); };

        grid.appendChild(card);
    });
}

/* ── Certificate modal ────────────────────────── */
function showCertModal(id) {
    const cert = certificates.find(c => c.id === id);
    if (!cert) return;

    document.getElementById('modal-title').textContent = cert.title;
    document.getElementById('modal-image').src = cert.image;
    document.getElementById('modal-image').alt = cert.title;

    const modal = document.getElementById('cert-modal');
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideCertModal(event) {
    /* If called from backdrop click, only close when clicking the backdrop itself */
    if (event && event.target !== document.getElementById('cert-modal')) return;
    _closeModal();
}

function _closeModal() {
    document.getElementById('cert-modal').classList.add('hidden');
    document.body.style.overflow = '';
}

/* Close on Escape key */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') _closeModal();
});

/* ── Mobile menu ──────────────────────────────── */
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    const icon = document.getElementById('menu-icon');
    const isOpen = !menu.classList.contains('hidden');

    menu.classList.toggle('hidden');
    icon.className = isOpen ? 'fas fa-bars text-xl' : 'fas fa-times text-xl';
}

function closeMobileMenu() {
    document.getElementById('mobile-menu').classList.add('hidden');
    document.getElementById('menu-icon').className = 'fas fa-bars text-xl';
}

/* ── Navbar scroll effect ─────────────────────── */
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

/* ── Back to top button ───────────────────────── */
function handleBackToTop() {
    const btn = document.getElementById('back-to-top');
    if (window.scrollY > 400) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }
}

/* ── Scroll animations (Intersection Observer) ── */
function initScrollAnimations() {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));
}

/* ── Active nav link on scroll ────────────────── */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('nav-link-active');
                        if (link.getAttribute('href') === '#' + entry.target.id) {
                            link.classList.add('nav-link-active');
                        }
                    });
                }
            });
        },
        { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(section => observer.observe(section));
}

/* ── Add fade-in-up to main sections ──────────── */
function addFadeAnimations() {
    const targets = document.querySelectorAll(
        '#about > div, #experience > div > *, #projects .project-card, #skills .skill-card, #education > div > *, .military-card'
    );
    targets.forEach((el, i) => {
        el.classList.add('fade-in-up');
        el.style.transitionDelay = `${(i % 4) * 0.08}s`;
    });
}

/* ── Formspree AJAX submit (optional enhancement) */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    form.addEventListener('submit', async function(e) {
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Sending...';
        btn.disabled = true;

        /* Let Formspree handle it normally — this just shows the success msg
           after redirect is avoided via fetch */
        const data = new FormData(form);

        try {
            const res = await fetch(form.action, {
                method: 'POST',
                body: data,
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                e.preventDefault();
                form.reset();
                document.getElementById('form-success').classList.remove('hidden');
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                btn.disabled = false;
                setTimeout(() => {
                    document.getElementById('form-success').classList.add('hidden');
                }, 6000);
            } else {
                /* Fall back to normal form submission */
                btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
                btn.disabled = false;
            }
        } catch {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
            btn.disabled = false;
        }
    });
}

/* ── Init ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    renderCertificates();
    addFadeAnimations();
    initScrollAnimations();
    initActiveNavLinks();
    initContactForm();

    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    window.addEventListener('scroll', handleBackToTop, { passive: true });

    /* Re-observe cert cards after render */
    setTimeout(() => {
        const observer = new IntersectionObserver(
            entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }),
            { threshold: 0.05 }
        );
        document.querySelectorAll('.cert-card').forEach(el => observer.observe(el));
    }, 50);

    console.log('%c✅ Portfolio Loaded', 'color:#3b82f6; font-size:14px; font-weight:bold');
});
