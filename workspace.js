/* 워크스페이스 JavaScript */

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

logPageView('workspace');

// 테스트 상태 관리
let testResults = {
    1: null, // null: 대기, true: 통과, false: 실패
    2: null,
    3: null
};

// 코드 편집 상태
let currentFile = 'main.js';
let codeContent = {
    'main.js': `// 장애물 피하기 게임
const game = {
    player: { x: 200, y: 350, width: 30, height: 30 },
    obstacles: [],
    score: 0,
    isRunning: false
};

// 키보드 입력 처리
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft' && game.player.x > 0) {
        game.player.x -= 20;
        console.log('왼쪽으로 이동:', game.player.x);
    }
    if (e.key === 'ArrowRight' && game.player.x < 370) {
        game.player.x += 20;
        console.log('오른쪽으로 이동:', game.player.x);
    }
});

// 장애물 생성
function createObstacle() {
    const obstacle = {
        x: Math.random() * 370,
        y: 0,
        width: 30,
        height: 30
    };
    game.obstacles.push(obstacle);
    console.log('장애물 생성:', obstacle);
}

// 충돌 감지
function checkCollision(player, obstacle) {
    return player.x < obstacle.x + obstacle.width &&
           player.x + player.width > obstacle.x &&
           player.y < obstacle.y + obstacle.height &&
           player.y + player.height > obstacle.y;
}

// 게임 루프
function gameLoop() {
    if (!game.isRunning) return;
    
    // 장애물 이동
    game.obstacles.forEach(obstacle => {
        obstacle.y += 5;
    });
    
    // 충돌 체크
    game.obstacles.forEach(obstacle => {
        if (checkCollision(game.player, obstacle)) {
            console.log('충돌 발생! 게임 종료');
            game.isRunning = false;
            alert('게임 오버! 점수: ' + game.score);
        }
    });
    
    // 점수 증가
    game.score++;
    
    requestAnimationFrame(gameLoop);
}

console.log('게임 준비 완료!');`,
    
    'game.js': `// 게임 엔진 확장 기능
// 여기에 추가 기능을 작성하세요`,
    
    'style.css': `/* 게임 스타일 */
#gameCanvas {
    background: #f0f0f0;
}

.player {
    background: #667eea;
}

.obstacle {
    background: #ef4444;
}`
};

let isCodeSectionOpen = false;

// 초기화
window.addEventListener('DOMContentLoaded', () => {
    // 코드 에디터에 기본 코드 표시
    document.getElementById('codeEditor').value = codeContent[currentFile];
    
    // 코드 영역 기본으로 펼쳐놓기
    toggleCodeSection();
});

// 탭 전환
function switchTab(tabName) {
    // 모든 탭 비활성화
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // 선택한 탭 활성화
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`${tabName}-pane`).classList.add('active');
    
    // 로그
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'workspace',
        timestamp: new Date().toISOString(),
        action: `tab_switch_${tabName}`
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
}

