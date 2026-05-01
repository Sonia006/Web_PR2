const cliente = mqtt.connect ('wss://broker.emqx.io:8084/mqtt', {
  username: 'PR2_1_3',
  password: 'public',
  clientId: 'web_lega_' + Math.random().toString(16).substr(2, 8),
  protocolVersion: 4
});

cliente.on('connect', () => {
  console.log('Conectado al Servidor');
});

function Seleccionar_modelo (id) {
  document.getElementById('modelo_classic_computer').style.display = "none";
  document.getElementById('modelo_minibot').style.display = "none";
  document.getElementById(id).style.display = "flex";
}

function Boton_ir_atras() {
  document.getElementById('contenedor').style.display = "flex";
  document.getElementById('Boton_atras_minibot').style.display = "none";
  document.getElementById('Boton_atras_computer').style.display = "none";
}

function menu() {
  const menuDiv = document.getElementById('menu');
  if (menuDiv.style.left == '0px') {
    menuDiv.style.left = '-270px';
  } else {
    menuDiv.style.left = '0px';
  }
}

function enviar_pedido_mqtt(modelo) {
  const idCantidad = modelo === 'modelo_classic_computer' ? 'cantidad-classic' : 'cantidad-minibot';
  const cantidad = document.getElementById(idCantidad).value;
  const mensaje = JSON.stringify({
    modelo: modelo,
    cantidad: cantidad
  });

  cliente.publish('PR2_1_3/linea1/presencia', mensaje);
  alert('Pedido enviado: ' + cantidad + 'x ' + modelo);
}