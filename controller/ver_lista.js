module.exports = () => {
	const controller = {};
	
	controller.listUsuarios = async (req, res) => {
		const fs = require('fs').promises;

		const readFs = await fs.readFile('data/lista_usuarios.json', 'utf-8');

		res.status(200).send(readFs);
	};

	return controller;
}
