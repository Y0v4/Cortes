/*fencion de mostrar cuantos cortes has seleccionado*/
function mostrarSelect(){
    let select = document.getElementById("select");
    let opcionSeleccionada = select.value;

    function funcionInterna(parametro){
        parametro.style.display = "block";
    }

    let opcion1 = document.getElementById("opcion1");
    let opcion2 = document.getElementById("opcion2");
    let opcion3 = document.getElementById("opcion3");
    let opcion4 = document.getElementById("opcion4");
    let opcion5 = document.getElementById("opcion5");

    if (opcionSeleccionada == 1){
        funcionInterna(opcion1);

    }else if(opcionSeleccionada == 2){
        funcionInterna(opcion1);
        funcionInterna(opcion2);
    }
    else if(opcionSeleccionada == 3){
        funcionInterna(opcion1);
        funcionInterna(opcion2);
        funcionInterna(opcion3);
    }
    else if(opcionSeleccionada == 4){
        funcionInterna(opcion1);
        funcionInterna(opcion2);
        funcionInterna(opcion3);
        funcionInterna(opcion4);
    }
    else if(opcionSeleccionada == 5){
        funcionInterna(opcion1);
        funcionInterna(opcion2);
        funcionInterna(opcion3);
        funcionInterna(opcion4);
        funcionInterna(opcion5);
    }
}

/*funcion del objeto cuadrado*/
function cuadrado(ancho, largo, numeroCortes){
    this.ancho = ancho;
    this.largo = largo;
    this.numeroCortes = numeroCortes;
}


