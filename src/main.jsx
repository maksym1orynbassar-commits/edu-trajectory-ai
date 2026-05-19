import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BarChart3,
  BookOpen,
  Brain,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  FilePlus2,
  GraduationCap,
  LineChart,
  Map,
  SlidersHorizontal,
  Sparkles,
  Target,
  UserRound,
  Wand2
} from "lucide-react";
import "./styles.css";

const roleLabels = {
  student: "Студент",
  teacher: "Преподаватель"
};

const programs = [
  {
    id: "is",
    title: "Информационные системы",
    code: "6B06103",
    description: "ОП для студентов, которые хотят проектировать цифровые продукты, работать с данными и автоматизировать бизнес-процессы.",
    core: ["Алгоритмы", "Базы данных", "Веб-разработка", "Системный анализ", "Проектный менеджмент"]
  },
  {
    id: "cs",
    title: "Computer Science",
    code: "6B06101",
    description: "ОП для глубокого изучения программирования, искусственного интеллекта, архитектуры ПО и инженерных практик.",
    core: ["Дискретная математика", "ООП", "Структуры данных", "ML basics", "Cloud systems"]
  },
  {
    id: "ce",
    title: "Computer engineering",
    code: "6B06102",
    description: "Реальный МУП 2023 года: компьютерная инженерия, сети, безопасность, программирование и элективные траектории.",
    core: ["Компьютерные сети", "Программирование", "Базы данных", "Web", "Кибербезопасность"]
  },
  {
    id: "vtipo",
    title: "Computer technology and software",
    code: "6B06103",
    description: "МУП ВТИПО: программирование, базы данных, компьютерная архитектура, сети, кибербезопасность, Web/mobile и IoT.",
    core: ["Python", "Java", ".NET", "Database", "Network administration", "Web/mobile"]
  }
];

const trajectories = [
  {
    id: "data",
    programId: "is",
    title: "Data Analytics & BI",
    short: "Аналитика данных",
    roles: ["Data Analyst", "BI Analyst", "Product Analyst"],
    qualities: ["analytical", "communication", "business"],
    gradeFocus: ["math", "database", "programming"],
    skills: ["SQL", "Python", "Power BI", "Statistics", "A/B testing"],
    semesters: [
      ["Линейная алгебра", "Основы программирования", "Academic Writing"],
      ["Статистика", "Базы данных I", "Python для анализа"],
      ["Data Mining", "Визуализация данных", "Экономика ИТ"],
      ["BI-системы", "Хранилища данных", "UX-исследования"],
      ["Machine Learning basics", "Product metrics", "Cloud databases"],
      ["Big Data Analytics", "Data Storytelling", "Проектный практикум"],
      ["Преддипломная аналитика", "Индустриальный проект", "Этика данных"],
      ["Дипломный проект", "Стажировка", "Карьерный модуль"]
    ],
    explanation: "Подходит студентам, которым нравится находить закономерности, работать с таблицами, метриками и объяснять решения бизнесу."
  },
  {
    id: "ai",
    programId: "cs",
    title: "Machine Learning Engineering",
    short: "ML-инженерия",
    roles: ["ML Engineer", "AI Developer", "Computer Vision Engineer"],
    qualities: ["analytical", "research", "persistence"],
    gradeFocus: ["math", "programming", "english"],
    skills: ["Python", "PyTorch", "Linear Algebra", "MLOps", "Model Evaluation"],
    semesters: [
      ["Calculus", "Python", "Computer Systems"],
      ["Linear Algebra", "OOP", "Probability"],
      ["Algorithms", "Data Structures", "Numerical Methods"],
      ["Machine Learning", "Databases", "Research Methods"],
      ["Deep Learning", "Computer Vision", "Cloud ML"],
      ["NLP", "MLOps", "AI Product Lab"],
      ["Applied AI Project", "Model Deployment", "AI Ethics"],
      ["Thesis", "Industrial Internship", "Portfolio Defense"]
    ],
    explanation: "Сильная траектория для студентов с хорошей математикой, интересом к исследованиям и готовностью много экспериментировать."
  },
  {
    id: "backend",
    programId: "is",
    title: "Backend & Cloud Systems",
    short: "Backend-разработка",
    roles: ["Backend Developer", "Cloud Engineer", "DevOps Junior"],
    qualities: ["logic", "persistence", "systems"],
    gradeFocus: ["programming", "database", "english"],
    skills: ["Java", "Node.js", "PostgreSQL", "Docker", "REST API"],
    semesters: [
      ["Основы программирования", "Математика", "Цифровая грамотность"],
      ["ООП", "Базы данных I", "Linux basics"],
      ["Web backend", "Computer Networks", "Software Design"],
      ["API Development", "Database Optimization", "Testing"],
      ["Cloud Computing", "Microservices", "Security basics"],
      ["DevOps", "Distributed Systems", "Team Project"],
      ["Enterprise Backend", "Architecture Review", "Internship Lab"],
      ["Diploma Project", "Production Practice", "Career Track"]
    ],
    explanation: "Подходит тем, кто любит строить надежные системы, писать логику сервера и разбираться, как продукт работает внутри."
  },
  {
    id: "product",
    programId: "is",
    title: "Digital Product Management",
    short: "Product management",
    roles: ["Product Manager", "Business Analyst", "IT Project Manager"],
    qualities: ["communication", "business", "leadership"],
    gradeFocus: ["english", "database", "math"],
    skills: ["User Research", "Roadmaps", "Metrics", "Agile", "No-code prototypes"],
    semesters: [
      ["Введение в ИТ", "Коммуникации", "Математика"],
      ["Бизнес-анализ", "Базы данных", "Design Thinking"],
      ["Системный анализ", "UX Research", "Agile basics"],
      ["Product Discovery", "Finance for IT", "Prototyping"],
      ["Product Metrics", "Digital Marketing", "CRM systems"],
      ["IT Project Management", "Growth experiments", "Legal tech basics"],
      ["Startup Studio", "Stakeholder Management", "Internship"],
      ["Diploma Product", "Portfolio", "Career Strategy"]
    ],
    explanation: "Хороший выбор для студентов, которые умеют общаться, понимать пользователей и связывать технологии с бизнес-задачами."
  }
];

