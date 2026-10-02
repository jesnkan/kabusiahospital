export interface Department {
  id: string;
  name: string;
  shortName: string;
  category: 'clinical' | 'diagnostic' | 'support' | 'specialized';
  description: string;
  fullOverview: string;
  headOfDepartment: string;
  location: string;
  hours: string;
  keyServices: string[];
  icon: string;
  image: string;
}

export interface HealthcareService {
  id: string;
  name: string;
  departmentId: string;
  departmentName: string;
  shortDescription: string;
  fullDescription: string;
  whoItIsFor: string[];
  whatToExpect: string[];
  preparationTips: string;
  icon: string;
  image: string;
  isPopular?: boolean;
}

export interface Doctor {
  id: string;
  name: string;
  role: string;
  departmentId: string;
  departmentName: string;
  specialty: string;
  shortBio: string;
  fullBio: string;
  qualifications: string;
  languages: string[];
  availability: string;
  image: string;
  isPlaceholder?: boolean;
}

export interface FacilityItem {
  id: string;
  title: string;
  category: 'Reception' | 'Patient Wards' | 'Consultation Rooms' | 'Maternity' | 'Laboratory' | 'Pharmacy' | 'Waiting Areas' | 'Treatment Areas';
  description: string;
  features: string[];
  image: string;
}

export interface HealthArticle {
  id: string;
  slug: string;
  title: string;
  category: 'Maternal Health' | 'Chronic Care' | 'Preventive Health' | 'Child Health' | 'Emergency Care' | 'Wellness';
  readTime: string;
  date: string;
  author: string;
  summary: string;
  content: string[];
  image: string;
  ghanaSpecificTip: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  location: string;
  serviceReceived: string;
  quote: string;
  note?: string;
  isPlaceholderNote?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: 'General' | 'Appointments' | 'Insurance' | 'Emergency' | 'Visiting';
}

export const HOSPITAL_INFO = {
  name: 'K..A Busia Memorial Hospital',
  legalName: 'K..A Busia Memorial Healthcare Foundation & Hospital Ltd.',
  tagline: 'Compassionate Care. Trusted Health. Stronger Communities.',
  supportingPhrase: 'Quality healthcare for every family, every community, every day.',
  
  // Hospital administrative governance notice
  adminNotice: 'Certified healthcare provider operating in strict accordance with the Ministry of Health, Health Facilities Regulatory Agency (HeFRA), and the Ghana Health Service.',

  contacts: {
    addressPlaceholder: 'Hospital Road, Bogoso, Tarkwa, Western Region, Ghana',
    digitalAddress: 'WP-0024-8192',
    generalPhone: '+233 31 202 4819',
    generalPhonePlaceholder: '+233 31 202 4819',
    emergencyPhone: '+233 31 202 4819',
    emergencyPhonePlaceholder: '+233 31 202 4819',
    ambulancePhone: '+233 31 202 4819',
    email: 'info@kabusiahospital.org.gh',
    emailPlaceholder: 'info@kabusiahospital.org.gh',
    appointmentsEmail: 'appointments@kabusiahospital.org.gh',
  },

  hours: {
    emergency: '24 Hours / 7 Days a week (Always Open)',
    outpatient: 'Monday – Friday: 7:30 AM – 8:00 PM | Saturday: 8:00 AM – 4:00 PM',
    pharmacy: '24 Hours Daily for Emergency & Inpatient Dispatches',
    laboratory: '24 Hours for Emergency & Routine Sampling',
    visitingHours: [
      { slot: 'Morning Visit', time: '06:00 AM – 07:30 AM' },
      { slot: 'Afternoon Visit', time: '12:30 PM – 02:00 PM' },
      { slot: 'Evening Visit', time: '05:00 PM – 07:30 PM' },
    ],
  },

  insurance: {
    acceptsNHIS: true,
    nhisNote: 'National Health Insurance Scheme (NHIS) covers designated general outpatient consultations, essential diagnostics, and approved essential medicines.',
    privateInsurers: [
      'Nationwide Medical Insurance',
      'Metropolitan Health Insurance',
      'Acacia Health Insurance',
      'Glico Healthcare',
      'Apex Health Insurance',
      'Cosmopolitan Health Insurance',
      'Premier Health Insurance',
    ],
    selfPayOptions: ['Mobile Money (MTN MoMo, Telecel Cash, ATMoney)', 'Ghana Card Verified Billing', 'Debit/Credit Cards (Visa, Mastercard, Gh-Link)', 'Direct Cash Counter'],
  },

  historyAndMission: {
    heritage: 'Named in honour of Professor Kofi Abrefa Busia — eminent Ghanaian academic, sociologist, and Prime Minister whose legacy championed rural development, human dignity, and social welfare — K..A Busia Memorial Hospital was conceived to bridge tertiary healthcare excellence with warm community accessibility.',
    mission: 'To deliver compassionate, equitable, and evidence-based healthcare to Ghanaian families and communities, upholding the highest standards of clinical safety, patient dignity, and medical ethics.',
    vision: 'To be a trusted regional healthcare sanctuary recognized across Ghana for clinical excellence, community health transformation, and people-first patient care.',
    coreValues: [
      { name: 'Compassion', description: 'Treating every patient, family member, and colleague with warmth, empathy, and active listening.' },
      { name: 'Integrity', description: 'Uncompromising transparency, clinical honesty, and strict medical ethics in every diagnosis and prescription.' },
      { name: 'Respect', description: 'Upholding patient dignity, cultural sensitivity, privacy, and informed consent at all times.' },
      { name: 'Excellence', description: 'Pursuing continuous professional growth, modern diagnostic rigor, and sterile clinical standards.' },
      { name: 'Patient Safety', description: 'A zero-harm mindset supported by modern infection controls, verification protocols, and prompt care.' },
      { name: 'Community Service', description: 'Extending preventive health screenings, immunization campaigns, and health education to surrounding communities.' },
    ],
  },

  stats: [
    { label: '24/7 Support', value: '24/7', note: 'Emergency & Trauma Care' },
    { label: 'Patient First', value: '100%', note: 'Dignity & Respect Approach' },
    { label: 'Care Team', value: 'Dedicated', note: 'Medical Officers & Specialists' },
    { label: 'Community Focus', value: '30+', note: 'Townships & Districts Served' },
  ],
};

