const hackInterval = setInterval(() => {
	// Get the video element.
	const videoElement = document.querySelector("video");
	if (videoElement === undefined) {
		return;
	}
	clearInterval(hackInterval);

	// Add a gain node to it.
	const audioContext = new AudioContext();
	const source = audioContext.createMediaElementSource(videoElement);
	const gainNode = audioContext.createGain();
	source.connect(gainNode);
	gainNode.connect(audioContext.destination);

	// Create additional volume controls.
	const buttons = $("<div class='buttons'></div>");
	buttons.css("display", "flex");

	const volumeDown = $("<div class='button'>-</div>");
	const volumeUp = $("<div class='button'>+</div>");
	const volumeIndicator = $(
		`<div class='indicator'>${gainNode.gain.value}</div>`
	);

	buttons.append(volumeDown);
	buttons.append(volumeIndicator);
	buttons.append(volumeUp);

	volumeDown.add(volumeUp).css({
		padding: "0 20px",
		color: "#fff",
		"font-size": "30px",
		"text-align": "center",
		cursor: "pointer",
		"user-select": "none",
	});

	// Connect volume controls.
	volumeUp.on("click", () => {
		gainNode.gain.value *= 2;
		volumeIndicator.text(gainNode.gain.value);
	});
	volumeDown.on("click", () => {
		gainNode.gain.value /= 2;
		if(gainNode.gain.value < 1) {
			gainNode.gain.value = 1;
		}
		volumeIndicator.text(gainNode.gain.value);
	});

	// Add them to the existing controls.
	$(".ytp-volume-area").after(buttons);
}, 1000);