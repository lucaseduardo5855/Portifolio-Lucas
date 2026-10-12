const header = document.querySelector('.site-header');
const menuToggle = document.querySelector('.menu-toggle');
const languageToggle = document.querySelector('#language-toggle');
const themeToggle = document.querySelector('#theme-toggle');
const projectSection = document.querySelector('.projects-list');

const orderedSections = ['sobre', 'stack', 'trajetoria', 'projetos', 'contato'];
const mainContent = document.querySelector('.site-main');
orderedSections.forEach((sectionId) => {
  const section = document.getElementById(sectionId);
  if (mainContent && section) mainContent.append(section);
});

menuToggle?.addEventListener('click', () => {
  const isOpen = header.classList.toggle('nav-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute(
    'aria-label',
    content[currentLanguage][isOpen ? 'menuClose' : 'menuOpen'],
  );
});

document.querySelectorAll('.nav a').forEach((link) => {
  link.addEventListener('click', () => {
    header.classList.remove('nav-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', content[currentLanguage].menuOpen);
  });
});

const contactForm = document.querySelector('#contact-form');
const contactFormStatus = document.querySelector('#contact-form-status');

contactForm?.querySelectorAll('input, textarea').forEach((field) => {
  field.addEventListener('input', () => field.setCustomValidity(''));
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!(form instanceof HTMLFormElement)) return;

  const formData = new FormData(form);
  const nameField = form.elements.namedItem('name');
  const emailField = form.elements.namedItem('email');
  const messageField = form.elements.namedItem('message');
  const name = String(formData.get('name') ?? '').trim();
  const email = String(formData.get('email') ?? '').trim();
  const message = String(formData.get('message') ?? '').trim();

  if (!name || !email || !message) {
    const field = !name ? nameField : !email ? emailField : messageField;
    if (
      field instanceof HTMLInputElement ||
      field instanceof HTMLTextAreaElement
    ) {
      field.setCustomValidity(content[currentLanguage].validationRequired);
    }
    form.reportValidity();
    return;
  }

  if (name.length < 2) {
    nameField.setCustomValidity(content[currentLanguage].validationNameLength);
    form.reportValidity();
    return;
  }

  if (message.length < 10) {
    messageField.setCustomValidity(
      content[currentLanguage].validationMessageLength,
    );
    form.reportValidity();
    return;
  }

  const copy = content[currentLanguage];
  const subject = copy.formSubject(name);
  const body = copy.formBody(name, email, message);
  const gmailUrl = new URL('https://mail.google.com/mail/');
  gmailUrl.searchParams.set('view', 'cm');
  gmailUrl.searchParams.set('fs', '1');
  gmailUrl.searchParams.set('to', 'lucas.eduardo5855@gmail.com');
  gmailUrl.searchParams.set('su', subject);
  gmailUrl.searchParams.set('body', body);

  const gmailLink = document.createElement('a');
  gmailLink.href = gmailUrl.toString();
  gmailLink.target = '_blank';
  gmailLink.rel = 'noopener noreferrer';
  gmailLink.click();

  if (contactFormStatus) {
    contactFormStatus.textContent =
      content[currentLanguage].formStatus;
  }
});

