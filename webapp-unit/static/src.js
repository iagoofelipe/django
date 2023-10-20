function callPopup(msg) {
    /* exibindo alerta com mensagem por 5 segundos */
    $('#pop-up p').text(msg);
    $('#pop-up').fadeIn();
    window.setTimeout(function(){$('#pop-up').fadeOut()}, 5000);
}

function logout(){
    window.location.href = '/login/logout';
}

const navFirstFocus = "container-acessos";
function getUserData(form) {
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

    return data;
}

export { callPopup, logout, navFirstFocus, getUserData }