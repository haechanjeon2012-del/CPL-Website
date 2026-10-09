/* CPL 2.0 starter demo
 * IMPORTANT: localStorage is not secure admin storage. Replace with authenticated
 * Firebase/Firestore access before using real league data.
 */
const seedTeams = [
  {id:"hc",name:"해찬"},{id:"jw",name:"재우"},{id:"sh",name:"시환"},
  {id:"jh",name:"준혁"},{id:"jy",name:"재형"}
];
const seedGames = [
  {id:"demo-1",home:"hc",away:"sh",homeScore:1,awayScore:0,status:"completed",type:"practice",note:"예시 기록 · 공식 반영 전"},
  {id:"demo-2",home:"jw",away:"sh",homeScore:1,awayScore:0,status:"completed",type:"practice",note:"예시 기록 · 공식 반영 전"},
  {id:"demo-3",home:"hc",away:"jh",homeScore:1,awayScore:0,status:"completed",type:"practice",note:"예시 기록 · 공식 반영 전"}
];
const teamById = Object.fromEntries(seedTeams.map(t=>[t.id,t]));
const gameTypes = {practice:"연습경기",regular:"정규시즌",allstar:"올스타",btm:"BTM",playoff:"포스트시즌"};
let games = loadGames();
function loadGames(){
  try { const saved=localStorage.getItem("cpl20-demo-games"); return saved ? JSON.parse(saved) : seedGames.slice(); }
  catch { return seedGames.slice(); }
}
function standings(){
  const rows=seedTeams.map(t=>({id:t.id,name:t.name,gp:0,w:0,d:0,l:0,rs:0,ra:0}));
  const byId=Object.fromEntries(rows.map(r=>[r.id,r]));
  games.filter(g=>g.status==="completed" && g.type==="regular").forEach(g=>{
    if(!byId[g.home]||!byId[g.away])return;
    const h=byId[g.home],a=byId[g.away]; h.gp++;a.gp++;h.rs+=Number(g.homeScore);h.ra+=Number(g.awayScore);a.rs+=Number(g.awayScore);a.ra+=Number(g.homeScore);
    if(Number(g.homeScore)>Number(g.awayScore)){h.w++;a.l++}else if(Number(g.homeScore)<Number(g.awayScore)){a.w++;h.l++}else{h.d++;a.d++}
  });
  return rows.sort((a,b)=>((b.w/(b.gp||1))-(a.w/(a.gp||1)))||(b.w-a.w)||(a.l-b.l));
}
function renderStandings(){
  const rows=standings();
  document.getElementById("standingsBody").innerHTML=rows.map((r,i)=>{
    const pct=r.gp?((r.w+.5*r.d)/r.gp).toFixed(3):"—";
    return `<tr><td class="rank-number">${i+1}</td><td class="team-cell">${esc(r.name)}</td><td>${r.gp}</td><td>${r.w}</td><td>${r.d}</td><td>${r.l}</td><td><span class="record-chip">${pct}</span></td></tr>`;
  }).join("");
}
function renderGames(){
  const sorted=games.slice().reverse();
  document.getElementById("gamesList").innerHTML=sorted.map(g=>{
    const h=teamById[g.home]?.name||"미등록 팀",a=teamById[g.away]?.name||"미등록 팀";
    const score=g.status==="completed"?`${g.homeScore}<span>:</span>${g.awayScore}`:"VS";
    const status={completed:"경기 종료",scheduled:"경기 예정",postponed:"경기 연기",cancelled:"경기 취소"}[g.status]||g.status;
    return `<article class="game-card"><div class="game-meta"><span class="game-type">${gameTypes[g.type]||"경기"}</span><span>${status}</span></div><div class="game-scoreline"><div class="game-team">${esc(h)}</div><div class="game-score">${score}</div><div class="game-team">${esc(a)}</div></div><div class="game-note">${esc(g.note||"CPL 경기")}</div></article>`;
  }).join("") || '<p>등록된 경기가 없습니다.</p>';
}
function renderPlayers(){
  const names=[["해찬","HC","투타"],["재우","JW","투타"],["시환","SH","투타"],["준혁","JH","투타"],["재형","JY","투타"]];
  document.getElementById("playersGrid").innerHTML=names.map(p=>`<article class="player-card"><div class="player-avatar">${p[1]}</div><strong>${p[0]}</strong><small>${p[2]} · 기록 준비 중</small><div class="player-stat">경기별 선수 기록 연결 예정</div></article>`).join("");
}
function fillTeamSelects(){
  ["homeTeam","awayTeam"].forEach(id=>{
    const sel=document.getElementById(id);
    sel.innerHTML=seedTeams.map(t=>`<option value="${t.id}">${t.name}</option>`).join("");
  });
  document.getElementById("awayTeam").value="sh";
}
function render(){renderStandings();renderGames();renderPlayers()}
function esc(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
document.getElementById("gameForm").addEventListener("submit",e=>{
  e.preventDefault();
  const home=document.getElementById("homeTeam").value,away=document.getElementById("awayTeam").value;
  if(home===away){document.getElementById("formMessage").textContent="홈팀과 원정팀을 다르게 선택해 주세요.";return}
  const g={id:"demo-"+Date.now(),home,away,homeScore:Number(document.getElementById("homeScore").value),awayScore:Number(document.getElementById("awayScore").value),status:document.getElementById("gameStatus").value,type:document.getElementById("gameType").value,note:document.getElementById("gameNote").value.trim()||"관리자 데모 입력"};
  games.push(g);
  try{localStorage.setItem("cpl20-demo-games",JSON.stringify(games));document.getElementById("formMessage").textContent="데모 결과를 이 브라우저에 저장했습니다. 실제 서버에는 저장되지 않았습니다."}
  catch{document.getElementById("formMessage").textContent="브라우저 저장에 실패했습니다."}
  render();
});
const menuToggle=document.getElementById("menuToggle"),nav=document.getElementById("mainNav");
menuToggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");menuToggle.setAttribute("aria-expanded",String(open));menuToggle.textContent=open?"×":"☰"});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menuToggle.setAttribute("aria-expanded","false");menuToggle.textContent="☰"}));
fillTeamSelects();render();
