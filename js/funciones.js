var suma=0;
var arryJugador=new Array();
var arryMaquina=new Array();
var puntos;
var puntos2;

function plantarte(){
    suma=0;
    console.log('entra aqui');
    accion('maquina');
}

 function tratamiento(arrayCarta,arry,tipo){
     var sonIguales=false;
     if(arry.length==0){ //Solo la primera vez entra aqui
        arry.push(arrayCarta); //agregamos al array
        //habilitaremos el boton desabilitado Plantarte
        var but2=document.getElementById('boton2');
        but2.removeAttribute("disabled"); 
     }
     else{
        for(var i=0 ;i<arry.length && !sonIguales;i++){
            if(arry[i][0]==arrayCarta[0] &&arry[i][1]==arrayCarta[1] ){
                sonIguales=true;  
              } 
    }
     
     if(!sonIguales){
            arry.push(arrayCarta);
        }
        else{ // si son iguales , volvemos a pedir otra carta,asi nos e repiten
            var btn=document.getElementById('botonJugador');
            accion(btn);
        }
     }
   
  
   console.log('uuu:'+arrayCarta[1]);
     var c=parseFloat(arrayCarta[2]);
     suma+=c;
     var cad=document.getElementById("cartaSacada");
     var carImag="";
     if(tipo=='jugador')
      {
          if(suma>7.5){
            //var cad =document.getElementById("cartaSacada");
            console.log(cad);
            cad.innerHTML=`Hiciste ${suma} <br> PERDISTEEEEEE !!! `;
            var btn=document.getElementById('bto');
            console.log(btn);
            btn.style.display="inline";
            preventDefault();
         }else{
            cad.innerHTML =`Haz sacado  :<br>
            ${arrayCarta[1]}  de   ${arrayCarta[0]}`;
            
            var tipo=arrayCarta[0];
            var valor=arrayCarta[1];

            carImag="img/"+tipo+valor+".jpg";
            carImag=carImag.replace(" ", "");
           
            carImag=carImag.toLowerCase();
            console.log(carImag);
            imgen=document.getElementById('imge');
            imgen.setAttribute("src",carImag);
         }
      }else if(tipo=='maquina'){
               
             if(suma>7.5){
                suma-=c;
             }else{
                cad.innerHTML =`La Maquina saco :<br>
                ${arrayCarta[1]}  de   ${arrayCarta[0]}`;
             }
            }

        

     
    return suma;
 }

 function controlPuntos(){
     var cad =document.getElementById("cartaSacada");
      if(puntos2<puntos || puntos2>7.5 ||puntos2==puntos)
         {
          accion('maquina');//pide carta otra vez
         }
         else if(puntos2==7.5){
         cad.innerHTML=`PERDISTE ¡¡ <BR>
                   la maquina gana la partida<br> perfecto 7.5 !!! `;
                   var btn=document.getElementById('bto');
                   console.log(btn);
                   btn.style.display="inline";
         }else if(puntos2>puntos){
            cad.innerHTML=`MAQUINA GANA LA PARTIDA !!!<BR>
                con  ${puntos2} puntos`;
            var btn=document.getElementById('bto');
             btn.style.display="inline"; //aparece boton
         }                            // de volver a jugar
 }
 

  function accion(but)
  {  //but ,indica que fue porque se pulso el boton
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function() {
       
          if (this.readyState == 4 && this.status == 200) {
               var rp=this.responseText;//recibimos dle servidor
               var arrayCarta=rp.split(",");//transforma a array
            //LO QUE MOSTRAREMOS EN LA CAJA DE PUNTOS :
            var cadena2=document.getElementById("puntojuga");
             var cadena3=document.getElementById("puntomaqui");
             var tipo;
              if(but.id=="botonJugador"){
                  tipo='jugador';
                   puntos=tratamiento(arrayCarta,arryJugador,tipo);
                   cadena2.innerHTML=puntos;
                 }
                 else{ //aqui entra cuando  lo llama la maquina
                     tipo='maquina';
                    puntos2=tratamiento(arrayCarta,arryMaquina,tipo); 
                   cadena3.innerHTML= puntos2;
                  //para que se vea lentamente , lo que va saliendo para la maquina
                  setTimeout(controlPuntos, 3000);
                 }
             }
          };
      xmlhttp.open("GET","declaraciones.php", true);
      xmlhttp.send();
  }