// ========================================
// CONFIGURAÇÃO DO SUPABASE
// Substitua pelos seus dados do Supabase
// ========================================
const SUPABASE_URL = 'https://qgeykfqzpugvhjhhgump.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFnZXlrZnF6cHVndmhqaGhndW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODU0NDg4MTMsImV4cCI6MjEwMTAyNDgxM30.M-mglGIsy5lfPpEHFe1mSY31c0eapI8LE4JR3IhPt1E';

// Inicializa o cliente do Supabase
let supabaseClient = null;
if (typeof window.supabase !== 'undefined' && SUPABASE_URL !== 'SUA_URL_AQUI') {
    supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ========================================
// DOM CONTENT LOADED
// ========================================
document.addEventListener('DOMContentLoaded', () => {
    initHeroScrollEffect();
    initScrollAnimations();
    initFormMasks();
    initFormSubmit();
    initSmoothScroll();
    initGalleryCarousel();
    initVimeoAutoplay();
});

// ========================================
// 0. VIMEO AUTOPLAY FORCE (MOBILE)
// ========================================
function initVimeoAutoplay() {
    // Aguarda a API do Vimeo carregar antes de rodar o código
    const checkVimeo = setInterval(() => {
        if (typeof Vimeo !== 'undefined') {
            clearInterval(checkVimeo);
            const iframe = document.querySelector('.iframe-container iframe');
            if (iframe) {
                const player = new Vimeo.Player(iframe);
                player.setVolume(0); 
                
                player.play().catch(() => {});

                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            player.play().catch(() => {});
                        } else {
                            player.pause().catch(() => {});
                        }
                    });
                }, { threshold: 0.3 });
                
                observer.observe(document.querySelector('.iframe-container'));
            }
        }
    }, 200); // Checa a cada 200ms
}

// ========================================
// 1. HERO — TEXTO FIXO (sem efeito de scroll)
// ========================================
function initHeroScrollEffect() {
    const heroWords = document.querySelectorAll('.hero-word');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBadge = document.querySelector('.hero-badge');
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Mostra tudo imediatamente sem animação
    heroWords.forEach((word) => {
        word.style.opacity = 1;
        word.style.transform = 'translateY(0) scale(1)';
        word.style.filter = 'blur(0)';
        if (word.classList.contains('highlight')) {
            word.classList.add('gold-active');
        }
    });

    if (heroSubtitle) {
        heroSubtitle.style.opacity = 1;
        heroSubtitle.style.transform = 'translateY(0)';
    }

    if (heroBadge) {
        heroBadge.style.opacity = 1;
    }

    // Apenas o indicador de scroll some ao rolar
    if (scrollIndicator) {
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            scrollIndicator.style.opacity = Math.max(0, 1 - scrollY / 200);
        }, { passive: true });
    }
}

// ========================================
// 2. SCROLL REVEAL
// ========================================
function initScrollAnimations() {
    const els = document.querySelectorAll('.animate-on-scroll');

    if (!('IntersectionObserver' in window)) {
        els.forEach(el => el.classList.add('is-visible'));
        return;
    }

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('is-visible');
                obs.unobserve(e.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    els.forEach(el => obs.observe(el));
}

// ========================================
// 4. MÁSCARA WHATSAPP
// ========================================
function initFormMasks() {
    const input = document.getElementById('whatsapp');
    if (!input) return;

    input.addEventListener('input', function (e) {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 11) v = v.substring(0, 11);

        if (v.length > 7) {
            v = `(${v.substring(0, 2)}) ${v.substring(2, 7)}-${v.substring(7)}`;
        } else if (v.length > 2) {
            v = `(${v.substring(0, 2)}) ${v.substring(2)}`;
        } else if (v.length > 0) {
            v = `(${v}`;
        }
        e.target.value = v;
    });
}

