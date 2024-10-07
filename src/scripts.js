// script.js

document.addEventListener('DOMContentLoaded', () => {
    const registrationForm = document.getElementById('registrationForm');
    
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        const userId = document.getElementById('userId').value;
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const tipoUsuario = document.getElementById('tipo_usuario').value;
        const porcentaje = document.getElementById('porcentaje').value;

        // Aquí puedes manejar el envío de datos al servidor o mostrar un mensaje
        console.log('ID de Usuario: {userId}, Nombre: {name}, Email: {email}, Tipo de Usuario: {tipoUsuario}, Porcentaje: {porcentaje}');

        // Reinicia el formulario
        registrationForm.reset();
        alert('Registro completado correctamente');
    });
});
 