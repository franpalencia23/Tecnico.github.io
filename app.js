// ===============================
// CONFIGURACIÓN DE SUPABASE
// ===============================
const SUPABASE_URL = "https://fjppdwbkbpmcbzbyjhzt.supabase.coL";
const SUPABASE_KEY = "Tsb_publishable_ZJ6fQfMjogGJX2V_ORYvDw_SGF3SFOY";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// ===============================
// CARGAR SERVICIOS
// ===============================
async function cargarServicios() {
    const tbody = document.getElementById("tabla-servicios");
    tbody.innerHTML = "<tr><td colspan='7'>Cargando...</td></tr>";

    const { data, error } = await supabaseClient.from("servicios").select("*");

    if (error) {
        tbody.innerHTML = "<tr><td colspan='7'>Error al cargar datos</td></tr>";
        console.error(error);
        return;
    }

    tbody.innerHTML = "";

    data.forEach(serv => {
        tbody.innerHTML += `
          <tr>
            <td>${serv.cliente}</td>
            <td>${serv.celular}</td>
            <td>${serv.id}</td>
            <td>${serv.fecha?.split("T")[0]}</td>
            <td>${serv.marca}</td>
            <td>${serv.costo}</td>
            <td>
              <button onclick="eliminarServicio(${serv.id})">🗑</button>
            </td>
          </tr>
        `;
    });
}

// ===============================
// INSERTAR NUEVO SERVICIO
// ===============================
document.getElementById("form-servicio").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nuevo = {
        cliente: document.getElementById("cliente").value,
        descripcion: document.getElementById("descripcion").value,
        estado: document.getElementById("estado").value,
        celular: document.getElementById("celular").value,
        costo: document.getElementById("costo").value,
        marca: document.getElementById("marca").value
    };

    const { error } = await supabaseClient.from("servicios").insert([nuevo]);

    if (error) {
        alert("Error al insertar");
        console.error(error);
        return;
    }

    alert("Servicio agregado");
    document.getElementById("modalForm").style.display = "none";
    cargarServicios();
});

// ===============================
// ELIMINAR
// ===============================
async function eliminarServicio(id) {
    if (!confirm("¿Seguro que deseas eliminar este registro?")) return;

    const { error } = await supabaseClient.from("servicios").delete().eq("id", id);

    if (error) {
        alert("Error al eliminar");
        console.error(error);
        return;
    }

    cargarServicios();
}

// ===============================
// INICIAR
// ===============================
window.onload = () => cargarServicios();
