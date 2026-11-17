(() => {
  const panels=[...document.querySelectorAll('.expedition-entry')];if(!panels.length)return;
  const stage=document.createElement('section');stage.className='event-scroll-stage event-button-stage';stage.setAttribute('aria-label','Event expeditions');stage.setAttribute('aria-roledescription','carousel');
  const viewport=document.createElement('div');viewport.className='event-scroll-viewport';
  const track=document.createElement('div');track.className='event-scroll-track';
  const controls=document.createElement('div');controls.className='event-swap-controls';controls.innerHTML='<button type="button" aria-label="Previous event">← Previous event</button><span aria-live="polite"></span><button type="button" aria-label="Next event">Next event →</button>';
  panels[0].before(stage);panels.forEach(p=>track.append(p));viewport.append(track);stage.append(viewport,controls);
  const [prev,next]=controls.querySelectorAll('button'),status=controls.querySelector('span');let index=0;
  function show(value){index=Math.max(0,Math.min(panels.length-1,value));track.style.setProperty('transform',`translate3d(${-25*index}%,0,0)`,'important');panels.forEach((p,i)=>{p.classList.toggle('is-current',i===index);p.inert=i!==index;p.setAttribute('aria-hidden',String(i!==index));});prev.disabled=index===0;next.disabled=index===panels.length-1;status.textContent=`0${index+1} / 0${panels.length}`;}
  prev.onclick=()=>show(index-1);next.onclick=()=>show(index+1);
  function go(i){show(i);requestAnimationFrame(()=>scrollTo({top:scrollY+stage.getBoundingClientRect().top,behavior:'instant'}));}
  document.querySelectorAll('.event-index a').forEach((link,i)=>link.addEventListener('click',e=>{e.preventDefault();history.replaceState(null,'',link.getAttribute('href'));go(i);}));
  const hashIndex=panels.findIndex(p=>'#'+p.id===location.hash);show(hashIndex<0?0:hashIndex);if(hashIndex>=0){requestAnimationFrame(()=>go(hashIndex));if(document.readyState!=='complete')addEventListener('load',()=>go(hashIndex),{once:true});}
})();
