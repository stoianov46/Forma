import type { Locale } from '../lib/i18n';

export interface Dictionary {
  nav: {
    services: string;
    projects: string;
    about: string;
    process: string;
    locations: string;
    journal: string;
    contact: string;
    startProject: string;
    contactShort: string;
    menu: string;
    close: string;
    allServices: string;
    allLocations: string;
    viewAllServices: string;
    viewAllLocations: string;
  };
  footer: {
    tagline: string;
    servicesHeading: string;
    locationsHeading: string;
    companyHeading: string;
    contactHeading: string;
    legalHeading: string;
    privacy: string;
    terms: string;
    cookies: string;
    accessibility: string;
    editorialPolicy: string;
    rights: string;
  };
  common: {
    readMore: string;
    viewProject: string;
    viewService: string;
    minRead: string;
    faqHeading: string;
    relatedServices: string;
    relatedProjects: string;
    relatedLocations: string;
    relatedReading: string;
    breadcrumbHome: string;
    skipToContent: string;
    languageLabel: string;
    processHeading: string;
    localContext: string;
    islandsHeading: string;
    specialistServices: string;
    previousProject: string;
    nextProject: string;
    goToSlide: string;
    pauseSlideshow: string;
    playSlideshow: string;
    breadcrumbLabel: string;
    primaryNavLabel: string;
    mobileNavLabel: string;
  };
  cta: {
    startProject: string;
    discussSite: string;
    requestConsultation: string;
    exploreProjects: string;
    askAboutProject: string;
  };
  pricing: {
    heading: string;
    disclaimer: string;
  };
  form: {
    heading: string;
    intro: string;
    name: string;
    email: string;
    whatsapp: string;
    projectType: string;
    location: string;
    budget: string;
    budgetOptional: string;
    message: string;
    preferredContact: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successBody: string;
    errorTitle: string;
    errorBody: string;
    privacyNotice: string;
    required: string;
    projectTypeOptions: string[];
    contactMethodOptions: string[];
  };
  home: {
    heroTitle: string;
    heroSubtitle: string;
    /** Hero slide alt texts, in slide order (see HomePage.astro). */
    heroSlideAlts: string[];
    directAnswer: string;
    heroCta1: string;
    heroCta2: string;
    introHeading: string;
    intro: string;
    servicesHeading: string;
    servicesIntro: string;
    projectsHeading: string;
    projectsIntro: string;
    processHeading: string;
    processIntro: string;
    whyUsHeading: string;
    locationsHeading: string;
    locationsIntro: string;
    journalHeading: string;
    finalCtaHeading: string;
    finalCtaBody: string;
  };
  notFound: {
    title: string;
    body: string;
    cta: string;
  };
}

