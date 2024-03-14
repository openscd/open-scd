module.exports = {
	"env": {
		"browser": true,
		"es2021": true
	},
	"extends": "standard-with-typescript",
	"overrides": [],
	"parserOptions": {
		"ecmaVersion": "latest",
		"sourceType": "module"
	},
	"rules": {
		"indent": ["error", "tab"],
		"@typescript-eslint/indent": ["error", "tab"],
		"no-tabs": "off",
	}
}
