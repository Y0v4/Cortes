var texto = document.getElementById("as");
var boton = document.getElementById("boton");
boton.addEventListener("click", dibujoPorClick );

function dibujoPorClick()
{
  alert(texto.value);
}

// a unit test that asserts that count increases when the button is clicked