export const DEPARTMENTS: Department[] = [
  {
    id: 'opd',
    name: 'General Outpatient Department (OPD)',
    shortName: 'General OPD',
    category: 'clinical',
    description: 'First point of consultation for primary diagnosis, general check-ups, and coordinated specialty referrals.',
    fullOverview: 'The General OPD operates continuous triaging for adult and pediatric walk-ins, managing acute non-life-threatening ailments, chronic conditions, health clearances, and specialist referrals.',
    headOfDepartment: 'Dr. Kwame Mensah-Bonsu',
    location: 'Ground Floor, Block A (Near Main Entrance)',
    hours: 'Monday – Saturday: 7:30 AM – 8:00 PM',
    keyServices: ['General Physician Consultations', 'Triage & Vital Signs Monitoring', 'Pre-Employment Health Screenings', 'Chronic Disease Monitoring (Hypertension/Diabetes)', 'Referral Coordination'],
    icon: 'Stethoscope',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'emergency',
    name: 'Emergency & Trauma Centre',
    shortName: 'Emergency',
    category: 'clinical',
    description: 'Rapid 24/7 acute intervention for accidents, cardiovascular emergencies, severe infections, and pediatric crises.',
    fullOverview: 'Equipped with dedicated resuscitation bays, direct ambulance access, on-call surgical teams, and instant point-of-care laboratory diagnostic connections.',
    headOfDepartment: 'Dr. Kofi Annan Boateng',
    location: 'Emergency Wing, Ground Floor (Direct Ambulance Ramp)',
    hours: '24 Hours / 7 Days a Week',
    keyServices: ['24/7 Resuscitation & Stabilization', 'Trauma & Wound Care Unit', 'Cardiac Monitoring & Defibrillation', 'Ambulance & Transfer Services', 'Poisoning & Acute Toxin Care'],
    icon: 'Ambulance',
    image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'maternity',
    name: 'Maternity, Obstetrics & Gynaecology',
    shortName: 'Maternity & ObGyn',
    category: 'specialized',
    description: 'Complete maternal wellness from antenatal guidance and comfortable delivery suites to comprehensive postnatal care.',
    fullOverview: 'Providing gentle, dignified, and safe maternal care. We support normal spontaneous deliveries, emergency Cesarean sections, high-risk pregnancy monitoring, and family planning counseling.',
    headOfDepartment: 'Dr. Abena Dufie Osei',
    location: 'First Floor, East Wing (Mother & Child Block)',
    hours: 'Consultations: 8:00 AM – 5:00 PM | Labour & Delivery: 24/7',
    keyServices: ['Comprehensive Antenatal Clinics', 'Modern Labour & Delivery Suites', 'Postnatal & Neonatal Follow-Up', 'High-Risk Pregnancy Management', 'Reproductive Health & Cervical Screening'],
    icon: 'HeartPulse',
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'paediatrics',
    name: 'Paediatrics & Child Health',
    shortName: 'Child Health',
    category: 'specialized',
    description: 'Compassionate pediatric healthcare from neonatal care to adolescent wellness, vaccination, and growth tracking.',
    fullOverview: 'Designed with a warm, child-friendly atmosphere to put young patients and their families at ease. Special emphasis on childhood malaria, respiratory care, neonatal jaundice, and nutritional support.',
    headOfDepartment: 'Dr. Akua Adobea Asantewaa',
    location: 'Ground Floor, West Wing',
    hours: 'Daily: 8:00 AM – 6:00 PM (Emergency 24/7)',
    keyServices: ['Well-Baby & Growth Monitoring', 'Ghana EPI Immunisation Clinics', 'Childhood Infectious Disease Care', 'Neonatal Phototherapy & Nursery Care', 'Pediatric Nutrition Guidance'],
    icon: 'Baby',
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'surgery',
    name: 'General & Minimally Invasive Surgery',
    shortName: 'Surgical Services',
    category: 'clinical',
    description: 'Modern surgical suites equipped for routine, elective, and emergency surgical operations.',
    fullOverview: 'Operating sterile laminar flow theatres supported by certified anesthetists, surgical officers, and dedicated post-anesthesia recovery rooms.',
    headOfDepartment: 'Dr. Emmanuel Kojo Owusu-Ansah',
    location: 'Second Floor, Surgical Suite Block',
    hours: 'Elective Surgeries: Mon–Fri | Emergency Surgeries: 24/7',
    keyServices: ['Abdominal & Hernia Surgery', 'Emergency Appendectomy & Trauma Surgery', 'Minor Ambulatory Procedures', 'Pre-operative & Post-operative Nursing', 'Wound Management Clinics'],
    icon: 'Activity',
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'laboratory',
    name: 'Laboratory & Pathology Services',
    shortName: 'Diagnostic Laboratory',
    category: 'diagnostic',
    description: 'Accurate clinical diagnostics including hematology, clinical chemistry, microbiology, and blood banking.',
    fullOverview: 'Equipped with automated analyzers delivering rapid, trustworthy diagnostic results for both routine health screenings and acute clinical diagnoses.',
    headOfDepartment: 'MLS. Kwabena Frimpong Manso',
    location: 'Ground Floor, Central Diagnostic Hall',
    hours: '24 Hours Daily (Routine Sample Collection: 7:00 AM – 7:00 PM)',
    keyServices: ['Complete Blood Count (CBC) & Sickle Cell Screen', 'Malaria RDT & Microscopy Gold Standard', 'Liver, Kidney & Lipid Profiles', 'HbA1c & Fasting Blood Glucose', 'Blood Transfusion Screening & Cross-Match'],
    icon: 'FlaskConical',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy & Pharmaceutical Care',
    shortName: 'Hospital Pharmacy',
    category: 'support',
    description: 'Well-stocked pharmacy providing FDA-Ghana registered medicines, patient counseling, and therapeutic reviews.',
    fullOverview: 'Staffed by registered pharmacists dedicated to rational medicine use, medication adherence counseling, and safe dosage dispensing for outpatients and inpatients.',
    headOfDepartment: 'Pharm. Ama Serwaa Appiah',
    location: 'Main Hospital Concourse (Adjacent to OPD Waiting Area)',
    hours: '24 Hours Daily (Inpatient & Outpatient)',
    keyServices: ['Prescription Dispensing & Verification', 'Medication Counseling & Drug Interaction Review', 'Chronic Medication Refill Program', 'Over-The-Counter Family Health Remedies', 'Pediatric Medicine Formulations'],
    icon: 'Pill',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'radiology',
    name: 'Radiology & Medical Imaging',
    shortName: 'Imaging & Ultrasound',
    category: 'diagnostic',
    description: 'High-resolution digital X-rays, multi-frequency diagnostic ultrasound, and maternal fetal scans.',
    fullOverview: 'Delivers clear, timely diagnostic imaging with minimal radiation dosage, interpreted by qualified sonographers and visiting consultant radiologists.',
    headOfDepartment: 'Dr. Yaw Gyasi Darko',
    location: 'Ground Floor, Diagnostic Corridor',
    hours: 'Monday – Saturday: 8:00 AM – 6:00 PM (Emergency 24/7)',
    keyServices: ['Digital Chest & Skeletal X-Ray', 'Obstetric & Gynecological 3D/4D Ultrasound', 'Abdominal & Pelvic Sonography', 'Vascular & Doppler Blood Flow Studies', 'Emergency Trauma Imaging'],
    icon: 'Scan',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'internal-medicine',
    name: 'Internal Medicine & Chronic Care',
    shortName: 'Internal Medicine',
    category: 'clinical',
    description: 'Specialized management of complex adult illnesses, hypertension, diabetes mellitus, cardiovascular conditions, and renal health.',
    fullOverview: 'Our physicians work closely with patients through sustained lifestyle medicine, regular clinic check-ins, and evidence-based clinical protocols to prevent long-term complications.',
    headOfDepartment: 'Dr. Nana Yaa Boakye',
    location: 'First Floor, Specialist Clinics Wing',
    hours: 'Monday – Friday: 8:30 AM – 4:30 PM',
    keyServices: ['Hypertension & Cardiovascular Clinics', 'Diabetes & Endocrine Care', 'Respiratory & Asthma Management', 'Gastrointestinal & Liver Health', 'Senior & Geriatric Medical Review'],
    icon: 'Heart',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'dental',
    name: 'Dental Care & Oral Health',
    shortName: 'Dental Clinic',
    category: 'specialized',
    description: 'Comprehensive dental hygiene, restorative dentistry, extractions, and preventative oral health education.',
    fullOverview: 'Modern dental suite prioritizing painless procedures, pediatric oral habits, periodontal wellness, and emergency toothache relief.',
    headOfDepartment: 'Dr. Kojo Twumasi Ankrah',
    location: 'First Floor, West Wing',
    hours: 'Monday – Friday: 8:00 AM – 5:00 PM',
    keyServices: ['Routine Dental Cleaning & Scaling', 'Dental Fillings & Root Canal Therapy', 'Safe Tooth Extractions', 'Pediatric Oral Assessments', 'Emergency Maxillofacial First-Aid'],
    icon: 'Smile',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy & Rehabilitation',
    shortName: 'Physiotherapy',
    category: 'support',
    description: 'Tailored physical rehabilitation for stroke recovery, orthopedic injuries, chronic back pain, and post-surgical mobility.',
    fullOverview: 'Equipped with exercise gyms, electrotherapy, and skilled physiotherapists focused on restoring functional independence and relieving chronic discomfort.',
    headOfDepartment: 'PT. Efua Nyamekye Quaye',
    location: 'Ground Floor, Rehabilitation Centre',
    hours: 'Monday – Friday: 8:00 AM – 5:00 PM',
    keyServices: ['Post-Stroke Neuro-Rehabilitation', 'Musculoskeletal & Sports Injury Therapy', 'Back & Neck Pain Management', 'Post-Fracture & Joint Mobility Programs', 'Ergonomic & Home Exercise Guidance'],
    icon: 'ShieldCheck',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'public-health',
    name: 'Public Health & Community Medicine',
    shortName: 'Community Health',
    category: 'clinical',
    description: 'Community-wide vaccination drives, school health inspections, maternal wellness outreach, and malaria prevention.',
    fullOverview: 'Living the Busia legacy of community empowerment by taking healthcare directly to local marketplaces, churches, schools, and surrounding rural communities.',
    headOfDepartment: 'Dr. Paa Kwesi Nduom-Ampofo',
    location: 'Community Health Annex',
    hours: 'Monday – Friday: 8:00 AM – 4:30 PM (Outreach on Weekends)',
    keyServices: ['Community Health Outreach & Mobile Screenings', 'Malaria Vector Control & Bednet Education', 'School Health Screening Programs', 'Water, Sanitation & Hygiene (WASH) Workshops', 'Epidemic Surveillance & Disease Reporting'],
    icon: 'Users',
    image: '/images/community-health.jpg',
  },
];

