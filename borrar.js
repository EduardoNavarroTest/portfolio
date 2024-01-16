





function Auto(nombre, marca, modelo, descripcion) {
    this.nombre = nombre;
    this.marca = marca;
    this.modelo = modelo;
    this.descripcion = descripcion
}

const kwid = new Auto("Kwid","Renault","2020","Outsider");

console.log(kwid.modelo);