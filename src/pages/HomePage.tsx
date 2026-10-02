import React, { useState } from 'react';
import { 
  Calendar, 
  Phone, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  Heart, 
  Users, 
  AlertCircle, 
  ChevronRight, 
  ChevronDown, 
  Stethoscope, 
  Activity, 
  Baby, 
  FlaskConical, 
  Pill, 
  Scan, 
  ExternalLink,
  Sparkles,
  Search
} from 'lucide-react';
import { 
  FACILITIES, 
  HEALTH_ARTICLES, 
  TESTIMONIALS, 
  FAQS, 
  PATIENT_INFORMATION,
  HealthcareService,
  Doctor,
  HealthArticle
} from '../data/hospitalData';
import { useHospital } from '../context/HospitalContext';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onOpenAppointment: () => void;
  onSelectService: (serviceId: string) => void;
  onSelectDoctor: (doctorId: string) => void;
  onSelectArticle: (articleId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenAppointment,
  onSelectService,
  onSelectDoctor,
  onSelectArticle,
}) => {
  const { hospitalInfo, doctors, departments, services, addContactMessage } = useHospital();
  const HOSPITAL_INFO = hospitalInfo;
  const DOCTORS = doctors;
  const DEPARTMENTS = departments;
  const SERVICES = services;

  // Facilities category filter
  const [selectedFacilityCategory, setSelectedFacilityCategory] = useState<string>('All');
  
  // FAQ accordion open states
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // In-page contact form state
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactSubject, setContactSubject] = useState('General Hospital Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  const facilityCategories = ['All', 'Reception', 'Patient Wards', 'Consultation Rooms', 'Maternity', 'Laboratory', 'Pharmacy', 'Treatment Areas'];

  const filteredFacilities = selectedFacilityCategory === 'All'
    ? FACILITIES.slice(0, 6)
    : FACILITIES.filter(f => f.category === selectedFacilityCategory);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactName.trim() || !contactPhone.trim()) return;
    addContactMessage({
      name: contactName.trim(),
      phone: contactPhone.trim(),
      subject: contactSubject,
      message: contactMessage.trim(),
    });
    setContactSent(true);
    setTimeout(() => {
      setContactName('');
      setContactPhone('');
      setContactMessage('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-[#F7FAF8]">
      
      {/* ========================================================================= */}
      {/* 7. HERO SECTION */}
      {/* ========================================================================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F7FAF8] via-white to-[#F7FAF8] pt-8 pb-16 lg:pt-16 lg:pb-24 border-b border-[#E1EBE7]">
        {/* Subtle decorative background watermarks */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#075E54]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-[#D6A84F]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Content */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E7F5F3] border border-[#2F8F83]/30">
                <span className="w-2 h-2 rounded-full bg-[#075E54] animate-ping" />
                <span className="text-xs font-bold text-[#075E54] tracking-wider uppercase font-heading">
                  WELCOME TO K..A BUSIA MEMORIAL HOSPITAL
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#172321] tracking-tight leading-[1.15] font-heading">
                Compassionate Care for <span className="text-[#075E54]">Every Generation</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#64736F] leading-relaxed max-w-2xl">
                Providing accessible, patient-centred healthcare with compassion, professionalism and respect for the communities we serve.
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
                <button
                  onClick={onOpenAppointment}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#075E54] hover:bg-[#05453E] text-white font-bold text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <Calendar className="w-5 h-5 text-[#D6A84F]" />
                  <span>Book an Appointment</span>
                </button>

                <button
                  onClick={() => onNavigate('services')}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-[#F7FAF8] text-[#075E54] font-semibold text-base border-2 border-[#075E54]/30 hover:border-[#075E54] transition-all"
                >
                  <span>Explore Our Services</span>
                  <ArrowRight className="w-4 h-4 text-[#D6A84F]" />
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="pt-4 border-t border-[#E1EBE7] flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#64736F]">
                <div className="flex items-center gap-1.5 font-medium text-[#172321]">
                  <CheckCircle2 className="w-4 h-4 text-[#075E54]" />
                  <span>Accredited Ghanaian Institution</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-[#172321]">
                  <CheckCircle2 className="w-4 h-4 text-[#075E54]" />
                  <span>NHIS & Private Insurance Accepted</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium text-[#172321]">
                  <CheckCircle2 className="w-4 h-4 text-[#075E54]" />
                  <span>24/7 Clinical Emergency Support</span>
                </div>
              </div>

            </div>

            {/* Right Hero Image & Floating Cards */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Photo: Ghanaian doctor with patient */}
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3] sm:aspect-square bg-gray-100">
                  <img
                    src="/images/hero-doctor.jpg"
                    alt="Ghanaian doctor consulting warmly with an elderly patient at K..A Busia Memorial Hospital"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                </div>

                {/* Floating Card: Direct Hospital Helpline */}
                <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 shadow-2xl border border-[#E1EBE7] max-w-[270px] animate-float hover:scale-105 transition-transform duration-300">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center flex-shrink-0 shadow-inner">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs uppercase tracking-wider font-extrabold text-[#075E54] block">
                        Hospital Helpline
                      </span>
                      <p className="text-xs font-semibold text-[#172321] mt-0.5">
                        “Here when you need us.”
                      </p>
                      <p className="text-xs text-[#075E54] font-bold mt-0.5 font-mono">
                        {HOSPITAL_INFO.contacts.generalPhone}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Badge: Community Legacy */}
                <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#075E54] text-white px-4 py-2.5 rounded-2xl shadow-xl border border-[#D6A84F]/40 items-center gap-2 text-xs font-semibold animate-float-slow hover:scale-105 transition-transform duration-300">
                  <Heart className="w-4 h-4 text-[#D6A84F]" />
                  <span>Dignity • Respect • Care</span>
                </div>

                {/* Floating Badge 3: Clinical Accreditation */}
                <div className="hidden md:flex absolute top-1/2 -right-5 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl shadow-lg border border-[#E1EBE7] text-[11px] font-bold text-[#075E54] items-center gap-1.5 animate-float hover:scale-105 transition-transform duration-300">
                  <ShieldCheck className="w-4 h-4 text-[#D6A84F]" />
                  <span>MDC Ghana Accredited</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. QUICK ACTION BAR */}
      {/* ========================================================================= */}
      <section className="relative z-20 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-[#E1EBE7] p-2.5 sm:p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-3">
          
          {/* Quick Action 1: Contact & Helpline */}
          <button
            onClick={() => onNavigate('contact')}
            className="card-hover-lift group flex items-start gap-3.5 p-4 rounded-2xl hover:bg-[#E7F5F3]/70 transition-all text-left border border-transparent hover:border-[#2F8F83]/30"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-xs">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#172321] group-hover:text-[#075E54] flex items-center gap-1 transition-colors">
                Contact & Helpline
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </h3>
              <p className="text-xs text-[#64736F] mt-0.5">Direct phone & campus info</p>
            </div>
          </button>

          {/* Quick Action 2: Book an Appointment */}
          <button
            onClick={onOpenAppointment}
            className="card-hover-lift group flex items-start gap-3.5 p-4 rounded-2xl hover:bg-[#E7F5F3]/70 transition-all text-left border border-transparent hover:border-[#2F8F83]/30"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-xs">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#172321] group-hover:text-[#075E54] flex items-center gap-1 transition-colors">
                Book an Appointment
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </h3>
              <p className="text-xs text-[#64736F] mt-0.5">Request a consultation</p>
            </div>
          </button>

          {/* Quick Action 3: Our Departments */}
          <button
            onClick={() => onNavigate('departments')}
            className="card-hover-lift group flex items-start gap-3.5 p-4 rounded-2xl hover:bg-[#FBF4E4]/70 transition-all text-left border border-transparent hover:border-[#D6A84F]/40"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FBF4E4] text-[#93661C] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-xs">
              <Stethoscope className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#172321] group-hover:text-[#93661C] flex items-center gap-1 transition-colors">
                Our Departments
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </h3>
              <p className="text-xs text-[#64736F] mt-0.5">Find the right specialist</p>
            </div>
          </button>

          {/* Quick Action 4: Contact Us */}
          <button
            onClick={() => onNavigate('contact')}
            className="card-hover-lift group flex items-start gap-3.5 p-4 rounded-2xl hover:bg-[#E7F5F3]/70 transition-all text-left border border-transparent hover:border-[#2F8F83]/30"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-[#172321] group-hover:text-[#075E54] flex items-center gap-1 transition-colors">
                Contact Us
                <ChevronRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </h3>
              <p className="text-xs text-[#64736F] mt-0.5">Get directions & contact info</p>
            </div>
          </button>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 9. TRUST / INTRODUCTION SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Large photograph of Ghanaian medical team */}
            <div className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#E1EBE7] bg-gray-100 aspect-[4/3]">
                <img
                  src="/images/medical-team.jpg"
                  alt="A dedicated team of Ghanaian doctors, nurses, and medical specialists at K..A Busia Memorial Hospital"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white text-xs">
                  <span className="font-bold block text-sm">Dedicated Ghanaian Clinical Team</span>
                  <span className="text-white/80">Committed to safe, responsible, and compassionate healthcare.</span>
                </div>
              </div>
            </div>

            {/* Right: Hospital Story & Pillars */}
            <div className="lg:col-span-6 space-y-5">
              
              <div className="inline-block px-3 py-1 rounded-full bg-[#E7F5F3] text-xs font-bold text-[#075E54] uppercase tracking-wider">
                ABOUT OUR HOSPITAL
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172321] tracking-tight font-heading">
                Healthcare built around people
              </h2>

              <p className="text-sm sm:text-base text-[#64736F] leading-relaxed">
                K..A Busia Memorial Hospital is committed to providing compassionate and accessible healthcare while treating every patient with dignity and respect. Guided by the values of service to humanity, we ensure that every family receives attentive, evidence-based care in a welcoming environment.
              </p>

              {/* Three Feature Points */}
              <div className="space-y-4 pt-2">
                
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Heart className="w-5 h-5 text-[#075E54]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#172321] font-heading">
                      Patient-Centred Care
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64736F] mt-0.5">
                      We listen, understand and work with patients and families at every step of their health journey.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#FBF4E4] text-[#93661C] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <ShieldCheck className="w-5 h-5 text-[#D6A84F]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#172321] font-heading">
                      Qualified Professionals
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64736F] mt-0.5">
                      A dedicated clinical team committed to safe, responsible, and ethical healthcare delivery.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Users className="w-5 h-5 text-[#075E54]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#172321] font-heading">
                      Community Focused
                    </h3>
                    <p className="text-xs sm:text-sm text-[#64736F] mt-0.5">
                      Serving the real health needs of individuals, children, mothers, and surrounding Ghanaian communities.
                    </p>
                  </div>
                </div>

              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#075E54] hover:text-[#05453E] group"
                >
                  <span>Learn More About Us</span>
                  <ArrowRight className="w-4 h-4 text-[#D6A84F] group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. SERVICES SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[#F7FAF8] border-y border-[#E1EBE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
              CLINICAL EXCELLENCE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172321] tracking-tight font-heading">
              Our Healthcare Services
            </h2>
            <p className="text-sm sm:text-base text-[#64736F]">
              Comprehensive healthcare services designed around the needs of our patients.
            </p>
          </div>

          {/* 8 Modern Service Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => {
              return (
                <div
                  key={service.id}
                  className="card-hover-lift bg-white rounded-3xl p-6 border border-[#E1EBE7] shadow-sm flex flex-col justify-between group"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#E7F5F3] group-hover:bg-[#075E54] text-[#075E54] group-hover:text-white flex items-center justify-center transition-all duration-300 group-hover:scale-110 shadow-xs">
                      <Stethoscope className="w-6 h-6" />
                    </div>

                    <div>
                      <span className="text-[11px] font-bold text-[#D6A84F] uppercase tracking-wider block mb-1">
                        {service.departmentName}
                      </span>
                      <h3 className="text-lg font-bold text-[#172321] group-hover:text-[#075E54] transition-colors font-heading">
                        {service.name}
                      </h3>
                      <p className="text-xs text-[#64736F] mt-2 leading-relaxed line-clamp-3">
                        {service.shortDescription}
                      </p>
                    </div>
                  </div>

                  <div className="pt-5 mt-4 border-t border-[#E1EBE7]">
                    <button
                      onClick={() => onSelectService(service.id)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#075E54] group-hover:text-[#05453E]"
                    >
                      <span>Learn More</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F] group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Directory Link */}
          <div className="text-center mt-10">
            <button
              onClick={() => onNavigate('services')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-[#075E54] text-[#075E54] hover:bg-[#E7F5F3] font-semibold text-sm transition-colors"
            >
              <span>View Full Services Directory & Patient Guides</span>
              <ArrowRight className="w-4 h-4 text-[#D6A84F]" />
            </button>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. DEPARTMENTS SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
                SPECIALIZED MEDICAL DIVISIONS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172321] tracking-tight font-heading mt-2">
                Find the Care You Need
              </h2>
              <p className="text-sm sm:text-base text-[#64736F] mt-1">
                Explore our specialized hospital departments and clinics.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-amber-800 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-lg">
                Editable CMS Department Content
              </span>
              <button
                onClick={() => onNavigate('departments')}
                className="text-xs font-bold text-[#075E54] hover:underline"
              >
                All Departments →
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DEPARTMENTS.slice(0, 6).map((dept) => (
              <div
                key={dept.id}
                className="rounded-2xl border border-[#E1EBE7] bg-white p-5 hover:border-[#075E54]/40 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#E7F5F3] text-[#075E54] font-semibold uppercase tracking-wider text-[10px]">
                      {dept.category}
                    </span>
                    <span className="text-[#64736F] text-[11px] font-mono">{dept.location.split('(')[0]}</span>
                  </div>

                  <h3 className="text-lg font-bold text-[#172321] font-heading mt-1">
                    {dept.name}
                  </h3>

                  <p className="text-xs text-[#64736F] mt-2 leading-relaxed">
                    {dept.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-[#E1EBE7] space-y-1">
                    <div className="text-[11px] text-[#172321]">
                      <strong>Clinical Lead:</strong> <span className="text-[#64736F]">{dept.headOfDepartment}</span>
                    </div>
                    <div className="text-[11px] text-[#172321]">
                      <strong>Hours:</strong> <span className="text-[#64736F]">{dept.hours}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#E1EBE7] flex items-center justify-between">
                  <button
                    onClick={() => onNavigate('departments')}
                    className="text-xs font-bold text-[#075E54] hover:underline"
                  >
                    Department Overview →
                  </button>
                  <button
                    onClick={onOpenAppointment}
                    className="text-xs bg-[#E7F5F3] hover:bg-[#075E54] hover:text-white text-[#075E54] px-2.5 py-1 rounded-md font-medium transition-colors"
                  >
                    Book OPD
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. WHY CHOOSE US */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 bg-[#E7F5F3]/70 border-y border-[#2F8F83]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-white px-3.5 py-1 rounded-full border border-[#2F8F83]/30">
              OUR COMMITMENT
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172321] tracking-tight font-heading mt-3">
              Care you can trust
            </h2>
            <p className="text-sm text-[#64736F] mt-2">
              Grounded in the values of compassion, safety, and community health.
            </p>
          </div>

          {/* 4 Features / Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="card-hover-lift bg-white rounded-3xl p-7 text-center shadow-sm border border-[#E1EBE7] space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#075E54] font-heading">
                24/7
              </div>
              <h3 className="text-base font-bold text-[#172321]">Emergency Support</h3>
              <p className="text-xs text-[#64736F] leading-relaxed">
                Triage nurses, medical officers, and diagnostic testing ready day and night.
              </p>
            </div>

            <div className="card-hover-lift bg-white rounded-3xl p-7 text-center shadow-sm border border-[#E1EBE7] space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#075E54] font-heading">
                Patient First
              </div>
              <h3 className="text-base font-bold text-[#172321]">Approach to Care</h3>
              <p className="text-xs text-[#64736F] leading-relaxed">
                Active listening, empathetic consultations, and deep respect for every family.
              </p>
            </div>

            <div className="card-hover-lift bg-white rounded-3xl p-7 text-center shadow-sm border border-[#E1EBE7] space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#075E54] font-heading">
                Experienced
              </div>
              <h3 className="text-base font-bold text-[#172321]">Healthcare Professionals</h3>
              <p className="text-xs text-[#64736F] leading-relaxed">
                Licensed medical doctors, midwives, certified pharmacists, and lab scientists.
              </p>
            </div>

            <div className="card-hover-lift bg-white rounded-3xl p-7 text-center shadow-sm border border-[#E1EBE7] space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-[#075E54] font-heading">
                Community
              </div>
              <h3 className="text-base font-bold text-[#172321]">Focused Healthcare</h3>
              <p className="text-xs text-[#64736F] leading-relaxed">
                Mobile screening drives, maternal education, and preventive health initiatives.
              </p>
            </div>

          </div>

          <div className="text-center mt-6">
            <span className="text-[11px] text-[#075E54] font-medium bg-white/80 px-4 py-1.5 rounded-full border border-[#2F8F83]/30">
              * Dedicated to healthcare excellence under Ministry of Health and HeFRA standards.
            </span>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. DOCTOR / MEDICAL TEAM SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
                CLINICAL STAFF
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172321] tracking-tight font-heading mt-2">
                Meet Our Healthcare Team
              </h2>
              <p className="text-sm sm:text-base text-[#64736F] mt-1">
                A dedicated multidisciplinary team committed to your health and peace of mind.
              </p>
            </div>

            <div>
              <button
                onClick={() => onNavigate('doctors')}
                className="text-xs font-bold text-[#075E54] hover:underline"
              >
                View Complete Team Directory →
              </button>
            </div>
          </div>

          {/* Doctor Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {DOCTORS.slice(0, 3).map((doctor) => (
              <div
                key={doctor.id}
                className="card-hover-lift bg-white rounded-3xl border border-[#E1EBE7] overflow-hidden shadow-sm group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-gray-100 overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#075E54] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {doctor.departmentName}
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold text-[#172321] font-heading group-hover:text-[#075E54] transition-colors">
                      {doctor.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#075E54] mt-0.5">
                      {doctor.role}
                    </p>
                    <p className="text-xs text-[#D6A84F] font-medium mt-0.5">
                      {doctor.specialty}
                    </p>
                    <p className="text-xs text-[#64736F] mt-2.5 line-clamp-2 leading-relaxed">
                      {doctor.shortBio}
                    </p>

                    <div className="mt-3 pt-3 border-t border-[#E1EBE7] text-[11px] text-[#64736F]">
                      <span className="font-semibold text-[#172321]">Clinic Days:</span> {doctor.availability}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0 flex gap-2">
                  <button
                    onClick={() => onSelectDoctor(doctor.id)}
                    className="flex-1 py-2 text-xs font-bold text-[#075E54] bg-[#E7F5F3] hover:bg-[#075E54] hover:text-white rounded-lg transition-colors text-center"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={onOpenAppointment}
                    className="py-2 px-3 text-xs font-semibold text-white bg-[#075E54] hover:bg-[#05453E] rounded-lg transition-colors"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-[#64736F] italic">
              * All medical officers and specialists are fully accredited by the Medical and Dental Council (MDC) of Ghana.
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 15. EMERGENCY SECTION (Prominent Banner) */}
      {/* ========================================================================= */}
      <section className="py-12 bg-gradient-to-r from-[#05453E] via-[#075E54] to-[#0C776B] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            <div className="space-y-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-bold uppercase tracking-wider">
                <Phone className="w-3.5 h-3.5 text-[#D6A84F]" />
                <span>Direct Assistance & Inquiries</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
                Need Direct Support or Medical Inquiries?
              </h2>
              <p className="text-xs sm:text-sm text-[#E1EBE7] max-w-2xl leading-relaxed">
                Connect directly with our admissions and hospital desk for consultations, clinical directions, or immediate healthcare support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <div className="bg-black/20 backdrop-blur-xs px-5 py-3 rounded-xl border border-white/20 text-center w-full sm:w-auto">
                <span className="block text-[10px] uppercase font-bold text-[#D6A84F] tracking-wider">
                  Hospital Direct Line
                </span>
                <span className="text-lg font-mono font-bold text-white">
                  {HOSPITAL_INFO.contacts.generalPhone}
                </span>
              </div>

              <a
                href={`tel:${HOSPITAL_INFO.contacts.generalPhone}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#D6A84F] hover:bg-[#C3953E] text-[#172321] font-bold text-sm shadow-lg transition-colors"
              >
                <Phone className="w-4 h-4 text-[#172321]" />
                <span>Call Hospital Desk</span>
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 14. APPOINTMENT SECTION (Inline Preview) */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[#F7FAF8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl shadow-xl border border-[#E1EBE7] overflow-hidden grid grid-cols-1 lg:grid-cols-12">
            
            {/* Left Info Column */}
            <div className="lg:col-span-5 bg-[#075E54] text-white p-8 sm:p-10 flex flex-col justify-between">
              <div className="space-y-4">
                <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider">
                  OUTPATIENT CONSULTATIONS
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-heading">
                  Schedule Your Visit
                </h2>
                <p className="text-xs sm:text-sm text-[#E1EBE7] leading-relaxed">
                  Request a consultation with our experienced physicians, specialists, and wellness clinics.
                </p>

                <div className="pt-4 space-y-3 text-xs text-[#E1EBE7]">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>OPD Hours:</strong> Mon–Fri: 7:30 AM – 8:00 PM | Sat: 8:00 AM – 4:00 PM
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Insurance Desk:</strong> Direct processing for NHIS & accredited private insurers.
                    </div>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#D6A84F] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Confirmation Call:</strong> Our scheduling nurse will verify your slot by phone.
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#0C776B] text-xs text-[#E1EBE7]/80">
                <p className="italic">
                  “Submitting this form does not guarantee an appointment. Our team will contact you to confirm availability.”
                </p>
              </div>
            </div>

            {/* Right Interactive Form Trigger / Quick Booking */}
            <div className="lg:col-span-7 p-8 sm:p-10 flex flex-col justify-center items-center text-center space-y-5">
              <div className="w-16 h-16 rounded-2xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center">
                <Calendar className="w-8 h-8" />
              </div>

              <div className="max-w-md">
                <h3 className="text-xl font-bold text-[#172321] font-heading">
                  Quick Online Appointment Portal
                </h3>
                <p className="text-xs sm:text-sm text-[#64736F] mt-1.5 leading-relaxed">
                  Fill our fast online request form to book General OPD, Maternity, Paediatrics, Surgery, or Diagnostics.
                </p>
              </div>

              <div className="w-full max-w-md pt-2">
                <button
                  onClick={onOpenAppointment}
                  className="w-full bg-[#075E54] hover:bg-[#05453E] text-white py-3.5 px-6 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4 text-[#D6A84F]" />
                  <span>Open Full Appointment Request Form</span>
                </button>
              </div>

              <p className="text-[11px] text-[#64736F]">
                Prefer to call? Speak directly with our clinic desk at <strong>{HOSPITAL_INFO.contacts.generalPhone}</strong>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 16. FACILITIES SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-t border-[#E1EBE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
                MODERN CAMPUS
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172321] tracking-tight font-heading mt-2">
                Hospital Facilities
              </h2>
              <p className="text-sm text-[#64736F] mt-1">
                Equipped for hygiene, comfort, patient privacy, and prompt clinical care.
              </p>
            </div>

            <button
              onClick={() => onNavigate('facilities')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#075E54] hover:underline"
            >
              <span>Explore Our Facilities</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]" />
            </button>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
            {facilityCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedFacilityCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedFacilityCategory === cat
                    ? 'bg-[#075E54] text-white shadow-xs'
                    : 'bg-[#F7FAF8] text-[#172321] hover:bg-[#E7F5F3] border border-[#E1EBE7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Facility Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((fac) => (
              <div
                key={fac.id}
                className="bg-white rounded-2xl border border-[#E1EBE7] overflow-hidden shadow-sm hover:shadow-md transition-all group"
              >
                <div className="relative h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#075E54] px-2.5 py-0.5 rounded-full">
                    {fac.category}
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-[#172321] font-heading group-hover:text-[#075E54] transition-colors">
                    {fac.title}
                  </h3>
                  <p className="text-xs text-[#64736F] mt-1.5 leading-relaxed">
                    {fac.description}
                  </p>

                  <div className="mt-3 pt-3 border-t border-[#E1EBE7] space-y-1">
                    {fac.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-center gap-1.5 text-[11px] text-[#172321]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#2F8F83] flex-shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 17. PATIENT INFORMATION SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[#F7FAF8] border-t border-[#E1EBE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
            <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
              VISITOR GUIDANCE
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172321] tracking-tight font-heading">
              Information for Patients & Visitors
            </h2>
            <p className="text-sm text-[#64736F]">
              Helpful guidelines to ensure a smooth, comfortable visit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Card 1: Before Your Visit */}
            <div className="bg-white rounded-2xl p-6 border border-[#E1EBE7] shadow-sm space-y-3">
              <h3 className="text-base font-bold text-[#172321] font-heading flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#075E54]" />
                <span>Before Your Visit</span>
              </h3>
              <p className="text-xs text-[#64736F] leading-relaxed">
                What to prepare before coming to our clinics:
              </p>
              <ul className="space-y-1.5 text-xs text-[#172321]">
                {PATIENT_INFORMATION.beforeVisit.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#075E54] mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2: Visiting Hours */}
            <div className="bg-white rounded-2xl p-6 border border-[#E1EBE7] shadow-sm space-y-3">
              <h3 className="text-base font-bold text-[#172321] font-heading flex items-center gap-2">
                <Users className="w-4 h-4 text-[#075E54]" />
                <span>Visiting Hours</span>
              </h3>
              <p className="text-xs text-[#64736F] leading-relaxed">
                Structured visiting sessions to protect patient rest:
              </p>
              <div className="space-y-2 text-xs">
                {HOSPITAL_INFO.hours.visitingHours.map((slot, idx) => (
                  <div key={idx} className="p-2.5 rounded-lg bg-[#F7FAF8] border border-[#E1EBE7] flex justify-between items-center">
                    <span className="font-semibold text-[#172321]">{slot.slot}:</span>
                    <span className="font-medium text-[#075E54]">{slot.time}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[#64736F] italic">
                * Maximum 2 visitors per bedside at any given time.
              </p>
            </div>

            {/* Card 3: What to Bring */}
            <div className="bg-white rounded-2xl p-6 border border-[#E1EBE7] shadow-sm space-y-3">
              <h3 className="text-base font-bold text-[#172321] font-heading flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#075E54]" />
                <span>What to Bring</span>
              </h3>
              <p className="text-xs text-[#64736F] leading-relaxed">
                Identification and documentation for registration:
              </p>
              <ul className="space-y-1.5 text-xs text-[#172321]">
                {PATIENT_INFORMATION.whatToBring.slice(0, 4).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F] mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 4: Payment & Insurance */}
            <div className="bg-white rounded-2xl p-6 border border-[#E1EBE7] shadow-sm space-y-3">
              <h3 className="text-base font-bold text-[#172321] font-heading flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#075E54]" />
                <span>Payment & Insurance</span>
              </h3>
              <p className="text-xs text-[#64736F] leading-relaxed">
                {HOSPITAL_INFO.insurance.nhisNote}
              </p>
              <div className="pt-1">
                <span className="text-[11px] font-bold text-[#172321] block mb-1">Accepted Payment Channels:</span>
                <p className="text-xs text-[#64736F]">
                  Cash, Mobile Money (MTN MoMo, Telecel Cash, ATMoney), and Bank Cards.
                </p>
              </div>
            </div>

            {/* Card 5: Patient Rights */}
            <div className="bg-white rounded-2xl p-6 border border-[#E1EBE7] shadow-sm space-y-3">
              <h3 className="text-base font-bold text-[#172321] font-heading flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#075E54]" />
                <span>Patient Rights</span>
              </h3>
              <p className="text-xs text-[#64736F] leading-relaxed">
                Dignity, privacy, and informed consent are fundamental:
              </p>
              <ul className="space-y-1.5 text-xs text-[#172321]">
                {PATIENT_INFORMATION.patientRights.slice(0, 3).map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2F8F83] mt-1.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 6: Quick FAQ Link */}
            <div className="bg-[#E7F5F3] rounded-2xl p-6 border border-[#2F8F83]/30 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="text-base font-bold text-[#075E54] font-heading flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-[#075E54]" />
                  <span>Frequently Asked Questions</span>
                </h3>
                <p className="text-xs text-[#172321] mt-2 leading-relaxed">
                  Have questions about medical records, appointment rescheduling, or ambulance transfers? Check our comprehensive patient FAQ section.
                </p>
              </div>

              <div className="pt-4">
                <a
                  href="#faq-section"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#075E54] hover:underline"
                >
                  <span>Read 10 Most Common Questions ↓</span>
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 18. HEALTH INFORMATION / BLOG */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-t border-[#E1EBE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
                PUBLIC HEALTH EDUCATION
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172321] tracking-tight font-heading mt-2">
                Health & Wellness
              </h2>
              <p className="text-sm sm:text-base text-[#64736F] mt-1">
                Practical, evidence-based healthcare education tailored for Ghanaian families.
              </p>
            </div>

            <button
              onClick={() => onNavigate('health-info')}
              className="text-xs font-bold text-[#075E54] hover:underline"
            >
              Explore All Health Articles →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {HEALTH_ARTICLES.slice(0, 3).map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-2xl border border-[#E1EBE7] overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-48 bg-gray-100 overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-[10px] font-bold text-[#075E54] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {article.category}
                    </div>
                  </div>

                  <div className="p-5">
                    <div className="flex items-center gap-2 text-[11px] text-[#64736F] mb-1.5">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#172321] font-heading group-hover:text-[#075E54] transition-colors leading-snug">
                      {article.title}
                    </h3>

                    <p className="text-xs text-[#64736F] mt-2 line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => onSelectArticle(article.id)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#075E54] group-hover:text-[#05453E]"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F] group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 19. COMMUNITY HEALTH SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-[#FBF4E4]/50 border-y border-[#D6A84F]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-[#93661C] uppercase tracking-wider bg-[#FBF4E4] px-3.5 py-1 rounded-full border border-[#D6A84F]/40">
                BEYOND THE HOSPITAL WALLS
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172321] tracking-tight font-heading">
                Healthier Communities Start With Us
              </h2>

              <p className="text-sm sm:text-base text-[#172321] leading-relaxed">
                “We believe healthcare extends beyond the hospital walls. Through education, prevention and community engagement, we aim to support healthier individuals and stronger communities.”
              </p>

              <div className="space-y-3 pt-2 text-xs sm:text-sm text-[#64736F]">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#075E54] flex-shrink-0 mt-0.5" />
                  <span>Free community blood pressure and diabetes screenings in local markets and churches.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#075E54] flex-shrink-0 mt-0.5" />
                  <span>Maternal health workshops and infant immunization catch-up clinics.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#075E54] flex-shrink-0 mt-0.5" />
                  <span>Public health education on seasonal malaria prevention and clean compound sanitation.</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#075E54] hover:bg-[#05453E] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
                >
                  <span>Our Community Work →</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-gray-100">
                <img
                  src="/images/community-health.jpg"
                  alt="Ghanaian community health nurse providing pediatric vaccination and health advice at a local outreach clinic"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 20. TESTIMONIALS */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
              PATIENT FEEDBACK
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172321] tracking-tight font-heading">
              Voices of Care
            </h2>
            <p className="text-xs text-[#075E54] bg-[#E7F5F3] border border-[#2F8F83]/30 py-1 px-3 rounded-lg inline-block font-medium">
              Real experiences shared by patients and families in our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="bg-[#F7FAF8] rounded-2xl p-6 border border-[#E1EBE7] flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="text-[#D6A84F] text-2xl font-serif">“</div>
                  <p className="text-xs text-[#172321] leading-relaxed italic">
                    {item.quote}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E1EBE7]">
                  <span className="font-bold text-xs text-[#172321] block">
                    {item.patientName}
                  </span>
                  <span className="text-[11px] text-[#64736F] block">
                    {item.serviceReceived} • {item.location}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 21. FAQ SECTION */}
      {/* ========================================================================= */}
      <section id="faq-section" className="py-16 lg:py-24 bg-[#F7FAF8] border-t border-[#E1EBE7]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-12 space-y-2">
            <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
              QUESTIONS & ANSWERS
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172321] tracking-tight font-heading">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-[#64736F]">
              Clear answers to the most common inquiries from patients and families.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-xl border border-[#E1EBE7] overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-[#F7FAF8] transition-colors"
                  >
                    <span className="text-sm sm:text-base font-bold text-[#172321] font-heading">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#075E54] flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#D6A84F]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-0 text-xs sm:text-sm text-[#64736F] leading-relaxed border-t border-[#E1EBE7]/50 mt-1">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 22. CONTACT SECTION */}
      {/* ========================================================================= */}
      <section className="py-16 lg:py-24 bg-white border-t border-[#E1EBE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
              GET IN TOUCH
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#172321] tracking-tight font-heading">
              Contact K..A Busia Memorial Hospital
            </h2>
            <p className="text-sm text-[#64736F]">
              We are here to assist with directions, general inquiries, and clinical guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Contact Information Cards */}
            <div className="lg:col-span-5 space-y-4">
              
              <div className="p-5 rounded-2xl bg-[#F7FAF8] border border-[#E1EBE7] space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#075E54]">
                  <MapPin className="w-4 h-4 text-[#D6A84F]" />
                  <span>Physical Hospital Location</span>
                </div>
                <h3 className="text-base font-bold text-[#172321]">{HOSPITAL_INFO.name}</h3>
                <p className="text-xs text-[#64736F]">{HOSPITAL_INFO.contacts.addressPlaceholder}</p>
                <p className="text-xs font-mono text-[#075E54] pt-1">GhanaPost GPS: {HOSPITAL_INFO.contacts.digitalAddress}</p>
              </div>

              <div className="p-5 rounded-2xl bg-[#F7FAF8] border border-[#E1EBE7] space-y-3 text-xs">
                <div>
                  <span className="text-[#64736F] block">Hospital Telephone:</span>
                  <a href={`tel:${HOSPITAL_INFO.contacts.generalPhone}`} className="text-[#075E54] hover:underline text-sm font-bold font-mono">
                    {HOSPITAL_INFO.contacts.generalPhone}
                  </a>
                </div>

                <div className="pt-2 border-t border-[#E1EBE7]">
                  <span className="text-[#64736F] block">Official Email:</span>
                  <a href={`mailto:${HOSPITAL_INFO.contacts.email}`} className="text-[#172321] hover:underline font-semibold">
                    {HOSPITAL_INFO.contacts.email}
                  </a>
                </div>

                <div className="pt-2 border-t border-[#E1EBE7]">
                  <span className="text-[#64736F] block">Opening Hours:</span>
                  <strong className="text-[#172321] block">Emergency & Pharmacy: 24/7</strong>
                  <span className="text-[#64736F]">Outpatient (OPD): {HOSPITAL_INFO.hours.outpatient}</span>
                </div>
              </div>

              {/* Campus Location & Directions Card */}
              <div className="rounded-2xl border border-[#E1EBE7] overflow-hidden bg-[#E7F5F3]/50 p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#075E54] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                    <MapPin className="w-5 h-5 text-[#D6A84F]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#172321] uppercase tracking-wider">Hospital Location & Directions</h4>
                    <p className="text-xs text-[#64736F] mt-0.5 leading-snug">{HOSPITAL_INFO.contacts.addressPlaceholder}</p>
                    <span className="inline-block mt-1 text-[11px] font-mono font-bold text-[#075E54] bg-white px-2 py-0.5 rounded border border-[#E1EBE7]">
                      GPS: {HOSPITAL_INFO.contacts.digitalAddress}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-[#E1EBE7] text-xs">
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Bogoso,+Tarkwa,+Ghana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#075E54] hover:underline flex items-center gap-1"
                  >
                    <span>Open in Google Maps →</span>
                  </a>
                  <button
                    onClick={() => onNavigate('contact')}
                    className="text-[#64736F] hover:text-[#075E54] hover:underline"
                  >
                    Transit guide
                  </button>
                </div>
              </div>

            </div>

            {/* Right Contact Message Form */}
            <div className="lg:col-span-7 bg-[#F7FAF8] rounded-3xl p-6 sm:p-8 border border-[#E1EBE7]">
              <h3 className="text-xl font-bold text-[#172321] font-heading mb-2">
                Send Us a Message
              </h3>
              <p className="text-xs text-[#64736F] mb-6">
                Have a non-emergency inquiry or feedback? Complete the form below and our administrative team will respond.
              </p>

              {contactSent ? (
                <div className="p-6 bg-[#E7F5F3] border border-[#2F8F83]/30 rounded-2xl text-center space-y-2">
                  <CheckCircle2 className="w-10 h-10 text-[#075E54] mx-auto" />
                  <h4 className="text-base font-bold text-[#075E54]">Message Sent Successfully</h4>
                  <p className="text-xs text-[#172321]">
                    Thank you. We have received your inquiry and our desk will be in touch shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#172321] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Abena Osei"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#E1EBE7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#172321] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. 0244 123 456"
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-[#E1EBE7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172321] mb-1">
                      Department or Subject
                    </label>
                    <select 
                      value={contactSubject}
                      onChange={(e) => setContactSubject(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-[#E1EBE7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                    >
                      <option>General Hospital Inquiry</option>
                      <option>Outpatient & Appointments</option>
                      <option>Maternal & Child Health</option>
                      <option>Laboratory or Radiology Records</option>
                      <option>NHIS & Billing Support</option>
                      <option>Community Outreach Partnership</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#172321] mb-1">
                      Your Message
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Write your inquiry or question here..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-[#E1EBE7] rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#075E54] hover:bg-[#05453E] text-white font-bold text-sm shadow-sm transition-all"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

    </div>
  );
};
