window.CourseGuide = (() => {
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function say(text, {speaker = 'carmelo', label = '', html = false} = {}) {
    const name = speaker === 'cornalina' ? 'コルナリーナ' : 'カルメロ';
    return `<div class="character-guide ${speaker}"><img src="assets/${speaker}.png" alt="" width="88" height="88"><div class="character-speech"><div class="speaker-label"><strong>${name}</strong>${label ? `<span>${escape(label)}</span>` : ''}</div><div class="speech-text">${html ? text : escape(text)}</div></div></div>`;
  }
  return {say};
})();
