$(function(){
    $('#pop-up').css({'display':'none'});
    $('#btn-submit-form').css({'display':'none'});
})

function callPopup(msg){
    $('#pop-up p').text(msg);
    $('#pop-up').fadeIn();
    window.setTimeout(function(){$('#pop-up').fadeOut()}, 5000);
}

function validate(){
    let form = document.getElementById('form');
    let user = form['username'].value;
    let password = form['password'].value;
    let token = form['csrfmiddlewaretoken'].value;
    
    if(user == "" || password == ""){
        callPopup("campos usuário e senha são obrigatórios!");
        return
    }
    $.post('/login/login', {'username':user, 'password':password, 'csrfmiddlewaretoken': token}).done(
        function(response){
            j_response = JSON.parse(response);
            if(j_response['authorized'].toLowerCase() == "true"){
                window.location.href = "/home/";
            } else {
                callPopup("usuário ou senha incorretos!");
            }
        });
}