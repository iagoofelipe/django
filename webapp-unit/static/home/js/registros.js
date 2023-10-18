class Registros {
    container_id = 'container-registros';
    table = document.getElementById('table-reg-body');
    tabValues;

    constructor() {
        /* utilizada ao inicializar a página */
        this.getTabValues();
    }

    get typeRegistro() {
        return document.getElementById('select-typeRegistro').value;
    }

    getTabValues() {
        /* atualizando valores da tabela */
        let type = this.typeRegistro;

        $.get("tabRegValues", {'type':type, 'limit':10}).done(
            function(response){
                this.tabValues = JSON.parse(response).reverse();
                this.setTabValues();
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
}


// function setTabRegValues(){
//     let type = document.getElementById('select-typeRegistro').value;
//     let table = document.getElementById('table-reg-body');

//     $.get("tabRegValues", {'type':type, 'returnType':''}).done(
//         function(response){
//             response = JSON.parse(response).reverse();
//             let html = "";

//             for(i in response){
//                 let row = response[i];
//                 html += `<tr><td></td><td hidden>${row.id}</td> <td>${row.categoria}</td><td>${row.data}</td><td>${row.valor}</td><td>${row.descricao}</td><td><i class="bi bi-trash"></i></td></tr>`
//             }
//             table.innerHTML = html;
//         })
// }


export default Registros;