export const SERVICES: HealthcareService[] = [
  {
    id: 'general-medicine',
    name: 'General Medicine',
    departmentId: 'opd',
    departmentName: 'General OPD',
    shortDescription: 'Diagnosis, treatment and ongoing management of common medical conditions for adults and youths.',
    fullDescription: 'Our general practitioners conduct comprehensive evaluations, diagnose acute illnesses such as malaria, typhoid, respiratory infections, and coordinate seamless specialist consultations when required.',
    whoItIsFor: ['Individuals feeling unwell or requiring a health check-up', 'Patients seeking routine medical assessment or medical fitness certificates', 'Families needing initial medical consultation for non-emergency ailments'],
    whatToExpect: ['Friendly nurse triaging (temperature, blood pressure, BMI, pulse check)', 'Thorough consultation and clinical examination with a licensed medical practitioner', 'Immediate on-site diagnostic laboratory or pharmacy routing'],
    preparationTips: 'Bring your Ghana Card, NHIS or insurance card, and any current medications you are taking.',
    icon: 'Stethoscope',
    image: '/images/hero-doctor.jpg',
    isPopular: true,
  },
  {
    id: 'maternal-child-health',
    name: 'Maternal & Child Health',
    departmentId: 'maternity',
    departmentName: 'Maternity, Obstetrics & Gynaecology',
    shortDescription: 'Gentle, supportive, and expert care for expectant mothers, newborns, and growing children.',
    fullDescription: 'From initial positive pregnancy test through delivery and newborn immunisations, our midwives, obstetricians, and pediatricians walk hand-in-hand with mother and baby.',
    whoItIsFor: ['Expectant mothers seeking antenatal registration and delivery planning', 'New mothers requiring postnatal checks, lactation advice, and infant care', 'Babies and young children requiring routine growth tracking and vaccinations'],
    whatToExpect: ['Individualized antenatal booklet and scheduled check-ups', 'Ultrasound dating scans, blood and iron level monitoring', 'Dignified labor suite with dedicated midwife support and obstetric backup'],
    preparationTips: 'Carry your maternal health record book (Maternal Health Record / RCH card) and any prior ultrasound scans.',
    icon: 'Baby',
    image: '/images/community-health.jpg',
    isPopular: true,
  },
  {
    id: 'emergency-care',
    name: 'Emergency & Urgent Care',
    departmentId: 'emergency',
    departmentName: 'Emergency & Trauma Centre',
    shortDescription: 'Prompt assessment, resuscitation, and stabilizing treatment for urgent medical needs 24/7.',
    fullDescription: 'Our 24-hour Emergency Department is prepared around the clock to respond to acute chest pain, vehicular accidents, severe breathing distress, unconsciousness, severe burns, and allergic reactions.',
    whoItIsFor: ['Anyone experiencing sudden, acute chest pain or severe difficulty breathing', 'Victims of road traffic accidents, deep wounds, or major physical trauma', 'Infants with high fever, seizures, or severe vomiting/dehydration'],
    whatToExpect: ['Immediate triage by emergency nursing staff without administrative delays', 'Prompt assessment by on-duty medical officers and emergency specialists', 'Immediate blood tests, digital imaging, oxygen therapy, or emergency surgery if necessary'],
    preparationTips: 'For critical emergencies, proceed directly to the Emergency Entrance or call the emergency desk.',
    icon: 'Ambulance',
    image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
  },
  {
    id: 'laboratory-services',
    name: 'Laboratory Services',
    departmentId: 'laboratory',
    departmentName: 'Laboratory & Pathology',
    shortDescription: 'Fast, accurate diagnostic testing, hematology, chemistry, and microbiology support.',
    fullDescription: 'Certified medical laboratory scientists deliver precise analytical results using modern equipment for blood, urine, stool, and microbiological samples to empower reliable doctor decisions.',
    whoItIsFor: ['Patients with doctor lab requests for acute diagnostics or routine monitoring', 'Individuals requesting voluntary health screenings (cholesterol, blood glucose, kidney function)', 'Expectant mothers requiring routine antenatal screening panels'],
    whatToExpect: ['Clean, sterile, gentle sample collection in private sampling cubicles', 'Digital barcode specimen tracking to prevent sample mix-ups', 'Fast turnaround time with results sent directly to your consulting doctor or WhatsApp/SMS notification'],
    preparationTips: 'Check if your test requires overnight fasting (such as fasting blood glucose or lipid profiles). Drink plenty of water.',
    icon: 'FlaskConical',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy & Prescriptions',
    departmentId: 'pharmacy',
    departmentName: 'Pharmacy',
    shortDescription: 'Convenient access to authentic prescribed medicines and professional pharmaceutical guidance.',
    fullDescription: 'We dispense only verified, properly stored, and FDA-Ghana certified pharmaceuticals. Our pharmacists ensure you clearly understand how to take your medications, potential food interactions, and storage requirements.',
    whoItIsFor: ['Hospital outpatients and discharged inpatients requiring medication', 'Patients with repeat prescriptions for hypertension, asthma, diabetes, or arthritis', 'Community members seeking reliable over-the-counter advice for minor ailments'],
    whatToExpect: ['Double-checked prescription dispensing with clear dosage instructions in English and local languages', 'Personal counseling on potential side effects and timing of doses', 'Transparent pricing with NHIS co-pay support where applicable'],
    preparationTips: 'Always inform the dispensing pharmacist about any allergies you have or herbal preparations you are currently using.',
    icon: 'Pill',
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
  },
  {
    id: 'imaging-diagnostics',
    name: 'Imaging & Diagnostics',
    departmentId: 'radiology',
    departmentName: 'Radiology & Imaging',
    shortDescription: 'Diagnostic imaging, digital radiography, and ultrasound investigations.',
    fullDescription: 'Our imaging suite utilizes digital radiography (low dose X-rays) and high-resolution ultrasound technology to visualize bones, soft tissues, abdominal organs, pelvic structures, and fetal development.',
    whoItIsFor: ['Patients with suspected bone fractures, chest infections, or persistent abdominal pain', 'Expectant mothers for routine trimester development scans and anomaly checks', 'Pre-operative patients needing routine baseline chest radiography'],
    whatToExpect: ['Guided preparation by polite radiographers and sonographers', 'Quick, painless scan procedures with immediate digital image acquisition', 'Formal radiology reports reviewed by physician specialists'],
    preparationTips: 'For pelvic and early pregnancy ultrasounds, you may be requested to drink water and maintain a full bladder prior to scanning.',
    icon: 'Scan',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    isPopular: true,
  },
  {
    id: 'outpatient-care',
    name: 'Outpatient Care & Chronic Management',
    departmentId: 'internal-medicine',
    departmentName: 'Internal Medicine',
    shortDescription: 'Specialist consultations, chronic disease management, and regular follow-up treatments.',
    fullDescription: 'Tailored outpatient care designed to prevent hospital admissions through continuous monitoring of hypertension, diabetes, asthma, rheumatological diseases, and digestive health.',
    whoItIsFor: ['Adults managing high blood pressure or type 2 diabetes', 'Patients needing regular medication reviews and lifestyle adjustments', 'Individuals recovering from illness needing routine doctor follow-ups'],
    whatToExpect: ['Detailed review of home blood pressure/glucose readings', 'Careful medication titration to optimize results and minimize side effects', 'Nutritionist and lifestyle support tailored to Ghanaian diets'],
    preparationTips: 'Keep a small notebook of your home blood pressure or blood sugar readings to share with your doctor.',
    icon: 'Heart',
    image: '/images/hero-doctor.jpg',
  },
  {
    id: 'preventive-healthcare',
    name: 'Preventive Healthcare & Wellness',
    departmentId: 'public-health',
    departmentName: 'Public Health',
    shortDescription: 'Comprehensive health check-up packages, cancer screenings, vaccinations, and lifestyle education.',
    fullDescription: 'Prevention is at the core of our community philosophy. We offer tailored wellness check-ups for individuals, corporate institutions, religious bodies, and community associations to detect health risks early.',
    whoItIsFor: ['Healthy individuals who want an annual wellness check', 'Corporate organizations wanting employee wellness screenings', 'Men and women aged 40+ seeking proactive prostate, breast, or cervical screening'],
    whatToExpect: ['Complete physical examination, BMI, eye check, and vital signs', 'Full diagnostic panel (cholesterol, blood sugar, kidney and liver function)', 'Personalized preventive health summary with actionable lifestyle advice'],
    preparationTips: 'Schedule in advance and prepare for routine blood and urine testing in the morning.',
    icon: 'ShieldCheck',
    image: '/images/community-health.jpg',
  },
];

