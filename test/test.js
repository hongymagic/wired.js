// qunit – we only write AAA tests nothing lower than AAA+ thanks.

(function () {
	var selector = 'input[data-wired]';
	var shortcut = 'a';
	var document = window.document;
	var elements;

	module('wired', {
		setup: function () {
			wired(selector, shortcut);
			elements = document.querySelectorAll(selector);
		},
		teardown: function () {
			elements = null;
		},
	});

	test('should select first wired element when pressed for the first time on document', function () {
			// assert – see what i did here
			var first = elements[0];
			var focused;

			// act – trigger shortcut key on document
			emulateKeyEvent(shortcut, document);

			// assert
			stop();
			setTimeout(function () {
				focused = document.activeElement;
				assert.equal(focused, first);
				assert.equal(focused.name, 'first-name');
				start();
			}, 15);

			// it's still AAA
	});

	test('should advance to next wired element when activated', function () {
		// arrange
		var current = elements[0];
		var next = elements[1];
		current.focus();

		// act
		emulateKeyEvent(shortcut, current);

		// assert
		stop();
		setTimeout(function () {
			assert.equal(document.activeElement, next);
			assert.equal(document.activeElement.name, 'location');
			start();
		}, 15);
	});
})();

//
// Test helpers
//

function createKeyEvent (type, key) {
	var event = document.createEvent('Event');
	event.initEvent(type, true, true);
	event.keyCode = typeof key === 'string' ? key.charCodeAt(0) : key;
	return event;
}

// emulate a simple key press event (without the keypress event). woah.
function emulateKeyEvent (key, element) {
	var keydown = createKeyEvent('keydown', key);
	var keyup = createKeyEvent('keyup', key);

	trigger(keydown, element);
	trigger(keyup, element);
}

// trigger a given event on the element. if element is empty, trigger it on
// the document object.
function trigger (event, element) {
	(element || document).dispatchEvent(event);
}
