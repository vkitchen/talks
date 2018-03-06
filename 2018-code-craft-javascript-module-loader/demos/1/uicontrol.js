
// ---- INITIALISATION ----

Utilities.componentPath = '../components/';
Utilities.loadComponent('segmented-control', 'page-header', 'progress-bar', 'input', 'radio-button', 'form-section', 'tooltip' );

// ---- METHODS ----


function initialise() {

	segmentedControl = new SegmentedControl(segmentedControlElement, 0);
	pageHeader = new PageHeader(pageHeaderElement);
	progressBar = new ProgressBar(progressBarElement);
	tooltip = new Tooltip(tooltipElement);

}

// ---- EVENTS ----

document.addEventListener('All Components Loaded', initialise);//Utilities.js broadcasts this event once it's finished loading components
