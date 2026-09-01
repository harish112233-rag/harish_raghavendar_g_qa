// preloader
(function(){
  const pre = document.getElementById('preloader');
  if(!pre) return;
  const minTime = 1200;
  const start = Date.now();
  function hide(){
    const elapsed = Date.now() - start;
    const wait = Math.max(0, minTime - elapsed);
    setTimeout(()=>{
      pre.classList.add('hide');
      setTimeout(()=> pre.remove(), 700);
    }, wait);
  }
  if(document.readyState === 'complete'){ hide(); }
  else{ window.addEventListener('load', hide); }
})();

// rotating terminal captions
  const lines = [
    "reproducing_bug on terrain zone 04",
    "logging severity: critical",
    "writing steps to reproduce",
    "classifying UI defect",
    "filing ticket 004",
    "checking collision on sloped ground"
  ];
  const termEl = document.getElementById('termText');
  let li = 0, ci = 0, deleting = false;
  function typeTick(){
    const full = lines[li];
    if(!deleting){
      ci++;
      if(ci > full.length){ deleting = true; setTimeout(typeTick, 1500); return; }
    } else {
      ci--;
      if(ci < 0){ deleting = false; li = (li+1) % lines.length; ci = 0; }
    }
    termEl.textContent = full.slice(0, ci);
    setTimeout(typeTick, deleting ? 26 : 42);
  }
  typeTick();

  // mobile menu
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', ()=>{
    const isOpen = mobileMenu.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });
  mobileMenu.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      mobileMenu.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  const form = document.getElementById('bugForm');
  const preview = document.getElementById('ticketPreview');
  const resetBtn = document.getElementById('bugReset');
  function pad(n){ return n.toString().padStart(2,'0'); }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    const title = document.getElementById('bTitle').value.trim() || 'Untitled issue';
    const severity = document.getElementById('bSeverity').value;
    const platform = document.getElementById('bPlatform').value;
    const steps = document.getElementById('bSteps').value.trim() || 'Not provided.';
    const now = new Date();
    const id = 'BUG' + now.getFullYear().toString().slice(2) + pad(now.getMonth()+1) + pad(now.getDate()) + Math.floor(Math.random()*900+100);

    preview.innerHTML =
      '<span class="k">🎫 Ticket ID </span>' + id + '\n' +
      '<span class="k">🏷️ Title </span>' + title + '\n' +
      '<span class="k">⚠️ Severity </span>' + severity + '\n' +
      '<span class="k">🖥️ Platform </span>' + platform + '\n' +
      '<span class="k">👤 Reported By </span>Harish Raghavendar G\n' +
      '<span class="k">🔄 Status </span>Open\n\n' +
      '<span class="k">🧭 Steps To Reproduce</span>\n' + steps + '\n\n' +
      '<span class="k">🕒 Filed </span>' + now.toLocaleString();
  });

  resetBtn.addEventListener('click', function(){
    form.reset();
    preview.innerHTML = '<span class="placeholder">Fill in the form and hit generate to see it rendered here, formatted the way I\'d hand it to a dev team.</span>';
  });

  // project filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.pcard');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      cards.forEach(c=>{
        c.classList.toggle('hidden', f !== 'all' && c.dataset.cat !== f);
      });
    });
  });

  // scroll to top
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', ()=>{
    scrollBtn.classList.toggle('show', window.scrollY > 500);
  });
  scrollBtn.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
