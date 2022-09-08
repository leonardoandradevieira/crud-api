module.exports = (req, res) => {
	const fs = require('fs').promises;

	const readFs = fs.readFile('data/lista_usuarios.json', 'utf-8')
    .then((response) =>{
        const json = JSON.parse(response);
        const id = json.length;

        const name = req.body.name;
        const email = req.body.email;
        
        const newUser = { "name": name, "email": email, "deleted": "false", "id": id};

        json.push(newUser);

        fs.writeFile('data/lista_usuarios.json', JSON.stringify(json, null, 2));
    });

    res.status(200).send('post foi');	
}