// 게임 실행
function runGame() {
    console.log('게임 실행');
    document.getElementById('gameStatus').textContent = '실행중';
    
    // 오버레이 숨기기
    const overlay = document.querySelector('.game-overlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
    
    // 간단한 장애물 애니메이션 시작
    startObstacleAnimation();
    
    // 로그
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'workspace',
        timestamp: new Date().toISOString(),
        action: 'game_run'
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
}

// 장애물 애니메이션
function startObstacleAnimation() {
    const obstaclesContainer = document.getElementById('gameObstacles');
    if (!obstaclesContainer) return;
    
    // 기존 장애물 제거
    obstaclesContainer.innerHTML = '';
    
    // 3개 장애물 생성
    const obstacles = ['🪨', '🌳', '⚠️'];
    obstacles.forEach((emoji, index) => {
        const obstacle = document.createElement('div');
        obstacle.className = 'obstacle';
        obstacle.textContent = emoji;
        obstacle.style.left = `${20 + index * 30}%`;
        obstacle.style.animationDelay = `${index * 1}s`;
        obstaclesContainer.appendChild(obstacle);
    });
}

// 게임 리셋
function resetGame() {
    console.log('게임 리셋');
    document.getElementById('gameStatus').textContent = '대기중';
    document.getElementById('score').textContent = '0';
    
    // 오버레이 다시 표시
    const overlay = document.querySelector('.game-overlay');
    if (overlay) {
        overlay.classList.remove('hidden');
    }
    
    // 장애물 제거
    const obstaclesContainer = document.getElementById('gameObstacles');
    if (obstaclesContainer) {
        obstaclesContainer.innerHTML = '';
    }
}

// 전체화면
function openFullscreen() {
    alert('전체화면 기능은 준비중입니다.\n실제 구현시 새 탭 또는 모달로 플레이 화면을 확대합니다.');
}

// 단일 테스트 실행
function runSingleTest(testNum) {
    console.log(`테스트 ${testNum} 실행`);
    alert(`테스트 ${testNum}을 실행합니다.\n게임을 플레이하면서 조건을 확인해보세요.\n\n조건이 맞으면 '✓ 통과' 버튼을 눌러주세요.`);
    
    // 로그
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'workspace',
        timestamp: new Date().toISOString(),
        action: `test_run_${testNum}`
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
}

// 테스트 통과 표시
function markTestPass(testNum) {
    testResults[testNum] = true;
    document.getElementById(`test${testNum}Status`).textContent = '✅ 통과';
    document.getElementById(`test${testNum}Status`).style.color = '#10b981';
    
    // 통과 카운트 업데이트
    updateTestCount();
    
    // 로그
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'workspace',
        timestamp: new Date().toISOString(),
        action: `test_pass_${testNum}`
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
}

// 테스트 실패 표시
function markTestFail(testNum) {
    testResults[testNum] = false;
    document.getElementById(`test${testNum}Status`).textContent = '❌ 실패';
    document.getElementById(`test${testNum}Status`).style.color = '#ef4444';
    
    // 디버그 섹션 표시
    const debugSection = document.getElementById('debugSection');
    if (debugSection) {
        debugSection.style.display = 'block';
    }
    
    // 통과 카운트 업데이트
    updateTestCount();
    
    // 로그
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'workspace',
        timestamp: new Date().toISOString(),
        action: `test_fail_${testNum}`
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
}

// 전체 테스트 재실행
function runAllTests() {
    alert('전체 테스트를 다시 실행합니다.\n게임을 플레이하면서 3가지 조건을 모두 확인해보세요.');
    
    // 로그
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'workspace',
        timestamp: new Date().toISOString(),
        action: 'test_run_all'
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
}

// 통과 카운트 업데이트
function updateTestCount() {
    const passCount = Object.values(testResults).filter(r => r === true).length;
    document.getElementById('testPassCount').textContent = passCount;
    
    // 3개 모두 통과하면 제출 버튼 활성화
    if (passCount === 3) {
        document.getElementById('submitBtn').disabled = false;
        alert('🎉 테스트를 모두 통과했어요!\n이제 제출할 수 있습니다.');
    }
}

// 튜터에게 질문
function askTutor(issueType) {
    console.log(`튜터 호출: ${issueType}`);
    switchTab('tutor');
    
    // 로그
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'workspace',
        timestamp: new Date().toISOString(),
        action: `tutor_ask_${issueType}`
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
}

// 도움 레벨 선택
function selectLevel(level) {
    console.log(`도움 레벨 ${level} 선택`);
    
    // 목업 응답 표시
    const responses = {
        1: {
            question: "캐릭터가 움직이지 않는다면, 키보드 이벤트를 제대로 받고 있는지 확인해보셨나요?",
            hint: "키보드 입력을 감지하는 이벤트 리스너가 필요합니다.",
            example: "// 힌트만 제공됩니다\n// 직접 코드를 작성해보세요",
            nextAction: "키보드 이벤트를 콘솔에 출력해서 제대로 감지되는지 확인해보세요."
        },
        2: {
            question: "장애물이 떨어지지 않는다면, 주기적으로 장애물을 생성하는 로직이 있나요?",
            hint: "setInterval 같은 타이머를 사용하면 일정 시간마다 장애물을 만들 수 있어요.",
            example: "// 예시: 2초마다 실행\nsetInterval(() => {\n  // 장애물 생성 코드\n}, 2000);",
            nextAction: "테스트 2를 다시 실행해서 장애물이 떨어지는지 확인하세요."
        },
        3: {
            question: "충돌 감지가 안 된다면, 캐릭터와 장애물의 위치를 비교하는 코드가 있나요?",
            hint: "두 객체의 x, y 좌표와 크기를 비교해서 겹치는지 확인해야 합니다.",
            example: "// 충돌 확인 예시\nif (player.x < obstacle.x + obstacle.width &&\n    player.x + player.width > obstacle.x) {\n  // 충돌!\n}",
            nextAction: "충돌이 감지되면 콘솔에 메시지를 출력해서 확인해보세요."
        }
    };
    
    const response = responses[level];
    document.getElementById('tutorQuestion').textContent = response.question;
    document.getElementById('tutorHint').textContent = response.hint;
    document.getElementById('tutorExample').textContent = response.example;
    document.getElementById('tutorNextAction').textContent = response.nextAction;
    document.getElementById('tutorResponse').style.display = 'block';
    
    // 로그
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'workspace',
        timestamp: new Date().toISOString(),
        action: `tutor_level_${level}`
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
}

// 힌트 적용
function applyHint() {
    alert('힌트를 참고해서 코드를 수정해보세요.\n수정 후 게임을 실행하고 테스트해보세요!');
}

// 동영상 전체화면
function openVideoFullscreen() {
    alert('동영상 전체화면 기능은 준비중입니다.\n실제 구현시 새 탭 또는 모달로 동영상을 확대합니다.');
}

function openTutorialFullscreen() {
    alert('튜토리얼 전체화면 기능은 준비중입니다.\n실제 구현시 새 탭 또는 모달로 동영상을 확대합니다.');
}

// 프로젝트 제출
function submitProject() {
    const passCount = Object.values(testResults).filter(r => r === true).length;
    
    if (passCount < 3) {
        alert('아직 테스트를 모두 통과하지 못했어요.\n테스트를 완료하고 다시 시도해주세요.');
        return;
    }
    
    // 제출 성공
    alert('🎉 축하합니다!\n작품이 제출되었습니다.\n\n마이페이지에서 확인할 수 있어요.');
    
    // 포트폴리오에 저장
    const portfolio = JSON.parse(localStorage.getItem('akeoPortfolio') || '[]');
    portfolio.push({
        id: Date.now(),
        title: '장애물 피하기 게임',
        completedAt: new Date().toISOString(),
        testResults: testResults,
        score: 100
    });
    localStorage.setItem('akeoPortfolio', JSON.stringify(portfolio));
    
    // 로그
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'workspace',
        timestamp: new Date().toISOString(),
        action: 'project_submit'
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
    
    // 마이페이지로 이동
    setTimeout(() => {
        location.href = 'mypage.html';
    }, 1500);
}

// 자동 저장 (3초마다)
setInterval(() => {
    console.log('[자동저장] 작업 내용 저장됨');
}, 3000);

// ===== 코드 편집 기능 =====

// 코드 섹션 토글
function toggleCodeSection() {
    const content = document.getElementById('codeContent');
    const icon = document.getElementById('toggleIcon');
    const btn = document.getElementById('codeToggleBtn');
    
    isCodeSectionOpen = !isCodeSectionOpen;
    
    if (isCodeSectionOpen) {
        content.style.display = 'block';
        icon.classList.add('open');
        btn.innerHTML = '<span id="toggleIcon" class="open">▼</span> 코드 닫기';
        logConsole('info', '코드 편집 영역 열림');
    } else {
        content.style.display = 'none';
        icon.classList.remove('open');
        btn.innerHTML = '<span id="toggleIcon">▼</span> 코드 보기';
        logConsole('info', '코드 편집 영역 닫힘');
    }
    
    // 로그
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'workspace',
        timestamp: new Date().toISOString(),
        action: `code_section_${isCodeSectionOpen ? 'open' : 'close'}`
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
}

// 파일 열기
function openFile(fileName) {
    currentFile = fileName;
    document.getElementById('currentFileName').textContent = fileName;
    document.getElementById('codeEditor').value = codeContent[fileName];
    
    // 파일 아이템 활성화
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.file-item').classList.add('active');
    
    // 에디터 탭 업데이트
    document.querySelector('.editor-tab').textContent = fileName;
    
    logConsole('info', `파일 열림: ${fileName}`);
}

// 편집 모드 토글
function toggleEditMode() {
    const editor = document.getElementById('codeEditor');
    const toggle = document.getElementById('editModeToggle');
    
    if (toggle.checked) {
        editor.removeAttribute('readonly');
        editor.style.background = '#1f2937';
        editor.style.color = '#10b981';
        logConsole('warn', '직접 수정 모드 활성화 (고급 사용자용)');
    } else {
        editor.setAttribute('readonly', true);
        editor.style.background = '#f9fafb';
        editor.style.color = '#6b7280';
        logConsole('info', '읽기 전용 모드');
    }
}

// 코드 실행
function runCode() {
    logConsole('info', '▶ 코드 실행 시작...');
    
    try {
        // 실제로는 코드를 실행하지만, 여기서는 목업
        logConsole('success', '✓ 코드 실행 성공');
        logConsole('info', '게임 준비 완료!');
        
        // 게임 실행도 함께
        runGame();
    } catch (err) {
        logConsole('error', `✗ 오류 발생: ${err.message}`);
    }
    
    // 로그
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'workspace',
        timestamp: new Date().toISOString(),
        action: 'code_run'
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
}

// 코드 저장
function saveCode() {
    const editor = document.getElementById('codeEditor');
    codeContent[currentFile] = editor.value;
    
    logConsole('success', `💾 ${currentFile} 저장됨`);
    
    // 로그
    const logs = JSON.parse(localStorage.getItem('akeoLogs') || '[]');
    logs.push({
        page: 'workspace',
        timestamp: new Date().toISOString(),
        action: `code_save_${currentFile}`
    });
    localStorage.setItem('akeoLogs', JSON.stringify(logs));
}

// 코드 초기화
function resetCode() {
    if (!confirm('코드를 초기 상태로 되돌릴까요?')) return;
    
    // 초기 코드로 복원 (원래는 서버에서 가져옴)
    if (currentFile === 'main.js') {
        codeContent[currentFile] = `// 장애물 피하기 게임
const game = {
    player: { x: 200, y: 350, width: 30, height: 30 },
    obstacles: [],
    score: 0,
    isRunning: false
};

// 여기에 코드 작성...`;
    }
    
    document.getElementById('codeEditor').value = codeContent[currentFile];
    logConsole('warn', '코드 초기화됨');
}

// 새 파일 생성
function createNewFile() {
    const fileName = prompt('파일 이름을 입력하세요 (예: helper.js)');
    if (!fileName) return;
    
    codeContent[fileName] = `// ${fileName}\n// 새 파일`;
    logConsole('success', `새 파일 생성: ${fileName}`);
    alert(`"${fileName}" 파일이 생성되었습니다.\n(실제 구현시 파일 목록에 자동 추가)`);
}

// 콘솔 로그 추가
function logConsole(type, message) {
    const consoleOutput = document.getElementById('consoleOutput');
    const time = new Date().toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
    
    const line = document.createElement('div');
    line.className = `console-line ${type}`;
    line.innerHTML = `
        <span class="console-time">${time}</span>
        <span class="console-text">${message}</span>
    `;
    
    consoleOutput.appendChild(line);
    consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

// 콘솔 지우기
function clearConsole() {
    const consoleOutput = document.getElementById('consoleOutput');
    consoleOutput.innerHTML = '<div class="console-line info"><span class="console-time">00:00</span><span class="console-text">콘솔 초기화됨</span></div>';
    logConsole('info', '콘솔 지워짐');
}
