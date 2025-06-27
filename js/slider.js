const track = document.querySelector('.carousel-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.next');
const prevButton = document.querySelector('.prev');

const slideWidth = slides[0].getBoundingClientRect().width;

// Organiza los slides uno al lado del otro
slides.forEach((slide, index) => {
    slide.style.left = slideWidth * index + 'px';
});

let currentSlide = 0;

const moveToSlide = (track, current, target) => {
    track.style.transform = 'translateX(-' + target.style.left + ')';
};

nextButton.addEventListener('click', e => {
    currentSlide = (currentSlide + 1) % slides.length;
    moveToSlide(track, slides[currentSlide], slides[currentSlide]);
});

prevButton.addEventListener('click', e => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    moveToSlide(track, slides[currentSlide], slides[currentSlide]);
});