export const en: Dictionary = {
  nav: {
    services: 'Services',
    projects: 'Projects',
    about: 'About',
    process: 'Process',
    locations: 'Locations',
    journal: 'Journal',
    contact: 'Contact',
    startProject: 'Start a Project',
    contactShort: 'Contact',
    menu: 'Menu',
    close: 'Close',
    allServices: 'All Services',
    allLocations: 'All Locations',
    viewAllServices: 'View all services',
    viewAllLocations: 'View all locations',
  },
  footer: {
    tagline:
      'Architecture, interiors, construction and project management for distinctive villas on Koh Phangan, Koh Samui, Koh Tao and Bali.',
    servicesHeading: 'Services',
    locationsHeading: 'Locations',
    companyHeading: 'Studio',
    contactHeading: 'Contact',
    legalHeading: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Settings',
    accessibility: 'Accessibility',
    editorialPolicy: 'Editorial Policy',
    rights: 'All rights reserved.',
  },
  common: {
    readMore: 'Read more',
    viewProject: 'View Project',
    viewService: 'View Service',
    minRead: 'min read',
    faqHeading: 'Frequently Asked Questions',
    relatedServices: 'Related Services',
    relatedProjects: 'Related Projects',
    relatedLocations: 'Related Locations',
    relatedReading: 'Related Reading',
    breadcrumbHome: 'Services',
    skipToContent: 'Skip to content',
    languageLabel: 'Language',
    processHeading: 'Process',
    localContext: 'Local context',
    islandsHeading: 'Islands we work on',
    specialistServices: 'Specialist services',
    previousProject: 'Previous project',
    nextProject: 'Next project',
    goToSlide: 'Go to slide {n} of {total}',
    pauseSlideshow: 'Pause slideshow',
    playSlideshow: 'Play slideshow',
    breadcrumbLabel: 'Breadcrumb',
    primaryNavLabel: 'Primary',
    mobileNavLabel: 'Menu',
  },
  cta: {
    startProject: 'Start a Project',
    discussSite: 'Discuss Your Site',
    requestConsultation: 'Request a Consultation',
    exploreProjects: 'Explore Projects',
    askAboutProject: 'Ask About Your Project',
  },
  pricing: {
    heading: 'Indicative investment',
    disclaimer:
      'These are relative bands illustrating how scope affects cost, not quoted prices — we do not have verified pricing data to publish fixed figures, and would rather explain the real drivers than invent a number. Every project is estimated individually once we understand your site and brief.',
  },
  form: {
    heading: 'Start a Project',
    intro:
      'Tell us about your site and your vision. We reply personally to every enquiry, usually within one business day.',
    name: 'Name',
    email: 'Email',
    whatsapp: 'WhatsApp / Phone',
    projectType: 'Project Type',
    location: 'Location',
    budget: 'Approximate Budget (optional)',
    budgetOptional: 'Prefer not to say',
    message: 'Tell us about your project',
    preferredContact: 'Preferred Contact Method',
    submit: 'Send Enquiry',
    submitting: 'Sending…',
    successTitle: 'Thank you — your enquiry is with us.',
    successBody: 'We reply personally to every project enquiry, usually within one business day.',
    errorTitle: 'Something went wrong',
    errorBody: 'Your message was not sent. Please try again, or reach us directly on WhatsApp or Telegram.',
    privacyNotice:
      'Submitting this form sends your details to our team via our secure intake system. See our Privacy Policy for how we handle your information.',
    required: 'Required',
    projectTypeOptions: ['Villa / Residence', 'Hospitality', 'Commercial', 'Renovation', 'Land / New Build', 'Other'],
    contactMethodOptions: ['Email', 'WhatsApp', 'Telegram', 'Phone call'],
  },
  home: {
    heroTitle: 'Architecture & Design-Build on Koh Phangan',
    heroSubtitle:
      'Architecture, interiors and construction for distinctive villas and spaces in Koh Phangan, Thailand — from concept and planning to completion.',
    heroSlideAlts: ['Villa terrace overlooking the sea on Koh Phangan', 'Concrete villa architecture with deep shading overhangs', 'Villa under construction, structural framing on site', 'Infinity pool integrated with tropical landscape design', 'Warm minimalist villa interior with natural materials'],
    heroCta1: 'View Projects',
    heroCta2: 'Start a Project',
    directAnswer:
      'FORMA is a Koh Phangan-based architecture and design-build studio offering 13 services — from concept architecture and villa design to construction, project management and turnkey delivery — across Koh Phangan, Koh Samui, Koh Tao and Bali.',
    introHeading: 'A studio built around one island\'s conditions',
    intro:
      'FORMA is an architecture and design-build studio based on Koh Phangan, working across architecture, interior design, landscape, construction and project management. We design villas, interiors and full-service projects around the specific realities of tropical island building — site slope, monsoon timing, material logistics and the climate itself — rather than adapting mainland assumptions to island conditions. The result is architecture that feels inevitable on its site, delivered by a team accountable for it from first sketch to handover.',
    servicesHeading: 'What we do',
    servicesIntro: 'Thirteen disciplines, one accountable studio — from first concept through to completed construction.',
    projectsHeading: 'Selected work',
    projectsIntro: 'Concept studies illustrating how site, climate and brief shape each design.',
    processHeading: 'How a project unfolds',
    processIntro: 'A structured path from first conversation to handover and aftercare.',
    whyUsHeading: 'Why FORMA',
    locationsHeading: 'Where we work',
    locationsIntro: 'Based on Koh Phangan, working across the island and its neighbours.',
    journalHeading: 'From the Journal',
    finalCtaHeading: 'Have a project in mind?',
    finalCtaBody:
      'Whether it is raw land, an existing villa, a renovation or a full turnkey build — tell us where you are starting from.',
  },
  notFound: {
    title: 'Page not found',
    body: 'The page you are looking for may have moved or no longer exists.',
    cta: 'Back to Services',
  },
};

