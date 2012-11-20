describe('wired tests', function () {

	var selector = 'input[data-wired]';
	var shortcut = 'a';
	var shortcutKeyCode = 65;
	var elements;

	before(function () {
		wired(selector, shortcut);
		elements = document.querySelectorAll(selector);
	});

	after(function () {
		unwire(selector, shortcut);
		element = null;
	});

	it('should advance to next wired element', function () {
		// arrange
		var first = elements[0];
		var result;

		// act
		emulateKeyEvent(shortcutKeyCode, first);

		// assert
		setTimeout(function () {
			// TODO: get currently focused element
		}, 10);
	});

});

//
// Test helpers
//

function createKeyEvent (type, key) {
	var event = document.createEvent('Event');
	event.initEvent(type, true, true);
	event.keyCode = key;
	return event;
}

function emulateKeyEvent (key, element) {
	var keydown = createKeyEvent('keydown', key);
	var keyup = createKeyEvent('keyup', key);

	trigger(keydown, element);
	trigger(keyup, element);
}

function trigger (event, element) {
	(element || document).dispatchEvent(event);
}

