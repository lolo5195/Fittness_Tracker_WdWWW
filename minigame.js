document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const minigame = document.getElementById('minigame');
    const muscleEmoji = document.getElementById('muscle-emoji');
    const clickCountEl = document.getElementById('click-count');
    const closeBtn = document.getElementById('close-minigame');

    let clickStreak = 0;
    let minigameClicks = 0;

    themeToggleBtn.addEventListener('click', () => {
        clickStreak++;

        if (clickStreak === 6) {
            minigame.style.display = 'block';
            minigameClicks = 0;
            clickCountEl.textContent = minigameClicks;
            clickStreak = 0;
        }

        setTimeout(() => {
            clickStreak = 0;
        }, 2000);
    });

    muscleEmoji.addEventListener('click', () => {
        minigameClicks++;
        clickCountEl.textContent = minigameClicks;
    });

    closeBtn.addEventListener('click', () => {
        minigame.style.display = 'none';
    })
});