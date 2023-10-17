// definindo último container exibido
var lastContainerName = null;
var lastItemId = null;
var containers = [];
var navItems = [];

$(function(){
    $('#pop-up').css({'display':'none'});

    let containerName = null;
    document.getElementById('nav-items').querySelectorAll('.nav-item')
        .forEach(function(i){
            let itemName = i.innerText.toLowerCase();
            containers.push(`container-${itemName}`);
            navItems.push(`item-${itemName}`);
            
            $(`#container-${itemName}`).css('display', 'none');
        });

    // navItemClick(containers[0], false);
    navItemClick('container-registros', false);
    setTabRegValues();
});

function callPopup(msg){
    $('#pop-up p').text(msg);
    $('#pop-up').fadeIn();
    window.setTimeout(function(){$('#pop-up').fadeOut()}, 5000);
}


function navItemClick(item, auto=true){
    let containerName = null;
    let itemId = null;

    if(auto){
        containerName = `container-${item.innerText.toLowerCase()}`;
        itemId = `item-${item.innerText.toLowerCase()}`;
    }
    else {
        containerName = item;
        itemId = item.replace('container', 'item');
    }

    $(`#${lastContainerName}`).css('display', 'none');
    // $(`#${containerName}`).css('display', 'flex');
    $(`#${containerName}`).css('display', 'block');
    
    $(`#${lastItemId}`).css({'background':'transparent', 'color':'var(--font-color)'});
    $(`#${itemId}`).css({'backgroundColor':'var(--primary-color)', 'color':'white'});

    lastContainerName = containerName;
    lastItemId = itemId;
}

function logout(){
    window.location.href = '/login/logout';
}

function cadastrarUsuario(){
    var break_required = false;
    let form = document.getElementById('form-cadastrar');

    // verificar se todos os campos obrigatórios estão preenchidos
    let obrigatorios = ['acesso','cargo','fullname','password', 'password-confirm'];
    obrigatorios.forEach(function(i){
        if(form[i].value == ''){
            callPopup("Preencha todos os campos obrigatórios!");
            break_required = true;
        }
    });

    if(break_required){
        return
    }

    // verificar se as senhas correspondem
    if(form['password'].value != form['password-confirm'].value){
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

    $.post('/login/cadastro', data).done(function(r){
        callPopup(r);
        if('usuário cadastrado com sucesso!' == r){
            form.reset();
        }
    })
}

function submitNewReg(){
    // enviar request
    let form = document.getElementById('form-reg');
    let type = form.typeRegistro.value;
    let data = {
        'csrfmiddlewaretoken': form['csrfmiddlewaretoken'].value,
        'typeRegistro': form.typeRegistro.value,
        'categoria': form.categoria.value,
        'data': form.data.value,
        'valor': form.valor.value,
        'descricao': form.descricao.value,
    }

    $.post('form_new_registro', data).done(function(r){
        if('200' == r){
            form.reset();
            callPopup("Registro salvo com êxito!");
            setTabRegValues();
            return
        }

        callPopup("ResponseCode: "+r);
    })
}

function setTabRegValues(){
    let type = document.getElementById('select-typeRegistro').value;
    let table = document.getElementById('table-reg-body');

    $.get("tabRegValues", {'type':type, 'returnType':''}).done(
        function(response){
            response = JSON.parse(response).reverse();
            console.log(response);
            let html = "";

            for(i in response){
                let row = response[i];
                html += `<tr><td></td><td hidden>${row.id}</td> <td>${row.categoria}</td><td>${row.data}</td><td>${row.valor}</td><td>${row.descricao}</td><td><i class="bi bi-trash"></i></td></tr>`
            }
            table.innerHTML = html;
            // let j_row = JSON.parse(response);
            // console.log(j_row);
            // for(row in response){
            // }
            
            // response = "id,categoria,data,valor,descricao";

            // response.split(',');
            // j_response = JSON.parse(response);
            // `<tr><td></td><td>OUTROS</td><td>23/10/2023</td><td>12,00</td><td>descrição do registro</td><td><i class="bi bi-trash"></i></td></tr>`
    })
}