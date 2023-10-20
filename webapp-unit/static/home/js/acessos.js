import { callPopup, getUserData } from "/static/src.js";

export default class Acessos {
    #break_required = false;
    table_cadastrados = document.getElementById('table-cad-body');
    $card_editar_user = $('#card-editar-user');
    $card_cad_user = $('#card-cad-user');

    constructor() {
        $('#reload-tabCad').click(() => {this.getCadastrados()});
        $('#form-editar-cad .btn-cancelar').click(() => {this.changeCardForm('cadastrar')});

        this.$card_editar_user.hide();
        this.getCadastrados();
    }

    changeCardForm(cardName) {
        if(cardName == 'cadastrar') {
            this.$card_cad_user.show();
            this.$card_editar_user.hide();
        } else if(cardName == 'editar') {
            this.$card_editar_user.show();
            this.$card_cad_user.hide();
        }
        document.getElementById('form-cadastrar').reset();
        document.getElementById('form-editar-cad').reset();
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
        let data = getUserData(form);
    
        $.post('/login/cadastro', data).done((r) => {
            callPopup(r);
            if('usuário cadastrado com sucesso!' == r){
                form.reset();
                this.getCadastrados();
            }
        })
    }

    getCadastrados() {
        $.get("acessos/cadastrados", {'limit':'', 'reverse':'true', 'order_by_last':'true', 'resume':'true'}).done(
            (response) => {
                this.cadastrados = JSON.parse(response);
                this.setCadastrados();
            }
        )
    }

    editarUsuario(id) {
        $.get("acessos/cadastrado", {'id':id, 'dateformat':'%Y-%m-%d'}).done(
            (response) => {
                console.log(response);
                response = JSON.parse(response);
                if("error" in response) {
                    callPopup(response["error"] + ", atualize a página e tente novamente!");
                    return
                }

                this.changeCardForm('editar');
                this.paraEditar = response;
                
                let form = document.getElementById('form-editar-cad');
                form.acesso.value = response['acesso'];
                form.cargo.value = response['cargo'];
                form.fullname.value = response['fullname'];
                form.username.value = response['username'];
                form.cpf.value = response['cpf'];
                form.email.value = response['email'];
                form.telefone.value = response['telefone'];
                form.nascimento.value = response['nascimento'];
            }
        )
    }

    editarUsuarioForm() {
        // verificando se a senha foi digitada
        let form = document.getElementById('form-editar-cad');
        if(form.password.value != form['password-confirm'].value) {
            callPopup('As senhas não correspondem!');
            return
        }

        if(form.password.value) {
            if(!confirm('A senha cadastrada anteriormente será perdida, deseja prosseguir?')) {
                return
            }
        }
        
        let data = getUserData(form);
        $.post('acessos/editar_usuario', data).done((r) => {
            callPopup(r);
            if('usuário editado com sucesso!' == r){
                form.reset();
                this.getCadastrados();
                this.changeCardForm('cadastrar');
            }
        });
    }

    setCadastrados() {
        let html = "";
        let i;

        for(i in this.cadastrados){
            let row = this.cadastrados[i];
            html += `<tr> <td></td> <td>${row.fullname}</td> <td>${row.cargo}</td> <td>${row.acesso}</td> <td>${row.username}</td>  <td>${row.email}</td> <td><i onclick="script.acessos.editarUsuario(${row.id})" class="fa-solid fa-pen-to-square" style="color: #3D3D3D; cursor: pointer;"></i></td> </tr>`
        }
        this.table_cadastrados.innerHTML = html;
    }
}