var x = document.getElementById('x'); 
var a;
var c;
var m=0;
let contador=0; 


var aleatorio; 

var generar; 
var residuo; 

generar= a*x+c;

residuo = generar%m;


aleatorio = residuo/m;


console.log("Numero aleatorios",aleatorio);


function numeroAleatorio(){

	for(let i =0; i>= document.getElementById("m").value; i++){
		generar = document.getElementById("a",[i])*document.getElementById("x",[i])+document.getElementById("c",[i]);
		residuo = generar%document.getElementById(m, [i]);
		aleatorio = residuo[i]/document.getElementById("m",[i]);
		contador++;
	
	}

}

