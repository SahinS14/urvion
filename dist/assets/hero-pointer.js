(() => {
  const hero=document.querySelector('#urvion-main-hero');
  const mobile=matchMedia('(max-width:1023px)');let scene=hero?.querySelector(mobile.matches?'.hv-mobile-arrival':'.hero-voyage-art');
  if(!hero||!scene)return;
  const fine=matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1024px)');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  // Parent containers own pointer motion; child artwork retains its scroll motion.
  let layers=(mobile.matches?[['#hero-background',-5],['.mobile-moon-foreground',9],['.mobile-wave-arrival',14]]:[['.hv-arrival-hv-backdrop',-7],['.hv-arrival-ship',10],['.hv-arrival-hv-captain',19],['.hv-arrival-hv-waves',25]]).map(([selector,depth])=>({el:scene.querySelector(selector),depth})).filter(layer=>layer.el);
  let x=0,y=0,targetX=0,targetY=0,frame=0,visible=true,bounds;
  const allowed=()=>(fine.matches||mobile.matches)&&!reduce.matches&&visible&&!document.hidden;
  const measure=()=>bounds=hero.getBoundingClientRect();
  function reset(){if(frame)cancelAnimationFrame(frame);frame=0;x=y=targetX=targetY=0;scene.style.transform='';scene.style.willChange='';layers.forEach(({el})=>{el.style.transform='';el.style.willChange='';});}
  function draw(){frame=0;if(!allowed()){reset();return;}x+=(targetX-x)*.07;y+=(targetY-y)*.07;if(Math.abs(targetX-x)<.001)x=targetX;if(Math.abs(targetY-y)<.001)y=targetY;
    scene.style.transform=`perspective(1400px) rotateX(${-y*1.2}deg) rotateY(${x*1.5}deg) scale(${1+Math.max(Math.abs(x),Math.abs(y))*.025})`;
    layers.forEach(({el,depth})=>el.style.transform=`translate3d(${(x*depth).toFixed(2)}px,${(y*depth*.65).toFixed(2)}px,0)`);
    if(x!==targetX||y!==targetY)frame=requestAnimationFrame(draw);
    else if(x===0&&y===0){scene.style.willChange='';layers.forEach(({el})=>el.style.willChange='');}
  }
  function schedule(){if(allowed()&&!frame)frame=requestAnimationFrame(draw);}
  hero.addEventListener('pointerenter',()=>{measure();},{passive:true});
  hero.addEventListener('pointermove',event=>{if(!allowed())return;if(!bounds)measure();targetX=Math.max(-1,Math.min(1,(event.clientX-bounds.left)/bounds.width*2-1));targetY=Math.max(-1,Math.min(1,(event.clientY-bounds.top)/bounds.height*2-1));scene.style.willChange='transform';layers.forEach(({el})=>el.style.willChange='transform');schedule();},{passive:true});
  ['pointerleave','pointerup','pointercancel'].forEach(type=>hero.addEventListener(type,()=>{targetX=targetY=0;schedule();},{passive:true}));hero.addEventListener('pointerdown',()=>{measure();},{passive:true});
  addEventListener('scroll',()=>{bounds=null;if(mobile.matches&&visible){const r=hero.getBoundingClientRect(),p=Math.max(0,Math.min(1,-r.top/r.height));targetX=Math.sin(p*Math.PI)*.35;targetY=-p*.6;}else targetX=targetY=0;schedule();},{passive:true});
  addEventListener('resize',()=>{bounds=null;reset();},{passive:true});
  document.addEventListener('visibilitychange',reset);
  fine.addEventListener('change',reset);reduce.addEventListener('change',reset);
  mobile.addEventListener('change',()=>{reset();scene=hero.querySelector(mobile.matches?'.hv-mobile-arrival':'.hero-voyage-art');layers=(mobile.matches?[['#hero-background',-5],['.mobile-moon-foreground',9],['.mobile-wave-arrival',14]]:[['.hv-arrival-hv-backdrop',-7],['.hv-arrival-ship',10],['.hv-arrival-hv-captain',19],['.hv-arrival-hv-waves',25]]).map(([selector,depth])=>({el:scene?.querySelector(selector),depth})).filter(layer=>layer.el);});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(!visible)reset();}).observe(hero);
})();