export const ru: Dictionary = {
  nav: {
    services: 'Услуги',
    projects: 'Проекты',
    about: 'О студии',
    process: 'Процесс',
    locations: 'Локации',
    journal: 'Журнал',
    contact: 'Контакты',
    startProject: 'Начать проект',
    contactShort: 'Контакты',
    menu: 'Меню',
    close: 'Закрыть',
    allServices: 'Все услуги',
    allLocations: 'Все локации',
    viewAllServices: 'Смотреть все услуги',
    viewAllLocations: 'Смотреть все локации',
  },
  footer: {
    tagline:
      'Архитектура, интерьеры, строительство и управление проектами для вилл на Ко Панган, Ко Самуи, Ко Тао и Бали.',
    servicesHeading: 'Услуги',
    locationsHeading: 'Локации',
    companyHeading: 'Студия',
    contactHeading: 'Контакты',
    legalHeading: 'Правовая информация',
    privacy: 'Политика конфиденциальности',
    terms: 'Условия использования',
    cookies: 'Настройки cookie',
    accessibility: 'Доступность',
    editorialPolicy: 'Редакционная политика',
    rights: 'Все права защищены.',
  },
  common: {
    readMore: 'Читать далее',
    viewProject: 'Смотреть проект',
    viewService: 'Смотреть услугу',
    minRead: 'мин чтения',
    faqHeading: 'Часто задаваемые вопросы',
    relatedServices: 'Похожие услуги',
    relatedProjects: 'Похожие проекты',
    relatedLocations: 'Похожие локации',
    relatedReading: 'Похожие статьи',
    breadcrumbHome: 'Услуги',
    skipToContent: 'Перейти к содержимому',
    languageLabel: 'Язык',
    processHeading: 'Процесс',
    localContext: 'Местный контекст',
    islandsHeading: 'Острова, на которых мы работаем',
    specialistServices: 'Специализированные услуги',
    previousProject: 'Предыдущий проект',
    nextProject: 'Следующий проект',
    goToSlide: 'Слайд {n} из {total}',
    pauseSlideshow: 'Приостановить слайд-шоу',
    playSlideshow: 'Запустить слайд-шоу',
    breadcrumbLabel: 'Навигационная цепочка',
    primaryNavLabel: 'Основная навигация',
    mobileNavLabel: 'Меню',
  },
  cta: {
    startProject: 'Начать проект',
    discussSite: 'Обсудить участок',
    requestConsultation: 'Запросить консультацию',
    exploreProjects: 'Смотреть проекты',
    askAboutProject: 'Спросить о проекте',
  },
  pricing: {
    heading: 'Ориентир по инвестициям',
    disclaimer:
      'Это относительные диапазоны, показывающие, как масштаб влияет на стоимость, а не фиксированные цены — у нас нет проверенных данных по ценам, чтобы публиковать конкретные цифры, и мы предпочитаем объяснить реальные факторы, а не придумывать число. Каждый проект оценивается индивидуально после знакомства с участком и техническим заданием.',
  },
  form: {
    heading: 'Начать проект',
    intro: 'Расскажите о вашем участке и идее. Мы отвечаем лично на каждый запрос, обычно в течение одного рабочего дня.',
    name: 'Имя',
    email: 'Email',
    whatsapp: 'WhatsApp / телефон',
    projectType: 'Тип проекта',
    location: 'Локация',
    budget: 'Примерный бюджет (необязательно)',
    budgetOptional: 'Не хочу указывать',
    message: 'Расскажите о вашем проекте',
    preferredContact: 'Удобный способ связи',
    submit: 'Отправить заявку',
    submitting: 'Отправка…',
    successTitle: 'Спасибо — ваша заявка получена.',
    successBody: 'Мы отвечаем лично на каждый запрос, обычно в течение одного рабочего дня.',
    errorTitle: 'Что-то пошло не так',
    errorBody: 'Сообщение не отправлено. Попробуйте снова или напишите нам напрямую в WhatsApp или Telegram.',
    privacyNotice:
      'Отправляя форму, вы передаёте свои данные нашей команде через защищённую систему приёма заявок. См. нашу Политику конфиденциальности.',
    required: 'Обязательное поле',
    projectTypeOptions: ['Вилла / резиденция', 'Гостиничный проект', 'Коммерческий объект', 'Реновация', 'Земля / новое строительство', 'Другое'],
    contactMethodOptions: ['Email', 'WhatsApp', 'Telegram', 'Звонок'],
  },
  home: {
    heroTitle: 'Архитектура и дизайн-строительство на Ко Панган',
    heroSubtitle:
      'Архитектура, интерьеры и строительство вилл и пространств на Ко Панган, Таиланд — от концепции и планирования до завершения строительства.',
    heroSlideAlts: ['Терраса виллы с видом на море на Пангане', 'Архитектура бетонной виллы с глубокими затеняющими навесами', 'Вилла в процессе строительства, несущий каркас на площадке', 'Инфинити-бассейн, встроенный в тропический ландшафт', 'Тёплый минималистичный интерьер виллы из натуральных материалов'],
    heroCta1: 'Смотреть проекты',
    heroCta2: 'Начать проект',
    directAnswer:
      'FORMA — архитектурная дизайн-строительная студия на Ко Панган, предлагающая 13 направлений услуг — от концептуальной архитектуры и дизайна вилл до строительства, управления проектами и реализации «под ключ» — на Ко Панган, Ко Самуи, Ко Тао и Бали.',
    introHeading: 'Студия, построенная вокруг условий одного острова',
    intro:
      'FORMA — архитектурная дизайн-строительная студия на Ко Панган, работающая в области архитектуры, интерьерного дизайна, ландшафта, строительства и управления проектами. Мы проектируем виллы, интерьеры и полнофункциональные проекты с учётом реальных условий строительства на тропическом острове — уклона участка, сезона муссонов, логистики материалов и самого климата — а не адаптируя материковые допущения к островным условиям. Результат — архитектура, которая выглядит неотделимой от своего участка, реализованная командой, отвечающей за неё от первого эскиза до сдачи объекта.',
    servicesHeading: 'Чем мы занимаемся',
    servicesIntro: 'Тринадцать направлений, одна ответственная команда — от концепции до завершённого строительства.',
    projectsHeading: 'Избранные работы',
    projectsIntro: 'Концептуальные проекты, показывающие, как участок, климат и задача формируют дизайн.',
    processHeading: 'Как строится проект',
    processIntro: 'Структурированный путь от первого разговора до сдачи объекта и последующего сопровождения.',
    whyUsHeading: 'Почему FORMA',
    locationsHeading: 'Где мы работаем',
    locationsIntro: 'Базируемся на Ко Панган, работаем по всему острову и на соседних территориях.',
    journalHeading: 'Из журнала',
    finalCtaHeading: 'Есть идея проекта?',
    finalCtaBody: 'Земля, существующая вилла, реновация или проект «под ключ» — расскажите, с чего вы начинаете.',
  },
  notFound: {
    title: 'Страница не найдена',
    body: 'Возможно, страница была перемещена или больше не существует.',
    cta: 'Вернуться к услугам',
  },
};

