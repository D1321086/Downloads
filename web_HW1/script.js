document.addEventListener('DOMContentLoaded', () => {
    // 設定初始等候時間（秒）
    let timeLeft = 30;
    const countdownElement = document.getElementById('countdown');
    const statusContainer = document.querySelector('.status');

    // 設定每秒執行一次的計時器
    const timer = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;

        // 當時間倒數至 0 時
        if (timeLeft <= 0) {
            clearInterval(timer); // 停止計時器
            
            // 更新畫面訊息
            statusContainer.innerHTML = "<p style='color: #008B45;'>正在為您重新導向至首頁...</p>";
            
            // 模擬2秒後重新整理或跳轉回統聯首頁
            setTimeout(() => {
                // 若要實際測試跳轉，可將下方註解取消
                // window.location.href = 'https://www.ubus.com.tw/';
                window.location.reload(); 
            }, 2000);
        }
    }, 1000);
});