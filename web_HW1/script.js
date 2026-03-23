document.addEventListener('DOMContentLoaded', () => {
    const totalTime = 30; // 總等候時間（秒）
    let timeLeft = totalTime;
    
    const countdownElement = document.getElementById('countdown');
    const progressBar = document.getElementById('progress-bar');
    const dynamicText = document.getElementById('dynamic-text');
    const retryBtn = document.getElementById('retry-btn');

    // 準備幾句不同的動態提示文字
    const messages = [
        "正在為您建立安全連線...",
        "正在查詢最新班次資訊...",
        "正在整理座位資料...",
        "系統處理中，感謝您的耐心等候..."
    ];
    let messageIndex = 0;

    // 每 3.5 秒切換一次提示文字
    const textInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        dynamicText.style.opacity = 0; // 先變透明
        
        setTimeout(() => {
            dynamicText.textContent = messages[messageIndex];
            dynamicText.style.opacity = 1; // 再顯示出來
        }, 300); // 配合 CSS 的 transition 時間
    }, 3500);

    // 核心倒數計時與進度條更新
    const timer = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;

        // 計算進度條百分比 (從 0% 長到 100%)
        const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;
        progressBar.style.width = `${progressPercentage}%`;

        // 倒數結束的動作
        if (timeLeft <= 0) {
            clearInterval(timer);
            clearInterval(textInterval);
            
            dynamicText.textContent = "連線完成！正在為您導向...";
            dynamicText.style.color = "#008B45";
            dynamicText.style.fontWeight = "bold";
            
            setTimeout(() => {
                // 模擬重新導向
                window.location.reload(); 
            }, 1500);
        }
    }, 1000);

    // 手動重試按鈕事件
    retryBtn.addEventListener('click', () => {
        retryBtn.textContent = "正在重新連線...";
        retryBtn.disabled = true; // 避免重複點擊
        retryBtn.style.opacity = "0.7";
        
        // 點擊後短暫延遲即可重新整理頁面
        setTimeout(() => {
            window.location.reload();
        }, 800);
    });
});