const content = {
  pt: {
    navigation: 'Navegação principal',
    menuOpen: 'Abrir menu',
    menuClose: 'Fechar menu',
    pageTitle: 'Lucas Eduardo | Desenvolvedor Full Stack',
    metaDescription: 'Portfólio de Lucas Eduardo, Desenvolvedor Full Stack com experiência em PHP, JavaScript, Node.js, TypeScript e PostgreSQL.',
    nav: ['Sobre', 'Stack', 'Projetos', 'Trajetória', 'Contato'],
    heroTechnologies: 'PHP · JavaScript · Node.js · TypeScript · PostgreSQL',
    heroRole: 'Desenvolvedor Full Stack',
    heroSummary: 'Desenvolvedor Full Stack focado no desenvolvimento e evolução de sistemas web, APIs REST e integrações.',
    projects: 'Projetos',
    about: 'Sobre',
    stack: 'Stack',
    trajectory: 'Trajetória',
    contact: 'Contato',
    languages: 'Idiomas',
    nativeLanguage: 'Nativo',
    studyingLanguage: 'Em estudo',
    directEmailSubject: 'Contato pelo portfólio',
    emailLinkLabel: 'E-mail',
    formSubject: (name) => `Contato pelo portfólio — ${name}`,
    formBody: (name, email, message) =>
      `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    formTitle: 'Envie uma mensagem',
    formHelp: 'O Gmail será aberto com a mensagem pronta. Revise e clique em Enviar.',
    formStatus: 'O Gmail foi aberto. Revise a mensagem e clique em Enviar.',
    validationRequired: 'Preencha este campo antes de continuar.',
    themeLabels: {
      light: 'Ativar modo claro',
      dark: 'Ativar modo escuro',
    },
    name: 'Nome',
    email: 'E-mail',
    message: 'Mensagem',
    sendEmail: 'Enviar mensagem',
    validationNameLength: 'Informe pelo menos 2 caracteres.',
    validationMessageLength: 'A mensagem deve ter pelo menos 10 caracteres.',
    viewProjects: 'Ver projetos',
    backTop: 'Voltar ao topo',
    moreProjects: 'Mais projetos',
    code: 'Ver código',
    site: 'Site',
    aboutText: [
      'Sou Desenvolvedor Full Stack Júnior e formado em Engenharia de Software, atuando com PHP, Node.js, TypeScript e PostgreSQL.',
      'Trabalho no desenvolvimento e evolução de sistemas web, APIs REST, integrações e bancos de dados relacionais.',
      'Também desenvolvo interfaces com React e Next.js, buscando criar experiências responsivas e intuitivas, com atenção à usabilidade e às boas práticas de desenvolvimento.',
    ],
    projectData: [
      {
        status: 'Projeto profissional',
        title: 'Z4 Assessoria — Plataforma de gestão esportiva',
        tags: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'SQLite'],
        text: 'Sistema de gestão esportiva para alunos, treinos, avaliações físicas e pagamentos.',
        bullets: [
          'Frontend React.',
          'Backend Node.js/Express.',
          'Autenticação JWT.',
          'Prisma e banco relacional.',
          'Dashboards e relatórios.',
        ],
        url: 'https://github.com/lucaseduardo5855/Plataforma-Web-Assessoria',
        siteUrl: 'https://z4performance.com.br/',
      },
      {
        status: 'API',
        title: 'API REST Node — Gestão de alunos',
        tags: ['Node.js', 'Express', 'MariaDB', 'Sequelize', 'JWT', 'Multer'],
        text: 'API REST para gerenciamento de alunos e usuários com autenticação e upload de fotos.',
        bullets: [
          'Autenticação JWT.',
          'Hash de senha com Bcrypt.',
          'Cadastro, consulta, atualização e gerenciamento de alunos.',
          'Upload de arquivos com Multer.',
          'Persistência com Sequelize.',
        ],
        url: 'https://github.com/lucaseduardo5855/API-Rest-Node',
      },
      {
        title: 'Barber-M — Sistema de agendamentos para barbearias',
        note: 'Em desenvolvimento',
        tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'Stripe'],
        text: 'Plataforma de agendamentos com autenticação, controle de disponibilidade, pagamentos online e gerenciamento de serviços.',
        bullets: [
          'Autenticação de usuários.',
          'Agendamento com bloqueio de horários já reservados.',
          'PostgreSQL com Prisma.',
          'Pagamentos com Stripe e webhooks.',
        ],
        url: 'https://github.com/lucaseduardo5855',
        linkLabel: 'Perfil no GitHub',
      },
    ],
    careerData: [
      [
        'ago 2026 — atual',
        'Desenvolvedor Backend Júnior',
        'MadaTech',
        [
          'Desenvolvimento e evolução de sistemas web utilizando PHP/CodeIgniter e Node.js/TypeScript.',
          'APIs REST, integrações, PostgreSQL e versionamento com Git/Bitbucket.',
          'Atuação em ambientes Linux, CI/CD e infraestrutura AWS.',
        ],
      ],
      [
        'abr 2024 — ago 2026',
        'Analista de TI',
        'Ambev S.A.',
        [
          'Desenvolvimento de soluções internas e automações com Microsoft Power Platform.',
          'Integrações com APIs REST e internacionalização de aplicações.',
          'Suporte e administração de infraestrutura, ativos e usuários utilizando Azure.',
        ],
      ],
      [
        'ago 2022 — mar 2024',
        'Estagiário de TI',
        'Prefeitura Municipal de Jaguariaíva',
        [
          'Suporte técnico e infraestrutura de redes e sistemas.',
          'Desenvolvimento de ferramentas internas de controle e automação.',
        ],
      ],
      [
        '2021 — 2025',
        'Engenharia de Software',
        'Unicesumar',
        ['Bacharelado em Engenharia de Software.'],
      ],
    ],
    githubData: [
      [
        'ConsumoAPI-React',
        'Template React estruturado com Redux, Sagas, Persist, Router e Styled Components, incluindo Axios, notificações, rotas privadas e feedback de erros.',
        'https://github.com/lucaseduardo5855/ConsumoAPI-React',
        ['React', 'Redux', 'Redux Saga', 'React Router', 'Axios'],
      ],
      [
        'Project_AgendaAut',
        'Projeto inicial de agenda criado com Next.js e TypeScript, estruturado para desenvolvimento com App Router.',
        'https://github.com/lucaseduardo5855/Project_AgendaAut',
        ['Next.js', 'TypeScript'],
      ],
      [
        'controle_estoque',
        'Projeto acadêmico para controle de produtos, quantidades, preços e níveis críticos de estoque.',
        'https://github.com/lucaseduardo5855/controle_estoque',
        ['Laravel', 'PHP', 'SQLite', 'Bootstrap', 'Vite'],
      ],
      [
        'ABarateira',
        'Sistema completo de gestão para farmácias, com medicamentos, vendas, fornecedores, promoções, relatórios e estoque por filial.',
        'https://github.com/lucaseduardo5855/ABarateira',
        ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vite'],
      ],
    ],
  },
  en: {
    navigation: 'Main navigation',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    pageTitle: 'Lucas Eduardo | Full Stack Developer',
    metaDescription: 'Portfolio of Lucas Eduardo, a Full Stack Developer with experience in PHP, JavaScript, Node.js, TypeScript and PostgreSQL.',
    nav: ['About', 'Stack', 'Projects', 'Career', 'Contact'],
    heroTechnologies: 'PHP · JavaScript · Node.js · TypeScript · PostgreSQL',
    heroRole: 'Full Stack Developer',
    heroSummary: 'Full Stack developer focused on building and evolving web systems, REST APIs and integrations.',
    projects: 'Projects',
    about: 'About',
    stack: 'Stack',
    trajectory: 'Career',
    contact: 'Contact',
    languages: 'Languages',
    nativeLanguage: 'Native',
    studyingLanguage: 'In progress',
    directEmailSubject: 'Portfolio contact',
    emailLinkLabel: 'Email',
    formSubject: (name) => `Portfolio contact — ${name}`,
    formBody: (name, email, message) =>
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    formTitle: 'Send a message',
    formHelp: 'Gmail opens with your message ready. Review it and click Send.',
    formStatus: 'Gmail has opened. Review your message and click Send.',
    validationRequired: 'Please complete this field before continuing.',
    themeLabels: {
      light: 'Enable light theme',
      dark: 'Enable dark theme',
    },
    name: 'Name',
    email: 'Email',
    message: 'Message',
    sendEmail: 'Send message',
    validationNameLength: 'Please enter at least 2 characters.',
    validationMessageLength: 'The message must contain at least 10 characters.',
    viewProjects: 'View projects',
    backTop: 'Back to top',
    moreProjects: 'More projects',
    code: 'View code',
    site: 'Website',
    aboutText: [
      'I am a Junior Full Stack Developer and a Software Engineering graduate, working with PHP, Node.js, TypeScript and PostgreSQL.',
      'I work on developing and evolving web systems, REST APIs, integrations and relational databases.',
      'I also build interfaces with React and Next.js, focusing on responsive, intuitive experiences, usability and development best practices.',
    ],
    projectData: [
      {
        status: 'Professional project',
        title: 'Z4 Assessoria — Sports management platform',
        tags: ['React', 'TypeScript', 'Node.js', 'Express', 'Prisma', 'SQLite'],
        text: 'A sports management system for students, training plans, physical assessments and payments.',
        bullets: [
          'React frontend.',
          'Node.js/Express backend.',
          'JWT authentication.',
          'Prisma and relational database.',
          'Dashboards and reports.',
        ],
        url: 'https://github.com/lucaseduardo5855/Plataforma-Web-Assessoria',
        siteUrl: 'https://z4performance.com.br/',
      },
      {
        status: 'API',
        title: 'Node REST API — Student management',
        tags: ['Node.js', 'Express', 'MariaDB', 'Sequelize', 'JWT', 'Multer'],
        text: 'A REST API for managing students and users with authentication and photo uploads.',
        bullets: [
          'JWT authentication.',
          'Password hashing with Bcrypt.',
          'Student registration, lookup, updates and management.',
          'File uploads with Multer.',
          'Persistence with Sequelize.',
        ],
        url: 'https://github.com/lucaseduardo5855/API-Rest-Node',
      },
      {
        title: 'Barber-M — Barbershop scheduling system',
        note: 'In development',
        tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'NextAuth', 'Stripe'],
        text: 'An appointment platform with authentication, availability control, online payments and service management.',
        bullets: [
          'User authentication.',
          'Appointments prevent already-booked time slots.',
          'PostgreSQL with Prisma.',
          'Stripe payments and webhooks.',
        ],
        url: 'https://github.com/lucaseduardo5855',
        linkLabel: 'GitHub profile',
      },
    ],
    careerData: [
      [
        'Aug 2026 — present',
        'Junior Backend Developer',
        'MadaTech',
        [
          'Development and evolution of web systems using PHP/CodeIgniter and Node.js/TypeScript.',
          'REST APIs, integrations, PostgreSQL and version control with Git/Bitbucket.',
          'Work in Linux environments, CI/CD and AWS infrastructure.',
        ],
      ],
      [
        'Apr 2024 — Aug 2026',
        'IT Analyst',
        'Ambev S.A.',
        [
          'Development of internal solutions and automations with Microsoft Power Platform.',
          'REST API integrations and application internationalization.',
          'Infrastructure, asset and user support and administration with Azure.',
        ],
      ],
      [
        'Aug 2022 — Mar 2024',
        'IT Intern',
        'Jaguariaíva City Hall',
        [
          'Technical support and network and systems infrastructure.',
          'Development of internal control and automation tools.',
        ],
      ],
      [
        '2021 — 2025',
        'Software Engineering',
        'Unicesumar',
        ['Bachelor’s degree in Software Engineering.'],
      ],
    ],
    githubData: [
      [
        'ConsumoAPI-React',
        'A React template structured with Redux, Sagas, Persist, Router and Styled Components, including Axios, notifications, private routes and error feedback.',
        'https://github.com/lucaseduardo5855/ConsumoAPI-React',
        ['React', 'Redux', 'Redux Saga', 'React Router', 'Axios'],
      ],
      [
        'Project_AgendaAut',
        'A starter agenda project built with Next.js and TypeScript, structured for development with the App Router.',
        'https://github.com/lucaseduardo5855/Project_AgendaAut',
        ['Next.js', 'TypeScript'],
      ],
      [
        'controle_estoque',
        'An academic project for tracking products, quantities, prices and critical stock levels.',
        'https://github.com/lucaseduardo5855/controle_estoque',
        ['Laravel', 'PHP', 'SQLite', 'Bootstrap', 'Vite'],
      ],
      [
        'ABarateira',
        'A complete pharmacy management system covering medicines, sales, suppliers, promotions, reports and branch inventory.',
        'https://github.com/lucaseduardo5855/ABarateira',
        ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL', 'Vite'],
      ],
    ],
  },
};

let currentLanguage = 'pt';

function renderTags(tags) {
  return tags.map((tag) => `<span>${tag}</span>`).join('');
}

function renderProjects(language) {
  if (!projectSection) return;
  const copy = content[language];
  const featuredProjects = copy.projectData
    .map((project) => {
      const status = project.status
        ? `<span class="status">${project.status}</span>`
        : '';
      const websiteLink = project.siteUrl
        ? `<a href="${project.siteUrl}" target="_blank" rel="noopener noreferrer">${copy.site} ↗</a>`
        : '';
      const developmentNote = project.note
        ? `<span class="project-note">${project.note}</span>`
        : '';

      return `
        <article class="project-card">
          <div class="project-title">
            ${status}
            <h3>${project.title}</h3>
            <div class="tags">${renderTags(project.tags)}</div>
          </div>
          <div class="project-description">
            <p>${project.text}</p>
            <ul>${project.bullets.map((bullet) => `<li>${bullet}</li>`).join('')}</ul>
            <a href="${project.url}" target="_blank" rel="noopener noreferrer">${project.linkLabel || copy.code} ↗</a>
            ${websiteLink}
            ${developmentNote}
          </div>
        </article>
      `;
    })
    .join('');

  const otherProjects = copy.githubData
    .map(
      ([title, text, url, tags]) => `
        <article class="github-row">
          <div>
            <h3>${title}</h3>
            <div class="tags">${renderTags(tags)}</div>
          </div>
          <div>
            <p>${text}</p>
            <a href="${url}" target="_blank" rel="noopener noreferrer">${copy.code} ↗</a>
          </div>
        </article>
      `,
    )
    .join('');

  projectSection.innerHTML = `
    <div class="featured-grid">${featuredProjects}</div>
    <div class="github-list">
      <div class="github-heading"><strong>${copy.moreProjects}</strong></div>
      ${otherProjects}
    </div>
  `;

  document.querySelectorAll('.project-card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
    card.addEventListener('pointerleave', () => {
      card.style.removeProperty('--mx');
      card.style.removeProperty('--my');
    });
  });
}

const stackCopy = {
  pt: [
    ['Linguagens', ['PHP', 'JavaScript', 'TypeScript', 'SQL']],
    ['Backend', ['CodeIgniter', 'Node.js']],
    ['Dados / ORM', ['PostgreSQL', 'MySQL', 'Prisma']],
    ['Frontend', ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS']],
    ['Ferramentas', ['Git', 'GitHub', 'Bitbucket', 'CI/CD']],
    ['IA', ['IA Generativa', 'LLMs', 'Coding Agents']],
    ['Estudando', ['Linux', 'Docker', 'AWS']],
  ],
  en: [
    ['Languages', ['PHP', 'JavaScript', 'TypeScript', 'SQL']],
    ['Backend', ['CodeIgniter', 'Node.js']],
    ['Data / ORM', ['PostgreSQL', 'MySQL', 'Prisma']],
    ['Frontend', ['React', 'Next.js', 'HTML', 'CSS', 'Tailwind CSS']],
    ['Tools', ['Git', 'GitHub', 'Bitbucket', 'CI/CD']],
    ['AI', ['Generative AI', 'LLMs', 'Coding Agents']],
    ['Learning', ['Linux', 'Docker', 'AWS']],
  ],
};

const stackIcons = {
  PHP: 'php/php-original.svg',
  JavaScript: 'javascript/javascript-original.svg',
  TypeScript: 'typescript/typescript-original.svg',
  'Node.js': 'nodejs/nodejs-original.svg',
  CodeIgniter: 'codeigniter/codeigniter-plain.svg',
  PostgreSQL: 'postgresql/postgresql-original.svg',
  MySQL: 'mysql/mysql-original.svg',
  Prisma: 'prisma/prisma-original.svg',
  React: 'react/react-original.svg',
  'Next.js': 'nextjs/nextjs-original.svg',
  HTML: 'html5/html5-original.svg',
  CSS: 'css3/css3-original.svg',
  'Tailwind CSS': 'tailwindcss/tailwindcss-original.svg',
  Git: 'git/git-original.svg',
  GitHub: 'github/github-original.svg',
  Bitbucket: 'bitbucket/bitbucket-original.svg',
  Linux: 'linux/linux-original.svg',
  Docker: 'docker/docker-original.svg',
  AWS: 'amazonwebservices/amazonwebservices-original-wordmark.svg',
};

function stackIcon(item) {
  if (item === 'SQL') {
    return `
      <svg class="stack-icon sql-icon" viewBox="0 0 16 16" aria-hidden="true">
        <ellipse cx="8" cy="3.5" rx="5.5" ry="2" />
        <path d="M2.5 3.5v4c0 1.1 2.5 2 5.5 2 .8 0 1.5-.1 2.2-.2M13.5 3.5v4M2.5 7.5v4c0 1.1 2.5 2 5.5 2 .8 0 1.5-.1 2.2-.2M13.5 7.5v4" />
      </svg>
    `;
  }

  const icon = stackIcons[item];
  if (!icon) {
    return `<span class="stack-icon-fallback" aria-hidden="true">${item.slice(0, 2).toUpperCase()}</span>`;
  }

  return `<img class="stack-icon" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${icon}" alt="" aria-hidden="true" loading="lazy">`;
}

function renderStack(language) {
  const stackList = document.querySelector('#stack .stack-list');
  if (!stackList) return;
  stackList.innerHTML = stackCopy[language]
    .map(
      ([label, items]) => `
        <div class="stack-row">
          <span class="mono stack-label">${label}</span>
          <div class="stack-items">
            ${items.map((item) => `<span class="stack-item">${stackIcon(item)}${item}</span>`).join('')}
          </div>
        </div>
      `,
    )
    .join('');
}

function renderCareer(language) {
  const careerList = document.querySelector('.career-list');
  if (!careerList) return;
  careerList.innerHTML = content[language].careerData
    .map(([date, role, company, description]) => {
      const points = Array.isArray(description) ? description : [description];
      return `
        <article class="career-item">
          <span class="career-date mono">${date}</span>
          <div>
            <h3>${role}</h3>
            <strong>${company}</strong>
            <ul class="career-bullets">
              ${points.map((point) => `<li>${point}</li>`).join('')}
            </ul>
          </div>
        </article>
      `;
    })
    .join('');
}

function setLanguage(language) {
  currentLanguage = language;
  const copy = content[language];
  document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  document.title = copy.pageTitle;
  document.querySelector('meta[name="description"]').content =
    copy.metaDescription;
  document.querySelectorAll('.nav a').forEach((link, index) => { link.textContent = copy.nav[index]; });
  document.querySelector('.nav').setAttribute('aria-label', copy.navigation);
  document.querySelector('.hero-technologies').textContent = copy.heroTechnologies;
  document.querySelector('.hero-role').textContent = copy.heroRole;
  document.querySelector('.hero-summary').textContent = copy.heroSummary;
  document.querySelector('.button.light').textContent = copy.viewProjects;
  document.querySelector('#projetos h2').textContent = copy.projects;
  document.querySelector('#sobre h2').textContent = copy.about;
  document.querySelector('#stack h2').textContent = copy.stack;
  document.querySelector('#trajetoria h2').textContent = copy.trajectory;
  document.querySelector('#contato h2').textContent = copy.contact;
  document.querySelector('.table-label').textContent = copy.languages;
  const languageRows = document.querySelectorAll('.data-table .table-row');
  if (languageRows.length >= 2) {
    languageRows[0].querySelector('strong').textContent =
      language === 'pt' ? 'Português' : 'Portuguese';
    languageRows[0].querySelector('span').textContent = copy.nativeLanguage;
    languageRows[1].querySelector('strong').textContent =
      language === 'pt' ? 'Inglês' : 'English';
    languageRows[1].querySelector('span').textContent = copy.studyingLanguage;
  }
  const emailLink = document.querySelector('.email-link');
  if (emailLink) {
    const emailUrl = new URL(emailLink.href);
    emailUrl.searchParams.set('su', copy.directEmailSubject);
    emailLink.href = emailUrl.toString();
    emailLink.querySelector('.email-link-text').textContent =
      copy.emailLinkLabel;
  }
  document.querySelectorAll('#sobre .section-body > p').forEach((paragraph, index) => { paragraph.textContent = copy.aboutText[index]; });
  document.querySelector('.site-footer a').textContent = copy.backTop;
  document.querySelector('#contact-form-title').textContent = copy.formTitle;
  document.querySelector('#contact-form-help').textContent = copy.formHelp;
  document.querySelector('label[for="contact-name"]').textContent = copy.name;
  document.querySelector('label[for="contact-email"]').textContent = copy.email;
  document.querySelector('label[for="contact-message"]').textContent = copy.message;
  document.querySelector('#contact-submit').textContent = copy.sendEmail;
  if (contactFormStatus) contactFormStatus.textContent = '';
  contactForm?.querySelectorAll('input, textarea').forEach((field) => {
    field.setCustomValidity('');
  });
  themeToggle.setAttribute(
    'aria-label',
    document.body.classList.contains('light-theme')
      ? copy.themeLabels.dark
      : copy.themeLabels.light,
  );
  languageToggle.textContent = language === 'pt' ? 'EN' : 'PT';
  languageToggle.setAttribute('aria-label', language === 'pt' ? 'Mudar para inglês' : 'Switch to Portuguese');
  menuToggle?.setAttribute(
    'aria-label',
    copy[header.classList.contains('nav-open') ? 'menuClose' : 'menuOpen'],
  );
  renderStack(language);
  renderCareer(language);
  renderProjects(language);
}

languageToggle?.addEventListener('click', () => setLanguage(currentLanguage === 'pt' ? 'en' : 'pt'));

themeToggle?.addEventListener('click', () => {
  const isLight = document.body.classList.toggle('light-theme');
  themeToggle.innerHTML = isLight
    ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.9 13.1A8.5 8.5 0 0 1 10.9 3.1 8.5 8.5 0 1 0 20.9 13.1Z" /></svg>'
    : '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></svg>';
  themeToggle.setAttribute(
    'aria-label',
    isLight
      ? content[currentLanguage].themeLabels.dark
      : content[currentLanguage].themeLabels.light,
  );
});

setLanguage(currentLanguage);