export const th: Dictionary = {
  nav: {
    services: 'บริการ',
    projects: 'ผลงาน',
    about: 'เกี่ยวกับเรา',
    process: 'กระบวนการทำงาน',
    locations: 'พื้นที่ให้บริการ',
    journal: 'บทความ',
    contact: 'ติดต่อเรา',
    startProject: 'เริ่มโปรเจกต์',
    contactShort: 'ติดต่อ',
    menu: 'เมนู',
    close: 'ปิด',
    allServices: 'บริการทั้งหมด',
    allLocations: 'พื้นที่ทั้งหมด',
    viewAllServices: 'ดูบริการทั้งหมด',
    viewAllLocations: 'ดูพื้นที่ทั้งหมด',
  },
  footer: {
    tagline: 'งานสถาปัตยกรรม ออกแบบภายใน ก่อสร้าง และบริหารโครงการ สำหรับวิลล่าบนเกาะพะงัน เกาะสมุย เกาะเต่า และบาหลี',
    servicesHeading: 'บริการ',
    locationsHeading: 'พื้นที่ให้บริการ',
    companyHeading: 'สตูดิโอ',
    contactHeading: 'ติดต่อเรา',
    legalHeading: 'ข้อมูลทางกฎหมาย',
    privacy: 'นโยบายความเป็นส่วนตัว',
    terms: 'ข้อกำหนดการใช้บริการ',
    cookies: 'การตั้งค่าคุกกี้',
    accessibility: 'การเข้าถึง',
    editorialPolicy: 'นโยบายด้านเนื้อหา',
    rights: 'สงวนลิขสิทธิ์',
  },
  common: {
    readMore: 'อ่านเพิ่มเติม',
    viewProject: 'ดูโครงการ',
    viewService: 'ดูบริการ',
    minRead: 'นาทีในการอ่าน',
    faqHeading: 'คำถามที่พบบ่อย',
    relatedServices: 'บริการที่เกี่ยวข้อง',
    relatedProjects: 'โครงการที่เกี่ยวข้อง',
    relatedLocations: 'พื้นที่ที่เกี่ยวข้อง',
    relatedReading: 'บทความที่เกี่ยวข้อง',
    breadcrumbHome: 'บริการ',
    skipToContent: 'ข้ามไปยังเนื้อหา',
    languageLabel: 'ภาษา',
    processHeading: 'ขั้นตอนการทำงาน',
    localContext: 'บริบทท้องถิ่น',
    islandsHeading: 'เกาะที่เราให้บริการ',
    specialistServices: 'บริการเฉพาะทาง',
    previousProject: 'โครงการก่อนหน้า',
    nextProject: 'โครงการถัดไป',
    goToSlide: 'ไปยังสไลด์ที่ {n} จาก {total}',
    pauseSlideshow: 'หยุดสไลด์โชว์ชั่วคราว',
    playSlideshow: 'เล่นสไลด์โชว์',
    breadcrumbLabel: 'เส้นทางนำทาง',
    primaryNavLabel: 'เมนูหลัก',
    mobileNavLabel: 'เมนู',
  },
  cta: {
    startProject: 'เริ่มโปรเจกต์',
    discussSite: 'ปรึกษาเรื่องที่ดิน',
    requestConsultation: 'ขอคำปรึกษา',
    exploreProjects: 'ดูผลงาน',
    askAboutProject: 'สอบถามเกี่ยวกับโปรเจกต์',
  },
  pricing: {
    heading: 'แนวทางการลงทุนโดยประมาณ',
    disclaimer:
      'ตัวเลขเหล่านี้เป็นช่วงเปรียบเทียบเชิงสัมพัทธ์ที่แสดงว่าขนาดโครงการส่งผลต่อค่าใช้จ่ายอย่างไร ไม่ใช่ราคาที่เสนอจริง เนื่องจากเราไม่มีข้อมูลราคาที่ยืนยันแล้วสำหรับเผยแพร่ตัวเลขที่แน่นอน และเราต้องการอธิบายปัจจัยที่แท้จริงมากกว่าการเดาตัวเลข ทุกโครงการจะได้รับการประเมินเป็นรายกรณีหลังจากที่เราเข้าใจที่ดินและโจทย์ของคุณแล้ว',
  },
  form: {
    heading: 'เริ่มโปรเจกต์',
    intro: 'เล่าให้เราฟังเกี่ยวกับที่ดินและแนวคิดของคุณ เราจะตอบกลับทุกคำถามด้วยตนเอง โดยปกติภายในหนึ่งวันทำการ',
    name: 'ชื่อ',
    email: 'อีเมล',
    whatsapp: 'WhatsApp / เบอร์โทรศัพท์',
    projectType: 'ประเภทโครงการ',
    location: 'พื้นที่',
    budget: 'งบประมาณโดยประมาณ (ไม่บังคับ)',
    budgetOptional: 'ไม่ต้องการระบุ',
    message: 'เล่าเกี่ยวกับโครงการของคุณ',
    preferredContact: 'ช่องทางติดต่อที่สะดวก',
    submit: 'ส่งคำขอ',
    submitting: 'กำลังส่ง…',
    successTitle: 'ขอบคุณครับ/ค่ะ — เราได้รับคำขอของคุณแล้ว',
    successBody: 'เราจะตอบกลับทุกคำขอด้วยตนเอง โดยปกติภายในหนึ่งวันทำการ',
    errorTitle: 'เกิดข้อผิดพลาด',
    errorBody: 'ไม่สามารถส่งข้อความได้ กรุณาลองใหม่อีกครั้ง หรือติดต่อเราโดยตรงทาง WhatsApp หรือ Telegram',
    privacyNotice: 'การส่งแบบฟอร์มนี้จะส่งข้อมูลของคุณไปยังทีมงานผ่านระบบรับคำขอที่ปลอดภัยของเรา ดูรายละเอียดในนโยบายความเป็นส่วนตัว',
    required: 'จำเป็นต้องกรอก',
    projectTypeOptions: ['วิลล่า / ที่พักอาศัย', 'ธุรกิจโรงแรม', 'เชิงพาณิชย์', 'งานปรับปรุง', 'ที่ดิน / สร้างใหม่', 'อื่นๆ'],
    contactMethodOptions: ['อีเมล', 'WhatsApp', 'Telegram', 'โทรศัพท์'],
  },
  home: {
    heroTitle: 'งานสถาปัตยกรรมและออกแบบ-ก่อสร้างบนเกาะพะงัน',
    heroSubtitle: 'งานสถาปัตยกรรม ออกแบบภายใน และก่อสร้าง สำหรับวิลล่าและพื้นที่ที่โดดเด่นบนเกาะพะงัน ประเทศไทย ตั้งแต่แนวคิดและการวางแผนจนถึงความสำเร็จของโครงการ',
    heroSlideAlts: ['ระเบียงวิลล่าที่มองเห็นทะเลบนเกาะพะงัน', 'สถาปัตยกรรมวิลล่าคอนกรีตพร้อมชายคายื่นลึกเพื่อบังแดด', 'วิลล่าระหว่างก่อสร้าง โครงสร้างหลักในไซต์งาน', 'สระว่ายน้ำอินฟินิตี้ที่ผสานกับภูมิทัศน์เขตร้อน', 'การตกแต่งภายในวิลล่าแบบมินิมอลที่อบอุ่นด้วยวัสดุธรรมชาติ'],
    heroCta1: 'ดูผลงาน',
    heroCta2: 'เริ่มโปรเจกต์',
    directAnswer:
      'FORMA คือสตูดิโอสถาปัตยกรรมและออกแบบ-ก่อสร้างบนเกาะพะงัน ให้บริการ 13 สาขา ตั้งแต่งานสถาปัตยกรรมเชิงแนวคิดและออกแบบวิลล่า ไปจนถึงการก่อสร้าง บริหารโครงการ และงานแบบครบวงจร ครอบคลุมเกาะพะงัน เกาะสมุย เกาะเต่า และบาหลี',
    introHeading: 'สตูดิโอที่สร้างขึ้นเพื่อเข้าใจเงื่อนไขของเกาะแห่งนี้',
    intro:
      'FORMA คือสตูดิโอสถาปัตยกรรมและออกแบบ-ก่อสร้างบนเกาะพะงัน ให้บริการด้านสถาปัตยกรรม ออกแบบภายใน ภูมิทัศน์ การก่อสร้าง และการบริหารโครงการ เราออกแบบวิลล่า อินทีเรีย และโครงการแบบครบวงจร โดยคำนึงถึงความเป็นจริงของการก่อสร้างบนเกาะเขตร้อน ทั้งความลาดชันของพื้นที่ ช่วงเวลามรสุม การขนส่งวัสดุ และสภาพภูมิอากาศ แทนที่จะนำสมมติฐานจากแผ่นดินใหญ่มาปรับใช้กับเงื่อนไขของเกาะ ผลลัพธ์คืองานสถาปัตยกรรมที่ดูกลมกลืนกับพื้นที่อย่างเป็นธรรมชาติ ดำเนินการโดยทีมงานที่รับผิดชอบตั้งแต่ภาพร่างแรกจนถึงการส่งมอบ',
    servicesHeading: 'บริการของเรา',
    servicesIntro: '13 สาขาบริการ ทีมงานเดียวที่รับผิดชอบตลอดโครงการ ตั้งแต่แนวคิดจนถึงการก่อสร้างแล้วเสร็จ',
    projectsHeading: 'ผลงานคัดสรร',
    projectsIntro: 'กรณีศึกษาแนวคิดที่แสดงให้เห็นว่าพื้นที่ ภูมิอากาศ และโจทย์ของลูกค้าหล่อหลอมการออกแบบอย่างไร',
    processHeading: 'ขั้นตอนการทำงาน',
    processIntro: 'เส้นทางที่มีโครงสร้างชัดเจน ตั้งแต่การพูดคุยครั้งแรกจนถึงการส่งมอบและดูแลหลังการส่งมอบ',
    whyUsHeading: 'ทำไมต้อง FORMA',
    locationsHeading: 'พื้นที่ให้บริการ',
    locationsIntro: 'ตั้งอยู่บนเกาะพะงัน ให้บริการทั่วเกาะและพื้นที่ใกล้เคียง',
    journalHeading: 'จากบทความของเรา',
    finalCtaHeading: 'มีโปรเจกต์ในใจแล้วใช่ไหม?',
    finalCtaBody: 'ไม่ว่าจะเป็นที่ดินเปล่า วิลล่าเดิม งานปรับปรุง หรือโครงการแบบครบวงจร บอกเราว่าคุณเริ่มต้นจากจุดไหน',
  },
  notFound: {
    title: 'ไม่พบหน้าที่คุณต้องการ',
    body: 'หน้าที่คุณกำลังค้นหาอาจถูกย้ายหรือไม่มีอยู่อีกต่อไป',
    cta: 'กลับไปหน้าบริการ',
  },
};

