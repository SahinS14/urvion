(() => {
  const panels=[...document.querySelectorAll('.expedition-entry')];
  if(panels.length!==4)return;
  const stage=document.createElement('div');stage.className='event-scroll-stage';
  const viewport=document.createElement('div');viewport.className='event-scroll-viewport';
  const track=document.createElement('div');track.className='event-scroll-track';
  const status=document.createElement('div');status.className='event-scroll-status';
  status.innerHTML='<span class="event-scroll-label">EXPEDITION 01 / 04</span><div class="event-scroll-progress"><span></span></div><span>SCROLL TO EXPLORE ↓</span>';
  panels[0].before(stage);panels.forEach(panel=>track.append(panel));viewport.append(track,status);stage.append(viewport);
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');let frame=0,previousTravel=-1,previousActive=-1;
  const label=status.querySelector('.event-scroll-label'),progressBar=status.querySelector('.event-scroll-progress span');
  const clamp=x=>Math.max(0,Math.min(1,x));
  function draw(){frame=0;if(reduce.matches){track.style.transform='none';panels.forEach(p=>{p.inert=false;p.classList.add('is-current');});return;}
    const range=Math.max(1,stage.offsetHeight-viewport.offsetHeight),progress=clamp(-stage.getBoundingClientRect().top/range);
    // Each chapter has a reading pause followed by a reversible horizontal transition.
    const step=progress*4,index=Math.min(3,Math.floor(step)),local=step-index;
    const travel=index===3?3:index+clamp((local-.55)/.45);
    if(travel===previousTravel)return;previousTravel=travel;
    track.style.transform=`translate3d(${-travel*25}%,0,0)`;
    const active=Math.round(travel);if(active!==previousActive){previousActive=active;panels.forEach((panel,i)=>{const current=i===active;panel.classList.toggle('is-current',current);panel.inert=!current;});label.textContent=`EXPEDITION 0${active+1} / 04`;}
    progressBar.style.transform=`scaleX(${(travel+1)/4})`;
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(draw);}
  function go(index){const top=scrollY+stage.getBoundingClientRect().top+(stage.offsetHeight-viewport.offsetHeight)*index/4;scrollTo({top,behavior:reduce.matches?'auto':'smooth'});}
  document.querySelectorAll('.event-index a').forEach((link,i)=>link.addEventListener('click',event=>{if(reduce.matches)return;event.preventDefault();history.replaceState(null,'',link.getAttribute('href'));go(i);}));
  addEventListener('scroll',schedule,{passive:true});addEventListener('resize',()=>{previousTravel=-1;schedule();},{passive:true});reduce.addEventListener('change',()=>{previousTravel=-1;schedule();});draw();
  const hashIndex=panels.findIndex(panel=>'#'+panel.id===location.hash);if(hashIndex>=0&&!reduce.matches)requestAnimationFrame(()=>go(hashIndex));
})();
