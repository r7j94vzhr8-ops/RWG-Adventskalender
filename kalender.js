'use strict';
const $ = id => document.getElementById(id);
const config = window.KALENDER || {};
const nowParts = (date = new Date()) => Object.fromEntries(new Intl.DateTimeFormat('en-CA', {timeZone:'Europe/Berlin',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(date).filter(p => p.type !== 'literal').map(p => [p.type,Number(p.value)]));
const calendarYear = Number(config.jahr) || nowParts().year;
function availableDays(date = new Date()) { const p = nowParts(date); return p.year < calendarYear ? 0 : p.year > calendarYear ? 24 : p.month < 12 ? 0 : Math.min(24,p.day); }
let override = false;
let busy = false;
let activeDoor = null;
let opened = new Set();
try { const saved = JSON.parse(localStorage.getItem(`rwg-advent-${calendarYear}`) || '[]'); if (Array.isArray(saved)) opened = new Set(saved.filter(n => Number.isInteger(n) && n >= 1 && n <= 24)); } catch {}
// Prozentpositionen: alle Türchen bleiben auf dem Motiv; Die Tage 15, 18 und 23 liegen auf dem unteren RWG-Logo.
const positions = [[37,8],[53,12],[22,17],[70,18],[10,28],[37,27],[55,28],[80,30],[22,37],[67,38],[8,46],[40,44],[81,47],[24,51],[56,49],[10,59],[40,58],[69,59],[24,64],[55,66],[57,80.5],[33,80.5],[35,72],[45,81.5]];
const order = [17,3,21,8,12,24,5,19,1,14,22,7,10,4,16,9,20,2,13,6,23,15,11,18];
for (let day = 1; day <= 24; day++) {
  const pos = positions[order.indexOf(day)];
  const button = document.createElement('button');
  button.type = 'button'; button.className = 'door'; button.dataset.day = day;
  button.style.setProperty('--x', `${pos[0]}%`); button.style.setProperty('--y', `${pos[1]}%`);
  button.innerHTML = `<span class="door-face"><span>${day}</span></span>`;
  button.addEventListener('click', () => openDay(day, button)); $('doors').append(button);
}
function refresh() {
  const allowed = override ? 24 : availableDays();
  $('season').textContent = `Advent ${calendarYear}`;
  $('status').textContent = override ? 'Vorschaumodus · alle 24 Türchen verfügbar' : allowed === 0 ? 'Das erste Türchen öffnet am 1. Dezember.' : `${allowed} von 24 Türchen sind freigegeben.`;
  $('unlock').textContent = override ? 'Datumssperre einschalten' : 'Alle Türchen freigeben';
  $('unlock').setAttribute('aria-pressed', String(override));
  $('progress').textContent = `${opened.size} von 24 Türchen entdeckt`;
  document.querySelectorAll('.door').forEach(b => { const day = Number(b.dataset.day); const locked = day > allowed; b.setAttribute('aria-disabled',String(locked)); b.setAttribute('aria-label',`${day}. Dezember${locked ? ', noch geschlossen' : ', Türchen öffnen'}${opened.has(day) ? ', bereits entdeckt' : ''}`); b.title = locked ? `Ab ${day}. Dezember ${calendarYear}` : `${day}. Dezember öffnen`; b.classList.toggle('opened',opened.has(day)); });
}
async function openDay(day, button) {
  if (busy || $('day-dialog').open) return;
  if (!override && day > availableDays()) { $('notice').textContent = `Noch etwas Geduld: Türchen ${day} öffnet am ${day}. Dezember ${calendarYear}.`; return; }
  busy = true; activeDoor = button; $('notice').textContent = '';
  const data = (window.TAGESINHALTE || []).find(item => item.tag === day);
  $('day-label').textContent = `${String(day).padStart(2,'0')}. Dezember · Türchen ${day}`;
  $('day-category').textContent = data?.kategorie || 'Dein Adventsmoment';
  $('day-title').textContent = data?.titel || `Dein Inhalt für Tag ${day}`;
  $('day-meta').textContent = [data?.dauer,data?.material].filter(Boolean).join(' · ');
  $('day-meta').hidden = !$('day-meta').textContent;
  // HTML stammt ausschließlich aus der lokal gepflegten inhalte.js.
  $('day-body').innerHTML = data?.inhalt || '<p>Hier ist Platz für deine Übungen. Trage den Inhalt für diesen Tag in <strong>inhalte.js</strong> ein.</p>';
  button.classList.add('opening');
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) await new Promise(resolve => setTimeout(resolve,360));
  $('day-dialog').showModal(); $('day-dialog').scrollTop = 0; document.body.classList.add('modal-open');
  opened.add(day); try { localStorage.setItem(`rwg-advent-${calendarYear}`,JSON.stringify([...opened])); } catch {}
  button.classList.remove('opening'); busy = false; refresh();
}
$('unlock').addEventListener('click', () => {override = !override; $('notice').textContent = ''; refresh();});
for (const id of ['close','done']) $(id).addEventListener('click', () => $('day-dialog').close());
$('day-dialog').addEventListener('click', event => {if(event.target === $('day-dialog')) {const r = $('day-dialog').getBoundingClientRect(); if(event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) $('day-dialog').close();}});
$('day-dialog').addEventListener('close', () => {document.body.classList.remove('modal-open'); activeDoor?.focus();});
function imageReady() { $('calendar').classList.remove('no-image'); $('missing').hidden = true; $('doors').hidden = false; }
function imageMissing() { $('calendar').classList.add('no-image'); $('missing').hidden = false; $('doors').hidden = true; }
$('picture').addEventListener('load',imageReady); $('picture').addEventListener('error',imageMissing);
if ($('picture').complete) $('picture').naturalWidth ? imageReady() : imageMissing();
if(config.bild) $('picture').src = config.bild;
let imageUrl;
$('image-input').addEventListener('change', event => { const file = event.target.files[0]; if(!file) return; if(imageUrl) URL.revokeObjectURL(imageUrl); imageUrl = URL.createObjectURL(file); $('picture').src = imageUrl; });
document.addEventListener('visibilitychange',refresh); setInterval(refresh,30000); refresh();
