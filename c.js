$("#messageState").on("change", (x) => {
	$(".message").removeClass("openNor").removeClass("closeNor");
	if ($("#messageState").is(":checked")) {
		$(".message").removeClass("closed").removeClass("no-anim").addClass("openNor");
		$(".heart").removeClass("closeHer").removeClass("openedHer").addClass("openHer");
		$(".container").stop().animate({ "backgroundColor": "#f48fb1" }, 2000);
		console.log("Abriendo");
	} else {
		$(".message").removeClass("no-anim").addClass("closeNor");
		$(".heart").removeClass("openHer").removeClass("openedHer").addClass("closeHer");
		$(".container").stop().animate({ "backgroundColor": "#fce4ec" }, 2000);
		console.log("Cerrando");
	}
});

$(".message").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
	console.log("Animation End");
	if ($(".message").hasClass("closeNor"))
		$(".message").addClass("closed");
	$(".message").removeClass("openNor").removeClass("closeNor").addClass("no-anim");
});

$(".heart").on('webkitAnimationEnd oanimationend msAnimationEnd animationend', function (e) {
	console.log("Animation End");
	if (!$(".heart").hasClass("closeHer"))
		$(".heart").addClass("openedHer").addClass("beating");
	else
		$(".heart").addClass("no-anim").removeClass("beating");
	$(".heart").removeClass("openHer").removeClass("closeHer");
});

// Audio player
const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('playPauseBtn');
const progress = document.getElementById('progress');
const progressBar = document.getElementById('progressBar');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');

function formatTime(time) {
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60);
	return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
}

// Verificar que el audio existe antes de agregar listeners
if (audio) {
	audio.addEventListener('loadedmetadata', () => {
		duration.textContent = formatTime(audio.duration);
	});

	audio.addEventListener('timeupdate', () => {
		const percent = (audio.currentTime / audio.duration) * 100;
		progress.style.width = `${percent}%`;
		currentTime.textContent = formatTime(audio.currentTime);
	});
}

if (playPauseBtn && audio) {
	playPauseBtn.addEventListener('click', () => {
		if (audio.paused) {
			audio.play();
			playPauseBtn.textContent = '⏸';
		} else {
			audio.pause();
			playPauseBtn.textContent = '▶';
		}
	});
}

if (progressBar && audio) {
	progressBar.addEventListener('click', (e) => {
		const width = progressBar.clientWidth;
		const clickX = e.offsetX;
		const duration = audio.duration;
		audio.currentTime = (clickX / width) * duration;
	});
}

// Palabras flotantes
const romanticWords = [
	// Palabras naturales y tiernas
	'Preciosa', 'Hermosa', 'Bonita', 'Linda', 'Guapa', 'Bella',
	'Me encantas', 'Me gustas', 'Eres genial', 'Qué linda', 'Qué bonita',

	// Cosas que quieres hacer
	'Un besito', 'Abrazarte', 'Verte', 'Estar contigo', 'Mimitos',
	'Caricias', 'Un abrazo', 'Acurrucarme', 'Besitos', 'Abrazos',

	// Sentimientos reales
	'Me haces sonreír', 'Me das paz', 'Me tranquilizas', 'Me alegras',
	'Mariposas', 'Nervios', 'Emoción', 'Felicidad', 'Alegría',

	// Cosas cotidianas
	'Buenos días', 'Buenas noches', 'Te extraño', 'Pienso en ti',
	'Dulces sueños', 'Cuídate', 'Que descanses', 'Te veo luego',

	// Palabras cariñosas casuales
	'Corazón', 'Amor', 'Cariño', 'Cielo', 'Vida', 'Bebé',
	'Princesa', 'Reina', 'Tesoro', 'Muñeca', 'Chiquita',

	// Cosas que sientes
	'Química', 'Conexión', 'Vibra', 'Chispa', 'Feeling',
	'Complicidad', 'Confianza', 'Tranquilidad', 'Bienestar',

	// Momentos especiales
	'Nuestros momentos', 'Recuerdos', 'Aventuras', 'Citas',
	'Escapadas', 'Planes', 'Sorpresas', 'Travesuras',

	// Expresiones naturales
	'Eres increíble', 'Me fascinas', 'Me vuelves loco',
	'No puedo evitarlo', 'Eres especial', 'Qué suerte tengo'
];

function createFloatingWord() {
	const word = document.createElement('div');
	word.className = 'floating-word';
	word.textContent = romanticWords[Math.floor(Math.random() * romanticWords.length)];
	word.style.left = Math.random() * 100 + '%';
	word.style.animationDelay = Math.random() * 2 + 's';
	word.style.animationDuration = (Math.random() * 4 + 6) + 's';
	word.style.fontSize = (Math.random() * 0.8 + 1) + 'rem';

	const hue = Math.random() * 150 + 400; // Tonos rosados/púrpuras
	word.style.color = `hsla(${hue}, 70%, 50%, 0.7)`;

	return word;
}

function startFloatingWords() {
	// Verificar que el contenedor existe
	const container = document.getElementById('floatingWords');

	if (!container) {
		console.error('No se encontró el elemento con id "floatingWords"');
		return;
	}

	setInterval(() => {
		const word = createFloatingWord();
		container.appendChild(word);

		setTimeout(() => {
			if (container.contains(word)) {
				container.removeChild(word);
			}
		}, 10000); // Aumenté el tiempo para evitar problemas
	}, 800);
}

// Esperar a que el DOM esté listo antes de iniciar
$(document).ready(function () {
	// Iniciar las palabras flotantes solo si existe el contenedor
	if (document.getElementById('floatingWords')) {
		startFloatingWords();
	}
});