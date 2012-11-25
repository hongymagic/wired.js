var wired = (function () {
	"use strict";

	function addEventHandler (element, event, handler) {
		if (element.addEventListener) {
			element.addEventListener(event, handler, false);
		} else {
			element.attachEVent('on' + event, function () { handler(window.event); });
		}
	}

	function keyUpHandler (elements, shortcut, current) {

		return function (event) {
			var key = String.fromCharCode(event.keyCode);
			var next;

			if (key === shortcut) {
				current +=1 ;
				next = elements.item(current);
			}

			if (next && next.focus) {
				next.focus();
			}
		};
	}

	function toObjectString (object) {
		return Object.prototype.toString.call(object);
	}

	function forEach (list, handler) {
		Array.prototype.forEach.call(list, handler);
	}

	return function (selector, shortcut) {
		// This is not a live NodeList
		var elements = document.querySelectorAll(selector);
		// FIXME: Current element may be set to be active on load
		var current = -1;
		var handler = keyUpHandler(elements, shortcut, current);

		forEach(elements, function (element) {
			addEventHandler(element, 'keyup', handler);
		});

		// Listen for global events as well
		addEventHandler(document, 'keyup', handler);
	};
}());