/*global require,exports,global:false*/

var util = require('./util');
var queryString = require('query-string');

require('./chem');
require('./rnd');
require('./ui');

var ui = global.ui;
var chem = global.chem;
var rnd = global.rnd;

var server = require('./ui/server.js');

// ketcher.* namespace should be global
// (the only global as we have API methods here)
var ketcher = global.ketcher = function () {
		this.render = null;
	};

ketcher.time_created = '__TIME_CREATED__';
ketcher.version = '2.0.0-alpha.1';

ketcher.getSmiles = function () {
	var saver = ui.standalone ? new chem.SmilesSaver() : new chem.MolfileSaver();
	var mol = saver.saveMolecule(ui.ctab, true);
	return ui.standalone ? mol : server.smiles.sync({
			moldata: mol
		});
};

ketcher.getMolfile = function () {
	var saver = new chem.MolfileSaver();
	return saver.saveMolecule(ui.ctab, true);
};

ketcher.setMolecule = function (molString) {
	if (!Object.isString(molString)) {
		return;
	}
	ui.loadMolecule(molString);
};

ketcher.addFragment = function (molString) {
	if (!Object.isString(molString)) {
		return;
	}
	ui.loadMolecule(molString, undefined, undefined, true);
};

ketcher.showMolfile = function (clientArea, molfileText, autoScale, hideImplicitHydrogen) {
	return ketcher.showMolfileOpts(clientArea, molfileText, 75, {
		'showSelectionRegions': false,
		'showBondIds': false,
		'showHalfBondIds': false,
		'showLoopIds': false,
		'showAtomIds': false,
		'autoScale': autoScale || false,
		'autoScaleMargin': 4,
		'hideImplicitHydrogen': hideImplicitHydrogen || false
	});
};

ketcher.showMolfileOpts = function (clientArea, molfileText, bondLength, opts) {
	this.render = new rnd.Render(clientArea, bondLength, opts);
	if (molfileText) {
		this.render.setMolecule(chem.Molfile.parseCTFile(typeof (molfileText) === 'string' ? molfileText.split('\n') : molfileText));
	}
	this.render.update();
	return this.render;
};

ketcher.onStructChange = function (handler) {
	util.assert(handler);
	ui.render.addStructChangeHandler(handler);
};

// TODO: replace window.onload with something like <https://github.com/ded/domready>
// to start early
global.onload = function () {
	var params = queryString.parse(document.location.search);
	ui.init(params);
};
