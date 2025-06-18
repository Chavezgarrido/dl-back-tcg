const axios = require('axios');
const baseURL = 'http://localhost:3000';

let token = null;
let userId = null;

function authHeaders() {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function getHome() {
  const res = await axios.get(`${baseURL}/`);
  console.log('🏠 Home:', res.data);
}

async function registro() {
  const res = await axios.post(`${baseURL}/api/auth/registro`, {
    email: 'usuario1@test.com',
    contraseña: '123456',
    nombre: 'Felipe',
    apellido: 'Chávez',
    tipo_usuario: 'comprador'
  });
  console.log('✅ Registro:', res.data);
}

async function inicioSesion() {
  const res = await axios.post(`${baseURL}/api/auth/inicio-sesion`, {
    email: 'usuario1@test.com',
    contraseña: '123456'
  });
  token = res.data.token;
  userId = res.data.usuario?.id;
  console.log('🔐 Login OK, token:', token);
}

async function getUsuario() {
  if (!userId) {
    console.error('No hay usuario logueado');
    return;
  }
  const res = await axios.get(`${baseURL}/api/usuarios/${userId}`, {
    headers: authHeaders()
  });
  console.log(`🙋‍♂️ Usuario ${userId}:`, res.data);
}

async function listarProductos() {
  const res = await axios.get(`${baseURL}/api/productos`);
  console.log('📦 Productos:', res.data);
}

async function buscarProductos(termino) {
  const res = await axios.get(`${baseURL}/api/buscar`, {
    params: { q: termino }
  });
  console.log(`🔍 Buscar "${termino}":`, res.data);
}

async function agregarAlCarrito(productoId, cantidad = 1) {
  if (!userId) {
    console.error('No hay usuario logueado');
    return;
  }
  const res = await axios.post(`${baseURL}/api/carrito/${userId}/agregar`, {
    id_producto: productoId,
    cantidad
  }, { headers: authHeaders() });
  console.log(`🛒 Agregado producto ${productoId} al carrito:`, res.data);
}

async function verCarrito() {
  if (!userId) {
    console.error('No hay usuario logueado');
    return;
  }
  const res = await axios.get(`${baseURL}/api/carrito/${userId}`, {
    headers: authHeaders()
  });
  console.log('🛒 Carrito:', res.data);
}

async function crearPedido() {
  if (!userId) {
    console.error('No hay usuario logueado');
    return;
  }
  const res = await axios.post(`${baseURL}/api/carrito/${userId}/finalizar`, {
    direccion_envio: 'Mi dirección de prueba',
    metodo_pago: 'tarjeta'
  }, {
    headers: authHeaders()
  });
  console.log('🧾 Pedido creado:', res.data);
}

async function run() {
  try {
    await getHome();
    await registro();          
    await inicioSesion();
    await getUsuario();
    await listarProductos();
    await buscarProductos('dragón');
    await agregarAlCarrito(1);
    await verCarrito();
    await crearPedido();
  } catch (error) {
    const err = error.response?.data || error.message;
    console.error('❌ ERROR en prueba:', err);
  }
}

run();
