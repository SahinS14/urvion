(() => {
  const timeline = document.querySelector('#voyage-route-timeline');
  if (timeline) {
    const labelPins = () => timeline.querySelectorAll("#timeline-flags-container button[id^='timeline-flag-']").forEach((pin, index) => pin.style.setProperty('--pin-index', index));
    const observer = new MutationObserver(labelPins);
    observer.observe(timeline.querySelector('#timeline-flags-container'), { childList:true });
    labelPins();
    new IntersectionObserver(([entry]) => timeline.classList.toggle('route-awake', entry.isIntersecting && !matchMedia('(prefers-reduced-motion: reduce)').matches), { threshold:.16 }).observe(timeline);
  }

  document.querySelectorAll('.original-sponsors .cargo-window').forEach((rail, index) => {
    rail.tabIndex = 0;
    rail.setAttribute('aria-label', `Partner cargo rail ${index + 1}`);
    const controls = document.createElement('div');
    controls.className = 'cargo-rail-controls';
    controls.innerHTML = `<button type="button" aria-label="Previous partners">←</button><span>DRAG OR USE ARROWS TO EXPLORE PARTNERS</span><button type="button" aria-label="Next partners">→</button>`;
    rail.after(controls);
    const [previous, next] = controls.querySelectorAll('button');
    const reduce = matchMedia('(prefers-reduced-motion: reduce)');
    let paused = false, resumeTimer = 0;
    const halfWay = () => rail.scrollWidth / 2;
    const sail = () => {
      if (!paused && !reduce.matches) {
        rail.scrollLeft += .75;
        if (rail.scrollLeft >= halfWay()) rail.scrollLeft -= halfWay();
      }
    };
    const pauseForInteraction = () => { paused = true; clearTimeout(resumeTimer); };
    const resumeAfterInteraction = () => { clearTimeout(resumeTimer); resumeTimer = setTimeout(() => { paused = false; }, 900); };
    const travel = direction => { pauseForInteraction(); rail.scrollBy({ left: direction * Math.max(220, rail.clientWidth * .72), behavior: reduce.matches ? 'auto' : 'smooth' }); resumeAfterInteraction(); };
    previous.addEventListener('click', () => travel(-1));
    next.addEventListener('click', () => travel(1));
    rail.addEventListener('keydown', event => { if(event.key==='ArrowLeft'){event.preventDefault();travel(-1)} if(event.key==='ArrowRight'){event.preventDefault();travel(1)} });
    let startX=0,startLeft=0,dragging=false;
    rail.addEventListener('pointerdown', event => { pauseForInteraction(); dragging=true;startX=event.clientX;startLeft=rail.scrollLeft;rail.setPointerCapture(event.pointerId); });
    rail.addEventListener('pointermove', event => { if(!dragging)return;rail.scrollLeft=startLeft-(event.clientX-startX); });
    rail.addEventListener('pointerup', () => { dragging=false;resumeAfterInteraction(); });
    rail.addEventListener('pointercancel', () => { dragging=false;resumeAfterInteraction(); });
    rail.addEventListener('touchstart', pauseForInteraction, {passive:true});
    rail.addEventListener('touchend', resumeAfterInteraction, {passive:true});
    rail.addEventListener('wheel', pauseForInteraction, {passive:true});
    rail.addEventListener('mouseleave', resumeAfterInteraction);
    const autoSail = setInterval(sail, 40);
    reduce.addEventListener('change', () => { if (reduce.matches) clearInterval(autoSail); });
  });
})();
