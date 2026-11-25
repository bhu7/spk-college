
const menu = document.querySelector('#menu'),
      nav = document.querySelector('#nav');

menu.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
});

nav.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => {
        nav.classList.remove('open');
        menu.setAttribute('aria-expanded', 'false');
    })
);

document.querySelectorAll('[data-course]').forEach(a =>
    a.addEventListener('click', () =>
        document.querySelector('[name=course]').value = a.dataset.course
    )
);

// Official College Email Address
const COLLEGE_EMAIL = 'spkapgate1507@gmail.com';

const statusEl = document.querySelector('#formStatus');

if (COLLEGE_EMAIL) {
    const link = document.querySelector('#footerEmail');
    link.href = 'mailto:' + COLLEGE_EMAIL;
    link.textContent = COLLEGE_EMAIL;
}

// Admission Enquiry Form
document.querySelector('#enquiry').addEventListener('submit', e => {
    e.preventDefault();

    if (!COLLEGE_EMAIL) {
        statusEl.textContent = 'The college email address has not been configured yet. Please contact the admissions office by phone.';
        return;
    }

    const d = new FormData(e.target);

    const body = Array.from(d.entries())
        .map(([k, v]) => k + ': ' + v)
        .join('\n');

    statusEl.textContent = 'Opening your email app. Please review and send the message.';

    location.href = 'mailto:' + COLLEGE_EMAIL
        + '?subject=' + encodeURIComponent('Admission enquiry - SPK Mahavidyalaya')
        + '&body=' + encodeURIComponent(body);
});

// Automatic Copyright Year
document.querySelector('#year').textContent =
    new Date().getFullYear();

// Hero Image Slider
const slides = [...document.querySelectorAll('.slide')],
      dots = [...document.querySelectorAll('[data-slide]')],
      pause = document.querySelector('#pause');

let current = 0,
    timer,
    playing = !matchMedia('(prefers-reduced-motion: reduce)').matches;

function show(n) {
    current = (n + slides.length) % slides.length;

    slides.forEach((s, i) => {
        s.hidden = i !== current;
        s.classList.toggle('active', i === current);
        dots[i].setAttribute('aria-current', String(i === current));
    });
}

function reset() {
    clearInterval(timer);

    if (playing) {
        timer = setInterval(() => show(current + 1), 6500);
    }

    pause.textContent = playing ? 'Ⅱ' : '▶';

    pause.setAttribute(
        'aria-label',
        playing ? 'Pause slideshow' : 'Play slideshow'
    );
}

document.querySelector('#prev').onclick = () => {
    show(current - 1);
    reset();
};

document.querySelector('#next').onclick = () => {
    show(current + 1);
    reset();
};

dots.forEach((d, i) => d.onclick = () => {
    show(i);
    reset();
});

pause.onclick = () => {
    playing = !playing;
    reset();
};

document.querySelector('.slider').addEventListener('focusin', () => {
    playing = false;
    reset();
});

show(0);
reset();
