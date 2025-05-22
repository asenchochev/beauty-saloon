document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const captchaContainer = document.getElementById('captcha-container');
    
    let loginAttempts = 0;
    const maxAttempts = 3;
    
    // Тестови credentials (в реална среда това би било на сървъра)
    const validCredentials = {
        username: 'asen',
        password: 'asenchochev'
    };

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (loginAttempts >= maxAttempts && !validateCaptcha()) {
            showError('Моля, попълнете правилно captcha');
            return;
        }
        
        if (username === validCredentials.username && password === validCredentials.password) {
            // Успешен вход
            localStorage.setItem('adminLoggedIn', 'true');
            window.location.href = 'index.html';
        } else {
            loginAttempts++;
            
            if (loginAttempts >= maxAttempts) {
                showCaptcha();
            }
            
            showError('Грешно потребителско име или парола');
        }
    });

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.add('visible');
        
        // Добавяме shake анимация на формата
        loginForm.style.animation = 'none';
        loginForm.offsetHeight; // trigger reflow
        loginForm.style.animation = 'shake 0.5s ease-in-out';
    }

    function showCaptcha() {
        if (!captchaContainer.querySelector('.captcha')) {
            // Тук можете да добавите интеграция с реална captcha услуга
            captchaContainer.innerHTML = `
                <div class="captcha">
                    <label>Моля, въведете кода от изображението:</label>
                    <input type="text" id="captcha-input" required>
                </div>
            `;
        }
        captchaContainer.classList.remove('hidden');
    }

    function validateCaptcha() {
        // Тук би била реалната валидация на captcha
        const captchaInput = document.getElementById('captcha-input');
        return captchaInput && captchaInput.value.length > 0;
    }
});