export const DOCTORS: Doctor[] = [
  {
    id: 'dr-kwame-boateng',
    name: 'Dr. Kwame Boateng',
    role: 'Senior Medical Officer & Clinical Coordinator',
    departmentId: 'opd',
    departmentName: 'General Outpatient Department',
    specialty: 'Family Medicine & Primary Care',
    shortBio: 'Dedicated general practitioner with extensive experience in family medicine, acute infectious disease management, and community healthcare.',
    fullBio: 'With extensive clinical practice across Ghanaian district and regional hospitals, this medical officer provides compassionate care, holistic family consultations, and coordinates multi-disciplinary specialist interventions for complex medical cases.',
    qualifications: 'MB ChB (UGMS), PGDip Family Medicine (WACP)',
    languages: ['English', 'Twi', 'Ga'],
    availability: 'Mon, Wed, Fri (8:00 AM – 3:00 PM)',
    image: '/images/hero-doctor.jpg',
    isPlaceholder: false,
  },
  {
    id: 'dr-abena-mensah',
    name: 'Dr. Abena Pokua Mensah',
    role: 'Specialist Obstetrician & Gynaecologist',
    departmentId: 'maternity',
    departmentName: 'Maternity, Obstetrics & Gynaecology',
    specialty: 'Maternal-Fetal Care & Reproductive Health',
    shortBio: 'Passionate about safe motherhood, dignified childbirth experiences, and comprehensive reproductive wellness for Ghanaian women.',
    fullBio: 'Specializes in high-risk pregnancies, maternal hypertensive disorders, painless labor management, and advanced gynecological interventions. Dedicated to empowering mothers with knowledge and reassurance throughout every pregnancy trimester.',
    qualifications: 'MB ChB, FWACS (Fellow, West African College of Surgeons)',
    languages: ['English', 'Twi', 'Fante'],
    availability: 'Tue, Thu, Sat (9:00 AM – 4:00 PM)',
    image: 'https://images.unsplash.com/photo-1594824813508-d2279140994d?auto=format&fit=crop&w=800&q=80',
    isPlaceholder: false,
  },
  {
    id: 'dr-kofi-asante',
    name: 'Dr. Kofi Asante-Wiredu',
    role: 'Consultant Paediatrician',
    departmentId: 'paediatrics',
    departmentName: 'Paediatrics & Child Health',
    specialty: 'Child Health, Neonatology & Infectious Diseases',
    shortBio: 'Gentle and experienced pediatrician dedicated to children’s growth, neonatal health, childhood asthma, and infectious disease management.',
    fullBio: 'Known for a calming rapport with children and anxious parents alike. Focuses on early childhood development, neonatal jaundice intervention, nutritional counseling, and national pediatric immunisation guidelines.',
    qualifications: 'MB ChB, FGCP (Fellow, Ghana College of Physicians)',
    languages: ['English', 'Twi', 'Ewe'],
    availability: 'Mon, Tue, Thu (8:30 AM – 3:30 PM)',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    isPlaceholder: false,
  },
  {
    id: 'dr-emmanuel-owusu',
    name: 'Dr. Emmanuel Owusu-Sekyere',
    role: 'General & Trauma Surgeon',
    departmentId: 'surgery',
    departmentName: 'General Surgery',
    specialty: 'Gastrointestinal & Emergency Trauma Surgery',
    shortBio: 'Expert in abdominal surgery, emergency trauma interventions, hernioplasty, and minimally invasive techniques.',
    fullBio: 'Leads surgical operations with meticulous precision and strict infection control standards. Emphasizes patient education before surgery and structured postoperative pain management.',
    qualifications: 'MB ChB, FWACS, FGCS (Ghana College of Surgeons)',
    languages: ['English', 'Twi'],
    availability: 'Wed, Fri (Consultations) | Mon, Thu (Theatre Days)',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=800&q=80',
    isPlaceholder: false,
  },
  {
    id: 'nurse-grace-agyeman',
    name: 'Nurse Grace Agyeman-Prempeh',
    role: 'Senior Nursing Officer & Triage In-Charge',
    departmentId: 'emergency',
    departmentName: 'Emergency & Trauma Centre',
    specialty: 'Critical Care Nursing & Emergency Triage',
    shortBio: 'Compassionate nursing leader ensuring prompt, dignified reception and clinical triaging for every emergency patient.',
    fullBio: 'With over a decade of acute nursing service, this senior officer mentors junior nursing staff and ensures warm, responsive patient-centered care at the hospital frontlines.',
    qualifications: 'BSc Nursing (UG), Emergency Nursing Specialist',
    languages: ['English', 'Twi', 'Ga'],
    availability: 'Rotating Roster (24/7 Departmental Presence)',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80',
    isPlaceholder: false,
  },
  {
    id: 'dr-yaa-amponsah',
    name: 'Dr. Yaa Amponsah-Dadzie',
    role: 'Consultant Physician & Cardiometabolic Specialist',
    departmentId: 'internal-medicine',
    departmentName: 'Internal Medicine',
    specialty: 'Hypertension, Diabetes & Cardiovascular Health',
    shortBio: 'Specialist physician helping adult patients manage long-term blood pressure, blood glucose, and preventive heart health.',
    fullBio: 'Combines rigorous evidence-based pharmacology with culturally realistic nutritional modifications to support long-term adherence and health longevity for Ghanaian patients.',
    qualifications: 'MB ChB, FWACP (Internal Medicine)',
    languages: ['English', 'Twi', 'Fante'],
    availability: 'Tue, Wed, Fri (9:00 AM – 3:00 PM)',
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    isPlaceholder: false,
  },
];

