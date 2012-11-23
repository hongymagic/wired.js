// qunit + specit and we only write AAA tests nothing lower than AAA+ thanks.
describe('wired tests', function () {

	var selector = 'input[data-wired]';
	var shortcut = 'a';
	var document = window.document;
	var elements;

	before(function () {
		wired(selector, shortcut);
		elements = document.querySelectorAll(selector);
	});

	after(function () {
		unwire(selector, shortcut);
		element = null;
	});

	it('should select first wired element when pressed for first time without focus', function () {
		// assert – see what i did here
		var first = elements[0];
		var focused = focusedElement();
		assert(focused).is(empty);
		assert(focused).not(first);

		// act – trigger shortcut key on document
		emulateKeyEvent(shortcut, document);

		// assert
		stop();
		setTimeout(function () {
			focused = focusedElement();
			assert(focused).is(first);
			start();
		}, 15);

		// it's still AAA
	});

	it('should advance to next wired element when activated', function () {
		// arrange
		var first = elements[1];

		// act
		emulateKeyEvent(shortcut, first);

		// assert
		stop();
		setTimeout(function () {
			assert(focusedElement()).to(eql, first);
			start();
		}, 15);
	});

});

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

// get currently focused element
function focusedElement () {
	throw new 'argh';
}

// focus on given element
function focusElement (element) {
	throw new 'argh';
}

// trigger a given event on the element. if element is empty, trigger it on
// the document object.
function trigger (event, element) {
	(element || document).dispatchEvent(event);
}