// ========================================
// 5. FORMULÁRIO + SUPABASE
// ========================================
function initFormSubmit() {
    const form = document.getElementById('lead-form');
    const submitBtn = document.getElementById('submit-btn');
    const feedback = document.getElementById('form-feedback');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        feedback.className = 'form-message';
        feedback.style.display = 'none';

        const nome = document.getElementById('nome').value.trim();
        const whatsapp = document.getElementById('whatsapp').value.trim();
        const email = document.getElementById('email').value.trim();
        const cidade = document.getElementById('cidade').value.trim();

        if (!nome || !whatsapp || !email) {
            showMsg('Por favor, preencha todos os campos obrigatórios.', 'error');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showMsg('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        if (whatsapp.replace(/\D/g, '').length < 10) {
            showMsg('Por favor, insira um WhatsApp válido.', 'error');
            return;
        }

        const originalText = submitBtn.textContent;
        submitBtn.classList.add('loading');
        submitBtn.textContent = '';
        submitBtn.disabled = true;

        const params = new URLSearchParams(window.location.search);

        try {
            if (supabaseClient) {
                const { error } = await supabaseClient
                    .from('leads')
                    .insert([{
                        nome_completo: nome,
                        whatsapp,
                        email,
                        cidade: cidade || null,
                        utm_source: params.get('utm_source') || 'direct',
                        utm_medium: params.get('utm_medium') || '',
                        utm_campaign: params.get('utm_campaign') || '',
                        created_at: new Date().toISOString()
                    }]);
                if (error) throw error;
            } else {
                await new Promise(r => setTimeout(r, 1200));
            }

            // Sucesso! Esconde o formulário e o cabeçalho, e mostra a mensagem de agradecimento
            form.style.display = 'none';
            document.querySelector('.form-header').style.display = 'none';
            document.getElementById('thank-you-block').style.display = 'block';

            // Google Ads — Conversão de Lead
            gtag('event', 'conversion', {
                'send_to': 'AW-18353667428/lGosCK60vNscEOT62q9E',
                'value': 1.0,
                'currency': 'BRL'
            });

            // Meta Pixel — Conversão de Lead
            if (typeof fbq !== 'undefined') {
                fbq('track', 'Lead');
            }

        } catch (err) {
            console.error('Erro ao salvar lead:', err);
            showMsg('Ocorreu um erro. Tente novamente.', 'error');
            submitBtn.classList.remove('loading');
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Botão de voltar após o sucesso
    const btnBack = document.getElementById('btn-back-to-site');
    if (btnBack) {
        btnBack.addEventListener('click', () => {
            const galeria = document.getElementById('galeria');
            if (galeria) galeria.scrollIntoView({ behavior: 'smooth' });
        });
    }

    function showMsg(msg, type) {
        feedback.textContent = msg;
        feedback.className = `form-message ${type}`;
        feedback.style.display = 'block';
    }
}

// ========================================
// 6. SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const id = this.getAttribute('href');
            if (id === '#') return;
            const el = document.querySelector(id);
            if (el) {
                e.preventDefault();
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ========================================
// 7. GALERIA CARROSSEL AUTOMÁTICO
// Rola automaticamente a cada 3 segundos.
// Pausa quando o usuário interage (toque/mouse).
// Retoma após 5 segundos sem interação.
// Imagem do centro se destaca.
// ========================================
function initGalleryCarousel() {
    const track = document.getElementById('gallery-track');
    const items = track ? [...track.querySelectorAll('.gallery-item')] : [];
    const dotsContainer = document.getElementById('gallery-dots');
    const prevBtn = document.getElementById('gallery-prev');
    const nextBtn = document.getElementById('gallery-next');
    const wrapper = document.getElementById('gallery-wrapper');

    if (!track || items.length === 0) return;

    let currentIndex = 0;
    let autoScrollInterval = null;
    let resumeTimeout = null;
    let userInteracting = false;

    // Criar dots
    items.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'gallery-dot';
        dot.setAttribute('aria-label', `Foto ${i + 1}`);
        dot.addEventListener('click', () => {
            pauseAutoScroll();
            scrollToItem(i);
            scheduleResume();
        });
        dotsContainer.appendChild(dot);
    });

    const dots = [...dotsContainer.querySelectorAll('.gallery-dot')];

    // Detectar item central
    function updateCenter() {
        const trackRect = track.getBoundingClientRect();
        const center = trackRect.left + trackRect.width / 2;
        let closestIdx = 0;
        let closestDist = Infinity;

        items.forEach((item, i) => {
            const r = item.getBoundingClientRect();
            const d = Math.abs(center - (r.left + r.width / 2));
            item.classList.remove('is-center');
            if (d < closestDist) {
                closestDist = d;
                closestIdx = i;
            }
        });

        items[closestIdx].classList.add('is-center');
        currentIndex = closestIdx;
        dots.forEach((dot, i) => dot.classList.toggle('active', i === closestIdx));
    }

    // Scroll para item (apenas dentro do carrossel, sem puxar a página inteira)
    function scrollToItem(i) {
        i = Math.max(0, Math.min(items.length - 1, i));
        currentIndex = i;
        
        const item = items[i];
        const trackRect = track.getBoundingClientRect();
        const itemRect = item.getBoundingClientRect();
        
        // Calcula a diferença para centralizar a imagem no track
        const centerOffset = (itemRect.left + itemRect.width / 2) - (trackRect.left + trackRect.width / 2);
        
        track.scrollTo({
            left: track.scrollLeft + centerOffset,
            behavior: 'smooth'
        });
    }

    // Auto scroll — avança para a próxima foto a cada 3s
    function startAutoScroll() {
        stopAutoScroll();
        autoScrollInterval = setInterval(() => {
            if (userInteracting) return;
            let next = currentIndex + 1;
            if (next >= items.length) next = 0; // Volta ao início
            scrollToItem(next);
        }, 2000); // Rola a cada 2 segundos para ficar mais dinâmico
    }

    function stopAutoScroll() {
        if (autoScrollInterval) {
            clearInterval(autoScrollInterval);
            autoScrollInterval = null;
        }
    }

    function pauseAutoScroll() {
        userInteracting = true;
        stopAutoScroll();
    }

    function scheduleResume() {
        clearTimeout(resumeTimeout);
        resumeTimeout = setTimeout(() => {
            userInteracting = false;
            startAutoScroll();
        }, 2000); // Retoma rápido após 2s sem interação
    }

    // Escuta scroll do track
    let scrollTimer;
    track.addEventListener('scroll', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(updateCenter, 30);
        requestAnimationFrame(updateCenter);
    }, { passive: true });

    // Pausa quando o usuário toca/arrasta
    track.addEventListener('touchstart', () => {
        pauseAutoScroll();
    }, { passive: true });

    track.addEventListener('touchend', () => {
        scheduleResume();
    }, { passive: true });

    // Pausa com mouse hover (desktop)
    if (wrapper) {
        wrapper.addEventListener('mouseenter', pauseAutoScroll);
        wrapper.addEventListener('mouseleave', () => {
            userInteracting = false;
            startAutoScroll();
        });
    }

    // Setas
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            pauseAutoScroll();
            scrollToItem(currentIndex - 1);
            scheduleResume();
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            pauseAutoScroll();
            scrollToItem(currentIndex + 1);
            scheduleResume();
        });
    }

    // Inicializar
    setTimeout(() => {
        scrollToItem(0);
        updateCenter();
        startAutoScroll(); // Começa o auto-scroll
    }, 300);

    window.addEventListener('resize', () => {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(updateCenter, 150);
    });
}
