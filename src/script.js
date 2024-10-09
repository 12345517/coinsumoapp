 // script.js

 document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registrationForm');

    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(registrationForm);

        fetch('https://coinsumo.co/api/registro', {
            method: 'POST',
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Error en el registro');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.success) {
                alert('Registro exitoso');
                const userId = data.userId; 
                getAffiliates(userId);
            } else {
                alert('Error en el registro: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error en el registro: ' + error.message);
        });
    });

    function getAffiliates(userId) {
        fetch('/api/afiliados?userId=${userId}', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Agregar token de autenticación si es necesario
            }
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error(errorData.message || 'Error al obtener afiliados');
                });
            }
            return response.json();
        })
        .then(data => {
            if (data.afiliados) {
                console.log('Afiliados:', data.afiliados);
                const afiliadosList = document.createElement('ul');
                data.afiliados.forEach(afiliado => {
                    const listItem = document.createElement('li');
                    listItem.textContent = afiliado.name;
                    afiliadosList.appendChild(listItem);
                });
                document.body.appendChild(afiliadosList);
            } else {
                console.error('No se encontraron afiliados.');
            }
        })
        .catch(error => console.error('Error al obtener afiliados:', error));
    }
});