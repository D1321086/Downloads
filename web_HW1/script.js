document.addEventListener('DOMContentLoaded', () => {
    // --- 倒數計時與進度條邏輯 ---
    const totalTime = 30; // 總等候時間（秒）
    let timeLeft = totalTime;
    const countdownElement = document.getElementById('countdown');
    const progressBar = document.getElementById('progress-bar');
    const dynamicText = document.getElementById('dynamic-text');
    const retryBtn = document.getElementById('retry-btn');

    // 動態文字輪播
    const messages = ["正在為您建立安全連線...", "正在查詢最新班次資訊...", "正在整理座位資料...", "系統處理中，感謝您的耐心等候..."];
    let messageIndex = 0;

    const textInterval = setInterval(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        dynamicText.style.opacity = 0;
        setTimeout(() => { dynamicText.textContent = messages[messageIndex]; dynamicText.style.opacity = 1; }, 300);
    }, 3500);

    // 核心計時器
    const timer = setInterval(() => {
        timeLeft--;
        countdownElement.textContent = timeLeft;
        progressBar.style.width = `${((totalTime - timeLeft) / totalTime) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(timer); clearInterval(textInterval);
            dynamicText.textContent = "連線完成！正在為您導向...";
            dynamicText.style.color = "#008B45"; dynamicText.style.fontWeight = "bold";
            setTimeout(() => { window.location.reload(); }, 1500); // 模擬重新整理
        }
    }, 1000);

    // 手動重試按鈕
    retryBtn.addEventListener('click', () => {
        retryBtn.textContent = "正在重新連線...";
        retryBtn.disabled = true; retryBtn.style.opacity = "0.7";
        setTimeout(() => { window.location.reload(); }, 800);
    });

    // --- 互動一：日/夜間模式切換 ---
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        if (document.body.classList.contains('dark-mode')) {
            themeToggle.textContent = '☀️ 切換日間模式';
        } else {
            themeToggle.textContent = '🌙 進入夜間模式';
        }
    });

    // --- 互動二：點擊巴士顯示隨機彩蛋 ---
    const bus = document.getElementById('interactive-bus');
    const honkText = document.getElementById('honk-text');

    const easterEggs = [
        "叭叭！你的專屬彩蛋已送達 🎁",
        "你知道嗎？世界上第一條公車路線在 1662 年的巴黎！",
        "遇到當機就像塞車，深呼吸，我們馬上為您疏通！",
        "雖然網頁塞車，但這台小巴士絕對不會遲到 🚌",
        "工程師正在後台瘋狂敲鍵盤搶修中... ⌨️",
        "點擊我不能加速連線，但可以打發時間喔 😆",
        "[System_Log] Bus.exe is running perfectly.",
        "等車的時候，做個眼球體操放鬆一下吧 👀"
    ];

    let isDisplaying = false;

    bus.addEventListener('click', () => {
        if (isDisplaying) return; 
        isDisplaying = true;

        // 隨機抽取語錄
        const randomIndex = Math.floor(Math.random() * easterEggs.length);
        honkText.textContent = easterEggs[randomIndex];
        honkText.classList.add('show');

        // 顯示 2.5 秒後收起
        setTimeout(() => {
            honkText.classList.remove('show');
            setTimeout(() => { isDisplaying = false; }, 300); // 等待淡出
        }, 2500);
    });
});