const realMupTrajectories = [
  {
    id: "mup-ce-security",
    programId: "ce",
    source: "МУП 2023",
    teacher: "МУП Computer engineering",
    title: "Computer engineering: Information Security",
    short: "Защита информации",
    roles: ["Cybersecurity Analyst", "Security Engineer", "Network Security Specialist"],
    qualities: ["logic", "systems", "persistence"],
    gradeFocus: ["programming", "database", "english"],
    skills: ["Network security", "Cryptography", "Operating system security", "Web security", "DevSecOps"],
    semesters: [
      ["Иностранный язык", "Казахский/русский язык", "Социология и политология", "Физическая культура"],
      ["Современная история Казахстана", "Иностранный язык", "Казахский/русский язык", "Линейная алгебра"],
      ["Философия", "Физическая культура", "Алгоритмы и структуры данных", "Основы права"],
      ["Информационно-коммуникационные технологии", "Объектно-ориентированное программирование", "Архитектура компьютера"],
      ["Защита информации в телекоммуникационных сетях", "Безопасность операционных систем", "Компьютерные сети", "Web-приложения"],
      ["Криптографические методы защиты информации", "Аппаратно-программные средства ИБ", "Базы данных", "DevOps basics"],
      ["Разработка защищенных автоматизированных систем", "Безопасность Web и мобильных приложений", "Проектирование", "Преддипломная практика"],
      ["Дипломная работа", "Итоговая аттестация"]
    ],
    explanation: "Реальный МУП 6B06102 показывает элективную линию по защите информации: сети, криптография, безопасность ОС, Web/mobile security и защищенные системы."
  },
  {
    id: "mup-ce-bigdata",
    programId: "ce",
    source: "МУП 2023",
    teacher: "МУП Computer engineering",
    title: "Computer engineering: Big Data",
    short: "Большие данные",
    roles: ["Data Engineer", "Big Data Analyst", "BI/Data Specialist"],
    qualities: ["analytical", "research", "persistence"],
    gradeFocus: ["math", "programming", "database"],
    skills: ["Data analysis", "Big Data processing", "Data visualization", "Forecasting", "Data management"],
    semesters: [
      ["Иностранный язык", "Казахский/русский язык", "Социология и политология", "Физическая культура"],
      ["Современная история Казахстана", "Иностранный язык", "Казахский/русский язык", "Линейная алгебра"],
      ["Философия", "Физическая культура", "Алгоритмы и структуры данных", "Основы права"],
      ["Информационно-коммуникационные технологии", "Объектно-ориентированное программирование", "Архитектура компьютера"],
      ["Анализ данных", "Управление большими данными", "Компьютерные сети", "Web-приложения"],
      ["Методы и системы обработки больших данных", "Большие данные и прогнозирование", "Базы данных", "DevOps basics"],
      ["Визуализация больших данных", "Аналитика больших массивов данных", "Проектирование", "Преддипломная практика"],
      ["Дипломная работа", "Итоговая аттестация"]
    ],
    explanation: "Реальный МУП 6B06102 показывает элективную линию Big Data: анализ данных, обработка больших данных, визуализация, управление и прогнозирование."
  }
];

