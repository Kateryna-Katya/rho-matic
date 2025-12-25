document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // 1. Плавный скролл
    const lenis = new Lenis();
    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // 2. Анимация Hero (PRO: SplitType + GSAP)
    const heroTitle = new SplitType('#hero-title', { types: 'words, chars' });
    gsap.from(heroTitle.chars, {
        opacity: 0,
        y: 50,
        rotateX: -45,
        stagger: 0.02,
        duration: 1,
        ease: "back.out(1.7)",
        delay: 0.5
    });

    gsap.from('.hero__subtitle, .hero__btns', {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        delay: 1.2
    });

    // 3. Мобильное меню
    const toggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu__link');

    const toggleMenu = () => {
        toggle.classList.toggle('menu-toggle--active');
        mobileMenu.classList.toggle('mobile-menu--open');
        document.body.style.overflow = mobileMenu.classList.contains('mobile-menu--open') ? 'hidden' : '';
    };

    toggle.addEventListener('click', toggleMenu);
    mobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

    // 4. Валидация формы и Капча
    const form = document.getElementById('mainForm');
    const phoneInput = document.getElementById('phone');
    const msg = document.getElementById('form-message');
    
    // Только цифры в телефоне
    phoneInput.addEventListener('input', (e) => {
        e.target.value = e.target.value.replace(/\D/g, '');
    });

    // Имитация капчи
    let val1 = Math.floor(Math.random() * 10);
    let val2 = Math.floor(Math.random() * 10);
    const captchaLabel = document.getElementById('captcha-label');
    captchaLabel.innerText = `Сколько будет ${val1} + ${val2}?`;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const captchaAnswer = document.getElementById('captcha-input').value;

        if (parseInt(captchaAnswer) !== (val1 + val2)) {
            msg.innerText = "Ошибка капчи. Попробуйте снова.";
            msg.style.color = "red";
            return;
        }

        // AJAX имитация
        msg.innerText = "Отправка...";
        setTimeout(() => {
            msg.innerHTML = "<span class='success'>Успешно! Мы свяжемся с вами.</span>";
            form.reset();
        }, 1500);
    });

    // 5. Cookie Popup
    const cookiePopup = document.getElementById('cookie-popup');
    const acceptBtn = document.getElementById('accept-cookies');

    if (!localStorage.getItem('cookies_accepted')) {
        setTimeout(() => cookiePopup.classList.add('cookie-popup--show'), 2000);
    }

    acceptBtn.addEventListener('click', () => {
        localStorage.setItem('cookies_accepted', 'true');
        cookiePopup.classList.remove('cookie-popup--show');
    });

    // 6. Scroll Animations для секций
    gsap.utils.toArray('.section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
            },
            opacity: 0,
            y: 50,
            duration: 1
        });
    });
});