(() => {
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const elements=[...document.querySelectorAll('.reveal-event')];
  if(!reduce.matches){document.body.classList.add('motion-ready');const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.08});elements.forEach(el=>observer.observe(el));}
  const background=document.querySelector('.expedition-hero-bg');let frame=0;
  function draw(){frame=0;if(reduce.matches)return;const hero=background.parentElement,r=hero.getBoundingClientRect();if(r.bottom>0)background.style.transform=`translate3d(0,${Math.min(hero.clientHeight,-r.top)*.16}px,0) scale(1.06)`;}
  addEventListener('scroll',()=>{if(!frame)frame=requestAnimationFrame(draw);},{passive:true});draw();
})();
