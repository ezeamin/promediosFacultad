export function campoRequerido(campo){
    if(campo.value.trim() == ""){
        campo.className="form-control is-invalid";
        return false;
    }
    else{
        campo.className="form-control";
        return true;
    }
}

export function validarNumeros(input){
    let patron = /^[+]?((\d)|(\d\d))$/;
    if(!patron.test(input.value)){
        input.className="form-control is-invalid";
        return false;
    }
    else{
        input.className="form-control";
        return true;
    }
}

export function validarAño(input){
    //let patron = /^[+]?((\d+(\.\d*)?)|(\.\d+))$/;
    let patron = /^(\d{4})$/
    if(!patron.test(input.value)){
        input.className="form-control is-invalid";
        return false;
    }
    else{
        input.className="form-control";
        return true;
    }
}

export function validarCampos(){
    let error = false;
    let campos = document.getElementsByClassName("form-control");
    if(!validarAño(campos[0])) error=true;
    if(!campoRequerido(campos[1])) error=true;
    if(!validarNumeros(campos[2])) error=true;

    if(error){
        return false;
    }
    return true;
}