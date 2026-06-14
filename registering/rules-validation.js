/**
 * rules-validation.js
 * Gestion de la validation des catégories du règlement et redirection
 * À utiliser avec rules.html (style Cotte de Mailles)
 */

(function() {
    'use strict';

    // --- Récupération de l'URL de redirection depuis le paramètre "redirect" ---
    const params = new URLSearchParams(window.location.search);
    const redirectUrl = params.get('redirect') || 'https://lost-cyrano.github.io/Les-lammes/registering/payement.html';

    // --- Sélection des éléments du DOM ---
    const checkboxes = document.querySelectorAll('.section-check');
    const acceptButton = document.getElementById('accept-all');
    const errorMessage = document.getElementById('redirect-error');

    // Vérification que les éléments existent bien
    if (!acceptButton) {
        console.error('rules-validation.js : bouton #accept-all introuvable.');
        return;
    }
    if (checkboxes.length === 0) {
        console.warn('rules-validation.js : aucune case à cocher .section-check trouvée.');
    }

    // --- Fonction de mise à jour de l'état du bouton ---
    function updateButtonState() {
        const allChecked = Array.from(checkboxes).every(function(cb) {
            return cb.checked;
        });

        acceptButton.disabled = !allChecked;

        // Cache le message d'erreur si tout est coché
        if (allChecked && errorMessage) {
            errorMessage.classList.add('hidden');
        }
    }

    // --- Écouteurs sur chaque case à cocher ---
    checkboxes.forEach(function(cb) {
        cb.addEventListener('change', updateButtonState);
    });

    // --- Écouteur sur le bouton de validation ---
    acceptButton.addEventListener('click', function() {
        if (!acceptButton.disabled) {
            // Redirection vers l'URL cible
            window.location.href = redirectUrl;
        } else {
            // Affiche le message d'erreur
            if (errorMessage) {
                errorMessage.classList.remove('hidden');
            }
        }
    });

    // --- Écouteur pour afficher l'erreur si on clique sur le bouton désactivé ---
    acceptButton.addEventListener('mousedown', function(e) {
        if (acceptButton.disabled && errorMessage) {
            errorMessage.classList.remove('hidden');
        }
    });

    // --- Vérification initiale ---
    updateButtonState();

})();
