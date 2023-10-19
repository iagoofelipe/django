import { callPopup } from "/static/src.js";

export default class Acessos {
    #break_required = false;
    table_cadastrados = document.getElementById('table-cad-body');

    constructor() {
        $('#reload-tabCad').click(() => {this.getCadastrados()});
        this.getCadastrados();
    }

    cadastrarUsuario() {
        let form = document.getElementById('form-cadastrar');

        // verificar se todos os campos obrigatórios estão preenchidos
        let obrigatorios = ['acesso','cargo','fullname','password', 'password-confirm'];
        obrigatorios.forEach((i) => {
            if(form[i].value == ''){
                callPopup("Preencha todos os campos obrigatórios!");
                this.#break_required = true;
            }
        });
    
        if(this.#break_required){
            return
        }
    
        // verificar se as senhas correspondem
        if(form['password'].value != form['password-confirm'].value) {
            callPopup("As senhas não correspondem!");
            return
        }
    
        // enviar request
        let data = {
            'csrfmiddlewaretoken': form['csrfmiddlewaretoken'].value,
            'type': 'user',
            'acesso': form.acesso.value,
            'cargo': form.cargo.value,
            'fullname': form.fullname.value.toUpperCase(),
            'password': form.password.value,
            'username': form.username.value,
            'cpf': form.cpf.value,
            'email': form.email.value,
            'telefone': form.telefone.value,
            'nascimento': form.nascimento.value
        }
    
        $.post('/login/cadastro', data).done((r) => {
            callPopup(r);
            if('usuário cadastrado com sucesso!' == r){
                form.reset();
                this.getCadastrados();
            }
        })
    }

    getCadastrados() {
        $.get("acessos/cadastrados", {'limit':'', 'reverse':'true', 'order_by_last':'true'}).done(
            (response) => {
                this.cadastrados = JSON.parse(response);
                this.setCadastrados();
            }
        )
    }

    setCadastrados() {
        let html = "";
        let i;

        for(i in this.cadastrados){
            let row = this.cadastrados[i];
            html += `<tr> <td></td> <td>${row.fullname}</td> <td>${row.cargo}</td> <td>${row.acesso}</td> <td>${row.username}</td>  <td>${row.email}</td> <td></td> </tr>`
        }
        this.table_cadastrados.innerHTML = html;
    }
}