export const he: Dictionary = {
  nav: {
    services: 'שירותים',
    projects: 'פרויקטים',
    about: 'אודות',
    process: 'תהליך העבודה',
    locations: 'אזורי פעילות',
    journal: 'בלוג',
    contact: 'צור קשר',
    startProject: 'התחילו פרויקט',
    contactShort: 'צור קשר',
    menu: 'תפריט',
    close: 'סגור',
    allServices: 'כל השירותים',
    allLocations: 'כל האזורים',
    viewAllServices: 'לצפייה בכל השירותים',
    viewAllLocations: 'לצפייה בכל האזורים',
  },
  footer: {
    tagline: 'אדריכלות, עיצוב פנים, בנייה וניהול פרויקטים לוילות ייחודיות בקו פנגן, קו סמוי, קו טאו ובאלי.',
    servicesHeading: 'שירותים',
    locationsHeading: 'אזורי פעילות',
    companyHeading: 'הסטודיו',
    contactHeading: 'צור קשר',
    legalHeading: 'מידע משפטי',
    privacy: 'מדיניות פרטיות',
    terms: 'תנאי שימוש',
    cookies: 'הגדרות עוגיות',
    accessibility: 'נגישות',
    editorialPolicy: 'מדיניות עריכה',
    rights: 'כל הזכויות שמורות.',
  },
  common: {
    readMore: 'קראו עוד',
    viewProject: 'צפו בפרויקט',
    viewService: 'צפו בשירות',
    minRead: 'דקות קריאה',
    faqHeading: 'שאלות נפוצות',
    relatedServices: 'שירותים קשורים',
    relatedProjects: 'פרויקטים קשורים',
    relatedLocations: 'אזורים קשורים',
    relatedReading: 'קריאה נוספת',
    breadcrumbHome: 'שירותים',
    skipToContent: 'דלגו לתוכן',
    languageLabel: 'שפה',
    processHeading: 'תהליך',
    localContext: 'הקשר מקומי',
    islandsHeading: 'האיים שבהם אנו עובדים',
    specialistServices: 'שירותים מקצועיים נוספים',
    previousProject: 'הפרויקט הקודם',
    nextProject: 'הפרויקט הבא',
    goToSlide: 'מעבר לשקופית {n} מתוך {total}',
    pauseSlideshow: 'השהיית המצגת',
    playSlideshow: 'הפעלת המצגת',
    breadcrumbLabel: 'פירורי לחם',
    primaryNavLabel: 'ניווט ראשי',
    mobileNavLabel: 'תפריט',
  },
  cta: {
    startProject: 'התחילו פרויקט',
    discussSite: 'התייעצו איתנו על המגרש',
    requestConsultation: 'בקשו ייעוץ',
    exploreProjects: 'צפו בפרויקטים',
    askAboutProject: 'שאלו על הפרויקט',
  },
  pricing: {
    heading: 'הערכת השקעה',
    disclaimer:
      'אלו טווחים יחסיים הממחישים כיצד היקף הפרויקט משפיע על העלות, לא מחירים מוצעים — אין לנו נתוני תמחור מאומתים כדי לפרסם מספרים קבועים, ואנו מעדיפים להסביר את הגורמים האמיתיים במקום להמציא מספר. כל פרויקט מוערך בנפרד לאחר שנכיר את המגרש והתכנית שלכם.',
  },
  form: {
    heading: 'התחילו פרויקט',
    intro: 'ספרו לנו על המגרש והחזון שלכם. אנו משיבים אישית לכל פנייה, בדרך כלל בתוך יום עסקים אחד.',
    name: 'שם מלא',
    email: 'אימייל',
    whatsapp: 'וואטסאפ / טלפון',
    projectType: 'סוג הפרויקט',
    location: 'אזור',
    budget: 'תקציב משוער (לא חובה)',
    budgetOptional: 'מעדיפים לא לציין',
    message: 'ספרו לנו על הפרויקט שלכם',
    preferredContact: 'דרך התקשרות מועדפת',
    submit: 'שליחת פנייה',
    submitting: 'שולח…',
    successTitle: 'תודה — הפנייה שלכם התקבלה.',
    successBody: 'אנו משיבים אישית לכל פנייה, בדרך כלל בתוך יום עסקים אחד.',
    errorTitle: 'משהו השתבש',
    errorBody: 'ההודעה לא נשלחה. נסו שוב, או פנו אלינו ישירות בוואטסאפ או בטלגרם.',
    privacyNotice: 'שליחת טופס זה מעבירה את הפרטים שלכם לצוות שלנו במערכת מאובטחת. ראו את מדיניות הפרטיות שלנו למידע נוסף.',
    required: 'שדה חובה',
    projectTypeOptions: ['וילה / מגורים', 'אירוח', 'מסחרי', 'שיפוץ', 'קרקע / בנייה חדשה', 'אחר'],
    contactMethodOptions: ['אימייל', 'וואטסאפ', 'טלגרם', 'שיחת טלפון'],
  },
  home: {
    heroTitle: 'אדריכלות ובנייה מתוכננת בקו פנגן',
    heroSubtitle: 'אדריכלות, עיצוב פנים ובנייה לוילות ומרחבים ייחודיים בקו פנגן, תאילנד — מרעיון ותכנון ועד להשלמת הפרויקט.',
    heroSlideAlts: ['מרפסת וילה המשקיפה לים בקו פנגן', 'אדריכלות וילת בטון עם גגונים עמוקים להצללה', 'וילה בבנייה, שלד מבני באתר', 'בריכת אינפיניטי המשולבת בנוף טרופי', 'עיצוב פנים מינימליסטי וחם של וילה בחומרים טבעיים'],
    heroCta1: 'צפייה בפרויקטים',
    heroCta2: 'התחילו פרויקט',
    directAnswer:
      'FORMA הוא סטודיו לאדריכלות ובנייה מתוכננת בקו פנגן, המציע 13 תחומי שירות — מאדריכלות רעיונית ותכנון וילות ועד בנייה, ניהול פרויקטים ומסירה מקיפה — בקו פנגן, קו סמוי, קו טאו ובאלי.',
    introHeading: 'סטודיו שנבנה סביב תנאי האי',
    intro:
      'FORMA הוא סטודיו לאדריכלות ובנייה מתוכננת בקו פנגן, הפועל בתחומי האדריכלות, עיצוב הפנים, הנוף, הבנייה וניהול הפרויקטים. אנו מתכננים וילות, פנים ופרויקטים מקיפים סביב המציאות הספציפית של בנייה באי טרופי — שיפוע המגרש, עיתוי המונסון, לוגיסטיקת החומרים והאקלים עצמו — במקום להתאים הנחות מהיבשת לתנאי האי. התוצאה היא אדריכלות שנראית בלתי נפרדת מהמגרש שלה, מבוצעת על ידי צוות האחראי עליה מהסקיצה הראשונה ועד למסירה.',
    servicesHeading: 'מה אנחנו עושים',
    servicesIntro: 'שלושה עשר תחומים, סטודיו אחד אחראי — מרעיון ראשוני ועד לבנייה מושלמת.',
    projectsHeading: 'עבודות נבחרות',
    projectsIntro: 'הדמיות רעיוניות הממחישות כיצד המגרש, האקלים והתכנית מעצבים כל תכנון.',
    processHeading: 'כך מתקדם פרויקט',
    processIntro: 'מסלול מובנה מהשיחה הראשונה ועד למסירה וליווי לאחר מכן.',
    whyUsHeading: 'למה FORMA',
    locationsHeading: 'איפה אנחנו פועלים',
    locationsIntro: 'הסטודיו שלנו ממוקם בקו פנגן, ופועל ברחבי האי ובאזורים הסמוכים.',
    journalHeading: 'מהבלוג',
    finalCtaHeading: 'יש לכם פרויקט בראש?',
    finalCtaBody: 'קרקע גולמית, וילה קיימת, שיפוץ או פרויקט מקיף — ספרו לנו מאיפה אתם מתחילים.',
  },
  notFound: {
    title: 'הדף לא נמצא',
    body: 'ייתכן שהדף שחיפשתם הועבר או שאינו קיים עוד.',
    cta: 'חזרה לשירותים',
  },
};

export const dictionaries: Record<Locale, Dictionary> = { en, ru, th, he };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
