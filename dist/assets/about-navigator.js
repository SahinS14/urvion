(() => {
  const old = document.querySelector('#esc-about');
  if (!old || document.querySelector('.urvion-about-stage')) return;
  old.id = 'esc-about-original';
  const stage = document.createElement('section');
  stage.id = 'esc-about';
  stage.className = 'urvion-about-stage';
  stage.innerHTML = `<div class="urvion-about-media"><video muted loop autoplay playsinline preload="auto" poster="assets/images/esc-pirate-cove.webp"><source src="assets/videos/Video-32030.mp4" type="video/mp4"></video><i></i></div><div class="urvion-about-sticky"><article class="urvion-about-panel about-opening"><p class="about-label"><b>CHAPTER 00</b></p><img class="about-opening-logo" src="assets/images/urvion-volume-2-logo.png" alt="URVION Volume 2"></article><article class="urvion-about-panel"><p class="about-label"><b>CHAPTER 01</b> THE CREW BEHIND THE CAUSE</p><img class="about-logo" src="assets/images/eco-social-club-logo-transparent.png" alt="Eco Social Club"><h2>NOT ALL TREASURE<br><em>IS GOLD.</em></h2><div class="about-copy"><p>The Eco-Social Club (ESC) of Silicon University, Odisha is a student-led initiative committed to environmental sustainability, social responsibility and individual well-being.</p><p>Across <strong>Ecology, Social Welfare and Zeal,</strong> students turn ideas into meaningful action through awareness, outreach and community initiatives.</p></div></article><article class="urvion-about-panel"><p class="about-label"><b>CHAPTER 02</b> THE INNOVATION ARENA</p><h2>THE <em>IMPACT</em><br>WE BUILD.</h2><div class="about-metrics"><span><strong>500+</strong><small>REGISTERED MEMBERS</small></span><span><strong>400+</strong><small>URVION PARTICIPANTS</small></span><span><strong>03</strong><small>CORE DOMAINS</small></span></div></article><article class="urvion-about-panel"><p class="about-label"><b>CHAPTER 03</b> THE CALL TO ACTION</p><h2>READY TO<br><em>SET SAIL?</em></h2><blockquote>“Every lasting voyage begins when a community chooses to care.”</blockquote><p class="about-note">URVION 2.0 — The Pirates of Carebian — is our next horizon for innovation, collaboration and collective impact.</p><a href="events.html">EXPLORE THE FOUR EXPEDITIONS ↗</a></article><p class="about-cue">/// SCROLL TO TURN THE CHAPTER ↓</p></div>`;
  old.before(stage);
  const video = stage.querySelector('video');
  video.play().catch(() => {});
  const panels = [...stage.querySelectorAll('.urvion-about-panel')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  function render() { frame = 0; const rect = stage.getBoundingClientRect(); const progress = Math.max(0,Math.min(1,-rect.top / Math.max(1,stage.offsetHeight-innerHeight))) * (panels.length-1); const active = Math.max(0,Math.min(panels.length-1,Math.round(progress))); panels.forEach((panel,index) => { panel.classList.toggle('is-active',index===active); panel.classList.toggle('is-before',index<active); panel.classList.toggle('is-after',index>active); }); }
  function schedule() { if (!frame) frame=requestAnimationFrame(render); }
  new IntersectionObserver(([entry]) => { if(entry.isIntersecting&&!reduced.matches) video.play().catch(()=>{}); else video.pause(); schedule(); },{threshold:.03}).observe(stage);
  function pinBackground() { const rect=stage.getBoundingClientRect(); stage.classList.toggle('about-video-fixed',rect.top<=0&&rect.bottom>=innerHeight); }
  addEventListener('scroll',()=>{schedule();pinBackground()},{passive:true}); addEventListener('resize',()=>{schedule();pinBackground()},{passive:true}); reduced.addEventListener('change',schedule); pinBackground(); render();
})();
