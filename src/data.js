// ─────────────────────────────────────────────────────────────
//  Edit this file to update the content of the site.
// ─────────────────────────────────────────────────────────────
export const GITHUB = 'https://github.com/Prathmesh2492004'
export const LINKEDIN = 'https://www.linkedin.com/in/prathmesh-bhilegaonkar-297ba9233'
export const EMAIL = 'prathmeshbhilegaonkar@gmail.com'
export const PHONE = '+91 93705 11984'
export const PHONE_RAW = '+919370511984'
export const GITHUB_USER = 'Prathmesh2492004'

// ── Fill these in to switch features on (empty = hidden) ──
export const PHOTO = ''            // e.g. './me.png' (put the file in /public)
export const LEETCODE_USER = ''    // your LeetCode username → shows solved count
export const RESUME = './Prathmesh_Bhilegaonkar_Resume.pdf'
export const OPEN_TO_WORK = true

export const stats = [
  { value: 2, label: ['Internships,', 'one ongoing'] },
  { value: 15, live: 'public_repos', label: ['Public repos', 'on GitHub'] }, // live from GitHub API
  { value: 92, suffix: '%', label: ['Accuracy on', 'MRI tumor CNN'] },
]

// cat: 'ai' | 'web' | 'data'   thumb: key in components/Thumbs.jsx
// demo:   live URL → shows a red "Live demo" button (leave '' to hide)
// impact: up to 3 real numbers → [{ v: '92%', l: 'accuracy' }]  (leave [] to hide)
export const projects = [
  {
    title: 'KisaanSathi', kind: 'AI platform · Govt. schemes', cat: ['ai', 'web'], thumb: 'kisaan', tag: 'Flagship · RAG',
    href: `${GITHUB}/KisaanSathi`, demo: '', impact: [],
    desc: 'Farmers ask in plain language and get answers on which government schemes they qualify for, grounded in the scheme documents.',
    chips: ['RAG', 'ChromaDB', 'LLaMA 3.3 / Groq', 'FastAPI', 'React + Vite'],
  },
  {
    title: 'CareerSage AI', kind: 'Career guidance · ML', cat: ['ai', 'web'], thumb: 'career', tag: 'ML · Web app',
    href: `${GITHUB}/CareerSageAI`, demo: '', impact: [],
    desc: 'Recommends career paths for Class 10 and 12 students from academic scores and an aptitude test, served through Flask REST endpoints.',
    chips: ['Python', 'scikit-learn', 'Flask', 'React.js'],
  },
  {
    title: 'Brain Tumor Detection', kind: 'CNN · Medical imaging', cat: ['ai'], thumb: 'brain', tag: 'Deep learning',
    href: `${GITHUB}/Brain-Tumor-Detection`, demo: '',
    impact: [{ v: '92%', l: 'Classification accuracy' }],
    desc: 'CNN classifier for MRI scans with OpenCV preprocessing and augmentation, tracked on accuracy, precision and recall.',
    chips: ['TensorFlow / Keras', 'OpenCV', 'CNN'],
  },
  {
    title: 'DevAssist', kind: 'Code Q&A · GitHub App', cat: ['ai', 'web'], thumb: 'dev', tag: 'In progress',
    href: `${GITHUB}?tab=repositories&q=DevAssist`, demo: '', impact: [],
    desc: 'Ask questions about a codebase and get answers with cited sources, plus automated pull-request review through a GitHub App.',
    chips: ['FastAPI', 'Embeddings', 'GitHub App', 'LLM'],
  },
  {
    title: 'Intellix AI', kind: 'Smart assistant · Gemini', cat: ['ai'], thumb: 'intellix', tag: 'Team project',
    href: `${GITHUB}/Intellix-AI`, demo: '', impact: [],
    desc: 'A conversational assistant built on the Gemini API that answers user queries in a clean chat interface.',
    chips: ['Python', 'Gemini API', 'Prompting'],
  },
  {
    title: 'ChessMate', kind: 'Full-stack · Game engine', cat: ['web'], thumb: 'chess', tag: 'Game AI',
    href: GITHUB, demo: '#chess', demoLabel: 'Play it here',
    desc: 'A playable chess web app with a minimax engine on a Flask backend, using python-chess for move generation.',
    chips: ['Flask', 'python-chess', 'Minimax', 'JavaScript'],
  },
  {
    title: 'E-commerce Sales & Customer Analytics', kind: 'SQL · Python · BI', cat: ['data'], thumb: 'ecom', tag: 'Dashboard',
    href: `${GITHUB}?tab=repositories`, demo: '', impact: [],
    desc: 'Sales trends, customer segments and repeat-purchase behaviour pulled from raw order data into a decision-ready dashboard.',
    chips: ['SQL', 'Pandas', 'Power BI'],
  },
  {
    title: 'Vendor Performance Analysis', kind: 'SQL · Python · EDA', cat: ['data'], thumb: 'vendor', tag: 'Analysis',
    href: `${GITHUB}?tab=repositories`, demo: '', impact: [],
    desc: 'Ranks suppliers on delivery, cost and margin so slow-moving stock and underperforming vendors stand out.',
    chips: ['MySQL', 'Python', 'EDA'],
  },
  {
    title: 'HR Analytics Dashboard', kind: 'BI · People data', cat: ['data'], thumb: 'hr', tag: 'Dashboard',
    href: `${GITHUB}?tab=repositories`, demo: '', impact: [],
    desc: 'Attrition, tenure and department breakdowns that show where and why employees leave.',
    chips: ['Power BI', 'Excel', 'DAX'],
  },
]

