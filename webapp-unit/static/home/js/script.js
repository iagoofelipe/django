import Registros from "./registros.js";
import Acessos from "./acessos.js";
import NavBar from "./nav.js";


class Script {
    constructor(){
        this.reg = new Registros();
        this.navBar = new NavBar();
        this.acessos = new Acessos();

        $('#pop-up').css({'display':'none'}); // ocultando popup
    }
}

$(function(){
    globalThis.script = new Script();
})