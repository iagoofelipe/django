$(function(){
    $('#pop-up').css({'display':'none'});
})

function callPopup(msg){
    $('#pop-up p').text(msg);
    $('#pop-up').fadeIn();
    window.setTimeout(function(){$('#pop-up').fadeOut()}, 5000)
}

function validate(){
    var form = document.getElementById('form');
    var user = form['user'].value;
    var password = form['password'].value;
    var token = form['csrfmiddlewaretoken'].value;

    if(user == "" || password == ""){
        callPopup("campos usuário e senha são obrigatórios!");
        return
    }

    $.post('login/validate_login/', {'user':user, 'password':password, 'csrfmiddlewaretoken': token}).done(
        function(response){
            j_response = JSON.parse(response);
            if(j_response['authorized'].toLowerCase() == "true"){
                window.location.href = '/home/';
            } else {
                callPopup("usuário ou senha incorretos!");
            }
        });
}