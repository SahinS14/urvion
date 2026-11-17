(() => {
  const hero = document.querySelector('#urvion-main-hero');
  if (!hero) return;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, visible = true, previousProgress = -1;
  const clamp = value => Math.max(0, Math.min(1, value));
  function draw() {
    frame = 0;
    const rect = hero.getBoundingClientRect();
    const progress = reduce.matches ? 0 : clamp(-rect.top / Math.max(1, rect.height * .7));
    if(progress===previousProgress)return;previousProgress=progress;
    hero.style.setProperty('--hero-copy-motion', `translate3d(${progress * 9}vw, 0, 0)`);
    hero.style.setProperty('--hero-copy-opacity', String(1 - progress * .72));
    hero.style.setProperty('--hero-backdrop-motion', `translate3d(${progress * -2}%, ${progress * 2}%, 0) scale(${1 + progress * .035})`);
    hero.style.setProperty('--hero-ship-motion', `translate3d(${progress * -5}vw, ${progress * 2}vh, 0) rotate(${progress * -2}deg)`);
    hero.style.setProperty('--hero-captain-motion', `translate3d(${progress * -5}vw, ${progress * 4}vh, 0)`);
    hero.style.setProperty('--hero-waves-motion', `translate3d(${progress * -3}vw, ${progress * 2}vh, 0)`);
  }
  function schedule() { if (visible&&!document.hidden&&!frame) frame = requestAnimationFrame(draw); }
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible)schedule();}).observe(hero);
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  reduce.addEventListener('change', schedule);
  draw();
})();