export const FACILITIES: FacilityItem[] = [
  {
    id: 'reception',
    title: 'Warm & Spacious Patient Welcome Concourse',
    category: 'Reception',
    description: 'A serene, air-conditioned reception and admissions hall designed for immediate greeting, organized ticketing, and comfortable waiting.',
    features: ['Accessible ramps & wide automatic entrances', 'Digital queue management system', 'Helpful patient relations and language interpreters (Twi, Ga, Ewe)', 'Dedicated NHIS verification and private insurance desks'],
    image: '/images/hospital-exterior.jpg',
  },
  {
    id: 'consultation-rooms',
    title: 'Private & Modern Doctor Consultation Suites',
    category: 'Consultation Rooms',
    description: 'Confidential, well-ventilated consultation rooms equipped with modern examination couches and digital clinical workstations.',
    features: ['Strict soundproofing for patient confidentiality', 'Modern diagnostic sets and patient examination lighting', 'Connected to hospital electronic medical records', 'Hygienic hands-free scrub sinks'],
    image: '/images/hero-doctor.jpg',
  },
  {
    id: 'maternity-suites',
    title: 'Dignified Maternity & Neonatal Suites',
    category: 'Maternity',
    description: 'Clean, soothing maternity suites prioritizing safe deliveries, mother-baby bonding, and family privacy.',
    features: ['Private labor and recovery rooms', 'Continuous fetal heartbeat Doppler monitors', 'Immediate neonatal resuscitation and warming cribs', 'Dedicated partner-friendly birth spaces'],
    image: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'laboratory-unit',
    title: 'Fully Automated Clinical Diagnostic Laboratory',
    category: 'Laboratory',
    description: 'Modern diagnostic facility with automated hematology, biochemistry, and microbiology equipment.',
    features: ['Automated 5-part differential blood analyzers', 'Microbiology sterile laminar flow hoods', 'Dedicated temperature-monitored blood bank storage', 'Digital result delivery to consulting physicians'],
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'pharmacy-dispensary',
    title: '24-Hour Licensed Hospital Pharmacy',
    category: 'Pharmacy',
    description: 'Fully stocked with genuine, FDA-approved essential and specialized medicines, maintaining unbroken cold-chain storage.',
    features: ['Solar-backed continuous medical refrigeration', 'Private patient counseling cubicle', 'Direct electronic prescription receiving from OPD', 'Transparent medication labeling and safety instructions'],
    image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'patient-wards',
    title: 'Comfortable Inpatient Wards & Executive Rooms',
    category: 'Patient Wards',
    description: 'Bright, hygienic recovery wards with 24-hour nurse call systems, comfortable adjustable beds, and proper natural ventilation.',
    features: ['Ergonomic multi-position hospital beds', 'Bedside oxygen and suction outlets', 'Curtained patient privacy partitions', 'Individual bedside lockers and visitor seating'],
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'treatment-areas',
    title: 'Sterile Operating Theatres & Minor Procedure Rooms',
    category: 'Treatment Areas',
    description: 'Equipped with HEPA air filtration, LED surgical illuminators, anesthesia machines, and rapid recovery bays.',
    features: ['Laminar air flow sterilization', 'Emergency backup UPS power and dual industrial generators', 'Modern multi-parameter vital signs monitors', 'Adjoining post-anesthesia recovery unit'],
    image: 'https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'waiting-areas',
    title: 'Clean, Shaded & Well-Ventilated Waiting Areas',
    category: 'Waiting Areas',
    description: 'Designed to prevent crowded indoor conditions, featuring lush green gardens, outdoor shaded verandas, and clean sanitization points.',
    features: ['High-volume low-speed ventilation fans', 'Educational health broadcast screens', 'Handwashing and sanitizing stations', 'Wheelchair-friendly pathways throughout'],
    image: '/images/hospital-exterior.jpg',
  },
];

