const track = document.querySelector('.carousel-track');
const slides = track ? Array.from(track.children) : [];
const spotlight = document.querySelector('.carousel-spotlight');
let currentSlide = 0; // Iniciar explícitamente en 0
let slideInterval;

function updateSlideFocus() {
    if (!slides.length) return;
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

function moveToSlide(targetSlideIndex, instant = false) {
    if (!slides.length || !spotlight || !track) return;

    currentSlide = targetSlideIndex;
    if (currentSlide < 0) currentSlide = slides.length - 1;
    else if (currentSlide >= slides.length) currentSlide = 0;

    const targetSlideElement = slides[currentSlide];
    if (!targetSlideElement) return;

    const spotlightWidth = spotlight.offsetWidth;
    const slideOffsetLeftInTrack = targetSlideElement.offsetLeft;
    const slideWidth = targetSlideElement.offsetWidth;

    let newTransformX = slideOffsetLeftInTrack + (slideWidth / 2) - (spotlightWidth / 2);

    if (instant) {
        track.style.transition = 'none';
    } else {
        track.style.transition = 'transform 0.5s ease-in-out';
    }

    track.style.transform = `translateX(-${newTransformX}px)`;
    updateSlideFocus();

    if (instant) {
        void track.offsetWidth; // Forzar reflujo
        track.style.transition = 'transform 0.5s ease-in-out';
    }
}

function nextSlide() {
    moveToSlide(currentSlide + 1);
}

function startSlider() {
    if (!slides.length || !track || !spotlight) {
        console.warn("Slider, track, o spotlight no encontrados.");
        return;
    }
    moveToSlide(0, true); // Posicionar el primer slide (0) instantáneamente
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 3000);
}

const debounce = (func, delay) => {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
};

const handleResize = debounce(() => {
    moveToSlide(currentSlide, true);
}, 200);

// Usar window.load para asegurar que las imágenes estén cargadas y tengan dimensiones
if (document.readyState === 'complete') {
    startSlider();
} else {
    window.addEventListener('load', startSlider);
}
window.addEventListener('resize', handleResize);

if (spotlight) {
    spotlight.addEventListener('mouseenter', () => clearInterval(slideInterval));
    spotlight.addEventListener('mouseleave', () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 3000);
    });
}