const vtipoTrajectories = [
  {
    id: "vtipo-software",
    programId: "vtipo",
    source: "МУП ВТИПО 2022",
    teacher: "МУП Computer technology and software",
    title: "ВТИПО: Software Engineering",
    short: "Software engineering",
    roles: ["Software Developer", "Backend Developer", "Full-stack Developer"],
    qualities: ["logic", "persistence", "systems"],
    gradeFocus: ["programming", "database", "english"],
    skills: ["Python", "Java", ".NET", "Database design", "Software testing"],
    semesters: [
      ["Foreign Language", "Kazakh/Russian Language", "ICT", "Physical training"],
      ["History of Kazakhstan", "Mathematics 1", "Engineering graphics", "Entrepreneurship"],
      ["Philosophy", "Mathematics 2", "Academic writing", "Algorithmization and programming basics"],
      ["Mathematics 3", "Operation systems", "Database design", "Introductory practice"],
      ["Python programming language", "Electronics and cloud data storage", "Cybersecurity"],
      ["Java programming language", "Database administration", "Computer system architecture"],
      [".NET Application Development", "Advanced programming", "Cisco CCNA Security"],
      ["Final State Attestation", "Diploma project"]
    ],
    explanation: "По МУП ВТИПО 2022 эта линия ближе студентам, которые хотят разрабатывать ПО: Python, Java, .NET, базы данных, архитектура систем и проектная практика."
  },
  {
    id: "vtipo-network-iot",
    programId: "vtipo",
    source: "МУП ВТИПО 2022",
    teacher: "МУП Computer technology and software",
    title: "ВТИПО: IoT, Networks & Real-time Systems",
    short: "IoT и сети",
    roles: ["Network Engineer", "IoT Developer", "Systems Engineer"],
    qualities: ["systems", "logic", "persistence"],
    gradeFocus: ["programming", "math", "english"],
    skills: ["IoT", "Data transfer technology", "Real-time systems", "LAN/WAN design", "Network administration"],
    semesters: [
      ["Mathematics 1", "Physics", "Electrical and Electronics", "ICT"],
      ["Mathematics 2", "Algorithmization and programming basics", "Operation systems"],
      ["Computer system architecture", "Networks and telecommunications", "Database design"],
      ["Cybersecurity", "Cisco CCNA Security", "Java programming language"],
      ["IoT and Embedded Systems", "LAN and WAN design", "Network programming"],
      ["Data transfer technology", "Network administration", "Electronics and cloud data storage"],
      ["Real-time systems", "Advanced programming", "Diploma preparation"],
      ["Final State Attestation", "Industrial project"]
    ],
    explanation: "Элективный блок ВТИПО включает IoT, технологии передачи данных, real-time системы, проектирование LAN/WAN и администрирование сетей."
  },
  {
    id: "vtipo-web-mobile",
    programId: "vtipo",
    source: "МУП ВТИПО 2022",
    teacher: "МУП Computer technology and software",
    title: "ВТИПО: Web & Mobile Development",
    short: "Web/mobile",
    roles: ["Frontend Developer", "Mobile Developer", "Full-stack Developer"],
    qualities: ["logic", "communication", "persistence"],
    gradeFocus: ["programming", "database", "english"],
    skills: ["Django", "JS frameworks", "Web security", "Android", "Mobile UX"],
    semesters: [
      ["Programming basics", "Academic writing", "ICT", "Mathematics"],
      ["Python programming language", "Database design", "Operation systems"],
      ["Computer architecture", "Networks and telecommunications", "Cybersecurity"],
      ["Java programming language", "Database administration", "Software testing"],
      ["Django Backend Framework", "JS frameworks", "Web security"],
      ["Web programming", "Mobile UX design", "Android development"],
      ["Advanced Android", "Full-cycle Web development", "Diploma preparation"],
      ["Final State Attestation", "Portfolio defense"]
    ],
    explanation: "Элективная траектория из МУП ВТИПО ведёт к Web/mobile: Django, JavaScript frameworks, Web security, Android и полный цикл разработки."
  }
];

const initialGrades = {
  math: 76,
  programming: 82,
  database: 70,
  english: 68,
  algorithms: 74,
  networks: 71,
  web: 78,
  security: 64,
  statistics: 80
};

const subjectLabels = {
  math: "Математика",
  programming: "Программирование",
  database: "Базы данных",
  english: "Английский",
  algorithms: "Алгоритмы",
  networks: "Компьютерные сети",
  web: "Web-разработка",
  security: "Кибербезопасность",
  statistics: "Статистика"
};