export const tools = ['Java', 'Python', 'JavaScript', 'React.js', 'Node.js', 'Express', 'Flask', 'FastAPI', 'MySQL', 'MongoDB', 'C++', 'AWS', 'Azure', 'GCP', 'Git']

export const education = [
  { title: 'B.Tech, Computer Science Engineering', year: '2026', sub: 'MIT ADT University, Pune · CGPA 6.83' },
  { title: 'Diploma, Information Technology', year: '2023', sub: 'Pimpri Chinchwad Polytechnic, Pune · 79%' },
]

export const skills = [
  { label: 'Languages', items: ['Java', 'Python', 'JavaScript', 'C++', 'SQL'] },
  { label: 'Web & backend', items: ['React.js', 'Node.js', 'Express.js', 'Flask', 'REST APIs', 'HTML5 / CSS3'] },
  { label: 'Data & cloud', items: ['MySQL', 'MongoDB', 'AWS', 'Azure', 'GCP'] },
  { label: 'Practices', items: ['DSA', 'OOP', 'Agile', 'CI/CD', 'Git', 'Unit testing'] },
]

export const steps = [
  { t: 'Understand', d: 'Pin down who uses it and what problem it has to solve.' },
  { t: 'Model the data', d: 'Design the schema and API contracts before any UI.' },
  { t: 'Build', d: 'Ship a thin end-to-end slice, then widen it feature by feature.' },
  { t: 'Test', d: 'Unit tests, edge cases and real data before calling it done.' },
  { t: 'Ship & iterate', d: "Deploy, watch how it's used, fix what people trip on." },
]

export const journey = [
  {
    when: '08/2026 – Now', title: 'Software Developer Intern', sub: 'Nova IoT Systems · Pune', open: true,
    points: [
      'Developing applications that turn live IoT sensor data into clear, actionable results for end users.',
      'Building React.js dashboards and visualizations for real-time device data.',
      'Working with hardware teams to connect device data feeds into the application layer.',
    ],
  },
  {
    when: '01/2026 – 05/2026', title: 'Front-end Developer Intern', sub: 'ITM Department, MIT ADT University · Pune',
    points: [
      'Developed and maintained a React.js web application under the ITM Department Head.',
      'Turned requirements into working frontend features with the team.',
      'Implemented forms, dashboards and authentication UI with API integration.',
    ],
  },
  {
    when: 'Grad. 06/2026', title: 'B.Tech, Computer Science', sub: 'MIT ADT University · Pune',
    points: ['Core focus on OOP, DBMS, data structures and algorithms.', 'Built CareerSage AI and Brain Tumor Detection as major projects.'],
  },
  {
    when: 'Grad. 06/2023', title: 'Diploma, Information Technology', sub: 'Pimpri Chinchwad Polytechnic · Pune · 79%',
    points: ['Foundations in programming, networking and databases.'],
  },
]

export const shipped = [
  { name: 'KisaanSathi', sub: 'AI · Govt. schemes', href: `${GITHUB}/KisaanSathi` },
  { name: 'CareerSage AI', sub: 'ML · Web app', href: `${GITHUB}/CareerSageAI` },
  { name: 'Brain Tumor Detection', sub: 'CNN · 92% accuracy', href: `${GITHUB}/Brain-Tumor-Detection` },
  { name: 'LeetCode solutions', sub: 'DSA practice log', href: `${GITHUB}/LeetCode` },
]

export const certifications = ['Python for Data Science & ML', 'MySQL for Data Analytics & BI', 'Data Science', 'Full Stack Web Development']
