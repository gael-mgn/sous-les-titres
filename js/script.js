document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.nav a');

  function smoothScrollTo(targetY, duration = 600) {
    const startY = window.scrollY;
    const distanceY = targetY - startY;
    let startTime = null;

    function animation(currentTime) {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;

      const easeInOutCubic = t =>
        t < 0.5
          ? 4 * t * t * t
          : 1 - Math.pow(-2 * t + 2, 3) / 2;

      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startY + distanceY * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animation);
      }
    }

    requestAnimationFrame(animation);
  }

  // Fonction pour gérer le défilement vers un élément spécifique
  function handleSmoothScroll(targetElement) {
    if (targetElement) {
      const targetY = targetElement.offsetTop;
      smoothScrollTo(targetY);
    }
  }

  // Gérer les liens de navigation avec ancre interne
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      // Vérifie si c’est un lien vers une ancre interne (#id)
      if (href.startsWith('#')) {
        e.preventDefault(); // Empêche le saut instantané

        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          // Scroll fluide vers la section
          handleSmoothScroll(targetElement);

          // Mise à jour des classes "active"
          links.forEach(l => l.classList.remove('active'));
          this.classList.add('active');
        }
      }
    });
  });

  // Vérification si l'URL contient une ancre (#id) au moment du chargement de la page
  // Vérification si l'URL contient une ancre (#id) au moment du chargement de la page
const hash = window.location.hash;
if (hash) {
  const targetId = hash.substring(1);
  const targetElement = document.getElementById(targetId);

  if (targetElement) {
    // Empêcher le défilement automatique par le navigateur
    window.scrollTo(0, 0);

    // Défilement fluide vers la section ciblée
    handleSmoothScroll(targetElement);

    // Activation du lien correspondant dans le menu de navigation
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${targetId}`) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}


  // Lanceur de vidéos
  (function () {
    const overlay = document.getElementById('videoOverlay');
    const iframe = document.getElementById('videoIframe');

    if (!overlay || !iframe) return;

    function playVideo() {
      // build URL with autoplay=1
      const src = iframe.dataset.src || iframe.src || '';
      if (!src) return;
      const separator = src.includes('?') ? '&' : '?';
      // add autoplay=1 — si tu veux forcer muet (meilleure chance d'autoplay sur mobile), ajouter '&muted=1'
      iframe.src = src + separator + 'autoplay=1';
      // hide overlay with CSS transition
      overlay.classList.add('hidden');
      // move focus to iframe (accessible)
      iframe.setAttribute('tabindex', '-1');
      iframe.focus({ preventScroll: true });
    }

    // Click
    overlay.addEventListener('click', function (e) {
      e.preventDefault();
      playVideo();
    });

    // Keyboard (Enter / Space)
    overlay.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        playVideo();
      }
    });

    // Si tu veux que l'overlay disparaisse si l'utilisateur interagit avec les contrôles de l'iframe (cas particuliers)
    iframe.addEventListener('focus', () => overlay.classList.add('hidden'));
  })();

  // Accessibilité : afficher les contours de focus lors de la navigation au clavier
  document.addEventListener('keydown', (e) => { if (e.key === 'Tab') document.body.classList.add('show-focus'); });

  // Améliorer l'utilisabilité sur mobile : si une carte est tapée, on veut que le retour visuel corresponde
  // (aucun JS requis pour afficher la lecture — les requêtes de médias gèrent cela).
});
