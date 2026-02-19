/* 마이페이지 JavaScript */

// 페이지 로드 로그
const logPageView = (pageName) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Page viewed: ${pageName}`);
    
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: pageName,
        timestamp: timestamp,
        action: 'page_view'
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
};

logPageView('mypage');

// 페이지 로드시 포트폴리오 표시
window.addEventListener('DOMContentLoaded', () => {
    loadPortfolio();
    loadActivity();
});

// 포트폴리오 로드
function loadPortfolio() {
    const portfolio = JSON.parse(localStorage.getItem('akeoPortfolio') || '[]');
    const grid = document.getElementById('portfolioGrid');
    
    if (portfolio.length === 0) {
        // 빈 상태 유지
        return;
    }
    
    // 빈 상태 제거
    grid.innerHTML = '';
    
    // 통계 업데이트
    document.getElementById('portfolioCount').textContent = portfolio.length;
    document.getElementById('totalMissions').textContent = portfolio.length;
    
    let totalTests = 0;
    let totalScore = 0;
    
    // 포트폴리오 카드 생성
    portfolio.forEach(item => {
        const passedTests = Object.values(item.testResults).filter(r => r === true).length;
        totalTests += passedTests;
        totalScore += item.score || 0;
        
        const card = createPortfolioCard(item, passedTests);
        grid.appendChild(card);
    });
    
    document.getElementById('totalTests').textContent = totalTests;
    document.getElementById('totalScore').textContent = totalScore;
}

// 포트폴리오 카드 생성
function createPortfolioCard(item, passedTests) {
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    
    const date = new Date(item.completedAt);
    const dateStr = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
    
    card.innerHTML = `
        <div class="portfolio-card-header">
            <div class="portfolio-badge">완성</div>
            <div class="portfolio-date">${dateStr}</div>
        </div>
        <div class="portfolio-thumbnail">
            <div class="thumbnail-icon">🎮</div>
        </div>
        <div class="portfolio-info">
            <h4>${item.title}</h4>
            <div class="portfolio-stats">
                <span>✅ 테스트 ${passedTests}/3</span>
                <span>⭐ ${item.score}점</span>
            </div>
        </div>
        <div class="portfolio-actions">
            <button class="btn-small" onclick="viewProject(${item.id})">
                👁 보기
            </button>
            <button class="btn-small" onclick="shareProject(${item.id})">
                📤 공유
            </button>
        </div>
    `;
    
    return card;
}

// 프로젝트 보기
function viewProject(id) {
    const portfolio = JSON.parse(localStorage.getItem('akeoPortfolio') || '[]');
    const project = portfolio.find(p => p.id === id);
    
    if (project) {
        alert(`작품: ${project.title}\n완성일: ${new Date(project.completedAt).toLocaleString()}\n점수: ${project.score}점\n\n실제 구현시 작품 상세 화면으로 이동합니다.`);
    }
}

// 프로젝트 공유
function shareProject(id) {
    const portfolio = JSON.parse(localStorage.getItem('akeoPortfolio') || '[]');
    const project = portfolio.find(p => p.id === id);
    
    if (project) {
        alert(`"${project.title}"을(를) 공유합니다!\n\n실제 구현시 공유 링크가 생성됩니다.`);
    }
}

// 활동 로그 로드
function loadActivity() {
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    const activityList = document.getElementById('activityList');
    
    if (logs.length === 0) {
        return;
    }
    
    // 빈 상태 제거
    activityList.innerHTML = '';
    
    // 최근 10개만 표시
    const recentLogs = logs.slice(-10).reverse();
    
    recentLogs.forEach(log => {
        const item = document.createElement('div');
        item.className = 'activity-item';
        
        const date = new Date(log.timestamp);
        const timeStr = `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
        
        let actionText = '';
        switch(log.action) {
            case 'page_view':
                actionText = `${log.page} 페이지 방문`;
                break;
            case 'video_play':
                actionText = '동영상 재생';
                break;
            case 'start_mission':
                actionText = '미션 시작';
                break;
            case 'game_run':
                actionText = '게임 실행';
                break;
            case 'project_submit':
                actionText = '✅ 작품 제출 완료';
                break;
            default:
                if (log.action.startsWith('test_pass_')) {
                    actionText = `✅ 테스트 ${log.action.split('_')[2]} 통과`;
                } else if (log.action.startsWith('test_fail_')) {
                    actionText = `❌ 테스트 ${log.action.split('_')[2]} 실패`;
                } else if (log.action.startsWith('tutor_')) {
                    actionText = '💬 튜터 도움 요청';
                } else {
                    actionText = log.action;
                }
        }
        
        item.innerHTML = `
            <div class="activity-time">${timeStr}</div>
            <div class="activity-text">${actionText}</div>
        `;
        
        activityList.appendChild(item);
    });
}
