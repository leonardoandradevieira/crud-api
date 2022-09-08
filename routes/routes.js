module.exports = app => {
	// visualizar lista GET
	const listaController = require('../controller/ver_lista.js');
	const addController = require('../controller/add_usuario.js');
	const delController = require('../controller/del_usuario.js');
	const putController = require('../controller/put_usuario.js');

	app.get('/get/usuarios', (req, res)=>{
	listaController().listUsuarios(req, res);
	});

	// cadastrar novo usuário POST
	
	app.post('/post/usuario', addController);

	// deletar usuário DELETE

	app.delete('/delete/usuario/:id', delController);

	// editar usuário PUT
	
	app.put('/put/usuario/:id', putController);
}
