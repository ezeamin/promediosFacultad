export class Nota{
    constructor(año,materia,nota){
        this.año = año;
        this.materia = materia;
        this.nota = nota;
        this.codigo = this.generarCodigo();
    }

    generarCodigo(){
        let codigo = "";
        let caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let longitud = caracteres.length;
        for (let i = 0; i < 5; i++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * longitud));
        }
        return codigo;
    }
}