const qualityLabels = {
  analytical: "Аналитика",
  communication: "Коммуникация",
  business: "Бизнес-мышление",
  research: "Исследовательский интерес",
  persistence: "Настойчивость",
  logic: "Логика",
  systems: "Системное мышление",
  leadership: "Лидерство"
};

const defaultRequirements = {
  data: [
    { subject: "statistics", min: 75 },
    { subject: "database", min: 70 },
    { subject: "programming", min: 70 }
  ],
  ai: [
    { subject: "math", min: 80 },
    { subject: "programming", min: 78 },
    { subject: "algorithms", min: 75 }
  ],
  backend: [
    { subject: "programming", min: 76 },
    { subject: "database", min: 74 },
    { subject: "web", min: 70 }
  ],
  product: [
    { subject: "english", min: 72 },
    { subject: "statistics", min: 65 },
    { subject: "web", min: 65 }
  ],
  "mup-ce-security": [
    { subject: "security", min: 75 },
    { subject: "networks", min: 72 },
    { subject: "programming", min: 70 }
  ],
  "mup-ce-bigdata": [
    { subject: "statistics", min: 78 },
    { subject: "database", min: 75 },
    { subject: "programming", min: 72 }
  ],
  "vtipo-software": [
    { subject: "programming", min: 76 },
    { subject: "database", min: 70 },
    { subject: "algorithms", min: 70 }
  ],
  "vtipo-network-iot": [
    { subject: "networks", min: 76 },
    { subject: "security", min: 68 },
    { subject: "programming", min: 70 }
  ],
  "vtipo-web-mobile": [
    { subject: "web", min: 78 },
    { subject: "programming", min: 72 },
    { subject: "database", min: 68 }
  ]
};

const curriculumExample = `1 семестр: Математика, Основы программирования, Academic Writing
2 семестр: Базы данных, Python, Статистика
3 семестр: Machine Learning, Data Mining, Визуализация данных
4 семестр: Deep Learning, Cloud ML, Исследовательский проект
5 семестр: MLOps, Big Data, AI Ethics
6 семестр: NLP, Computer Vision, Индустриальный проект
7 семестр: Преддипломная практика, Model Deployment, Startup Lab
8 семестр: Дипломный проект, Стажировка, Portfolio Defense`;

const keywordRules = [
  {
    match: ["machine", "learning", "ai", "deep", "nlp", "vision", "model"],
    qualities: ["analytical", "research", "persistence"],
    gradeFocus: ["math", "programming", "english"],
    skills: ["Python", "Machine Learning", "Model Evaluation", "MLOps"],
    roles: ["ML Engineer", "AI Developer", "Data Scientist"],
    title: "AI & Machine Learning"
  },
  {
    match: ["data", "analytics", "bi", "статистика", "визуализация", "mining"],
    qualities: ["analytical", "communication", "business"],
    gradeFocus: ["math", "database", "programming"],
    skills: ["SQL", "Python", "BI dashboards", "Statistics"],
    roles: ["Data Analyst", "BI Analyst", "Product Analyst"],
    title: "Data Analytics"
  },
  {
    match: ["backend", "api", "cloud", "docker", "database", "devops", "microservice"],
    qualities: ["logic", "systems", "persistence"],
    gradeFocus: ["programming", "database", "english"],
    skills: ["Backend API", "Cloud", "Docker", "PostgreSQL"],
    roles: ["Backend Developer", "Cloud Engineer", "DevOps Junior"],
    title: "Backend & Cloud"
  },
  {
    match: ["product", "agile", "business", "ux", "startup", "management", "маркетинг"],
    qualities: ["communication", "business", "leadership"],
    gradeFocus: ["english", "database", "math"],
    skills: ["Product Discovery", "Roadmaps", "User Research", "Metrics"],
    roles: ["Product Manager", "Business Analyst", "IT Project Manager"],
    title: "Digital Product"
  }
];

function requirementsFor(trajectory) {
  return trajectory.requirements || defaultRequirements[trajectory.id] || trajectory.gradeFocus.map((subject) => ({ subject, min: 70 }));
}

