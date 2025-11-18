document.getElementById("productoForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    // Capturar valores del formulario
    const nombre = document.getElementById("nombre").value.trim();
    const precio = document.getElementById("precio").value.trim();
    const descripcion = document.getElementById("descripcion").value.trim();
    const marca = document.getElementById("marca").value.trim();
    const id_categoria = document.getElementById("id_categoria").value.trim();
    const imagenInput = document.getElementById("imagen");

    let imagen = null;

    // Leer imagen si existe
    if (imagenInput.files.length > 0) {
        imagen = await convertirBase64(imagenInput.files[0]);
    }

    // Evitar errores por campos vacíos
    const data = {
        nombre: nombre || null,
        precio: precio !== "" ? parseFloat(precio) : null,
        descripcion: descripcion || null,
        marca: marca || null,
        id_categoria: id_categoria !== "" ? parseInt(id_categoria) : null,
        imagen: imagen
    };

    try {
        const response = await fetch("http://localhost:3000/productos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log(result);

        Swal.fire({
            icon: "success",
            title: "Producto registrado",
            text: "Se ha guardado correctamente"
        });

        e.target.reset();
    } catch (error) {
        console.error(error);

        Swal.fire({
            icon: "error",
            title: "Error al registrar",
            text: "Revisa los datos ingresados"
        });
    }
});

// Convertir archivo a base64
function convertirBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });
}
