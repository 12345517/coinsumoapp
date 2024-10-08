// script.js

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        //verificar que los datos del formulario se capturan correctamente 
        console.log(...formdata);

        fetch('https://coinsumo.co/api/registro', { // Cambia la URL al endpoint real
            method: 'POST',
            body: formData 
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registro exitoso');
            } else {
                alert('Error en el registro');
            }
        })
        .catch(error => console.error('Error:', error));
    });
});
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        const userId = document.getElementById('userId').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const whatsapp = document.getElementById('whatsapp').value; // Nueva línea
        const tipoUsuario = document.getElementById('tipo_usuario').value;
        const porcentaje = document.getElementById('porcentaje').value;

        // Aquí puedes manejar el envío de datos al servidor o mostrar un mensaje
        console.log('ID de Usuario: {userId}, Nombre: {name}, Email: {email}, WhatsApp: {whatsapp}, Tipo de Usuario: {tipoUsuario}, Porcentaje: {porcentaje}');

        // Reinicia el formulario
        registrationForm.reset();
        alert('Registro completado correctamente');
    });

