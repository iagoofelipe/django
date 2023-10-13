// definindo último container exibido
var lastContainerName = null;
var lastItemId = null;
var containers = [];
var navItems = [];

$(function(){
    let containerName = null;
    document.getElementById('nav-items').querySelectorAll('.nav-item')
        .forEach(function(i){
            let itemName = i.innerText.toLowerCase();
            containers.push(`container-${itemName}`);
            navItems.push(`item-${itemName}`);
            
            $(`#container-${itemName}`).css('display', 'none');
        });

        navItemClick(containers[0], false);
        // document.getElementById(containers[0]).click();
});

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
    $(`#${containerName}`).css('display', 'block');
    
    $(`#${lastItemId}`).css({'background':'transparent', 'color':'var(--font-color)'});
    $(`#${itemId}`).css({'backgroundColor':'var(--primary-color)', 'color':'white'});

    lastContainerName = containerName;
    lastItemId = itemId;
}

function logout(){
    window.location.href = '/login/logout';
}