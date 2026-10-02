import React, { useState, useEffect } from 'react';
import { Phone, Calendar, Search } from 'lucide-react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AppointmentModal } from './components/AppointmentModal';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { DoctorProfileModal } from './components/DoctorProfileModal';
import { ServiceDetailModal } from './components/ServiceDetailModal';
import { ArticleModal } from './components/ArticleModal';

import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { DepartmentsPage } from './pages/DepartmentsPage';
import { DoctorsPage } from './pages/DoctorsPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { HealthInformationPage } from './pages/HealthInformationPage';
import { AppointmentPage } from './pages/AppointmentPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPortalPage } from './pages/AdminPortalPage';

import { 
  Doctor, 
  HealthcareService, 
  HealthArticle 
} from './data/hospitalData';

function MainAppContent() {
  const { hospitalInfo, doctors, services, articles } = useHospital();

  // Navigation State
  const [currentPage, setCurrentPage] = useState<string>('home');

  // Modals
  const [appointmentModalOpen, setAppointmentModalOpen] = useState(false);
  const [appointmentPreselectedDept, setAppointmentPreselectedDept] = useState<string | undefined>();
  const [appointmentPreselectedDoc, setAppointmentPreselectedDoc] = useState<string | undefined>();

  const [searchModalOpen, setSearchModalOpen] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [selectedService, setSelectedService] = useState<HealthcareService | null>(null);
  const [selectedArticle, setSelectedArticle] = useState<HealthArticle | null>(null);

  // Sync with window.location.hash on mount & on hashchange
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').trim();
      const validPages = [
        'home', 
        'about', 
        'services', 
        'departments', 
        'doctors', 
        'facilities', 
        'health-info', 
        'appointments', 
        'contact',
        'admin'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAppointmentModal = (deptId?: string, docId?: string) => {
    setAppointmentPreselectedDept(deptId);
    setAppointmentPreselectedDoc(docId);
    setAppointmentModalOpen(true);
  };

  const handleSelectService = (serviceId: string) => {
    const service = services.find((s) => s.id === serviceId) || null;
    setSelectedService(service);
  };

  const handleSelectDoctor = (doctorId: string) => {
    const doctor = doctors.find((d) => d.id === doctorId) || null;
    setSelectedDoctor(doctor);
  };

  const handleSelectArticle = (articleId: string) => {
    const article = articles.find((a) => a.id === articleId) || null;
    setSelectedArticle(article);
  };

  // If on Admin page, show full-screen admin portal
  if (currentPage === 'admin') {
    return <AdminPortalPage onNavigateHome={() => handleNavigate('home')} />;
  }

  // Render Page Content
  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return (
          <AboutPage 
            onNavigate={handleNavigate}
            onOpenAppointment={() => handleOpenAppointmentModal()}
          />
        );
      case 'services':
        return (
          <ServicesPage
            onSelectService={handleSelectService}
            onOpenAppointment={(deptId) => handleOpenAppointmentModal(deptId)}
          />
        );
      case 'departments':
        return (
          <DepartmentsPage
            onOpenAppointment={(deptId) => handleOpenAppointmentModal(deptId)}
          />
        );
      case 'doctors':
        return (
          <DoctorsPage
            onSelectDoctor={handleSelectDoctor}
            onOpenAppointment={(deptId, docId) => handleOpenAppointmentModal(deptId, docId)}
          />
        );
      case 'facilities':
        return (
          <FacilitiesPage
            onOpenAppointment={() => handleOpenAppointmentModal()}
            onNavigate={handleNavigate}
          />
        );
      case 'health-info':
        return (
          <HealthInformationPage
            onSelectArticle={handleSelectArticle}
            onOpenAppointment={() => handleOpenAppointmentModal()}
          />
        );
      case 'appointments':
        return (
          <AppointmentPage
            initialDepartmentId={appointmentPreselectedDept}
            initialDoctorId={appointmentPreselectedDoc}
          />
        );
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onOpenAppointment={() => handleOpenAppointmentModal()}
            onSelectService={handleSelectService}
            onSelectDoctor={handleSelectDoctor}
            onSelectArticle={handleSelectArticle}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F7FAF8] font-sans antialiased text-[#172321]">
      
      {/* Global Header */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenAppointment={() => handleOpenAppointmentModal()}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* Main Page Content */}
      <main className="flex-1 pb-16 lg:pb-0" id="main-content">
        {renderCurrentPage()}
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenAppointment={() => handleOpenAppointmentModal()}
      />

      {/* Mobile Sticky Action Bar */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E1EBE7] px-3 py-2 flex items-center justify-between gap-2 shadow-lg">
        <a
          href={`tel:${hospitalInfo.contacts.generalPhone}`}
          className="flex-1 bg-[#075E54] hover:bg-[#05453E] text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#D6A84F]" />
          <span>Call Hospital</span>
        </a>

        <button
          onClick={() => handleOpenAppointmentModal()}
          className="flex-1 bg-[#075E54] hover:bg-[#05453E] text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
          <span>Book Appointment</span>
        </button>

        <button
          onClick={() => setSearchModalOpen(true)}
          className="p-2.5 bg-[#F7FAF8] text-[#075E54] rounded-xl border border-[#E1EBE7]"
          aria-label="Search"
        >
          <Search className="w-4 h-4" />
        </button>
      </div>

      {/* Reusable Global Modals */}
      <AppointmentModal
        isOpen={appointmentModalOpen}
        onClose={() => setAppointmentModalOpen(false)}
        preselectedDepartmentId={appointmentPreselectedDept}
        preselectedDoctorId={appointmentPreselectedDoc}
      />

      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onSelectService={(serviceId) => {
          handleSelectService(serviceId);
        }}
        onSelectDoctor={(doctorId) => {
          handleSelectDoctor(doctorId);
        }}
        onSelectArticle={(articleId) => {
          handleSelectArticle(articleId);
        }}
        onNavigatePage={(pageId) => {
          handleNavigate(pageId);
        }}
      />

      <DoctorProfileModal
        doctor={selectedDoctor}
        onClose={() => setSelectedDoctor(null)}
        onBookAppointment={(doctorId, deptId) => {
          handleOpenAppointmentModal(deptId, doctorId);
        }}
      />

      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBookAppointment={(deptId) => {
          handleOpenAppointmentModal(deptId);
        }}
      />

      <ArticleModal
        article={selectedArticle}
        onClose={() => setSelectedArticle(null)}
        onOpenAppointment={() => {
          handleOpenAppointmentModal();
        }}
      />

      {/* Footer and modals */}
    </div>
  );
}

export function App() {
  return (
    <HospitalProvider>
      <MainAppContent />
    </HospitalProvider>
  );
}

export default App;
