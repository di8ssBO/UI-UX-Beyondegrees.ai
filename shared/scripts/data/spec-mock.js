/* spec-mock.js — trích nguyên văn MOCK_DATA + SPEC_UNI_MAP từ mobile mobile/major/spec-detail.
   MOCK_DATA keyed by "majorId_specIdx" (stats/careers/skills/tools/admission/exams/language).
   SPEC_UNI_MAP keyed by "majorId_specIdx" -> danh sách university id (Where to Study). */
var MOCK_DATA = {

  /* ── Mathematics ── */
  '104_0':{ /* Pure Mathematics */
    entrySalary:'$52K', avgSalary:'$98K', employment:'89%',
    careers:['Research Mathematician','Data Scientist','Quantitative Analyst','Actuary','Cryptographer','Professor','Financial Analyst'],
    roadmap:[
      {phase:'Y1',label:'Foundations',chips:['Calculus I–III','Linear Algebra','Discrete Math','Proof Writing','Logic']},
      {phase:'Y2',label:'Core Theory',chips:['Real Analysis','Abstract Algebra','Number Theory','Complex Analysis','Probability']},
      {phase:'Y3',label:'Advanced Topics',chips:['Topology','Differential Geometry','Functional Analysis','Graph Theory','PDEs']},
      {phase:'Y4',label:'Research & Thesis',chips:['Independent Research','Advanced Seminar','Thesis/Capstone','Internship']},
    ],
    coreSkills:['Abstract Reasoning','Theorem Proving','Mathematical Modeling','Statistical Analysis','Formal Logic'],
    tools:['LaTeX','Python (SageMath)','MATLAB','Mathematica','R'],
    admission:'Minimum GPA 3.0. Strong high-school calculus background required. Statement of purpose and two academic references for graduate programs. Research experience is a plus.',
    exams:'GRE General Test (recommended). GRE Math Subject Test for competitive PhD programs. Professional: FRM or CFA for Mathematical Finance track; SOA/CAS Actuarial Exams.',
    language:'English: IELTS 6.5+ / TOEFL 90+. Most leading programs taught in English. Vietnamese programs available at VNU-HUS and HCMUS. French-language options via USTH partnership.',
  },
  '104_1':{ /* Statistics & Probability */
    entrySalary:'$58K', avgSalary:'$105K', employment:'94%',
    careers:['Data Analyst','Biostatistician','Risk Analyst','ML Engineer','Market Researcher','Epidemiologist'],
    roadmap:[
      {phase:'Y1',label:'Math Foundations',chips:['Calculus','Linear Algebra','Intro Probability','Intro Statistics','Programming']},
      {phase:'Y2',label:'Statistical Theory',chips:['Math Statistics','Regression','Bayesian Inference','Experimental Design','R']},
      {phase:'Y3',label:'Applied Methods',chips:['Machine Learning','Time Series','Survival Analysis','Multivariate Stats','SQL']},
      {phase:'Y4',label:'Specialization',chips:['Capstone Project','Industry Internship','Advanced ML','Consulting Practicum']},
    ],
    coreSkills:['Statistical Inference','Hypothesis Testing','Predictive Modeling','Data Visualization','Bayesian Analysis'],
    tools:['R','Python','SPSS','SAS','Tableau','SQL'],
    admission:'GPA ≥ 3.0. Background in calculus and probability required. Coding experience in Python or R highly recommended. Graduate programs may require GRE scores and research proposal.',
    exams:'ASA/FSA Actuarial Exams for finance track. SAS Certified Statistical Business Analyst. Google Data Analytics Certificate (entry level). AWS Machine Learning Specialty.',
    language:'English: IELTS 6.5+ / TOEFL 90+. Major programs taught in English. Vietnamese-language programs available domestically. Some bilingual (VN–EN) coursework offered.',
  },
  '104_2':{ /* Computational Mathematics */
    entrySalary:'$65K', avgSalary:'$112K', employment:'96%',
    careers:['Computational Scientist','Algorithm Engineer','Simulation Developer','Data Engineer','Quantitative Developer','Research Engineer'],
    roadmap:[
      {phase:'Y1',label:'CS & Math Foundations',chips:['Calculus','Linear Algebra','Programming (Python/C++)','Discrete Math','Numerical Methods I']},
      {phase:'Y2',label:'Core Algorithms',chips:['Numerical Analysis','Scientific Computing','Algorithm Design','Parallel Programming','Data Structures']},
      {phase:'Y3',label:'Applied Simulation',chips:['Finite Element Methods','Optimization','Monte Carlo Methods','HPC','Mathematical Software']},
      {phase:'Y4',label:'Capstone',chips:['Research Project','Industry Internship','Software Portfolio','Thesis (opt.)']},
    ],
    coreSkills:['Algorithm Design','Numerical Analysis','Scientific Programming','Optimization','Mathematical Modeling'],
    tools:['Python','C++','MATLAB','Julia','HPC Clusters','Git'],
    admission:'GPA ≥ 3.0. Strong mathematics and programming background. Proficiency in at least one programming language (Python, C++, or Julia). Some programs require a coding assessment.',
    exams:'No standardized certification required. GRE recommended for US graduate programs. Competitive programming profiles (Codeforces, LeetCode) valued for industry roles.',
    language:'English: IELTS 6.0+ / TOEFL 80+. All internationally competitive programs taught in English. Technical documentation primarily in English.',
  },
  '104_3':{ /* Mathematical Finance */
    entrySalary:'$75K', avgSalary:'$135K', employment:'92%',
    careers:['Quantitative Analyst','Risk Manager','Derivatives Trader','Portfolio Manager','Financial Engineer','Hedge Fund Analyst'],
    roadmap:[
      {phase:'Y1',label:'Foundations',chips:['Calculus & Linear Algebra','Probability & Statistics','Financial Markets Intro','Economics Basics','Programming (Python/R)']},
      {phase:'Y2',label:'Core Finance',chips:['Stochastic Calculus','Financial Derivatives','Portfolio Theory','Time Series Analysis','Database & SQL']},
      {phase:'Y3',label:'Advanced Quant',chips:['Options Pricing (Black-Scholes)','Fixed Income','Risk Modeling','ML in Finance','Algorithmic Trading']},
      {phase:'Y4',label:'Capstone',chips:['Quant Research Project','Finance Internship','CFA/FRM Prep','Thesis']},
    ],
    coreSkills:['Stochastic Calculus','Options Pricing','Risk Modeling','Algorithmic Trading','Statistical Arbitrage'],
    tools:['Python (pandas/numpy)','R','MATLAB','Bloomberg Terminal','SQL','Excel (advanced)'],
    admission:'Strong math background (Calculus, Statistics, Linear Algebra). Programming knowledge required. Some programs require relevant work experience for MS admission. GPA ≥ 3.2 preferred.',
    exams:'CFA Level 1 recommended. FRM Part I/II for risk management track. Series 7 (USA) for trading roles. GRE Quantitative score ≥ 165 for top programs.',
    language:'English: IELTS 7.0+ / TOEFL 100+. All top programs in English. Financial industry communication predominantly in English globally.',
  },

  /* ── Computer Science ── */
  '105_0':{ /* Software Engineering */
    entrySalary:'$72K', avgSalary:'$130K', employment:'97%',
    careers:['Software Engineer','Backend Developer','Full-Stack Dev','DevOps Engineer','Platform Engineer','Tech Lead'],
    roadmap:[
      {phase:'Y1',label:'CS Foundations',chips:['Algorithms & DS','OOP','Discrete Math','Linux/CLI','Git']},
      {phase:'Y2',label:'Systems & Web',chips:['OS','Databases','Web Dev','Networks','Design Patterns']},
      {phase:'Y3',label:'Advanced Eng.',chips:['Distributed Systems','Cloud','Software Arch.','CI/CD','Security']},
      {phase:'Y4',label:'Capstone',chips:['Capstone Project','Internship','Open Source','System Design Prep']},
    ],
    coreSkills:['Algorithms','System Design','Problem Solving','Code Review','API Design','Testing'],
    tools:['Python / Java / Go','React / Node.js','Docker','AWS/GCP','PostgreSQL','GitHub Actions'],
    admission:'Strong math background (Calculus, Discrete Math). Coding aptitude test required by some programs. GitHub portfolio valued. GPA ≥ 3.0 for graduate programs.',
    exams:'AWS Solutions Architect / Cloud Practitioner. Google Cloud Professional Architect. Oracle Java Certification. LeetCode / HackerRank competitive programming recommended.',
    language:'English: IELTS 6.0+ / TOEFL 80+. All top CS programs in English. Technical writing and documentation skills expected.',
  },
  '105_1':{ /* Artificial Intelligence & ML */
    entrySalary:'$85K', avgSalary:'$145K', employment:'98%',
    careers:['ML Engineer','AI Researcher','Data Scientist','NLP Engineer','Computer Vision Engineer','AI Product Manager'],
    roadmap:[
      {phase:'Y1',label:'Foundations',chips:['Linear Algebra','Probability','Python','Algorithms','Data Structures']},
      {phase:'Y2',label:'Core ML',chips:['Machine Learning','Deep Learning','Neural Networks','Feature Engineering','Model Evaluation']},
      {phase:'Y3',label:'Specialization',chips:['Computer Vision','NLP / LLMs','Reinforcement Learning','MLOps','Research Methods']},
      {phase:'Y4',label:'Research / Industry',chips:['AI Research Project','Industry Internship','AI Ethics','Thesis / Publication']},
    ],
    coreSkills:['Machine Learning','Deep Learning','Model Design','Data Preprocessing','Research Methodology'],
    tools:['Python','PyTorch / TensorFlow','Scikit-learn','HuggingFace','Docker','Jupyter'],
    admission:'Strong mathematics (Linear Algebra, Calculus, Probability) and programming required. Python proficiency essential. Research statement for PhD programs. GPA ≥ 3.5 for top programs.',
    exams:'TensorFlow Developer Certificate. AWS Machine Learning Specialty. Google Cloud ML Engineer. Kaggle competitions profile valued for industry positions.',
    language:'English: IELTS 6.5+ / TOEFL 90+. Research literature exclusively in English. Strong English technical writing required for publications and internships.',
  },
  '105_2':{ /* Cybersecurity */
    entrySalary:'$70K', avgSalary:'$120K', employment:'96%',
    careers:['Security Analyst','Penetration Tester','SOC Analyst','Security Engineer','CISO (long-term)','Forensic Investigator'],
    roadmap:[
      {phase:'Y1',label:'Foundations',chips:['Networking','Linux/Unix','Programming (Python)','Cryptography Basics','Security Concepts']},
      {phase:'Y2',label:'Core Security',chips:['Network Security','Web App Security','Ethical Hacking','Malware Analysis','Security Protocols']},
      {phase:'Y3',label:'Advanced',chips:['Penetration Testing','Digital Forensics','Incident Response','Cloud Security','Threat Intelligence']},
      {phase:'Y4',label:'Specialization',chips:['Red Team / Blue Team','Security Research','Capstone / CTF','Internship (SOC/CERT)']},
    ],
    coreSkills:['Ethical Hacking','Threat Analysis','Incident Response','Network Security','Digital Forensics'],
    tools:['Kali Linux','Wireshark','Metasploit','Burp Suite','Splunk','SIEM platforms'],
    admission:'Background in networking and operating systems required. Programming skills (Python, Bash) expected. Some programs require security clearance eligibility for government-track roles.',
    exams:'CompTIA Security+ (entry). CEH (Certified Ethical Hacker). CISSP for senior roles. OSCP (Offensive Security) for penetration testing. AWS Security Specialty.',
    language:'English: IELTS 6.0+ / TOEFL 80+. Security certifications and documentation primarily in English. Global industry language.',
  },
  '105_3':{ /* Data Science & Analytics */
    entrySalary:'$68K', avgSalary:'$118K', employment:'95%',
    careers:['Data Scientist','Business Analyst','BI Developer','Analytics Engineer','Product Analyst','Research Scientist'],
    roadmap:[
      {phase:'Y1',label:'Foundations',chips:['Statistics','Python / R','SQL','Math (Calc/LinAlg)','Data Visualization']},
      {phase:'Y2',label:'Analytics Core',chips:['Machine Learning','Database Design','EDA','A/B Testing','Business Intelligence']},
      {phase:'Y3',label:'Advanced',chips:['Big Data (Spark)','Deep Learning','NLP','Cloud Data Platforms','Causal Inference']},
      {phase:'Y4',label:'Capstone',chips:['Industry Internship','Data Product Project','Stakeholder Comm.','Portfolio Review']},
    ],
    coreSkills:['Statistical Analysis','Machine Learning','Data Visualization','SQL & ETL','Business Communication'],
    tools:['Python','R','SQL','Tableau / Power BI','dbt','Spark / Databricks'],
    admission:'GPA ≥ 3.0. Background in statistics and programming. Portfolio of data projects (GitHub, Kaggle) strongly valued. Some MS programs require 1–2 years work experience.',
    exams:'Google Data Analytics Certificate. Microsoft Power BI Data Analyst Associate. Databricks Certified Associate Developer. Tableau Desktop Specialist.',
    language:'English: IELTS 6.5+ / TOEFL 90+. Stakeholder communication and documentation in English for most global roles. Local programs available in Vietnamese.',
  },

  /* ── Physics ── */
  '106_0':{ /* Quantum Physics */
    entrySalary:'$55K', avgSalary:'$108K', employment:'85%',
    careers:['Quantum Computing Researcher','Physicist','R&D Engineer','Quantum Software Dev','Materials Scientist','University Lecturer'],
    roadmap:[
      {phase:'Y1',label:'Physics Foundations',chips:['Classical Mechanics','Electromagnetism','Calculus & LinAlg','Thermodynamics','Lab Skills']},
      {phase:'Y2',label:'Quantum Core',chips:['Quantum Mechanics I','Special Relativity','Statistical Physics','Complex Analysis','Computational Physics']},
      {phase:'Y3',label:'Advanced Quantum',chips:['Quantum Mechanics II','Quantum Field Theory','Condensed Matter','Quantum Information','Research Methods']},
      {phase:'Y4',label:'Research',chips:['Thesis Research','Lab / Simulation Work','Conference Presentation','Industry Placement']},
    ],
    coreSkills:['Quantum Mechanics','Mathematical Physics','Scientific Computing','Laboratory Methods','Critical Analysis'],
    tools:['Python (QuTiP)','MATLAB','Mathematica','LaTeX','Qiskit (Quantum Computing)'],
    admission:'Strong background in physics and mathematics (Calculus III, Linear Algebra, Differential Equations). Research statement required for PhD programs. GPA ≥ 3.2.',
    exams:'GRE Physics Subject Test for US PhD programs. No industry-standard certification required at undergraduate level. Quantum computing: IBM Quantum / Qiskit certifications emerging.',
    language:'English: IELTS 6.5+ / TOEFL 90+. Scientific research literature entirely in English. German or French may be useful for European research institutes.',
  },
  '106_1':{ /* Astrophysics & Cosmology */
    entrySalary:'$48K', avgSalary:'$95K', employment:'78%',
    careers:['Astrophysicist','Research Scientist','Data Scientist (Space Tech)','Science Communicator','Observatory Analyst','NASA/ESA Researcher'],
    roadmap:[
      {phase:'Y1',label:'Foundations',chips:['Classical Mechanics','Electromagnetism','Calculus','Astronomy Intro','Programming (Python)']},
      {phase:'Y2',label:'Astrophysics Core',chips:['Stellar Astrophysics','Galactic Structure','Observational Astronomy','Statistical Methods','Radiative Transfer']},
      {phase:'Y3',label:'Cosmology & Research',chips:['Cosmology','Plasma Astrophysics','Numerical Simulations','Telescope Operations','Data Pipelines']},
      {phase:'Y4',label:'Research',chips:['Observational Thesis','Computational Project','International Collaboration','Outreach']},
    ],
    coreSkills:['Observational Astronomy','Data Reduction','Scientific Python','Cosmological Modeling','Statistical Analysis'],
    tools:['Python (Astropy)','IDL','IRAF','HEALPix','NASA/ESA Archives','LaTeX'],
    admission:'Physics and mathematics background required. Research experience at an observatory or in computational physics valued. GPA ≥ 3.0. Strong letters of recommendation for PhD programs.',
    exams:'GRE Physics Subject Test. No mandatory industry certifications — portfolio of research publications matters most.',
    language:'English: IELTS 6.5+ / TOEFL 90+. All major journals and conferences in English. Some programs offered in German (ESO partner universities) or French (Observatoire de Paris).',
  },

  /* ── Biology ── */
  '109_0':{ /* Molecular Biology & Genetics */
    entrySalary:'$48K', avgSalary:'$88K', employment:'87%',
    careers:['Research Scientist','Genetic Counselor','Biotech Researcher','Lab Technician','Pharmaceutical Researcher','Bioinformatician'],
    roadmap:[
      {phase:'Y1',label:'Foundations',chips:['Cell Biology','General Chemistry','Organic Chemistry','Calculus','Lab Techniques']},
      {phase:'Y2',label:'Core Molecular Bio',chips:['Molecular Biology','Genetics','Biochemistry','Microbiology','Bioinformatics Intro']},
      {phase:'Y3',label:'Advanced',chips:['Genomics & Proteomics','Gene Editing (CRISPR)','Structural Biology','Research Design','Advanced Lab']},
      {phase:'Y4',label:'Research',chips:['Thesis Research','Lab Rotation','Industry/Hospital Internship','Science Communication']},
    ],
    coreSkills:['Molecular Cloning','PCR & Sequencing','CRISPR Techniques','Data Analysis','Scientific Writing'],
    tools:['NCBI / GenBank','Benchling','ImageJ','R (Bioconductor)','FlowJo','GraphPad Prism'],
    admission:'Strong biology and chemistry background required. Lab experience valuable. GPA ≥ 3.0. Graduate programs typically require GRE and research publications or honors thesis.',
    exams:'ASCP Board of Certification (Medical Laboratory). GRE Biology Subject Test for PhD programs. No mandatory cert for industry roles — lab portfolio matters most.',
    language:'English: IELTS 6.0+ / TOEFL 80+. Scientific publications and protocols in English. Vietnamese programs available at HCMUS and VNU-HUS Biology departments.',
  },

  /* ── Medical ── */
  '121_0':{ /* Anatomy & Physiology */
    entrySalary:'$42K', avgSalary:'$78K', employment:'91%',
    careers:['Medical Doctor (pre-req)','Physician Assistant','Physical Therapist','Medical Educator','Research Scientist','Clinical Lab Specialist'],
    roadmap:[
      {phase:'Y1',label:'Basic Sciences',chips:['Cell Biology','General Chemistry','Physics','Mathematics','Medical Terminology']},
      {phase:'Y2',label:'Core Medical Sciences',chips:['Anatomy I & II','Physiology','Histology','Biochemistry','Embryology']},
      {phase:'Y3',label:'Systems Integration',chips:['Cardiovascular','Neuroscience','Endocrinology','Respiratory','Renal Physiology']},
      {phase:'Y4',label:'Clinical Preparation',chips:['Clinical Shadowing','Research Project','USMLE Step 1 Prep','Case Studies']},
    ],
    coreSkills:['Anatomical Knowledge','Clinical Reasoning','Laboratory Dissection','Patient Communication','Evidence-Based Practice'],
    tools:['Visible Body (3D Anatomy)','Complete Anatomy App','PubMed','Cadaver Lab','Microscopy'],
    admission:'Strong background in biology and chemistry required. Medical school prerequisites (Biology, Chemistry, Physics, Math). MCAT preparation recommended. GPA ≥ 3.5 for medical school.',
    exams:'MCAT (for US medical school). USMLE Step 1 (during medical school). National medical board exams vary by country. GAMSAT for Australian/UK medical programs.',
    language:'English: IELTS 7.0+ / TOEFL 100+ for international medical programs. Vietnamese medical programs available (Hue University of Medicine, HCMC University of Medicine and Pharmacy).',
  },
  '122_0':{ /* Internal Medicine */
    entrySalary:'$60K', avgSalary:'$220K', employment:'99%',
    careers:['Internist / General Physician','Hospitalist','Specialist (Cardiology/Nephrology)','Clinical Researcher','Medical Educator'],
    roadmap:[
      {phase:'Y1-2',label:'Pre-clinical Sciences',chips:['Anatomy','Physiology','Biochemistry','Pharmacology','Pathology']},
      {phase:'Y3-4',label:'Clinical Clerkships',chips:['Internal Medicine Rotation','Emergency Medicine','Surgery Clerkship','Radiology','Diagnostics']},
      {phase:'Y5-6',label:'Advanced Clinical',chips:['Sub-specialty Electives','Research Project','Case Presentations','Board Exam Prep']},
      {phase:'Residency',label:'Residency (3 yrs)',chips:['PGY1–PGY3 Training','Subspecialty Fellowship','Board Certification','Continuing Education']},
    ],
    coreSkills:['Clinical Diagnosis','Patient Communication','Evidence-Based Medicine','Procedural Skills','Team Collaboration'],
    tools:['UpToDate','EMR Systems (Epic)','Clinical Decision Tools','Stethoscope / Diagnostic Instruments'],
    admission:'Medical degree (MBBS/MD) required. USMLE Steps 1, 2CK, 2CS for US residency. PLAB for UK. Letters of recommendation and clinical volunteer experience essential.',
    exams:'USMLE Step 1, Step 2CK (USA). PLAB 1 & 2 (UK). AMC (Australia). National medical council exams by country. ABIM (American Board of Internal Medicine) for board certification.',
    language:'English: IELTS 7.5+ / TOEFL 105+ for USA/UK/AUS programs. Proficiency in local language important for patient care in non-English countries.',
  },

  /* ── Agriculture ── */
  '126_0':{ /* Agronomy & Crop Science */
    entrySalary:'$38K', avgSalary:'$68K', employment:'83%',
    careers:['Agronomist','Crop Consultant','Agricultural Extension Officer','Research Scientist','Soil Scientist','Farm Manager'],
    roadmap:[
      {phase:'Y1',label:'Foundations',chips:['Plant Biology','Soil Science','General Chemistry','Mathematics','Agricultural Ecology']},
      {phase:'Y2',label:'Core Agronomy',chips:['Crop Production','Soil Fertility','Irrigation Management','Pest Management','Agricultural Statistics']},
      {phase:'Y3',label:'Advanced',chips:['Precision Agriculture','Crop Breeding','Climate Adaptation','Sustainable Farming','Field Research']},
      {phase:'Y4',label:'Capstone',chips:['Farm Practicum','Research Thesis','Extension Project','Industry Placement']},
    ],
    coreSkills:['Soil Analysis','Crop Management','Irrigation Design','Pest Identification','Data Interpretation'],
    tools:['ArcGIS / QGIS','Drone (DJI + AgriMapping)','R / Python (agro models)','NDVI Analysis','Weather Stations'],
    admission:'Background in biology and chemistry preferred. Field experience (farm work or agricultural internship) valued. GPA ≥ 2.8. Some programs accept students from related sciences.',
    exams:'Certified Crop Adviser (CCA) — American Society of Agronomy. Agronomist-in-Training (AIT). Pesticide Applicator License (country-specific). No mandatory national exam for most undergraduate programs.',
    language:'English: IELTS 6.0+ / TOEFL 78+ for international programs. Vietnamese programs widely available: Nong Lam University, Can Tho University, HUA (Hanoi). Local language important for extension work.',
  },

  /* ── Economics ── */
  '130_0':{ /* Macroeconomics & Policy */
    entrySalary:'$48K', avgSalary:'$92K', employment:'86%',
    careers:['Economist','Policy Analyst','Central Bank Researcher','Government Advisor','Think Tank Analyst','Economic Journalist'],
    roadmap:[
      {phase:'Y1',label:'Foundations',chips:['Microeconomics','Macroeconomics','Calculus','Statistics','Economic History']},
      {phase:'Y2',label:'Core Theory',chips:['Intermediate Macro','Econometrics','International Trade','Public Finance','Development Economics']},
      {phase:'Y3',label:'Policy & Research',chips:['Monetary Policy','Fiscal Policy','Applied Econometrics','Policy Evaluation','Research Methods']},
      {phase:'Y4',label:'Capstone',chips:['Economics Thesis','Policy Internship (IMF/WB/Govt)','Data Analysis Project','Publishing Paper']},
    ],
    coreSkills:['Economic Modeling','Econometric Analysis','Policy Evaluation','Data Interpretation','Report Writing'],
    tools:['R','Stata','MATLAB','Python','Bloomberg','FRED / World Bank Data APIs'],
    admission:'Mathematics background (Calculus, Statistics) required. Strong analytical and writing skills. Some graduate programs require GRE Quantitative ≥ 160 and economics research experience.',
    exams:'GRE General Test for US graduate programs. No mandatory professional certification for economists. CFA for finance-track economists. CFE for government and central bank roles.',
    language:'English: IELTS 7.0+ / TOEFL 100+ for international programs. Vietnamese programs available at NEU, FTU, UEH. Policy roles require strong English and local language.',
  },

  /* ── Law ── */
  '133_0':{ /* Corporate & Commercial Law */
    entrySalary:'$55K', avgSalary:'$125K', employment:'88%',
    careers:['Corporate Lawyer','M&A Associate','In-House Counsel','Contract Specialist','Compliance Officer','Legal Consultant'],
    roadmap:[
      {phase:'Y1',label:'Legal Foundations',chips:['Constitutional Law','Contract Law','Legal Research & Writing','Torts','Legal Systems']},
      {phase:'Y2',label:'Core Commercial',chips:['Company Law','Commercial Law','Tax Law','Banking & Finance Law','Property Law']},
      {phase:'Y3',label:'Advanced Practice',chips:['M&A & Corporate Transactions','Capital Markets','International Trade Law','Dispute Resolution','Moot Court']},
      {phase:'Y4',label:'Professional Prep',chips:['Law Internship (Firm / In-House)','Bar Exam Prep','Thesis','Pro Bono Project']},
    ],
    coreSkills:['Legal Drafting','Contract Negotiation','Due Diligence','Legal Research','Client Advisory'],
    tools:['Westlaw / LexisNexis','DocuSign','Microsoft 365','Contract Management Software','Legal Databases'],
    admission:'No specific undergraduate major required (common law countries). Pre-law courses recommended (Logic, Writing, Political Science). Strong GPA and LSAT (US) or aptitude test. Interview required at many law schools.',
    exams:'LSAT (USA/Canada). LNAT (UK). Bar Exam (post-graduation, country-specific). Vietnam: National Bar Examination + Judicial Academy training. CFA/CPA may complement for corporate finance roles.',
    language:'English: IELTS 7.0+ / TOEFL 100+ for international LLM programs. Vietnamese Law: Vietnam National University Law School, Ho Chi Minh City University of Law. Bilingual legal skills (EN–VN) highly valued in Vietnam.',
  },
};
window.MOCK_DATA=MOCK_DATA;