function scoreTrajectory(trajectory, grades, qualities, selectedProgram) {
  const requirements = requirementsFor(trajectory);
  const gradeScore =
    requirements.reduce((sum, requirement) => {
      const value = Number(grades[requirement.subject] || 0);
      const ratio = requirement.min ? Math.min(110, (value / requirement.min) * 100) : value;
      return sum + ratio;
    }, 0) / requirements.length;
  const qualityScore =
    trajectory.qualities.reduce((sum, key) => sum + Number(qualities[key] || 0), 0) /
    trajectory.qualities.length;
  const programBonus = trajectory.programId === selectedProgram ? 8 : 0;
  const total = Math.round(gradeScore * 0.56 + qualityScore * 0.34 + programBonus);
  return Math.min(99, Math.max(1, total));
}

function requirementSummary(trajectory, grades) {
  return requirementsFor(trajectory).map((requirement) => ({
    ...requirement,
    label: subjectLabels[requirement.subject] || requirement.subject,
    value: Number(grades[requirement.subject] || 0),
    passed: Number(grades[requirement.subject] || 0) >= requirement.min
  }));
}

function parseCurriculum(rawText) {
  const semesters = Array.from({ length: 8 }, () => []);
  rawText
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line, fallbackIndex) => {
      const semesterMatch = line.match(/(\d)\s*(семестр|semester)?/i);
      const index = semesterMatch ? Math.min(7, Math.max(0, Number(semesterMatch[1]) - 1)) : fallbackIndex % 8;
      const cleaned = line
        .replace(/^\d\s*(семестр|semester)?\s*[:.-]?/i, "")
        .split(/[,;|]/)
        .map((subject) => subject.trim())
        .filter(Boolean);
      semesters[index].push(...cleaned);
    });

  return semesters.map((semester, index) =>
    semester.length ? semester : [`Элективный модуль ${index + 1}`, "Практический проект"]
  );
}

function analyzeCurriculum(rawText, fallbackTitle) {
  const text = rawText.toLowerCase();
  const rankedRules = keywordRules
    .map((rule) => ({
      ...rule,
      hits: rule.match.reduce((sum, keyword) => sum + (text.includes(keyword) ? 1 : 0), 0)
    }))
    .sort((a, b) => b.hits - a.hits);
  const bestRule = rankedRules[0].hits ? rankedRules[0] : keywordRules[1];
  const semesters = parseCurriculum(rawText);
  const subjects = semesters.flat();

  return {
    title: fallbackTitle || bestRule.title,
    qualities: bestRule.qualities,
    gradeFocus: bestRule.gradeFocus,
    skills: Array.from(new Set([...bestRule.skills, ...subjects.slice(0, 4)])),
    roles: bestRule.roles,
    semesters,
    confidence: Math.min(96, 58 + bestRule.hits * 9 + Math.min(12, subjects.length)),
    explanation: `ИИ нашёл ${subjects.length} дисциплин, сопоставил ключевые темы с навыками и определил профиль траектории: ${bestRule.title}.`
  };
}

function subjectName(rawValue) {
  const parts = String(rawValue || "")
    .replace(/\s+/g, " ")
    .trim()
    .split("/")
    .map((part) => part.trim())
    .filter(Boolean);
  return parts[1] || parts[0] || "";
}

function workbookToCurriculumText(workbook, XLSX) {
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1, blankrows: false, defval: "" });
  const semesters = Array.from({ length: 8 }, () => []);

  rows.forEach((row) => {
    const code = String(row[0] || "").trim();
    const name = subjectName(row[2]);
    if (!code || !name || !/^[BВ]/.test(code)) return;

    for (let column = 14; column <= 21; column += 1) {
      const credits = Number(row[column] || 0);
      if (credits > 0) {
        semesters[column - 14].push(`${name} (${credits} ECTS)`);
      }
    }
  });

  return semesters
    .map((subjects, index) => `${index + 1} семестр: ${subjects.slice(0, 9).join(", ") || "Практический модуль"}`)
    .join("\n");
}

async function pdfToCurriculumText(file) {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.mjs",
    import.meta.url
  ).toString();
  const data = await file.arrayBuffer();
  const document = await pdfjs.getDocument({ data }).promise;
  const pageTexts = [];

  for (let pageNumber = 1; pageNumber <= document.numPages; pageNumber += 1) {
    const page = await document.getPage(pageNumber);
    const content = await page.getTextContent();
    const text = content.items.map((item) => item.str).join(" ");
    pageTexts.push(text);
  }

  const text = pageTexts.join("\n").replace(/\s+/g, " ").trim();
  if (text.length < 160) {
    return `1 семестр: PDF "${file.name}" загружен как скан, нужен OCR для точного извлечения дисциплин
2 семестр: Преподаватель может проверить распознанные данные
3 семестр: МУП/РУП принят системой
4 семестр: AI отметит файл как требующий OCR
5 семестр: Элективные модули будут извлечены после OCR
6 семестр: Траектории будут обновлены после распознавания
7 семестр: Карьерная карта будет построена по дисциплинам
8 семестр: Дипломный проект и итоговая аттестация`;
  }

  const chunks = text
    .split(/(?=B\.|В\d|B\d|Модуль|Module|[А-ЯA-Z][\w.]+\s+\d)/)
    .map((item) => item.trim())
    .filter((item) => item.length > 12)
    .slice(0, 56);
  const semesters = Array.from({ length: 8 }, () => []);
  chunks.forEach((chunk, index) => {
    semesters[index % 8].push(chunk.slice(0, 90));
  });

  return semesters
    .map((subjects, index) => `${index + 1} семестр: ${subjects.slice(0, 7).join(", ") || "PDF module"}`)
    .join("\n");
}