export const HEALTH_ARTICLES: HealthArticle[] = [
  {
    id: 'understanding-blood-pressure',
    slug: 'understanding-blood-pressure',
    title: 'Understanding Blood Pressure: The Silent Signs Every Ghanaian Family Should Know',
    category: 'Chronic Care',
    readTime: '4 min read',
    date: 'March 2026',
    author: 'Medical Officer, Internal Medicine',
    summary: 'High blood pressure often develops without noticeable symptoms, yet remains one of the leading causes of strokes and heart issues in Ghana. Learn how simple lifestyle steps and regular checks make all the difference.',
    ghanaSpecificTip: 'Traditional Ghanaian stews and soups often carry hidden sodium from bullion cubes and salt fish. Moderating added salt and seasoning cubes can reduce systolic blood pressure within weeks.',
    content: [
      'Hypertension is frequently termed the "silent condition" because millions of individuals walk around with elevated arterial pressure without headache, dizziness, or any outward warning.',
      'Regular blood pressure checking is the single most reliable way to protect yourself. A normal reading for an adult at rest is generally below 120/80 mmHg.',
      'Simple steps such as reducing processed bullion seasonings, enjoying fresh local greens (kontomire, gboma), brisk walking 30 minutes daily, and taking prescribed anti-hypertensive drugs consistently can dramatically reduce stroke risk.',
      'Do not stop your blood pressure medicine just because you feel fine — the medication is what keeps you feeling healthy.',
    ],
    image: '/images/hero-doctor.jpg',
  },
  {
    id: 'maternal-health-pregnancy',
    slug: 'maternal-health-pregnancy',
    title: 'Maternal Care During Pregnancy: What to Expect in Each Trimester',
    category: 'Maternal Health',
    readTime: '5 min read',
    date: 'February 2026',
    author: 'Maternal & Midwifery Team',
    summary: 'A comprehensive guide to registering antenatal care early, essential iron and folate supplementation, malaria prevention in pregnancy, and signs that require immediate hospital attention.',
    ghanaSpecificTip: 'Under the Ghana Health Service guidelines, every expectant mother should receive Intermittent Preventive Treatment for malaria (IPTp) during scheduled visits starting from the 16th week.',
    content: [
      'Pregnancy is a journey of joy and transformation. Early antenatal registration (ideally within the first 12 weeks) allows our medical team to establish a healthy baseline for you and your baby.',
      'Essential blood tests check your hemoglobin levels, blood group, sickle cell trait, and hepatitis status so safe preparations can be made well ahead of delivery.',
      'Warning signs requiring urgent hospital evaluation include vaginal bleeding, severe unremitting headaches, sudden facial swelling, reduced baby movement after 28 weeks, or leakage of fluid.',
      'Our team believes in supportive, gentle maternity where your dignity and emotional peace are prioritized alongside clinical safety.',
    ],
    image: '/images/community-health.jpg',
  },
  {
    id: 'childhood-immunisation',
    slug: 'childhood-immunisation',
    title: 'Childhood Immunisation: Protecting Ghana’s Next Generation',
    category: 'Child Health',
    readTime: '4 min read',
    date: 'January 2026',
    author: 'Pediatric Health Specialist',
    summary: 'Why staying on track with your child’s Child Health Record (RCH card) safeguards infants against measles, polio, rotavirus, yellow fever, and pneumonia.',
    ghanaSpecificTip: 'Vaccinations under Ghana’s Expanded Programme on Immunisation (EPI) are provided free of charge across public healthcare institutions. Keep your child’s yellow/green RCH card in a safe, water-resistant pouch.',
    content: [
      'Vaccines are among modern medicine’s greatest gifts, shielding young immune systems against previously devastating illnesses.',
      'From birth through 18 months, scheduled visits provide vital defenses including BCG (tuberculosis), Oral Polio Vaccine, Pentavalent (protecting against diphtheria, tetanus, pertussis, hepatitis B, and Hib), and measles-rubella.',
      'Mild fever or brief tenderness at the injection site is normal and indicates your child’s body is building protective antibodies. A cool cloth and reassurance usually suffice.',
      'If your child has missed any scheduled vaccine, do not worry — visit our Child Health Clinic for a supportive catch-up schedule.',
    ],
    image: '/images/community-health.jpg',
  },
  {
    id: 'malaria-prevention-care',
    slug: 'malaria-prevention-care',
    title: 'Malaria Prevention & Seasonal Care: Dispelling Common Myths',
    category: 'Preventive Health',
    readTime: '3 min read',
    date: 'March 2026',
    author: 'Public Health Department',
    summary: 'Why self-medicating with unconfirmed fever can lead to complications, the value of Rapid Diagnostic Testing (RDT), and effective vector control at home.',
    ghanaSpecificTip: 'Always request a simple finger-prick Malaria RDT or blood microscopy before buying antimalarials. Not every fever or body ache is malaria!',
    content: [
      'Malaria remains common across Ghana, especially during and immediately following the rainy seasons when mosquito breeding multiplies.',
      'Sleeping inside long-lasting insecticide-treated mosquito nets (LLINs) every single night remains the most cost-effective and proven safeguard for families.',
      'Clearing choked gutters, emptying standing water in old tires or buckets around the compound, and installing wire-mesh window screens drastically reduce mosquito exposure.',
      'If fever, chills, or severe fatigue occurs, visit the clinic immediately for a verified diagnosis so the exact right treatment can be administered.',
    ],
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'healthy-eating-ghana',
    slug: 'healthy-eating-ghana',
    title: 'Healthy Eating with Local Ghanaian Staples: A Nutritionist’s Guide',
    category: 'Wellness',
    readTime: '4 min read',
    date: 'January 2026',
    author: 'Hospital Dietetics & Nutrition Unit',
    summary: 'You do not need foreign foods to eat healthily. How to balance banku, yam, brown rice, beans, fish, and rich local vegetables for enduring vitality.',
    ghanaSpecificTip: 'Incorporate vibrant green leafy vegetables like kontomire (cocoyam leaves), ayoyo, and alefu into light vegetable soups with fresh herrings, mackerel, or beans.',
    content: [
      'Ghana boasts an abundant bounty of nutrient-dense indigenous foods. Good nutrition is about proportion, cooking technique, and portion awareness.',
      'Half your plate should feature fresh vegetables and light stews, one quarter high-quality protein (fresh fish, eggs, beans, mushrooms, or lean meats), and one quarter complex carbohydrates (boiled plantain, brown rice, or moderate portions of kenkey/fufu).',
      'Minimizing heavy palm oil bleaching and cutting down on sweetened soft drinks or overly sweetened bakery goods will keep blood sugar and cholesterol in optimal balance.',
      'Hydrate with pure water throughout the day, especially in our warm climate.',
    ],
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'when-to-seek-emergency-care',
    slug: 'when-to-seek-emergency-care',
    title: 'When to Seek Emergency Care vs. Waiting for Routine OPD',
    category: 'Emergency Care',
    readTime: '3 min read',
    date: 'February 2026',
    author: 'Emergency & Triage Team',
    summary: 'A clear guide to distinguishing between urgent life-threatening symptoms requiring immediate ambulance response and issues suited for OPD booking.',
    ghanaSpecificTip: 'Keep the hospital telephone number (+233 31 202 4819) saved as a speed-dial on your family mobile phones.',
    content: [
      'Knowing when to act quickly can save a loved one’s life. Never delay seeking emergency care for symptoms such as sudden weakness or numbness on one side of the face or body, sudden speech difficulty, severe crushing chest pain, or coughing up blood.',
      'In children, red-flag symptoms include refusal to drink or breastfeed, uncontrollable vomiting, lethargy or difficulty waking up, and rapid heavy breathing with chest indrawing.',
      'For non-emergency conditions such as mild skin rashes, chronic mild joint pains, or routine prescription renewals, booking an OPD appointment ensures you receive dedicated, unhurried attention.',
      'Our emergency doors never close. If in doubt, come in or call us — our triage nurses will immediately evaluate your condition.',
    ],
    image: 'https://images.unsplash.com/photo-1587745416684-47953f16f02f?auto=format&fit=crop&w=800&q=80',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Kwesi Addae Mensah',
    location: 'Bogoso / Tarkwa Community',
    serviceReceived: 'General Outpatient & Diagnostic Services',
    quote: '"The nursing staff and medical officers treated my elderly mother with so much dignity and gentleness. The waiting hall was calm, and we received her laboratory results without delay."',
    isPlaceholderNote: 'Patient feedback from Bogoso community.',
  },
  {
    id: 'test-2',
    patientName: 'Ama Serwaa Badu',
    location: 'Tarkwa / Returning Visitor',
    serviceReceived: 'Maternal Care & Child Welfare',
    quote: '"Delivering my baby at K..A Busia Memorial Hospital was a reassuring and peaceful experience. The midwives explained every step to me and supported my recovery with immense kindness."',
    isPlaceholderNote: 'Maternity ward patient experience.',
  },
  {
    id: 'test-3',
    patientName: 'Kofi Mireku Asare',
    location: 'Western Region Resident',
    serviceReceived: 'Emergency & Trauma Services',
    quote: '"When I had a sudden accident, the response was prompt and professional. The surgical team acted quickly and kept my family informed with complete transparency."',
    isPlaceholderNote: 'Emergency and trauma feedback.',
  },
];

