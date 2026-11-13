(()=>{
const section=document.getElementById('esc-about');if(!section)return;
const sea=section.querySelector('.esc-sea'),compass=section.querySelector('.esc-compass');
const reduce=matchMedia('(prefers-reduced-motion:reduce)');let frame=0,visible=false;
function draw(){frame=0;if(reduce.matches||!visible||document.hidden)return;const rect=section.getBoundingClientRect();const p=Math.max(-1,Math.min(1,(innerHeight/2-rect.top)/(innerHeight+rect.height)));sea.style.transform=`translate3d(0,${p*45}px,0)`;compass.style.transform=`translate3d(0,${-p*24}px,0) rotate(${p*8}deg)`}
function schedule(){if(!frame&&visible&&!reduce.matches)frame=requestAnimationFrame(draw)}
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;schedule()},{rootMargin:'100px'}).observe(section);
addEventListener('scroll',schedule,{passive:true});addEventListener('resize',schedule,{passive:true});reduce.addEventListener('change',()=>{sea.style.transform='';compass.style.transform='';schedule()});document.addEventListener('visibilitychange',schedule);
})();
