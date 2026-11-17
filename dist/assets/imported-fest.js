(() => {
  const section = document.querySelector('#events');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  fetch('assets/imported-fest/events.json').then(r => r.json()).then(events => {
    let index = 0, paused = false, visible = false, start;
    const dots = [...section.querySelectorAll('.events-indicator')];
    function show(next) {
      index = (next + events.length) % events.length;
      const event = events[index];
      section.querySelector('.events-bg-container > div').style.backgroundImage = `url('${event.bgImage.replace('/assets/', 'assets/imported-fest/')}')`;
      section.querySelector('.events-big-title').textContent = event.name;
      section.querySelector('.circle-category-title').textContent = event.category;
      section.querySelector('.circle-description-text').textContent = event.description;
      section.querySelector('.circle-action-link').href = `events.html#${event.id}`;
      section.querySelector('.circle-action-btn').href = event.registrationUrl;
      section.querySelector('.circle-action-btn').style.background = event.color;
      dots.forEach((dot, i) => { dot.classList.toggle('active', i === index); dot.setAttribute('aria-current', String(i === index)); dot.style.background = i === index ? event.color : ''; dot.style.width = i === index ? '36px' : ''; });
      if (!reduce.matches) section.querySelectorAll('.events-big-title,.events-circle-content').forEach(el => el.animate([{opacity:0,transform:'translateX(24px)'},{opacity:1,transform:'translateX(0)'}],{duration:280,easing:'cubic-bezier(.23,1,.32,1)'}));
    }
    section.querySelector('.events-nav-prev').onclick = () => show(index - 1);
    section.querySelector('.events-nav-next').onclick = () => show(index + 1);
    dots.forEach((dot,i) => dot.onclick = () => show(i));
    section.addEventListener('pointerenter', () => paused = true);
    section.addEventListener('pointerleave', () => paused = false);
    section.addEventListener('focusin', () => paused = true);
    section.addEventListener('focusout', () => paused = false);
    section.addEventListener('touchstart', e => start = {x:e.touches[0].clientX,y:e.touches[0].clientY},{passive:true});
    section.addEventListener('touchend', e => { if(!start)return; const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))show(index+(dx<0?1:-1));start=null; },{passive:true});
    new IntersectionObserver(entries => visible = entries[0].isIntersecting).observe(section);
    setInterval(() => {if(visible&&!paused&&!document.hidden&&!reduce.matches)show(index+1);},5000);
    show(0);
  }).catch(console.error);
  const number = document.querySelector('.prizepool-number');
  const observer = new IntersectionObserver(entries => { if(!entries[0].isIntersecting)return;observer.disconnect();if(reduce.matches)return;const start=performance.now();function tick(now){const p=Math.min(1,(now-start)/1800);number.textContent=Math.round(50000*(1-Math.pow(1-p,3))).toLocaleString('en-IN');if(p<1)requestAnimationFrame(tick);}requestAnimationFrame(tick); });
  observer.observe(number);
})();
