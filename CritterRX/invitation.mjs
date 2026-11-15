export function invitationTarget(hash) {
  const token = hash.startsWith('#') ? hash.slice(1) : hash;
  return /^[a-f0-9]{64}$/.test(token) ? {native: `bramcare://invite#${token}`, web: `https://3qinnova.com/CritterRX/invite/#${token}`} : null;
}
if (typeof document !== 'undefined') {
  const target = invitationTarget(location.hash);
  const status = document.getElementById('status');
  status.textContent = target ? 'Your invitation is ready. Open CritterRX to review and accept it.' : 'This invitation is incomplete or invalid. Ask the owner for the complete private link.';
  if (target) {
    const open = document.getElementById('open'); open.href = target.native; open.hidden = false;
    const link = document.getElementById('link'); link.value = target.web;
    const copy = document.getElementById('copy'); copy.hidden = false;
    copy.addEventListener('click', async () => {
      try { await navigator.clipboard.writeText(target.web); status.textContent = 'Invitation copied. Paste it into CritterRX after signing in.'; }
      catch { link.hidden = false; link.focus(); link.select(); status.textContent = 'Copy the private link from the field below.'; }
    });
  }
}
