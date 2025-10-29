// Asegurar que el DOM esté cargado antes de ejecutar funciones
document.addEventListener('DOMContentLoaded', () => {
  // Modal Términos
  const termsModal = document.getElementById('terms-modal');
  if (!localStorage.getItem('termsAccepted')) {
    termsModal.style.display = 'flex'; // Muestra el modal inmediatamente
    document.body.style.overflow = 'hidden'; // Bloquea el acceso completo
    document.body.style.pointerEvents = 'none'; // Desactiva interacciones con la página
    termsModal.style.pointerEvents = 'auto'; // Permite interacciones solo en el modal
  }

  window.acceptTerms = function() {
    localStorage.setItem('termsAccepted', 'true');
    termsModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Desbloquea la página
    document.body.style.pointerEvents = 'auto'; // Restaura interacciones
    alert('Has aceptado los Términos y Condiciones. Puedes usar el sitio.');
  };

  window.rejectTerms = function() {
    localStorage.setItem('termsAccepted', 'false');
    termsModal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Desbloquea antes de redirigir
    document.body.style.pointerEvents = 'auto'; // Restaura interacciones
    window.location.href = 'https://www.google.com'; // Redirige si no acepta
  };

  // ... (Código para Modal Términos) ...

// Banner Cookies
const cookieBanner = document.getElementById('cookie-banner');
if (!localStorage.getItem('cookiesAccepted')) {
  cookieBanner.style.display = 'block';
}

window.acceptCookies = function() {
  localStorage.setItem('cookiesAccepted', 'true');
  cookieBanner.style.display = 'none';
};

window.rejectCookies = function() {
  localStorage.setItem('cookiesAccepted', 'false');
  cookieBanner.style.display = 'none';
};


  // Formulario Contacto
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = { 
        name: formData.get('name'), 
        email: formData.get('email'), 
        message: formData.get('message') 
      };

      try {
        const res = await fetch('/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        const result = await res.json();
        alert(result.success || result.error);
        if (result.success) form.reset(); // Limpia el formulario si es exitoso
      } catch (err) {
        alert('Error al enviar el mensaje. Intenta de nuevo.');
      }
    });
  }
})

// FORMULARIO CONTACTO - FUNCIONA 100% CON localhost:3000
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.querySelector('input[name="name"]').value.trim();
    const email = form.querySelector('input[name="email"]').value.trim();
    const message = form.querySelector('textarea[name="message"]').value.trim();

    if (!name || !email || !message) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const res = await fetch('http://localhost:3000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message })
      });

      const result = await res.json();
      
      if (result.success) {
        alert('Mensaje enviado exitosamente');
        form.reset();
      } else {
        alert('Error: ' + (result.error || 'Intenta de nuevo'));
      }
    } catch (err) {
      console.error('Error de red:', err);
      alert('Error de conexión. Asegúrate de que el servidor esté corriendo en http://localhost:3000');
    }
  });
}