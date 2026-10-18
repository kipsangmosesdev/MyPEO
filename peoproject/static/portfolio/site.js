const clock = document.querySelector('.clock');
const greeting = document.querySelector('#time-greeting');
const updateClock = () => {
  const now = new Date();
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Africa/Nairobi',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(now);
  const hour = Number(parts.find((part) => part.type === 'hour').value);
  const time = parts.filter((part) => part.type === 'hour' || part.type === 'minute').map((part) => part.value).join(':');
  const salutation = hour >= 5 && hour < 12 ? 'Good morning,' : hour >= 12 && hour < 18 ? 'Good afternoon,' : 'Good evening,';

  clock.textContent = `NAK ${time}`;
  greeting.textContent = salutation;
};

updateClock();
window.setInterval(updateClock, 30_000);

const typedCode = document.querySelector('.typed-code');
const codeExamples = [
  {
    code: 'projects = ["XbomaSwift", "SakaTalent"]\nfor project in projects:\n    print(f"Building {project}")',
    output: 'Building XbomaSwift\nBuilding SakaTalent',
  },
  {
    code: 'verified = [r.time for r in results if r.verified]\nif verified:\n    average = sum(verified) / len(verified)',
    output: 'Verified results only · average calculated',
  },
];

if (typedCode) {
  const output = document.querySelector('.code-output');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let exampleIndex = 0;

  if (reducedMotion) {
    typedCode.textContent = codeExamples[0].code;
    output.innerHTML = '<span>›</span> Building XbomaSwift<br><span>›</span> Building SakaTalent';
  } else {
    const typeExample = () => {
      const example = codeExamples[exampleIndex];
      let characterIndex = 0;
      typedCode.textContent = '';
      output.textContent = '';

      const typeNextCharacter = () => {
        typedCode.textContent += example.code[characterIndex];
        characterIndex += 1;

        if (characterIndex < example.code.length) {
          window.setTimeout(typeNextCharacter, 45);
          return;
        }

        output.textContent = example.output;
        exampleIndex = (exampleIndex + 1) % codeExamples.length;
        window.setTimeout(typeExample, 2800);
      };

      typeNextCharacter();
    };

    typeExample();
  }
}

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
