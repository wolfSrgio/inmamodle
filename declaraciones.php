 <?php 

do{
$cartaTipo=Array("Bastos"=>1,"Copas"=>2,"Espadas"=>3,"Oros"=>4);
$tipo=array_rand($cartaTipo); // me saca el index del tipo
$valores=Array(0,'as'=>1,2,3,4,5,6,7,'sota'=>8,'caballo'=>9,'rey'=>10);
$clase=array_rand($valores);
}while($clase===0);//No deseo que em saque el valor 0

switch ($clase) {
      case 'as':  $cartas="$tipo,$clase,1";
      break;
      case 'sota':$cartas="$tipo,$clase,0.5";
      break;
      case 'caballo':$cartas="$tipo,$clase,0.5";
      break;
      case 'rey': $cartas="$tipo,$clase,0.5";
      break;
      default :  $cartas="$tipo,$clase,$clase";
      break;
}
echo $cartas; //retornare  esto

  ?>


 