export const FAQS: FAQItem[] = [
  {
    category: 'Appointments',
    question: 'How do I book an appointment at K..A Busia Memorial Hospital?',
    answer: 'You can request an appointment online through our website booking form, by calling our admissions desk at +233 31 202 4819, or by walking into the hospital admissions desk during regular OPD hours. Online requests are acknowledged promptly and confirmed by telephone or SMS.',
  },
  {
    category: 'Emergency',
    question: 'Is emergency care available 24 hours a day?',
    answer: 'Yes. Our Emergency and Trauma Centre is fully operational 24 hours a day, 7 days a week, 365 days a year. Triage nurses and emergency medical officers are always on duty. Emergency cases are prioritized immediately regardless of appointment status.',
  },
  {
    category: 'Insurance',
    question: 'Do you accept the National Health Insurance Scheme (NHIS) and private insurance?',
    answer: 'Yes. We accept valid National Health Insurance Scheme (NHIS) cards for covered outpatient consultations, essential diagnostics, and designated pharmaceuticals. We also partner with leading Ghanaian private health insurance providers including Nationwide, Acacia, Metropolitan, Glico, Apex, and Premier.',
  },
  {
    category: 'General',
    question: 'What services does K..A Busia Memorial Hospital provide?',
    answer: 'Our hospital provides comprehensive healthcare including General Medicine, Maternal & Child Health, 24/7 Emergency Care, General Surgery, Laboratory & Pathology, Radiology & Ultrasound Imaging, 24/7 Pharmacy, Chronic Disease Management, Dental Care, Physiotherapy, and Community Health Outreach.',
  },
  {
    category: 'Visiting',
    question: 'What are the visiting hours for inpatients?',
    answer: 'To ensure patient recovery and clinical care, visiting hours are structured into three daily windows: Morning (06:00 AM – 07:30 AM), Afternoon (12:30 PM – 02:00 PM), and Evening (05:00 PM – 07:30 PM). A maximum of two visitors per bedside is recommended.',
  },
  {
    category: 'General',
    question: 'What should I bring to my appointment?',
    answer: 'Please bring your valid Ghana Card (national ID), your NHIS card or private health insurance card (if applicable), any current medication containers or previous medical records, and your Maternal Health/Child Health Record book if visiting maternity or pediatric clinics.',
  },
  {
    category: 'General',
    question: 'Where is the hospital located and how do I get directions?',
    answer: 'The hospital campus is located at Hospital Road, Bogoso, near Tarkwa, Western Region, Ghana (GhanaPost GPS: WP-0024-8192). Detailed driving directions, public transport drop-offs, and an interactive Google Maps location are provided on our Contact page.',
  },
  {
    category: 'General',
    question: 'How can I find a specific department or doctor?',
    answer: 'You can use the search bar at the top of our website to find doctors by specialty or departments by service. When you arrive on campus, our front desk reception team will guide you or escort patients requiring mobility assistance.',
  },
  {
    category: 'General',
    question: 'How can I request my medical records or a medical report?',
    answer: 'Medical records are managed with strict patient privacy. Patients or authorized guardians can request an official medical summary or police report endorsement through the Hospital Records and Administration Department, with appropriate identification.',
  },
  {
    category: 'Appointments',
    question: 'Can I choose a specific doctor for my consultation?',
    answer: 'Yes, when booking through our appointment portal or calling the appointments desk, you may specify your preferred physician. Our scheduling team will align your request with the doctor’s clinic schedule.',
  },
];

