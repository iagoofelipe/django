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
        navItemClick('container-acessos', false);
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
    $(`#${containerName}`).css('display', 'flex');
    
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