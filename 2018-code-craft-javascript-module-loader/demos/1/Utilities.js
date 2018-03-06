var Utilities = {

	componentPath: '',

	loadComponent: function (components){

		var componentEvents = [];
		for (var a = 0; a < arguments.length; a++){
			Utilities.loadFile(Utilities.componentPath + '/' + arguments[a] + '.js');

			var newComponentEvent = arguments[a] + ' Loaded';

			componentEvents.push(newComponentEvent);

			document.addEventListener(newComponentEvent, function(event) {
				event = event || window.event; // Was a common IE fix. Still needed?

				var index = $.inArray(event.type, componentEvents);
				if (index > -1) {
					componentEvents.splice(index, 1);
				}

				// Modules finished loading
				if (componentEvents.length == 0)
					document.dispatchEvent(new CustomEvent('All Components Loaded'));
			})
		}
	}
}
