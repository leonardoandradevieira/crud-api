// mostrar lista
function mostrarLista() {
    fetch('http://localhost:8080/get/usuarios')
    .then(response => {
        return response.json();
    })
    .then(data =>{
        const table = document.querySelector("table");
        table.innerHTML = `<table>
            <tr>
                <th width="50px">ID</th>
                <th width="300px">NOME</th>
                <th width="300px">E-MAIL</th>
                <th width="100px">EDITAR</th>
                <th width="100px">EXCLUIR</th>
            </tr>
        </table>`
        data.forEach(mostrarUsuario);
    });
};
mostrarLista();

function mostrarUsuario(user) {
    const table = document.querySelector("table");
    if (user.deleted == "false") {
    const row = `<tr><td id="${user.id}">${user.id}</td><td id="${user.name}">${user.name}</td><td id="${user.email}">${user.email}</td><td><button type="button" onclick="mostrarInput(this)" id="${user.id}" value="1" class="icons">&#128397</button></td><td><button type="button" onclick="deletarUsuario(${user.id})" class="icons">&#128465</button></td></tr>

    <tr class="editInput" id="input-${user.id}"><td colspan="2"><input type="text" id="nomeEdit-${user.id}" placeholder="Nome Completo"></td><td colspan="2"><input type="email" id="emailEdit-${user.id}" placeholder="Endereço de E-mail"></td><td><button type="button" onclick="editarUsuario(${user.id})">Editar</button></td></tr>`;
    table.innerHTML += row;
    };
};

// cadastrar novo usuário
async function cadastrarUsuario() {
    const newName = document.querySelector("#nameInput").value;
    const newEmail = document.querySelector("#emailInput").value;
    const jsonPost = {
        name: newName,
        email: newEmail,
    };
    const options = {
        method: "POST",
        body: JSON.stringify(jsonPost),
        headers: {
            "Content-Type": "application/json"
        }
    };
    const api = await fetch("/post/usuario", options)
    .then(response=>{
        console.log(response)
    })
    .then(data=>{
        console.log("Usuário Cadastrado")
    })
    mostrarLista();
};

// editar usuario 
function mostrarInput(btn) { 
    if (btn.value == 1) {
    document.querySelector(`#input-${btn.id}`).style.display = "table-row";
    btn.value=2;
    } else {
        document.querySelector(`#input-${btn.id}`).style.display = "none";
        btn.value=1;
    }
};

async function editarUsuario(id) {
    const newName = document.querySelector(`#nomeEdit-${id}`).value;
    const newEmail = document.querySelector(`#emailEdit-${id}`).value;
    const jsonPut = {
        name: newName,
        email: newEmail,
    };
    const options = {
        method: "PUT",
        body: JSON.stringify(jsonPut),
        headers: {
            "Content-Type": "application/json"
        }
    };
    const api = await fetch(`/put/usuario/${id}`, options)
    .then(response=>{
        console.log(response)
    })
    .then(data=>{
        console.log("Usuário Editado")
    })
    
    document.querySelector(`#input-${id}`).style.display = "none";
    mostrarLista();
};

// deletar usuario
async function deletarUsuario(id) {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        }
    };
    const api = await fetch(`/delete/usuario/${id}`, options)
    .then(response=>{
        console.log(response)
    })
    .then(data=>{
        console.log("Usuário Deletado")
    })
    mostrarLista();
};