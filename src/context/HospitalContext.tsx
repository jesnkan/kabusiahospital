import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  HOSPITAL_INFO as DEFAULT_HOSPITAL_INFO,
  DEPARTMENTS as DEFAULT_DEPARTMENTS,
  SERVICES as DEFAULT_SERVICES,
  DOCTORS as DEFAULT_DOCTORS,
  HEALTH_ARTICLES as DEFAULT_ARTICLES,
  TESTIMONIALS as DEFAULT_TESTIMONIALS,
  FAQS as DEFAULT_FAQS,
  Department,
  HealthcareService,
  Doctor,
  HealthArticle,
  Testimonial,
  FAQItem
} from '../data/hospitalData';

export interface PatientAppointment {
  id: string;
  referenceId: string;
  fullName: string;
  phoneNumber: string;
  emailAddress?: string;
  departmentId: string;
  departmentName: string;
  doctorId?: string;
  doctorName?: string;
  date: string;
  timeSlot: string;
  reason: string;
  message?: string;
  insuranceType: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status: 'Unread' | 'Reviewed' | 'Archived';
  createdAt: string;
}

interface HospitalContextType {
  hospitalInfo: typeof DEFAULT_HOSPITAL_INFO;
  departments: Department[];
  services: HealthcareService[];
  doctors: Doctor[];
  articles: HealthArticle[];
  testimonials: Testimonial[];
  appointments: PatientAppointment[];
  contactMessages: ContactMessage[];

