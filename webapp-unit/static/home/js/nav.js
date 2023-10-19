import { logout, navFirstFocus } from "/static/src.js";

export default class NavBar {
    containers = [];
    navItems = [];
    lastItemId;

    constructor() {
        /* atribuindo funções aos elementos */
        $('#btn-logout').click(logout);
        
        document.getElementById('nav-items').querySelectorAll('.nav-item')
            .forEach((i) => {
                let itemName = i.innerText.toLowerCase();
                this.containers.push(`container-${itemName}`);
                this.navItems.push(`item-${itemName}`);
                
                $(`#container-${itemName}`).css('display', 'none');
            });

        this.navItemClick(navFirstFocus, false);
    }

    navItemClick(item, auto=true){
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
    
        $(`#${this.lastContainerName}`).css('display', 'none');
        $(`#${containerName}`).css('display', 'block');
        
        $(`#${this.lastItemId}`).css({'background':'transparent', 'color':'var(--font-color)'});
        $(`#${itemId}`).css({'backgroundColor':'var(--primary-color)', 'color':'white'});
    
        this.lastContainerName = containerName;
        this.lastItemId = itemId;
    }
}