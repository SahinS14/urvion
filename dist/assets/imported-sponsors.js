(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  document.querySelectorAll('.sponsor-marquee').forEach((rail, row) => {
    const track = rail.querySelector('.sponsor-marquee-track');
    rail.tabIndex = 0;
    let dragging = false, hovered = false, focused = false, visible = false, startX = 0, startLeft = 0, resumeAt = 0, previousTime = 0;
    let cycleWidth=0, animationFrame=0;
    const measure=()=>{const cards=track.children;cycleWidth=cards[cards.length/2].offsetLeft-cards[0].offsetLeft;};
    measure();new ResizeObserver(measure).observe(track);
    const cycle = () => cycleWidth;
    function wrap() { const width = cycle(); if (!width) return; if (rail.scrollLeft >= width) rail.scrollLeft -= width; if (rail.scrollLeft <= 0) rail.scrollLeft += width; }
    rail.scrollLeft = cycle() / 2;
    rail.addEventListener('pointerenter', e => { if(e.pointerType==='mouse') hovered=true; });
    rail.addEventListener('pointerleave', () => hovered=false);
    rail.addEventListener('focusin', () => focused=true);
    rail.addEventListener('focusout', () => focused=false);
    rail.addEventListener('pointerdown', e => { if(e.pointerType==='mouse'&&e.button!==0)return;dragging=true;startX=e.clientX;startLeft=rail.scrollLeft;rail.setPointerCapture(e.pointerId); });
    rail.addEventListener('pointermove', e => { if(dragging)rail.scrollLeft=startLeft+startX-e.clientX; });
    const release = () => { dragging=false;resumeAt=performance.now()+1200;wrap(); };
    rail.addEventListener('pointerup',release);
    rail.addEventListener('pointercancel',release);
    rail.addEventListener('keydown', e => { if(e.key==='ArrowLeft'||e.key==='ArrowRight'){e.preventDefault();rail.scrollLeft+=(e.key==='ArrowLeft'?-1:1)*220;resumeAt=performance.now()+1500;wrap();} });
    rail.querySelectorAll('img').forEach(img => img.draggable=false);
    function sync(){const run=visible&&!document.hidden&&!reduce.matches;if(run&&!animationFrame){previousTime=0;animationFrame=requestAnimationFrame(animate);}else if(!run&&animationFrame){cancelAnimationFrame(animationFrame);animationFrame=0;}}
    new IntersectionObserver(entries => {visible=entries[0].isIntersecting;sync();}).observe(rail);
    document.addEventListener('visibilitychange',sync);reduce.addEventListener('change',sync);
    function animate(now) { animationFrame=0;const delta=Math.min(50,now-(previousTime||now));previousTime=now;if(visible&&!document.hidden&&!reduce.matches){if(!dragging&&!hovered&&!focused&&now>resumeAt){rail.scrollLeft+=(row===0?-1:1)*delta*.035;wrap();}animationFrame=requestAnimationFrame(animate);} }
  });
})();