  // Actions
  updateHospitalInfo: (info: Partial<typeof DEFAULT_HOSPITAL_INFO>) => void;
  updateContacts: (contacts: Partial<typeof DEFAULT_HOSPITAL_INFO.contacts>) => void;
  updateHours: (hours: Partial<typeof DEFAULT_HOSPITAL_INFO.hours>) => void;
  addDoctor: (doctor: Omit<Doctor, 'id'>) => void;
  updateDoctor: (id: string, updated: Partial<Doctor>) => void;
  deleteDoctor: (id: string) => void;
  addAppointment: (appointment: Omit<PatientAppointment, 'id' | 'referenceId' | 'status' | 'createdAt'>) => string;
  updateAppointmentStatus: (id: string, status: PatientAppointment['status']) => void;
  deleteAppointment: (id: string) => void;
  addContactMessage: (msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => void;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;
  resetAllToDefaults: () => void;
  exportDataJson: () => string;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

const INITIAL_APPOINTMENTS: PatientAppointment[] = [
  {
    id: 'apt-101',
    referenceId: 'KAB-492104',
    fullName: 'Kwesi Mensah',
    phoneNumber: '+233 24 412 3456',
    emailAddress: 'kwesi.mensah@gmail.com',
    departmentId: 'opd',
    departmentName: 'General Outpatient Department (OPD)',
    doctorId: 'dr-kwame-boateng',
    doctorName: 'Dr. Kwame Boateng',
    date: '2026-09-28',
    timeSlot: 'Morning (8:00 AM – 11:30 AM)',
    reason: 'Routine Check-up / Consultation',
    message: 'Persistent mild headache for 3 days and blood pressure check.',
    insuranceType: 'NHIS',
    status: 'Pending',
    createdAt: '2026-09-26 08:30 AM',
  },
  {
    id: 'apt-102',
    referenceId: 'KAB-810294',
    fullName: 'Ama Serwaa Osei',
    phoneNumber: '+233 50 987 6543',
    emailAddress: 'ama.osei@yahoo.com',
    departmentId: 'maternity',
    departmentName: 'Maternity, Obstetrics & Gynaecology',
    doctorId: 'dr-abena-mensah',
    doctorName: 'Dr. Abena Pokua Mensah',
    date: '2026-09-29',
    timeSlot: 'Mid-day (12:00 PM – 2:30 PM)',
    reason: 'Antenatal / Maternity Booking',
    message: 'First trimester antenatal review and ultrasound scan.',
    insuranceType: 'Private Insurance (Nationwide)',
    status: 'Confirmed',
    createdAt: '2026-09-25 02:15 PM',
  },
  {
    id: 'apt-103',
    referenceId: 'KAB-334190',
    fullName: 'Kofi Owusu',
    phoneNumber: '+233 27 555 4321',
    departmentId: 'paediatrics',
    departmentName: 'Paediatrics & Child Health',
    doctorId: 'dr-kofi-asante',
    doctorName: 'Dr. Kofi Asante-Wiredu',
    date: '2026-09-30',
    timeSlot: 'Morning (8:00 AM – 11:30 AM)',
    reason: 'Childhood Health & Immunisation',
    message: '6-month vaccination catch-up and pediatric growth assessment.',
    insuranceType: 'NHIS',
    status: 'Pending',
    createdAt: '2026-09-26 09:40 AM',
  },
];

const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Ebenezer Addo',
    phone: '+233 24 333 8899',
    email: 'e.addo@outlook.com',
    subject: 'NHIS Claims & Billing Support',
    message: 'Good morning, does your laboratory support the newly renewed biometric NHIS card for complete blood chemistry tests?',
    status: 'Unread',
    createdAt: '2026-09-26 07:15 AM',
  },
  {
    id: 'msg-2',
    name: 'Sister Mary Teresa (Local Parish)',
    phone: '+233 20 111 2233',
    subject: 'Community Health Outreach Partnership',
    message: 'We would love to invite your public health team for a Sunday hypertension and diabetes screening after church service next month.',
    status: 'Reviewed',
    createdAt: '2026-09-25 11:20 AM',
  },
];

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or defaults
  const [hospitalInfo, setHospitalInfo] = useState(() => {
    const saved = localStorage.getItem('kabusia_hospital_info');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (
          !parsed.contacts?.generalPhone ||
          parsed.contacts.generalPhone.includes('200 1100') ||
          parsed.contacts.generalPhonePlaceholder?.includes('[') ||
          parsed.contacts.emergencyPhonePlaceholder?.includes('[') ||
          !parsed.contacts?.addressPlaceholder ||
          parsed.contacts.addressPlaceholder.includes('Sunyani') ||
          parsed.contacts.addressPlaceholder.includes('Cantonments') ||
          parsed.contacts.addressPlaceholder.startsWith('[')
        ) {
          parsed.contacts = {
            ...DEFAULT_HOSPITAL_INFO.contacts,
          };
          localStorage.setItem('kabusia_hospital_info', JSON.stringify(parsed));
        }
        if (parsed.name && parsed.name.includes('..')) {
          parsed.name = DEFAULT_HOSPITAL_INFO.name;
          parsed.legalName = DEFAULT_HOSPITAL_INFO.legalName;
          localStorage.setItem('kabusia_hospital_info', JSON.stringify(parsed));
        }
        return parsed;
      } catch {
        return DEFAULT_HOSPITAL_INFO;
      }
    }
    return DEFAULT_HOSPITAL_INFO;
  });

  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    const saved = localStorage.getItem('kabusia_doctors');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((d: Doctor) => d.name?.includes('[') || d.qualifications?.includes('['))) {
          localStorage.setItem('kabusia_doctors', JSON.stringify(DEFAULT_DOCTORS));
          return DEFAULT_DOCTORS;
        }
        return parsed;
      } catch {
        return DEFAULT_DOCTORS;
      }
    }
    return DEFAULT_DOCTORS;
  });

  const [departments, setDepartments] = useState<Department[]>(() => {
    const saved = localStorage.getItem('kabusia_departments');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.some((d: Department) => d.headOfDepartment?.includes('['))) {
          localStorage.setItem('kabusia_departments', JSON.stringify(DEFAULT_DEPARTMENTS));
          return DEFAULT_DEPARTMENTS;
        }
        return parsed;
      } catch {
        return DEFAULT_DEPARTMENTS;
      }
    }
    return DEFAULT_DEPARTMENTS;
  });

  const [services] = useState<HealthcareService[]>(DEFAULT_SERVICES);
  const [articles] = useState<HealthArticle[]>(DEFAULT_ARTICLES);
  const [testimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);

  const [appointments, setAppointments] = useState<PatientAppointment[]>(() => {
    const saved = localStorage.getItem('kabusia_appointments');
    return saved ? JSON.parse(saved) : INITIAL_APPOINTMENTS;
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('kabusia_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Save changes to localStorage
  useEffect(() => {
    localStorage.setItem('kabusia_hospital_info', JSON.stringify(hospitalInfo));
  }, [hospitalInfo]);

  useEffect(() => {
    localStorage.setItem('kabusia_doctors', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('kabusia_departments', JSON.stringify(departments));
  }, [departments]);

  useEffect(() => {
    localStorage.setItem('kabusia_appointments', JSON.stringify(appointments));
  }, [appointments]);

  useEffect(() => {
    localStorage.setItem('kabusia_messages', JSON.stringify(contactMessages));
  }, [contactMessages]);

  // Real-time cross-tab synchronization
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'kabusia_appointments' && e.newValue) {
        try {
          setAppointments(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'kabusia_messages' && e.newValue) {
        try {
          setContactMessages(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'kabusia_doctors' && e.newValue) {
        try {
          setDoctors(JSON.parse(e.newValue));
        } catch {}
      }
      if (e.key === 'kabusia_hospital_info' && e.newValue) {
        try {
          setHospitalInfo(JSON.parse(e.newValue));
        } catch {}
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const updateHospitalInfo = (info: Partial<typeof DEFAULT_HOSPITAL_INFO>) => {
    setHospitalInfo((prev: typeof DEFAULT_HOSPITAL_INFO) => ({
      ...prev,
      ...info,
    }));
  };

  const updateContacts = (contacts: Partial<typeof DEFAULT_HOSPITAL_INFO.contacts>) => {
    setHospitalInfo((prev: typeof DEFAULT_HOSPITAL_INFO) => ({
      ...prev,
      contacts: {
        ...prev.contacts,
        ...contacts,
      },
    }));
  };

  const updateHours = (hours: Partial<typeof DEFAULT_HOSPITAL_INFO.hours>) => {
    setHospitalInfo((prev: typeof DEFAULT_HOSPITAL_INFO) => ({
      ...prev,
      hours: {
        ...prev.hours,
        ...hours,
      },
    }));
  };

  const addDoctor = (doc: Omit<Doctor, 'id'>) => {
    const id = 'doc-' + Date.now();
    setDoctors((prev) => [
      { id, ...doc, isPlaceholder: false },
      ...prev,
    ]);
  };

  const updateDoctor = (id: string, updated: Partial<Doctor>) => {
    setDoctors((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updated, isPlaceholder: false } : d))
    );
  };

  const deleteDoctor = (id: string) => {
    setDoctors((prev) => prev.filter((d) => d.id !== id));
  };

  const addAppointment = (data: Omit<PatientAppointment, 'id' | 'referenceId' | 'status' | 'createdAt'>) => {
    const code = 'KAB-' + Math.floor(100000 + Math.random() * 900000);
    const id = 'apt-' + Date.now();
    const newApt: PatientAppointment = {
      ...data,
      id,
      referenceId: code,
      status: 'Pending',
      createdAt: new Date().toLocaleString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setAppointments((prev) => [newApt, ...prev]);
    return code;
  };

  const updateAppointmentStatus = (id: string, status: PatientAppointment['status']) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
  };

  const deleteAppointment = (id: string) => {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  };

  const addContactMessage = (data: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>) => {
    const newMsg: ContactMessage = {
      ...data,
      id: 'msg-' + Date.now(),
      status: 'Unread',
      createdAt: new Date().toLocaleString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };
    setContactMessages((prev) => [newMsg, ...prev]);
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    setContactMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  const resetAllToDefaults = () => {
    localStorage.removeItem('kabusia_hospital_info');
    localStorage.removeItem('kabusia_doctors');
    localStorage.removeItem('kabusia_departments');
    localStorage.removeItem('kabusia_appointments');
    localStorage.removeItem('kabusia_messages');
    setHospitalInfo(DEFAULT_HOSPITAL_INFO);
    setDoctors(DEFAULT_DOCTORS);
    setDepartments(DEFAULT_DEPARTMENTS);
    setAppointments(INITIAL_APPOINTMENTS);
    setContactMessages(INITIAL_MESSAGES);
  };

  const exportDataJson = () => {
    const fullState = {
      hospitalInfo,
      doctors,
      departments,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(fullState, null, 2);
  };

  return (
    <HospitalContext.Provider
      value={{
        hospitalInfo,
        departments,
        services,
        doctors,
        articles,
        testimonials,
        appointments,
        contactMessages,
        updateHospitalInfo,
        updateContacts,
        updateHours,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        addAppointment,
        updateAppointmentStatus,
        deleteAppointment,
        addContactMessage,
        updateMessageStatus,
        resetAllToDefaults,
        exportDataJson,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
