import { callPopup } from "/static/src.js";

class Registros {
    container_id = 'container-registros';
    table = document.getElementById('table-reg-body');

    constructor() {
        /* utilizada ao inicializar a página */
        this.getTabValues();
        $('#reload-tabReg').click(() => {this.getTabValues()}); // atualizar dados da tabela ao clicar em reload
        document.getElementById('select-typeRegistro').onchange = () => {this.getTabValues()};
    }

    get typeRegistro() {
        return document.getElementById('select-typeRegistro').value;
    }

    getTabValues() {
        /* atualizando valores da tabela */
        let type = this.typeRegistro;

        // $.get("tabRegValues", {'type':type, 'limit':10}).done(
        $.get("registros/registros_salvos", {'type':type, 'limit':10}).done(
            (response) => {
                this.tabValues = JSON.parse(response).reverse();
                this.setTabValues();
                this.setCardValues();
            }
        )

    }

    setTabValues() {
        let html = "";
        let i;

        for(i in this.tabValues){
            let row = this.tabValues[i];
            html += `<tr><td></td><td hidden>${row.id}</td> <td>${row.categoria}</td><td>${row.data}</td><td>${row.valor}</td><td>${row.descricao}</td><td><i class="bi bi-trash"></i></td></tr>`
        }
        this.table.innerHTML = html;
    }

    newReg() {
        // enviar request
        let form = document.getElementById('form-reg');
        let data = {
            'csrfmiddlewaretoken': form['csrfmiddlewaretoken'].value,
            'typeRegistro': form.typeRegistro.value,
            'categoria': form.categoria.value,
            'data': form.data.value,
            'valor': form.valor.value,
            'descricao': form.descricao.value,
        }

        $.post('registros/novo_registro', data).done((r) => {
            if('200' == r){
                form.reset();
                callPopup("Registro salvo com êxito!");
                this.getTabValues();
                this.setCardValues();
                return
            }

            callPopup("ResponseCode: "+r);
        })
    }

    setCardValues() {
        $.get("registros/card_values").done((response) => {
            response = JSON.parse(response);
            this.card_values = response;
            
            // entradas
            if(response['contagem_entradas'] == 1){
                $('#card-entradas .description').text(`${response['contagem_entradas']} registro`);
            } else {
                $('#card-entradas  .description').text(`${response['contagem_entradas']} registros`);
            }
            $('#card-entradas .value').text(`R$: ${response['total_entradas']}`);
            
            // saídas
            if(response['contagem_saidas'] == 1){
                $('#card-saidas .description').text(`${response['contagem_saidas']} registro`);
            } else {
                $('#card-saidas .description').text(`${response['contagem_saidas']} registros`);
            }
            $('#card-saidas .value').text(`R$: ${response['total_saidas']}`);
            
            // total
            $('#card-total .value').text(`R$: ${response['total']}`);
        })
    }
}

export default Registros;