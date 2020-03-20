module.exports = {
	configBaseDir: __dirname,
	extends: [
		'stylelint-config-standard',
		'stylelint-config-rational-order',
	],
	plugins: [
		'stylelint-order',
		'stylelint-config-rational-order/plugin'
	],
	rules: {
		'at-rule-no-unknown': null,
		'order/properties-order': [],
		'plugin/rational-order': [true],
	}
};
