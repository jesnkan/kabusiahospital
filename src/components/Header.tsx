import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Search, 
  Menu, 
  X, 
  AlertCircle, 
  Calendar,
  ChevronDown
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState(false);

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
              <span className="truncate max-w-[280px] sm:max-w-none">Ghana Campus: [Hospital Address, Ghana]</span>
            </div>
            <div className="hidden lg:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#D6A84F]" />
              <span>OPD: 7:30 AM – 8:00 PM | Emergency: 24/7</span>
            </div>
          </div>

          {/* Right: Emergency Hotline & Admin Notice */}
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-xs text-[#D6A84F] font-medium bg-[#075E54] px-2 py-0.5 rounded border border-[#D6A84F]/30">
              NHIS & Private Insurance Accepted
            </span>
            <button 
              onClick={() => setEmergencyModalOpen(true)}
              className="flex items-center gap-1.5 text-white bg-red-700/80 hover:bg-red-700 px-2.5 py-1 rounded text-xs font-semibold tracking-wide transition-colors animate-pulse"
              title="Click for emergency telephone contact"
            >
              <Phone className="w-3.5 h-3.5 text-white" />
              <span>Emergency: [Emergency Number]</span>
            </button>
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
            className="flex items-center gap-3 text-left group focus:outline-none"
            aria-label="K..A Busia Memorial Hospital Home"
          >
            {/* Custom Healthcare Emblem (Cross + Leaf + Shield Motif) */}
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#075E54] flex items-center justify-center shadow-md text-white transition-transform group-hover:scale-105 relative overflow-hidden flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0C776B] to-[#05453E] opacity-90" />
              {/* Stylized Cross + Heart/Leaf Vector */}
              <svg className="w-7 h-7 relative z-10" viewBox="0 0 32 32" fill="none">
                {/* Shield Outline */}
                <path d="M16 3L6 7v8c0 7 4.5 12.5 10 14 5.5-1.5 10-7 10-14V7l-10-4z" stroke="#D6A84F" strokeWidth="1.5" fill="#075E54" />
                {/* White Medical Cross */}
                <path d="M14 10h4v4h4v4h-4v4h-4v-4h-4v-4h4v-4z" fill="#FFFFFF" />
                {/* Warm Gold Centre Accent */}
                <circle cx="16" cy="16" r="2" fill="#D6A84F" />
              </svg>
            </div>

            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl leading-tight text-[#075E54] tracking-tight font-heading">
                K..A Busia
              </span>
              <span className="text-xs sm:text-sm font-semibold text-[#172321] tracking-wide uppercase">
                Memorial Hospital
              </span>
              <span className="hidden sm:block text-[10px] text-[#64736F] leading-none mt-0.5">
                Quality Healthcare • Ghana
              </span>
            </div>
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

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setEmergencyModalOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-700 text-white py-2.5 rounded-lg font-semibold text-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Emergency: Call Now</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Emergency Hotline Modal */}
      {emergencyModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border-2 border-red-500 animate-in zoom-in-95 duration-150 relative">
            <button
              onClick={() => setEmergencyModalOpen(false)}
              className="absolute top-4 right-4 text-[#64736F] hover:text-[#172321] p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 text-red-700 mb-3">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-red-700" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-red-900 leading-tight">Emergency Assistance</h3>
                <p className="text-xs text-red-700">Available 24 Hours • 7 Days a Week</p>
              </div>
            </div>

            <p className="text-sm text-[#172321] mb-4">
              If you or someone around you is facing a medical emergency, acute chest pain, severe trauma, or breathing difficulty, reach our emergency triage desk immediately.
            </p>

            <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4 text-center">
              <span className="block text-xs uppercase font-semibold text-red-800 tracking-wider mb-1">
                Hospital Emergency Direct Line
              </span>
              <a 
                href={`tel:${HOSPITAL_INFO.contacts.emergencyPhone}`}
                className="text-2xl font-extrabold text-red-700 hover:underline block"
              >
                {HOSPITAL_INFO.contacts.emergencyPhonePlaceholder}
              </a>
              <span className="text-xs text-[#64736F] block mt-1">
                Default Hotline: {HOSPITAL_INFO.contacts.emergencyPhone}
              </span>
            </div>

            <div className="space-y-2 text-xs text-[#64736F] mb-5">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#075E54] flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Emergency Entrance:</strong> Ground Floor Emergency Wing, Direct Ambulance Bay, {HOSPITAL_INFO.contacts.addressPlaceholder}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#075E54] flex-shrink-0 mt-0.5" />
                <span>No prior appointment needed for life-threatening acute cases.</span>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={`tel:${HOSPITAL_INFO.contacts.emergencyPhone}`}
                className="flex-1 bg-red-700 hover:bg-red-800 text-white font-semibold py-2.5 px-4 rounded-xl text-center text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Emergency Now</span>
              </a>
              <button
                onClick={() => setEmergencyModalOpen(false)}
                className="px-4 py-2.5 rounded-xl border border-[#E1EBE7] text-sm font-medium hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
