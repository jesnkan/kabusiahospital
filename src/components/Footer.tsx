import React from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Heart, 
  ShieldCheck, 
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

interface FooterProps {
  onNavigate: (page: string) => void;
  onOpenAppointment: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAppointment }) => {
  const { hospitalInfo } = useHospital();
  const HOSPITAL_INFO = hospitalInfo;


  return (
    <footer className="bg-[#05453E] text-[#E1EBE7] pt-14 pb-8 border-t-4 border-[#D6A84F]" aria-label="Site Footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-[#0C776B]/50">
          
          {/* Col 1 & 2: Hospital Identity & Philosophy */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#075E54] border border-[#D6A84F]/40 flex items-center justify-center text-white shadow-sm flex-shrink-0">
                <svg className="w-6 h-6" viewBox="0 0 32 32" fill="none">
                  <path d="M16 3L6 7v8c0 7 4.5 12.5 10 14 5.5-1.5 10-7 10-14V7l-10-4z" stroke="#D6A84F" strokeWidth="1.5" fill="#075E54" />
                  <path d="M14 10h4v4h4v4h-4v4h-4v-4h-4v-4h4v-4z" fill="#FFFFFF" />
                  <circle cx="16" cy="16" r="2" fill="#D6A84F" />
                </svg>
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-heading tracking-tight leading-tight">
                  {HOSPITAL_INFO.name}
                </h3>
                <p className="text-xs text-[#D6A84F] font-medium tracking-wide">
                  {HOSPITAL_INFO.tagline}
                </p>
              </div>
            </div>

            <p className="text-sm text-[#E1EBE7]/80 leading-relaxed pr-4">
              Providing accessible, patient-centred healthcare with compassion, professionalism, and unwavering respect for Ghanaian families and the communities we serve.
            </p>

            <div className="p-3.5 rounded-xl bg-[#075E54]/70 border border-[#2F8F83]/40 text-xs space-y-1">
              <span className="font-semibold text-white block flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#D6A84F]" />
                Accreditation & Insurance
              </span>
              <p className="text-[#E1EBE7]/80">
                Accredited Ghanaian healthcare facility. We proudly accept NHIS and leading Ghanaian private health insurance schemes.
              </p>
            </div>
          </div>

          {/* Col 3: Hospital Links */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-heading border-b border-[#0C776B] pb-2 inline-block">
              Hospital
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-[#D6A84F] transition-colors flex items-center gap-1 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#2F8F83]" />
                  <span>About Us & Heritage</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-[#D6A84F] transition-colors flex items-center gap-1 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#2F8F83]" />
                  <span>Our Mission & Values</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('doctors')} 
                  className="hover:text-[#D6A84F] transition-colors flex items-center gap-1 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#2F8F83]" />
                  <span>Healthcare Team</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('facilities')} 
                  className="hover:text-[#D6A84F] transition-colors flex items-center gap-1 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#2F8F83]" />
                  <span>Hospital Facilities</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-[#D6A84F] transition-colors flex items-center gap-1 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#2F8F83]" />
                  <span>Location & Directions</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-heading border-b border-[#0C776B] pb-2 inline-block">
              Services
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-[#D6A84F] transition-colors flex items-center gap-1 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#2F8F83]" />
                  <span>Emergency Care (24/7)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-[#D6A84F] transition-colors flex items-center gap-1 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#2F8F83]" />
                  <span>Outpatient Care (OPD)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-[#D6A84F] transition-colors flex items-center gap-1 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#2F8F83]" />
                  <span>Maternal & Child Health</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-[#D6A84F] transition-colors flex items-center gap-1 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#2F8F83]" />
                  <span>Diagnostic Laboratory</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-[#D6A84F] transition-colors flex items-center gap-1 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#2F8F83]" />
                  <span>Hospital Pharmacy (24/7)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('services')} 
                  className="hover:text-[#D6A84F] transition-colors flex items-center gap-1 text-left"
                >
                  <ChevronRight className="w-3.5 h-3.5 text-[#2F8F83]" />
                  <span>Imaging & Ultrasound</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Contact & Emergency */}
          <div>
            <h4 className="text-white font-bold text-base mb-4 font-heading border-b border-[#0C776B] pb-2 inline-block">
              Get In Touch
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
                <span className="text-[#E1EBE7]/90 leading-tight">
                  {HOSPITAL_INFO.contacts.addressPlaceholder}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D6A84F] flex-shrink-0" />
                <a href={`tel:${HOSPITAL_INFO.contacts.generalPhone}`} className="text-[#E1EBE7]/90 hover:text-white transition-colors">
                  {HOSPITAL_INFO.contacts.generalPhone}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D6A84F] flex-shrink-0" />
                <a href={`mailto:${HOSPITAL_INFO.contacts.email}`} className="text-[#E1EBE7]/90 hover:text-white transition-colors truncate">
                  {HOSPITAL_INFO.contacts.email}
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={onOpenAppointment}
                  className="w-full bg-[#D6A84F] hover:bg-[#C3953E] text-[#172321] font-bold text-xs py-2 px-3 rounded-lg transition-colors text-center shadow-sm"
                >
                  Book Appointment Now
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Medical & Data Disclaimer */}
        <div className="py-6 border-b border-[#0C776B]/40 text-xs text-[#E1EBE7]/70">
          <p>
            <strong>Medical Disclaimer:</strong> The health information provided on this website is for general educational awareness only and does not substitute for professional clinical diagnosis, advice, or treatment. Always consult qualified healthcare professionals at K..A Busia Memorial Hospital or your local health provider regarding medical conditions.
          </p>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#E1EBE7]/70">
          <div>
            © 2026 {HOSPITAL_INFO.name}. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Privacy Policy</button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Terms of Use</button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Patient Charter</button>
            <span>•</span>
            <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">Accessibility</button>
            <span>•</span>
            <button onClick={() => onNavigate('admin')} className="text-[#E1EBE7]/50 hover:text-white transition-colors text-[11px]">
              Staff Portal
            </button>
          </div>
        </div>


      </div>
    </footer>
  );
};