var SPEC_UNI_MAP={
  /* Mathematics (104) */
  '104_0':['mit','eth','oxford','tum'],
  '104_1':['nus','tum','ucla','ucsd','duke'],
  '104_2':['mit','kaist','eth','tum'],
  '104_3':['columbia','duke','eth','sciencespo'],
  /* Computer Science (105) */
  '105_0':['mit','fpt','rmit','kaist','ucla'],
  '105_1':['mit','kaist','tsinghua','nus','columbia'],
  '105_2':['mit','kaist','ucla','tum','rmit'],
  '105_3':['nus','tum','ucla','columbia','fpt'],
  /* Physics (106) */
  '106_0':['mit','eth','tum','kaist'],
  '106_1':['mit','eth','oxford','anu'],
  '106_2':['mit','eth','kaist','tum'],
  '106_3':['eth','kaist','tum','mit'],
  /* Chemistry (107) */
  '107_0':['eth','tum','oxford','nus'],
  '107_1':['eth','mit','tum','oxford'],
  '107_2':['tum','eth','nus','anu'],
  '107_3':['eth','tum','tudelft','nus'],
  /* Earth Sciences (108) */
  '108_0':['anu','mit','tum','oxford'],
  '108_1':['mit','oxford','anu','eth'],
  '108_2':['anu','mit','auckland','ucla'],
  '108_3':['tudelft','tum','nus','eth'],
  /* Biology (109) */
  '109_0':['mit','oxford','nus','kaist'],
  '109_1':['oxford','nus','mahidol','tum'],
  '109_2':['anu','oxford','auckland','tudelft'],
  '109_3':['anu','oxford','auckland','nus'],
  /* Civil Engineering (110) */
  '110_0':['tudelft','tum','mit','nus'],
  '110_1':['tudelft','tum','nus','auckland'],
  '110_2':['tudelft','tum','nus','ufl'],
  '110_3':['tudelft','mit','tum','nus'],
  /* Electrical Engineering (111) */
  '111_0':['tum','nus','kaist','tudelft','fpt'],
  '111_1':['nus','kaist','tum','rmit','fpt'],
  '111_2':['kaist','fpt','rmit','tum','nus'],
  '111_3':['kaist','mit','tum','nus','eth'],
  /* Mechanical Engineering (112) */
  '112_0':['tum','eth','mit','kaist'],
  '112_1':['tum','eth','mit','oxford'],
  '112_2':['kaist','mit','tum','nus','fpt'],
  '112_3':['tum','eth','kaist','oxford'],
  /* Chemical Engineering (113) */
  '113_0':['eth','tum','nus','tudelft'],
  '113_1':['tudelft','tum','nus','anu'],
  '113_2':['eth','tum','nus','kaist'],
  '113_3':['tudelft','eth','tum','nus'],
  /* Materials Science (114) */
  '114_0':['mit','eth','kaist','tum'],
  '114_1':['mit','oxford','nus','tum'],
  '114_2':['eth','tum','nus','kaist'],
  '114_3':['tum','eth','nus','auckland'],
  /* Biomedical Engineering (115) */
  '115_0':['tum','mit','eth','nus'],
  '115_1':['tum','mit','eth','oxford'],
  '115_2':['eth','mit','nus','oxford'],
  '115_3':['nus','mit','kaist','tum','fpt'],
  /* Environmental Engineering (116) */
  '116_0':['tudelft','tum','nus','eth'],
  '116_1':['tudelft','eth','tum','nus'],
  '116_2':['tudelft','eth','nus','tum'],
  '116_3':['tudelft','eth','tum','kaist','nus'],
  /* Biotechnology (117) */
  '117_0':['eth','tum','nus','oxford'],
  '117_1':['eth','tudelft','tum','nus'],
  '117_2':['tudelft','eth','tum','nus'],
  '117_3':['nus','eth','tum','kaist'],
  /* Biotech Applied (118) */
  '118_0':['eth','tum','nus','kaist'],
  '118_1':['mit','eth','kaist','nus'],
  '118_2':['eth','tum','nus','anu'],
  '118_3':['eth','mit','oxford','nus'],
  /* Nanotechnology (119) */
  '119_0':['mit','kaist','eth','tum'],
  '119_1':['mit','eth','oxford','nus'],
  '119_2':['eth','tudelft','tum','nus'],
  '119_3':['eth','mit','kaist','tum'],
  /* Interdisciplinary Eng. (120) */
  '120_0':['mit','kaist','eth','anu','ucla'],
  '120_1':['tum','nus','ufl','tudelft'],
  '120_2':['kaist','tum','nus','eth','fpt'],
  '120_3':['eth','kaist','tum','mit'],
  /* Pre-Medicine (121) */
  '121_0':['oxford','nus','tum','mahidol'],
  '121_1':['oxford','nus','mahidol','tum'],
  '121_2':['oxford','mit','nus','tum'],
  '121_3':['oxford','mit','nus','kaist'],
  /* Medicine (122) */
  '122_0':['oxford','tum','nus','mahidol','duke'],
  '122_1':['oxford','duke','tum','nus'],
  '122_2':['oxford','tum','mahidol','nus'],
  '122_3':['oxford','tum','columbia','nus'],
  /* Public Health (123) */
  '123_0':['oxford','nus','mahidol','duke','columbia'],
  '123_1':['duke','columbia','nus','tum'],
  '123_2':['oxford','nus','mahidol','tum'],
  '123_3':['oxford','nus','mahidol','melbourne'],
  /* Medical Biotech (124) */
  '124_0':['oxford','mit','eth','nus'],
  '124_1':['mit','oxford','eth','kaist'],
  '124_2':['mit','eth','nus','tum'],
  '124_3':['mit','oxford','eth','nus'],
  /* Allied Health (125) */
  '125_0':['oxford','nus','tum','melbourne'],
  '125_1':['oxford','nus','tum','auckland'],
  '125_2':['oxford','eth','nus','tum'],
  '125_3':['nus','tum','oxford','mahidol'],
  /* Agriculture (126) */
  '126_0':['anu','oxford','tum','auckland'],
  '126_1':['anu','tum','oxford','auckland'],
  '126_2':['anu','tudelft','tum','auckland'],
  '126_3':['nus','fpt','tum','kaist','anu'],
  /* Animal Science (127) */
  '127_0':['anu','tum','oxford','auckland'],
  '127_1':['anu','tum','auckland','oxford'],
  '127_2':['anu','kaist','tum','auckland'],
  '127_3':['oxford','anu','tum','mahidol'],
  /* Agricultural Biotech (128) */
  '128_0':['mit','eth','anu','tum'],
  '128_1':['eth','anu','tum','oxford'],
  '128_2':['anu','tum','eth','auckland'],
  '128_3':['anu','eth','nus','tum'],
  /* Psychology (129) */
  '129_0':['oxford','columbia','duke','melbourne'],
  '129_1':['columbia','duke','oxford','nus'],
  '129_2':['oxford','columbia','duke','melbourne'],
  '129_3':['mit','oxford','columbia','kaist'],
  /* Economics (130) */
  '130_0':['oxford','columbia','sciencespo','nus'],
  '130_1':['columbia','duke','eth','nus'],
  '130_2':['columbia','duke','nus','tum'],
  '130_3':['columbia','mit','nus','eth'],
  /* Education (131) */
  '131_0':['columbia','oxford','nus','melbourne'],
  '131_1':['columbia','oxford','nus','melbourne'],
  '131_2':['fpt','nus','oxford','columbia'],
  '131_3':['oxford','columbia','nus','sciencespo'],
  /* Social Sciences (132) */
  '132_0':['oxford','columbia','sciencespo','nus'],
  '132_1':['oxford','columbia','sciencespo','nus'],
  '132_2':['oxford','columbia','sciencespo','usc'],
  '132_3':['oxford','columbia','sciencespo','melbourne'],
  /* Law (133) */
  '133_0':['oxford','columbia','sciencespo','duke'],
  '133_1':['oxford','columbia','sciencespo','nus'],
  '133_2':['oxford','columbia','sciencespo','fulbright'],
  '133_3':['oxford','columbia','nus','fpt'],
  /* Political Science (134) */
  '134_0':['oxford','sciencespo','columbia','nus'],
  '134_1':['oxford','sciencespo','columbia','nus'],
  '134_2':['oxford','sciencespo','columbia','fulbright'],
  '134_3':['oxford','sciencespo','columbia','nus'],
  /* Geography (135) */
  '135_0':['oxford','nus','tudelft','anu'],
  '135_1':['oxford','sciencespo','nus','uct'],
  '135_2':['nus','tum','tudelft','kaist','fpt'],
  '135_3':['anu','oxford','tudelft','nus'],
  /* History (136) */
  '136_0':['oxford','columbia','sciencespo','uct'],
  '136_1':['oxford','columbia','sciencespo','melbourne'],
  '136_2':['oxford','anu','melbourne','auckland'],
  '136_3':['oxford','nus','tsinghua','melbourne'],
  /* Languages & Lit. (137) */
  '137_0':['oxford','columbia','sciencespo','fulbright'],
  '137_1':['oxford','columbia','sciencespo','nus'],
  '137_2':['oxford','columbia','sciencespo','nus'],
  '137_3':['oxford','sciencespo','nus','columbia'],
  /* Philosophy (138) */
  '138_0':['oxford','columbia','sciencespo','melbourne'],
  '138_1':['oxford','mit','columbia','nus'],
  '138_2':['oxford','columbia','eth','nus'],
  '138_3':['oxford','sciencespo','columbia','fulbright'],
  /* Liberal Arts (139) */
  '139_0':['fulbright','oxford','columbia','nus'],
  '139_1':['fulbright','oxford','columbia','sciencespo'],
  '139_2':['fulbright','oxford','columbia','usc'],
  '139_3':['fulbright','fpt','nus','columbia'],
  /* Sign Language (142) */
  '142_0':['oxford','columbia','nus','melbourne'],
  '142_1':['oxford','columbia','nus','melbourne'],
  '142_2':['oxford','columbia','nus','melbourne'],
  '142_3':['oxford','columbia','nus','sciencespo'],
  /* Applied Math (143) */
  '143_0':['mit','eth','tum','nus'],
  '143_1':['oxford','columbia','duke','nus'],
  '143_2':['mit','nus','kaist','fpt','tum'],
  '143_3':['eth','columbia','mit','nus'],
  /* English Studies (144) */
  '144_0':['oxford','columbia','sciencespo','fulbright'],
  '144_1':['oxford','columbia','fulbright','nus'],
  '144_2':['columbia','oxford','rmit','bu'],
  '144_3':['oxford','fulbright','nus','columbia'],
  /* Behavioral Science (145) */
  '145_0':['oxford','columbia','mit','duke'],
  '145_1':['columbia','oxford','duke','nus'],
  '145_2':['columbia','oxford','fulbright','sciencespo'],
  '145_3':['oxford','columbia','mit','nus'],
  /* Business (146) */
  '146_0':['columbia','duke','nus','sciencespo','rmit'],
  '146_1':['columbia','duke','eth','nus'],
  '146_2':['columbia','duke','nus','sciencespo'],
  '146_3':['columbia','nus','sciencespo','tsinghua','duke'],
  /* Global History (148) */
  '148_0':['oxford','columbia','sciencespo','tsinghua'],
  '148_1':['oxford','columbia','tsinghua','nus'],
  '148_2':['oxford','columbia','sciencespo','melbourne'],
  '148_3':['oxford','nus','tsinghua','fulbright'],
  /* Natural Sciences (150) */
  '150_0':['mit','oxford','eth','nus'],
  '150_1':['mit','eth','tum','oxford'],
  '150_2':['eth','oxford','anu','tum'],
  '150_3':['mit','nus','fpt','kaist','tum'],
  /* Aerospace (151) */
  '151_0':['mit','kaist','tum','eth'],
  '151_1':['mit','kaist','eth','tum'],
  '151_2':['kaist','tum','mit','eth'],
  '151_3':['mit','eth','tum','kaist'],
  /* Media/Arts (152) */
  '152_0':['rmit','usc','columbia','sciencespo'],
  '152_1':['usc','columbia','rmit','bu'],
  '152_2':['columbia','sciencespo','bu','usc'],
  '152_3':['oxford','columbia','sciencespo','fulbright'],
  /* Education (153) */
  '153_0':['oxford','columbia','nus','melbourne'],
  '153_1':['oxford','columbia','nus','fulbright'],
  '153_2':['fpt','nus','columbia','oxford'],
  '153_3':['oxford','columbia','nus','fulbright'],
  /* General Engineering (154) */
  '154_0':['tum','mit','eth','kaist'],
  '154_1':['tudelft','tum','nus','mit'],
  '154_2':['tum','kaist','eth','nus'],
  '154_3':['mit','fpt','kaist','tum','nus'],
  /* Music (156) */
  '156_0':['oxford','columbia','sciencespo','fulbright'],
  '156_1':['oxford','columbia','sciencespo','fulbright'],
  '156_2':['rmit','columbia','usc','fulbright'],
  '156_3':['oxford','columbia','sciencespo','fulbright'],
  /* Nursing (157) */
  '157_0':['oxford','tum','nus','mahidol'],
  '157_1':['oxford','tum','mahidol','melbourne'],
  '157_2':['oxford','columbia','nus','mahidol'],
  '157_3':['oxford','fulbright','nus','mahidol'],
  /* Public Affairs (158) */
  '158_0':['oxford','columbia','sciencespo','fulbright'],
  '158_1':['oxford','columbia','sciencespo','nus'],
  '158_2':['oxford','columbia','sciencespo','fulbright'],
  '158_3':['oxford','fulbright','columbia','sciencespo'],
};
window.SPEC_UNI_MAP=SPEC_UNI_MAP;
