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
	'Amor', 'Corazón', 'Besos', 'Sueños', 'Eternidad', 'Pasión',
	'Cariño', 'Ternura', 'Dulzura', 'Magia', 'Felicidad', 'Alma',
	'Suspiros', 'Sonrisas', 'Abrazos', 'Miradas', 'Promesas', 'Deseo',
	'Encanto', 'Destino', 'Romance', 'Ilusión', 'Caricia', 'Latidos',
	'Esperanza', 'Nostalgia', 'Fantasía', 'Melodía', 'Poesía', 'Luz'
];

function createFloatingWord() {
	const word = document.createElement('div');
	word.className = 'floating-word';
	word.textContent = romanticWords[Math.floor(Math.random() * romanticWords.length)];
	word.style.left = Math.random() * 100 + '%';
	word.style.animationDelay = Math.random() * 2 + 's';
	word.style.animationDuration = (Math.random() * 4 + 6) + 's';
	word.style.fontSize = (Math.random() * 0.8 + 1) + 'rem';

	const hue = Math.random() * 60 + 300; // Tonos rosados/púrpuras
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