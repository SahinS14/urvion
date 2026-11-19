(() => {
  const panels=[...document.querySelectorAll('.expedition-entry')];if(!panels.length)return;
  const stage=document.createElement('section');stage.className='event-scroll-stage event-button-stage';stage.setAttribute('aria-label','Event expeditions');stage.setAttribute('aria-roledescription','carousel');
  const viewport=document.createElement('div');viewport.className='event-scroll-viewport';
  const track=document.createElement('div');track.className='event-scroll-track';
  const controls=document.createElement('div');controls.className='event-swap-controls';controls.innerHTML='<button type="button" aria-label="Previous event">← Previous</button><div class="event-swap-position"><span aria-live="polite"></span><small>SWIPE TO EXPLORE</small></div><button type="button" aria-label="Next event">Next →</button>';
  panels[0].before(stage);panels.forEach(p=>track.append(p));viewport.append(track);stage.append(viewport,controls);
  const [prev,next]=controls.querySelectorAll('button'),status=controls.querySelector('span');let index=0;
  function show(value){index=Math.max(0,Math.min(panels.length-1,value));track.style.setProperty('transform',`translate3d(${-25*index}%,0,0)`,'important');panels.forEach((p,i)=>{p.classList.toggle('is-current',i===index);p.inert=i!==index;p.setAttribute('aria-hidden',String(i!==index));});prev.disabled=index===0;next.disabled=index===panels.length-1;status.textContent=`0${index+1} / 0${panels.length}`;}
  function select(value){show(value);history.replaceState(null,'','#'+panels[index].id);document.querySelectorAll('.event-index a').forEach((link,i)=>{if(i===index)link.setAttribute('aria-current','true');else link.removeAttribute('aria-current')});}
  prev.onclick=()=>go(index-1);next.onclick=()=>go(index+1);
  let gesture=null,suppressClick=false;
  stage.addEventListener('pointerdown',event=>{suppressClick=false;if(!event.isPrimary||event.button!==0||event.target.closest('.event-actions,button'))return;gesture={id:event.pointerId,x:event.clientX,y:event.clientY};},{passive:true});
  stage.addEventListener('pointerup',event=>{if(!gesture||event.pointerId!==gesture.id)return;const dx=event.clientX-gesture.x,dy=event.clientY-gesture.y;gesture=null;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy)*1.3){suppressClick=true;go(index+(dx<0?1:-1))}},{passive:true});
  stage.addEventListener('click',event=>{if(suppressClick){event.preventDefault();event.stopPropagation();suppressClick=false}},true);
  stage.addEventListener('dragstart',event=>event.preventDefault());
  stage.addEventListener('pointercancel',()=>{gesture=null},{passive:true});
  stage.addEventListener('keydown',event=>{if(event.altKey||event.ctrlKey||event.metaKey||event.shiftKey)return;if(event.key==='ArrowRight'||event.key==='ArrowLeft'){event.preventDefault();go(index+(event.key==='ArrowRight'?1:-1))}});
  function syncHeader(){const rect=stage.getBoundingClientRect();document.body.classList.toggle('event-card-view',rect.top<=24&&rect.bottom>=innerHeight-24);}
  let scrollFrame=0;
  addEventListener('scroll',()=>{if(!scrollFrame)scrollFrame=requestAnimationFrame(()=>{scrollFrame=0;syncHeader()})},{passive:true});
  addEventListener('resize',syncHeader,{passive:true});
  function go(i){select(i);requestAnimationFrame(()=>{scrollTo({top:scrollY+stage.getBoundingClientRect().top,behavior:'instant'});syncHeader()});}
  document.querySelectorAll('.event-index a').forEach((link,i)=>link.addEventListener('click',e=>{e.preventDefault();history.replaceState(null,'',link.getAttribute('href'));go(i);}));
  const hashIndex=panels.findIndex(p=>'#'+p.id===location.hash);show(hashIndex<0?0:hashIndex);if(hashIndex>=0){requestAnimationFrame(()=>go(hashIndex));if(document.readyState!=='complete')addEventListener('load',()=>go(hashIndex),{once:true});}
  syncHeader();
})();
