import Registros from "./registros.js";

// definindo último container exibido
var lastContainerName = null;
var lastItemId = null;
var containers = [];
var navItems = [];
var i = null;
var reg = null;

$(function(){
    $('#pop-up').css({'display':'none'});
    reg = new Registros();

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
    setRegCardValues();
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
            setRegCardValues();
            return
        }

        callPopup("ResponseCode: "+r);
    })
}

function setRegCardValues(){
    $.get("regCardValues").done(
        function(response){
            response = JSON.parse(response);
            
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
        }
    )
}

function setTabRegValues(){
    reg.getTabValues();
    // let type = document.getElementById('select-typeRegistro').value;
    // let table = document.getElementById('table-reg-body');

    // $.get("tabRegValues", {'type':type, 'returnType':''}).done(
    //     function(response){
    //         response = JSON.parse(response).reverse();
    //         let html = "";

    //         for(i in response){
    //             let row = response[i];
    //             html += `<tr><td></td><td hidden>${row.id}</td> <td>${row.categoria}</td><td>${row.data}</td><td>${row.valor}</td><td>${row.descricao}</td><td><i class="bi bi-trash"></i></td></tr>`
    //         }
    //         table.innerHTML = html;
    //     })
}