/* fuuncion del boton cortar*/
var boton = document.getElementById("boton");
boton.addEventListener("click", cortar)
function cortar(){

/*obteniendo las medidas de todos los cuadrados*/
let a1 = document.getElementById("largoTotal").value;
let a2 = document.getElementById("anchoTotal").value;
var cuadradoTotal = new cuadrado(a1, a2);
    
let b1 = document.getElementById("anchoCorte1").value;
let b2 = document.getElementById("largoCorte1").value;
let b3 = document.getElementById("numero1").value;
var corte1 = new cuadrado(b1, b2, b3);
    
let c1 = document.getElementById("anchoCorte2").value;
let c2 = document.getElementById("largoCorte2").value;
let c3 = document.getElementById("numero2").value;
var corte2 = new cuadrado(c1, c2, c3);
    
let d1 = document.getElementById("anchoCorte3").value;
let d2 = document.getElementById("largoCorte3").value;
let d3 = document.getElementById("numero3").value;
var corte3 = new cuadrado(d1, d2, d3);
    
let e1 = document.getElementById("anchoCorte4").value;
let e2 = document.getElementById("largoCorte4").value;
let e3 = document.getElementById("numero4").value;
var corte4 = new cuadrado(e1, e2, e3);
    
let f1 = document.getElementById("anchoCorte5").value;
let f2 = document.getElementById("largoCorte5").value;
let f3 = document.getElementById("numero5").value;
var corte5 = new cuadrado(f1, f2, f3);


/*valores de ejemplo
var cuadradoTotal = new cuadrado(105,73,1);
var corte1 = new cuadrado(45,10,10);
var corte2 = new cuadrado(5,2,5);
*/

/*funcion de convertir numeros cualesquiera a porcentajes respecto a 400*400*/
function mayor(numero1, numero2){
    if(numero1 >= numero2) {
        return numero1;
    }else {
        return numero2;
    }
}
function cambiar(numero){
    var a = (numero * 400) / (mayor(cuadradoTotal.ancho,cuadradoTotal.largo));
    return a;
}

/*creando en canvas del cuadrdado total*/
var dibujo = document.getElementById("dibujo");
dibujo.innerHTML = `<br><canvas 
width="` + cambiar(cuadradoTotal.ancho) +`"
height="` + cambiar(cuadradoTotal.largo) +`" 
style="border:black 3px solid;" 
id="marco">
<div id="subMarco"></div>
</canvas> `;

/*funcion de dibuajar*/
var d = document.getElementById("marco");
var lienzo = d.getContext("2d");

function dibujarLinea(xinicial, yinicial, xfinal, yfinal)
{  
  lienzo.beginPath();
  lienzo.lineWidth = 1;
  lienzo.moveTo(xinicial, yinicial);
  lienzo.lineTo(xfinal, yfinal);
  lienzo.strokeStyle = "black";
  lienzo.stroke();
  lienzo.closePath();
}


//mucho ojo con esta mierda
var siguienteCorteLargo = cambiar(corte1.largo);
var corteLargo = cambiar(cuadradoTotal.largo);// corte2
var ceroo = 0;//corte2

/*funcion de la direcion del corte*/
function direccion(total, corte){

    /*valores para cambiar si el primer corte es para el ancho o el largo
    valores a cambiar*/
    var corte_ancho = corte.ancho;
    var corte_largo = corte.largo;






    let a = [total.ancho / corte.ancho, total.largo / corte.largo];
    let b = [total.ancho / corte.largo, total.largo / corte.ancho];

    let resultado = [Math.trunc(a[0]) * Math.trunc(a[1]), Math.trunc(b[0]) * Math.trunc(b[1])];

    var cortesPosibles = resultado[0];//cortes posibles segun el total
    var cortesPosiblesFasos = Math.trunc(total.largo/corte.largo) * Math.trunc(total.ancho/corte.ancho);    

    if (resultado[1] > resultado[0]){
        let b = corte.ancho;
        let c = corte.largo;
        b = corte.largo;
        c = corte.ancho;
        var cortesPosibles = resultado[1];//cortes posibles segun el total
    }


    //numero de cuadrads totales segun el primer corte
    var numeroCuadrados = Math.ceil(corte.numeroCortes / cortesPosiblesFasos);
    console.log(numeroCuadrados);



    //cortando los anchos
    //PROBANDO todos lo valores para bajo son cambiables 0.0
    var restaNuevoTotal = 0;// numero de veces para restar al cuadrado total
    var siguienteCorteAncho = cambiar(corte.ancho);

    var aas = cambiar(corte1.largo * Math.trunc(cuadradoTotal.largo/corte1.largo))  + cambiar(corte2.largo);//?????? mucho cuidado solo esta acomodado
    console.log(aas)

    while (restaNuevoTotal * Math.trunc(total.largo/corte.largo) < corte.numeroCortes){
        restaNuevoTotal++;

        /*total.largo se mantiene 5 coordenadas 500, 300 330  300  45, 10, */
        dibujarLinea(siguienteCorteAncho,ceroo,siguienteCorteAncho,corteLargo);//dibujando los cortes largos
        siguienteCorteAncho = siguienteCorteAncho + cambiar(corte.ancho);

        /*cortando los largos*/
        var cero = 0;
        var cero2 = cambiar(corte.ancho);
        var contadorDeCortes = 0;

        while (corte.numeroCortes > contadorDeCortes){
            dibujarLinea(cero,siguienteCorteLargo,cero2,siguienteCorteLargo)
            contadorDeCortes++
            siguienteCorteLargo = siguienteCorteLargo + cambiar(corte.largo);

            if (contadorDeCortes % Math.trunc(total.largo/corte.largo) == 0){//actualizando cortes de largos
                cero = cambiar(corte.ancho);
                cero2 = cero2 + cambiar(corte.ancho);

                console.log(siguienteCorteLargo)
                console.log(aas)
                if (corte.largo == corte1.largo){
                    siguienteCorteLargo = cambiar(corte.largo);
                }else siguienteCorteLargo = aas ;
                console.log(siguienteCorteLargo)
            }
            


            if (cortesPosiblesFasos == contadorDeCortes){
            break;//termina el codigo
            }


            if (contadorDeCortes == cortesPosiblesFasos){//paraliza el codigo si el contadorDeCortes es igual cortesPosiblesFasos
                console.log("cortes"+ contadorDeCortes)
                console.log("cortes"+ cortesPosiblesFasos)
                break ;
            }
        }
    }   

    console.log(restaNuevoTotal);

    




    if (0 == 0){
        //cortando restos (3 clases de restos)

        var restoTipo1 = new cuadrado (corte.ancho, (total.largo % corte.largo), (restaNuevoTotal - 1))

        if (restoTipo1.numeroCortes != 0 /* falta la concion para que pare*/){

            ceroo = cambiar(corte.largo * Math.trunc(total.largo/corte.largo));
            siguienteCorteLargo = cambiar(corte.largo * Math.trunc(total.largo/corte.largo))  + cambiar(corte2.largo);

            if (contadorDeCortes == cortesPosiblesFasos){
                alert("funciona")

            }

            if (cortesPosiblesFasos * restoTipo1.numeroCortes >= contadorDeCortes){
                console.log("luiksaudjf")
                console.log(cortesPosiblesFasos)
                return "no"
            }else if (restoTipo1.numeroCortes) {
                console.log("funcionaeelse")
                direccion(restoTipo1, corte2)
            }
        }





        var restoTipo2 = new cuadrado (corte.ancho, ((((restaNuevoTotal * Math.trunc(total.largo/corte.largo)) - contadorDeCortes) * corte.largo) + restoTipo1.largo),1)


        
        var restotipo3 = new cuadrado ((total.ancho - (corte.ancho * restaNuevoTotal)), total.largo, 1);//"nuevo total"
    }







    //aumentar totales segun el numero de cortes
    if (cortesPosiblesFasos == contadorDeCortes){
        if(corte.numeroCortes > contadorDeCortes){


            //valores del restantes
            corte.numeroCortes = corte.numeroCortes - contadorDeCortes;



            
        }
    }
    



 


}


/* funcion maestra vercion1.0*/
function dividiendo (total, corte1, corte2, corte3, corte4, corte5){
    direccion(total, corte1);
}

dividiendo(cuadradoTotal, corte1);
}
