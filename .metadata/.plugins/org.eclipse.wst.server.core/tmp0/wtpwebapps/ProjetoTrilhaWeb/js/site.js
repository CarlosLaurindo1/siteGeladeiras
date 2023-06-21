function validaFaleConosco() {
    var nome = document.frmfaleconosco.txtnome.value;
    var expRegNome = new RegExp("^[A-zÀ-ü]{3,}([ ]{1}[A-zÀ-ü]{2,})+$");

    if (!expRegNome.test(nome)) {
        alert("Preencha o campo Nome corretamente.");
        document.frmfaleconosco.txtnome.focus();
        return false;
    }

    var fone = document.frmfaleconosco.txtfone.value;
    var expRegFone = new RegExp("^[(]{1}[1-9]{2}[)]{1}[0-9]{4,5}[-]{1}[0-9]{4}$");

    if(!expRegFone.test(fone)){
        alert("Preencha o campo Telefone corretamente.");
        document.frmfaleconosco.txtfone.focus();
        return false;
    }

    if (document.frmfaleconosco.txtemail.value == "") {
        alert("Preencha o campo E-mail.");
        document.frmfaleconosco.txtemail.focus();
        //Ao apresentar a mensagem, o foco da página é direcionado ao campo de e-mail, para que o usuário realize o seu devido preenchimento
        return false;
    }

    if (document.frmfaleconosco.selmotivo.value == "") {
        alert("Preencha o campo Motivo.");
        document.frmfaleconosco.selmotivo.focus();
        //Ao apresentar a mensagem, o foco da página é direcionado ao campo de motivo, para que o usuário realize o seu devido preenchimento
        return false;
    }

    if (document.frmfaleconosco.selmotivo.value == "PR") {
        if (document.frmfaleconosco.selproduto.value == "") {
            alert("Preencha o campo Produto.");
            document.frmfaleconosco.selproduto.focus();
            //Ao apresentar a mensagem, o foco da página é direcionado ao campo de motivo, para que o usuário realize o seu devido preenchimento
            return false;
        }
    }

    if (document.frmfaleconosco.txtcomentario.value == "") {
        alert("Preencha o campo Comentário.");
        document.frmfaleconosco.txtcomentario.focus();
        //Ao apresentar a mensagem, o foco da página é direcionado ao campo de motivo, para que o usuário realize o seu devido preenchimento
        return false;
    }

    return true;


}

function verificaMotivo(motivo) {
    var elemento = document.getElementById("opcaoProduto");

    if (motivo == "PR") {
        var select = document.createElement("select");
        select.setAttribute("name", "selproduto");

        var option = document.createElement("option");
        option.setAttribute("value", "");

        var texto = document.createTextNode("Escolha");
        option.appendChild(texto);
        select.appendChild(option);

        var option = document.createElement("option");
        option.setAttribute("value", "FR");
        var texto = document.createTextNode("Freezer");
        option.appendChild(texto);
        select.appendChild(option);

        var option = documento.createElement("option");
        option.setAttribute("value", "GE");
        var texto = document.createTextNode("Geladeira");
        option.appendChild(texto);
        option.appendChild(option);

        elemento.appendChild(select);
    } else {
        if (elemento.firstChild)
            elemento.removeChild(elemento.firstChild);
    }
}

