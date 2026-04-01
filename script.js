function renderMatches() {
  const container = document.getElementById('matchesList');
  if (!container) return;
  
  const stored = localStorage.getItem('tournamentMatches');
  const matches = stored ? JSON.parse(stored) : [];
  
  if (matches.length === 0) {
    container.innerHTML = '<div class="no-matches"><p>📢 No matches scheduled yet.<br>Check back later or contact admin.</p></div>';
    return;
  }
  
  container.innerHTML = matches.map(match => `
    <div class="match-card">
      <div class="status-bar">
        <span class="match-status">${escapeHtml(match.matchStatus || 'Not started')}</span>
        <span class="match-time">${escapeHtml(match.matchTime || '')}</span>
      </div>
      <div class="score-section">
        <div class="team-block">
          <div class="team-name">${escapeHtml(match.homeTeam)}</div>
          <div class="team-score">${match.homeScore}</div>
        </div>
        <div class="vs-divider">VS</div>
        <div class="team-block">
          <div class="team-name">${escapeHtml(match.awayTeam)}</div>
          <div class="team-score">${match.awayScore}</div>
        </div>
      </div>
      <div class="details-panel">
        <div class="details-grid">
          <div class="detail-card">
            <h4>⚽ GOALS</h4>
            <ul class="detail-list">
              ${(match.scorers || []).map(s => `<li><span class="goal-marker">⚽</span> ${escapeHtml(s.name)} <span style="color:#64748b;">${s.time}</span></li>`).join('') || '<li class="empty-state">— No goals —</li>'}
            </ul>
          </div>
          <div class="detail-card">
            <h4>🟨 YELLOW</h4>
            <ul class="detail-list">
              ${(match.yellowCards || []).map(c => `<li><span class="yellow-marker">🟨</span> ${escapeHtml(c.player)} <span style="color:#64748b;">${c.time}</span></li>`).join('') || '<li class="empty-state">— None —</li>'}
            </ul>
          </div>
          <div class="detail-card">
            <h4>🟥 RED</h4>
            <ul class="detail-list">
              ${(match.redCards || []).map(c => `<li><span class="red-marker">🟥</span> ${escapeHtml(c.player)} <span style="color:#64748b;">${c.time}</span></li>`).join('') || '<li class="empty-state">— None —</li>'}
            </ul>
          </div>
          <div class="detail-card">
            <h4>📋 EVENTS</h4>
            <ul class="detail-list">
              ${(match.events || []).map(e => `<li><span class="event-marker">📌</span> ${escapeHtml(e)}</li>`).join('') || '<li class="empty-state">— No events —</li>'}
            </ul>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>]/g, function(m) {
    if (m === '&') return '&amp;';
    if (m === '<') return '&lt;';
    if (m === '>') return '&gt;';
    return m;
  });
}

setInterval(renderMatches, 2000);
renderMatches();
