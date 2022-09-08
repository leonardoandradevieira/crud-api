module.exports = (req, res) => {
	const fs = require('fs').promises;

	const readFs = fs.readFile('data/lista_usuarios.json', 'utf-8')
    .then((response) =>{
        const json = JSON.parse(response);
        
        const id = parseInt(req.params.id);
        json[id].name = req.body.name;
        json[id].email = req.body.email;

        fs.writeFile('data/lista_usuarios.json', JSON.stringify(json, null, 2));        
    });

    res.status(200).send('put foi');	
}