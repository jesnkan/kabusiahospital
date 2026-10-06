import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Search, 
  Menu, 
  X, 
  Calendar
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onOpenAppointment: () => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenAppointment,
  onOpenSearch,
}) => {
  const { hospitalInfo } = useHospital();
  const HOSPITAL_INFO = hospitalInfo;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'departments', label: 'Departments' },
    { id: 'doctors', label: 'Doctors' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'health-info', label: 'Health Information' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Notification / Quick Contact Bar */}
      <div className="bg-[#05453E] text-white text-xs sm:text-sm py-2 px-4 border-b border-[#0C776B]/40">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Left contact info */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-[#E1EBE7]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span className="truncate max-w-[280px] sm:max-w-none">Hospital Road, Bogoso, Western Region</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>OPD: 7:30 AM – 8:00 PM | Emergency: 24/7</span>
            </div>
          </div>

          {/* Right: Hospital Helpline */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden lg:inline text-xs text-[#D6A84F] font-medium bg-[#075E54] px-2 py-0.5 rounded border border-[#D6A84F]/30">
              NHIS & Private Insurance Accepted
            </span>

            <a 
              href={`tel:${HOSPITAL_INFO.contacts.generalPhone}`}
              className="flex items-center gap-1.5 text-white bg-[#075E54] hover:bg-[#05453E] border border-[#2F8F83]/50 px-3 py-1 rounded text-xs font-semibold tracking-wide transition-colors font-mono"
              title="Call Hospital Helpline"
            >
              <Phone className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>Call: {HOSPITAL_INFO.contacts.generalPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header 
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md py-2.5' 
            : 'bg-white py-3.5 shadow-sm'
        } border-b border-[#E1EBE7]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Wordmark */}
          <button 
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left group focus:outline-none py-0.5"
            aria-label="K.A. Busia Memorial Hospital Home"
          >
            <img 
              src="/images/logo.png" 
              alt="K.A. Busia Memorial Hospital" 
              className="h-10 sm:h-12 md:h-13 w-auto max-w-[220px] sm:max-w-[260px] object-contain transition-transform duration-200 group-hover:scale-[1.02]" 
            />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const isActive = currentPage === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'text-[#075E54] bg-[#E7F5F3] font-semibold'
                      : 'text-[#172321] hover:text-[#075E54] hover:bg-[#F7FAF8]'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Actions: Search + Appointment CTA + Emergency */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 rounded-lg text-[#64736F] hover:text-[#075E54] hover:bg-[#F7FAF8] transition-colors focus:outline-none focus:ring-2 focus:ring-[#075E54]/20"
              aria-label="Search hospital services, doctors and health articles"
              title="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Book Appointment CTA */}
            <button
              onClick={onOpenAppointment}
              className="hidden sm:inline-flex items-center gap-2 bg-[#075E54] hover:bg-[#05453E] text-white px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm hover:shadow hover:-translate-y-0.5"
            >
              <Calendar className="w-4 h-4 text-[#D6A84F]" />
              <span>Book Appointment</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg text-[#172321] hover:bg-[#F7FAF8] focus:outline-none"
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-white border-b border-[#E1EBE7] px-4 pt-3 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = currentPage === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#E7F5F3] text-[#075E54] font-semibold'
                        : 'text-[#172321] hover:bg-[#F7FAF8]'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 pt-4 border-t border-[#E1EBE7] flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAppointment();
                }}
                className="w-full flex items-center justify-center gap-2 bg-[#075E54] text-white py-3 rounded-lg font-semibold text-sm shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#D6A84F]" />
                <span>Book an Appointment</span>
              </button>

              <a
                href={`tel:${HOSPITAL_INFO.contacts.generalPhone}`}
                className="w-full flex items-center justify-center gap-2 bg-[#075E54] hover:bg-[#05453E] text-white py-2.5 rounded-lg font-semibold text-sm font-mono"
              >
                <Phone className="w-4 h-4 text-[#D6A84F]" />
                <span>Call Hospital ({HOSPITAL_INFO.contacts.generalPhone})</span>
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
