const clock = document.querySelector('.clock');
const updateClock = () => {
  clock.textContent = `NAK ${new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Nairobi',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date())}`;
};

updateClock();
window.setInterval(updateClock, 30_000);

document.querySelector('.menu-button').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const dockLinks = [...document.querySelectorAll('.dock a[href^="#"]')];
const sections = dockLinks
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

const observer = new IntersectionObserver((entries) => {
  const visible = entries
    .filter((entry) => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
  if (!visible) return;

  dockLinks.forEach((link) => {
    const isCurrent = link.getAttribute('href') === `#${visible.target.id}`;
    link.classList.toggle('active', isCurrent);
    if (isCurrent) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  });
}, { rootMargin: '-20% 0px -60% 0px', threshold: [0, 0.15, 0.4] });

sections.forEach((section) => observer.observe(section));
