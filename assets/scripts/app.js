const STAGE_WIDTH = 1600;
const STAGE_HEIGHT = 900;

function fitStage() {
	const desktop = document.querySelector('.desktop');
	const stage = document.getElementById('stage');
	if (!desktop || !stage) return;
	const scale = Math.min(desktop.clientWidth / STAGE_WIDTH, desktop.clientHeight / STAGE_HEIGHT);
	stage.style.transform = `translate(-50%, -50%) scale(${scale})`;
}

window.addEventListener('resize', fitStage);
window.addEventListener('DOMContentLoaded', fitStage);

document.addEventListener('DOMContentLoaded', () => {
	const output = document.getElementById('console-output');
	const cursor = document.getElementById('console-cursor');
	const kingWindow = document.getElementById('king-window');
	const kingClose = document.getElementById('king-close');
	const audio = document.getElementById('king-audio');

	const lines = [
		'Jurassic Park System Security Interface',
		'Version 4.0.5, Alpha E',
		'Ready...',
		'',
		'> access security',
		'access: PERMISSION DENIED.',
		'> access security grid',
		'access: PERMISSION DENIED.',
		'> access main security grid',
		'access: PERMISSION DENIED....',
		...Array(6).fill("YOU DIDN'T SAY THE MAGIC WORD!")
	];

	let started = false;

	function typeLine(lineIndex, charIndex, onDone) {
		if (lineIndex >= lines.length) {
			onDone();
			return;
		}
		const line = lines[lineIndex];
		const prefix = lines.slice(0, lineIndex).join('\n') + (lineIndex > 0 ? '\n' : '');
		if (charIndex <= line.length) {
			output.textContent = prefix + line.slice(0, charIndex);
			setTimeout(() => typeLine(lineIndex, charIndex + 1, onDone), 22);
		} else {
			setTimeout(() => typeLine(lineIndex + 1, 0, onDone), 260);
		}
	}

	function triggerLockdown() {
		kingWindow.classList.add('is-visible');
		if (audio) {
			audio.play().catch(() => {});
		}
	}

	function startSequence() {
		if (started) return;
		started = true;
		cursor.style.display = 'none';
		typeLine(0, 0, triggerLockdown);
	}

	document.addEventListener('keydown', (event) => {
		if (event.key === 'Enter') startSequence();
	});

	document.addEventListener('click', startSequence, { once: true });

	if (kingClose) {
		kingClose.addEventListener('click', () => {
			kingWindow.classList.remove('is-shaking');
			void kingWindow.offsetWidth;
			kingWindow.classList.add('is-shaking');
		});
	}
});