export const PATIENT_INFORMATION = {
  beforeVisit: [
    'Confirm your scheduled appointment time or check walk-in OPD operating hours.',
    'Note down your symptoms, when they started, and any questions you want to ask your doctor.',
    'Arrive 15–20 minutes ahead of scheduled time for smooth vital sign checks.',
    'If having blood tests requiring fasting, refrain from food and sweetened beverages for 8–10 hours before morning sample collection.',
  ],
  whatToBring: [
    'Ghana Card (National Identity Card) or passport',
    'Valid NHIS Card or Private Health Insurance membership card',
    'Child Health Record (yellow/green card) for pediatric visits',
    'Maternal Health Record Book for antenatal consultations',
    'List or packaging of all current medications, vitamins, and herbal remedies',
    'Previous hospital discharge summaries or recent laboratory results if transferring care',
  ],
  patientRights: [
    'Right to considerate, respectful, and dignified care without discrimination based on ethnic background, religion, gender, or financial status.',
    'Right to clear information about your diagnosis, proposed medical treatment, and potential risks in language you understand.',
    'Right to privacy and confidentiality regarding your medical consultations and health records.',
    'Right to give or decline informed consent for procedures and surgical interventions.',
    'Right to transparent fee explanation and an itemized breakdown of services rendered.',
  ],
};
