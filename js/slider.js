const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
let currentSlide = 0;

// Inicializa el enfoque
slides[currentSlide].classList.add('active');

// Función para actualizar el enfoque
function updateSlidePosition() {
    // Calcula el desplazamiento centrando el slide activo
    const slideWidth = slides[0].getBoundingClientRect().width + 30; // ancho + margin
    const offset = slideWidth * currentSlide - (track.parentElement.offsetWidth - slideWidth) / 2;
    track.style.transform = `translateX(-${offset}px)`;

    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });
}

// Auto slide cada 3s
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    updateSlidePosition();
}, 3000);

// Inicializa en 1er render
window.addEventListener('load', updateSlidePosition);