function App() {
  const [role, setRole] = useState("student");
  const [programId, setProgramId] = useState("is");
  const [customTrajectories, setCustomTrajectories] = useState([]);
  const [curriculumForm, setCurriculumForm] = useState({
    teacher: "Преподаватель ОП",
    type: "МУП",
    title: "AI элективная траектория",
    rawText: curriculumExample,
    requirements: [
      { subject: "programming", min: 75 },
      { subject: "database", min: 70 },
      { subject: "statistics", min: 70 }
    ]
  });
  const [grades, setGrades] = useState(initialGrades);
  const [qualities, setQualities] = useState({
    analytical: 80,
    communication: 62,
    business: 66,
    research: 58,
    persistence: 74,
    logic: 78,
    systems: 70,
    leadership: 55
  });
  const [activeId, setActiveId] = useState("data");

  const selectedProgram = programs.find((program) => program.id === programId);
  const curriculumAnalysis = useMemo(
    () => analyzeCurriculum(curriculumForm.rawText, curriculumForm.title),
    [curriculumForm.rawText, curriculumForm.title]
  );
  const availableTrajectories = useMemo(
    () => [...trajectories, ...realMupTrajectories, ...vtipoTrajectories, ...customTrajectories],
    [customTrajectories]
  );
  const ranked = useMemo(
    () =>
      availableTrajectories
        .map((trajectory) => ({
          ...trajectory,
          score: scoreTrajectory(trajectory, grades, qualities, programId)
        }))
        .sort((a, b) => b.score - a.score),
    [availableTrajectories, grades, qualities, programId]
  );
  const active = ranked.find((trajectory) => trajectory.id === activeId) || ranked[0];
  const best = ranked[0];
  const activeRequirements = requirementSummary(active, grades);
  const isTeacher = role === "teacher";

  const updateGrade = (key, value) => setGrades((current) => ({ ...current, [key]: value }));
  const updateQuality = (key, value) => setQualities((current) => ({ ...current, [key]: value }));
  const updateCurriculumForm = (key, value) =>
    setCurriculumForm((current) => ({ ...current, [key]: value }));
  const updateRequirement = (index, key, value) =>
    setCurriculumForm((current) => ({
      ...current,
      requirements: current.requirements.map((requirement, currentIndex) =>
        currentIndex === index ? { ...requirement, [key]: key === "min" ? Number(value) : value } : requirement
      )
    }));
  const importCurriculumFile = async (file) => {
    if (!file) return;
    const isPdf = file.name.toLowerCase().endsWith(".pdf");
    let title = file.name.replace(/\.(xls|xlsx|pdf)$/i, "");
    let rawText = "";

    if (isPdf) {
      rawText = await pdfToCurriculumText(file);
    } else {
      const XLSX = await import("xlsx");
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      title = workbook.SheetNames[0] || title;
      rawText = workbookToCurriculumText(workbook, XLSX);
    }

    setCurriculumForm((current) => ({
      ...current,
      type: file.name.toLowerCase().includes("руп") ? "РУП" : "МУП",
      title,
      rawText
    }));
  };
  const addCurriculumTrajectory = () => {
    const analysis = analyzeCurriculum(curriculumForm.rawText, curriculumForm.title);
    const id = `custom-${Date.now()}`;
    const nextTrajectory = {
      id,
      programId,
      source: curriculumForm.type,
      teacher: curriculumForm.teacher,
      title: analysis.title,
      short: analysis.title,
      roles: analysis.roles,
      qualities: analysis.qualities,
      gradeFocus: analysis.gradeFocus,
      requirements: curriculumForm.requirements,
      skills: analysis.skills,
      semesters: analysis.semesters,
      explanation: `${curriculumForm.type} добавил: ${curriculumForm.teacher}. ${analysis.explanation}`
    };
    setCustomTrajectories((current) => [nextTrajectory, ...current]);
    setActiveId(id);
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark"><GraduationCap size={25} /></div>
          <div>
            <strong>EduTrajectory AI</strong>
            <span>ML-рекомендации для ОП</span>
          </div>
        </div>

        <nav className="nav">
          <a className="active" href="#dashboard"><BarChart3 size={18} /> Дашборд</a>
          <a href="#profile"><UserRound size={18} /> Профиль</a>
          {isTeacher && <a href="#constructor"><FilePlus2 size={18} /> МУП/РУП</a>}
          <a href="#map"><Map size={18} /> 8 семестров</a>
          <a href="#career"><BriefcaseBusiness size={18} /> Профессии</a>
        </nav>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <p className="eyebrow">AI advisor for {roleLabels[role].toLowerCase()}</p>
            <h1>Выбор образовательной траектории по МУП/РУП, оценкам и качествам студента</h1>
          </div>
          <div className="top-actions">
            <div className="role-switch" aria-label="Выбор роли">
              {Object.entries(roleLabels).map(([key, label]) => (
                <button
                  className={role === key ? "active" : ""}
                  key={key}
                  onClick={() => setRole(key)}
                >
                  {label}
                </button>
              ))}
            </div>
            <button className="primary-button">
              <Sparkles size={18} />
              Пересчитать
            </button>
          </div>
        </header>

        <section id="dashboard" className="summary-grid">
          <div className="recommendation-panel">
            <div className="panel-label"><Brain size={18} /> Рекомендация ML-модели</div>
            <h2>{best.title}</h2>
            <p>{best.explanation}</p>
            <div className="score-row">
              <div className="score-ring">{best.score}%</div>
              <div>
                <strong>{isTeacher ? "Рекомендация для эдвайзера" : "Рекомендация для студента"}</strong>
                <span>обязательные предметы траектории + качества + соответствие выбранной ОП</span>
              </div>
            </div>
          </div>

          <div className="program-card">
            <div className="panel-label"><BookOpen size={18} /> Образовательная программа</div>
            <label className="select-label">
              <select value={programId} onChange={(event) => setProgramId(event.target.value)}>
                {programs.map((program) => (
                  <option key={program.id} value={program.id}>{program.code} - {program.title}</option>
                ))}
              </select>
              <ChevronDown size={18} />
            </label>
            <p>{selectedProgram.description}</p>
            <div className="chips">
              {selectedProgram.core.map((item) => <span key={item}>{item}</span>)}
            </div>
          </div>
        </section>

        {isTeacher && <section id="constructor" className="curriculum-section">
          <div className="section-title">
            <ClipboardList size={20} />
            <h2>Конструктор МУП/РУП для преподавателя</h2>
          </div>
          <div className="curriculum-grid">
            <div className="curriculum-form">
              <label className="upload-box">
                <FilePlus2 size={22} />
                <span>
                  Загрузить Excel МУП/РУП
                  <small>.xls, .xlsx или .pdf, дисциплины автоматически разложатся по семестрам</small>
                </span>
                <input
                  type="file"
                  accept=".xls,.xlsx,.pdf"
                  onChange={(event) => importCurriculumFile(event.target.files?.[0])}
                />
              </label>
              <div className="input-grid">
                <label>
                  <span>Преподаватель</span>
                  <input
                    value={curriculumForm.teacher}
                    onChange={(event) => updateCurriculumForm("teacher", event.target.value)}
                  />
                </label>
                <label>
                  <span>Тип плана</span>
                  <select
                    value={curriculumForm.type}
                    onChange={(event) => updateCurriculumForm("type", event.target.value)}
                  >
                    <option>МУП</option>
                    <option>РУП</option>
                  </select>
                </label>
                <label className="wide-field">
                  <span>Название траектории</span>
                  <input
                    value={curriculumForm.title}
                    onChange={(event) => updateCurriculumForm("title", event.target.value)}
                  />
                </label>
              </div>
              <div className="requirements-editor">
                <h3>Требования траектории</h3>
                {curriculumForm.requirements.map((requirement, index) => (
                  <div className="requirement-row" key={index}>
                    <select
                      value={requirement.subject}
                      onChange={(event) => updateRequirement(index, "subject", event.target.value)}
                    >
                      {Object.entries(subjectLabels).map(([key, label]) => (
                        <option key={key} value={key}>{label}</option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={requirement.min}
                      onChange={(event) => updateRequirement(index, "min", event.target.value)}
                    />
                  </div>
                ))}
              </div>
              <label className="textarea-label">
                <span>Дисциплины по семестрам</span>
                <textarea
                  value={curriculumForm.rawText}
                  onChange={(event) => updateCurriculumForm("rawText", event.target.value)}
                />
              </label>
              <button className="secondary-button" onClick={addCurriculumTrajectory}>
                <Wand2 size={18} />
                Добавить и проанализировать
              </button>
            </div>

            <div className="analysis-card">
              <div className="panel-label"><Brain size={18} /> AI-анализ плана</div>
              <h3>{curriculumAnalysis.title}</h3>
              <p>{curriculumAnalysis.explanation}</p>
              <div className="analysis-stats">
                <div>
                  <strong>{curriculumAnalysis.semesters.flat().length}</strong>
                  <span>дисциплин</span>
                </div>
                <div>
                  <strong>{curriculumAnalysis.confidence}%</strong>
                  <span>уверенность</span>
                </div>
                <div>
                  <strong>{customTrajectories.length}</strong>
                  <span>добавлено</span>
                </div>
              </div>
              <div className="chips">
                {curriculumAnalysis.skills.slice(0, 7).map((skill) => <span key={skill}>{skill}</span>)}
              </div>
            </div>
          </div>
        </section>}

        <section className="content-grid">
          <div id="profile" className="control-panel">
            <div className="section-title">
              <SlidersHorizontal size={20} />
              <h2>{isTeacher ? "Редактирование профиля студента" : "Профиль студента"}</h2>
            </div>
            <div className="form-block">
              <h3>Оценки по 9 предметам</h3>
              {Object.entries(grades).map(([key, value]) => (
                <RangeRow key={key} label={gradeName(key)} value={value} onChange={(next) => updateGrade(key, next)} />
              ))}
            </div>
            <div className="form-block">
              <h3>{isTeacher ? "Качества и интересы студента" : "Мои качества и интересы"}</h3>
              {Object.entries(qualityLabels).map(([key, label]) => (
                <RangeRow key={key} label={label} value={qualities[key]} onChange={(next) => updateQuality(key, next)} />
              ))}
            </div>
          </div>

          <div className="results-panel">
            <div className="section-title">
              <LineChart size={20} />
              <h2>Сравнение траекторий</h2>
            </div>
            <p className="muted-text">
              Преподаватель задаёт по 3 обязательных предмета на каждую траекторию, студент заполняет оценки по 9 предметам, ML-модель считает совпадение.
            </p>
            <div className="trajectory-list">
              {ranked.map((trajectory) => (
                <button
                  className={trajectory.id === active.id ? "trajectory-item selected" : "trajectory-item"}
                  key={trajectory.id}
                  onClick={() => setActiveId(trajectory.id)}
                >
                  <span>
                    <strong>{trajectory.short}</strong>
                    <small>{requirementsFor(trajectory).map((item) => subjectLabels[item.subject] || item.subject).join(" / ")}</small>
                  </span>
                  <b>{trajectory.score}%</b>
                </button>
              ))}
            </div>

            <article className="trajectory-detail">
              <div className="detail-header">
                <div>
                  <p className="eyebrow">Выбранная траектория</p>
                  <h2>{active.title}</h2>
                </div>
                <div className="mini-score">{active.score}%</div>
              </div>
              <p>{active.explanation}</p>
              <div className="requirements-list">
                {activeRequirements.map((requirement) => (
                  <div className={requirement.passed ? "requirement-pill passed" : "requirement-pill"} key={requirement.subject}>
                    <span>{requirement.label}</span>
                    <b>{requirement.value}/{requirement.min}</b>
                  </div>
                ))}
              </div>
              <div className="chips">
                {active.skills.map((skill) => <span key={skill}>{skill}</span>)}
              </div>
              <div id="career" className="career-row">
                {active.roles.map((role) => (
                  <div key={role}>
                    <BriefcaseBusiness size={18} />
                    <span>{role}</span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section id="map" className="semester-section">
          <div className="section-title">
            <Target size={20} />
            <h2>Картина обучения на 8 семестров</h2>
          </div>
          <div className="semester-grid">
            {active.semesters.map((semester, index) => (
              <div className="semester-card" key={index}>
                <strong>{index + 1} семестр</strong>
                {semester.map((subject) => (
                  <span key={subject}><CheckCircle2 size={15} /> {subject}</span>
                ))}
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

function RangeRow({ label, value, onChange }) {
  return (
    <label className="range-row">
      <span>{label}</span>
      <input type="range" min="0" max="100" value={value} onChange={(event) => onChange(Number(event.target.value))} />
      <b>{value}</b>
    </label>
  );
}

function gradeName(key) {
  return subjectLabels[key] || key;
}

createRoot(document.getElementById("root")).render(<App />);
