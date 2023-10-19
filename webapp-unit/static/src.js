export function callPopup(msg) {
    /* exibindo alerta com mensagem por 5 segundos */
    $('#pop-up p').text(msg);
    $('#pop-up').fadeIn();
    window.setTimeout(function(){$('#pop-up').fadeOut()}, 5000);
}

export function logout(){
    window.location.href = '/login/logout';
}

export const navFirstFocus = "container-acessos";