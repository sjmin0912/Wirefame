/* 로그 시간 저장 */
const logPageView = (pageName) => {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Page viewed: ${pageName}`);
    
    // 로컬스토리지에 방문 기록 저장
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: pageName,
        timestamp: timestamp,
        action: 'page_view'
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
};

// 홈 페이지 진입 로그
logPageView('home');

// 동영상 플레이 버튼 클릭
document.querySelector('.video-placeholder')?.addEventListener('click', function() {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Action: video_play_clicked`);
    
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'home',
        timestamp: timestamp,
        action: 'video_play'
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
    
    // 실제로는 동영상 재생
    alert('동영상 재생 기능은 준비중입니다');
});

// 바로 만들기 버튼 클릭 로그
document.querySelector('.btn-primary.large')?.addEventListener('click', function() {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Action: start_mission_clicked`);
    
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'home',
        timestamp: timestamp,
        action: 'start_mission'
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
});
