(() => {
  const previous = document.querySelector('#esc-about');
  if (!previous || document.querySelector('.urvion-about-stage')) return;

  previous.id = 'esc-about-original';
  const section = document.createElement('section');
  section.id = 'esc-about';
  section.className = 'urvion-about-stage';
  section.setAttribute('aria-labelledby', 'urvion-about-title');
  section.innerHTML = `
    <div class="urvion-about-backdrop" aria-hidden="true">
      <img src="assets/images/esc-pirate-cove.webp" alt="">
      <span class="about-ember about-ember-one"></span><span class="about-ember about-ember-two"></span><span class="about-ember about-ember-three"></span>
      <span class="about-rigging about-rigging-one"></span><span class="about-rigging about-rigging-two"></span>
    </div>
    <div class="urvion-about-frame" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
    <div class="urvion-about-shell">
      <div class="urvion-about-intro">
        <p><b>CHAPTER 01</b><span>THE CREW BEHIND THE CAUSE</span></p>
        <img src="assets/images/eco-social-club-logo-transparent.png" alt="" aria-hidden="true">
        <h2 id="urvion-about-title">NOT ALL TREASURE<br><em>IS GOLD.</em></h2>
      </div>
      <div class="urvion-about-copy">
        <p>The Eco-Social Club (ESC) of Silicon University, Odisha is a student-led initiative committed to advancing environmental sustainability, social responsibility and individual well-being. Guided by collective action and responsible engagement, ESC turns contemporary challenges into awareness, outreach and impactful initiatives.</p>
        <p>Across <strong>Ecology, Social Welfare and Zeal,</strong> students translate ideas into meaningful action. With 500+ members and URVION’s 400+ participants, the club is building a healthier, more inclusive and sustainable future.</p>
      </div>
      <div class="urvion-about-foot"><span>/// SCROLL TO DISCOVER THE CREW</span><a href="events.html">DISCOVER THE FOUR EXPEDITIONS <b>↗</b></a></div>
    </div>`;
  previous.before(section);
})();
