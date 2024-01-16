class Auto {
    // Constructor
    constructor(modelo, marca, tipo) {
        this.modelo = modelo;
        this.marca = marca;
        this.tipo = tipo;
        this.velocidad = 0;
    }


    acelerar(){
        this.velocidad += 100;
    }
}


const miAuto = new Auto("Corolla", "Toyota", "Estilo y velocidad");
console.log(miAuto); 
miAuto.acelerar();
console.log(miAuto.velocidad);