//Slider de imagenes

const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const sliderContainer = document.querySelector('.slider-container');

let currentSlide = 0;
let autoSlideInterval;
let startX = 0;
let isDragging = false;

// Función para mostrar un slide específico
function showSlide(index) {
    // Ajustar el índice para que siempre esté dentro del rango
    currentSlide = (index + slides.length) % slides.length;

    // Mueve el contenedor del slider al slide correspondiente
    const offset = currentSlide * sliderContainer.clientWidth; // Usamos los px para el desplazamiento
    sliderContainer.style.transform = `translateX(-${offset}px)`;

    // Actualiza los dots
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === currentSlide);
    });
}

// Función para avanzar al siguiente slide
function nextSlide() {
    showSlide(currentSlide + 1);
}

// Función para retroceder al slide anterior
function prevSlide() {
    showSlide(currentSlide - 1);
}

// Manejo de los dots
dots.forEach(dot => {
    dot.addEventListener('click', () => {
        currentSlide = parseInt(dot.dataset.index);
        showSlide(currentSlide);
        resetAutoSlide();
    });
});

// Botones de navegación
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

// Pase automático cada 5 segundos
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// Reinicia el pase automático después de una interacción manual
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Inicializa el slider
showSlide(currentSlide);
startAutoSlide();
