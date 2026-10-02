import React from 'react';
import { 
  Heart, 
  ShieldCheck, 
  Award, 
  Users, 
  Building2, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import { HOSPITAL_INFO, DOCTORS } from '../data/hospitalData';

interface AboutPageProps {
  onNavigate: (page: string) => void;
  onOpenAppointment: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenAppointment }) => {
  return (
    <div className="min-h-screen bg-[#F7FAF8]">
      
      {/* 1. Hero Section */}
      <section className="bg-[#05453E] text-white py-14 sm:py-20 border-b border-[#0C776B] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#2F8F83]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider bg-[#075E54] px-4 py-1.5 rounded-full border border-[#D6A84F]/30">
            OUR STORY & VALUES
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white">
            About K..A Busia Memorial Hospital
          </h1>
          <p className="text-base sm:text-lg text-[#E1EBE7] leading-relaxed">
            {HOSPITAL_INFO.tagline}
          </p>
        </div>
      </section>

      {/* 2. Hospital Introduction & Heritage */}
      <section className="py-16 bg-white border-b border-[#E1EBE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
                HISTORICAL HERITAGE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172321] font-heading tracking-tight">
                Honouring a Legacy of Knowledge, Humanity & Community Service
              </h2>
              <p className="text-sm sm:text-base text-[#64736F] leading-relaxed">
                {HOSPITAL_INFO.historyAndMission.heritage}
              </p>
              <p className="text-sm text-[#64736F] leading-relaxed">
                Professor Busia held a steadfast conviction that the true measure of national progress lies in the physical wellbeing, dignity, and flourishing of ordinary people in their rural and urban communities. Our hospital operates as a living monument to this philosophy: combining modern, evidence-based medicine with heartfelt hospitality and accessibility.
              </p>

              <div className="p-4 rounded-xl bg-[#FBF4E4] border border-[#D6A84F]/40 text-xs text-[#93661C] flex items-start gap-3">
                <BookOpen className="w-5 h-5 text-[#D6A84F] flex-shrink-0 mt-0.5" />
                <div>
                  <strong>Civic & Healthcare Heritage:</strong> Bridging tertiary clinical expertise with community empathy across Ghanaian districts.
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-gray-100">
                <img
                  src="/images/hospital-exterior.jpg"
                  alt="Modern architectural campus of K..A Busia Memorial Hospital with ambulance entrance and gardens"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 & 4 & 5. Mission, Vision, and History */}
      <section className="py-16 bg-[#F7FAF8] border-b border-[#E1EBE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            
            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-8 border border-[#E1EBE7] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-[#172321] font-heading">
                Our Mission
              </h3>
              <p className="text-sm text-[#64736F] leading-relaxed">
                {HOSPITAL_INFO.historyAndMission.mission}
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-white rounded-3xl p-8 border border-[#E1EBE7] shadow-sm space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#FBF4E4] text-[#93661C] flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-[#D6A84F]" />
              </div>
              <h3 className="text-2xl font-bold text-[#172321] font-heading">
                Our Vision
              </h3>
              <p className="text-sm text-[#64736F] leading-relaxed">
                {HOSPITAL_INFO.historyAndMission.vision}
              </p>
            </div>

          </div>

          {/* 6. Core Values */}
          <div className="space-y-8">
            <div className="text-center max-w-2xl mx-auto">
              <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
                GUIDING PILLARS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172321] font-heading mt-3">
                Our Core Values
              </h2>
              <p className="text-sm text-[#64736F] mt-1">
                The ethical principles guiding our physicians, nurses, pharmacists, and administrative staff daily.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {HOSPITAL_INFO.historyAndMission.coreValues.map((val, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-[#E1EBE7] shadow-2xs hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center font-bold text-sm mb-3">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-[#172321] font-heading mb-2">
                    {val.name}
                  </h3>
                  <p className="text-xs text-[#64736F] leading-relaxed">
                    {val.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 7 & 8. Leadership & Healthcare Team */}
      <section className="py-16 bg-white border-b border-[#E1EBE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
              CLINICAL GOVERNANCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172321] font-heading">
              Hospital Leadership & Medical Governance
            </h2>
            <p className="text-xs text-[#075E54] bg-[#E7F5F3] border border-[#2F8F83]/30 py-1 px-3 rounded-lg inline-block font-medium">
              Dedicated medical directors and clinical leaders upholding excellence in healthcare delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="bg-[#F7FAF8] rounded-2xl p-6 border border-[#E1EBE7] text-center space-y-3">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto overflow-hidden border-2 border-[#075E54]">
                <img
                  src="/images/medical-team.jpg"
                  alt="Dr. Joseph Nana Kwabena Frimpong"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-[#172321] font-heading">
                Dr. Joseph Nana Kwabena Frimpong
              </h3>
              <p className="text-xs font-semibold text-[#075E54]">
                Medical Director & Chief Clinical Officer
              </p>
              <p className="text-xs text-[#64736F] leading-relaxed">
                Oversees clinical quality assurance, doctor credentials, ethical compliance, and clinical patient outcomes.
              </p>
            </div>

            <div className="bg-[#F7FAF8] rounded-2xl p-6 border border-[#E1EBE7] text-center space-y-3">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto overflow-hidden border-2 border-[#075E54]">
                <img
                  src="/images/hero-doctor.jpg"
                  alt="Nurse Evelyn Akosua Mansah Kwarteng"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-[#172321] font-heading">
                Nurse Evelyn Akosua Mansah Kwarteng
              </h3>
              <p className="text-xs font-semibold text-[#075E54]">
                Director of Nursing & Midwifery Services
              </p>
              <p className="text-xs text-[#64736F] leading-relaxed">
                Leads nursing triage, patient bedside care standards, maternity services, and continuous clinical training.
              </p>
            </div>

            <div className="bg-[#F7FAF8] rounded-2xl p-6 border border-[#E1EBE7] text-center space-y-3">
              <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto overflow-hidden border-2 border-[#075E54]">
                <img
                  src="/images/community-health.jpg"
                  alt="Mr. Samuel Kofi Mensah Oteng"
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-bold text-[#172321] font-heading">
                Mr. Samuel Kofi Mensah Oteng
              </h3>
              <p className="text-xs font-semibold text-[#075E54]">
                Hospital Administrator & Operations Head
              </p>
              <p className="text-xs text-[#64736F] leading-relaxed">
                Coordinates facilities maintenance, NHIS relations, community partnerships, and visitor experience.
              </p>
            </div>

          </div>

          <div className="text-center mt-8">
            <button
              onClick={() => onNavigate('doctors')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#075E54] hover:underline"
            >
              <span>Explore All Consulting Physicians and Specialists →</span>
            </button>
          </div>

        </div>
      </section>

      {/* 9 & 10. Community Commitment & Facilities */}
      <section className="py-16 bg-[#F7FAF8] border-b border-[#E1EBE7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3] bg-gray-100">
                <img
                  src="/images/community-health.jpg"
                  alt="Community health nurse in Ghana administering health checks"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <span className="text-xs font-bold text-[#075E54] uppercase tracking-wider bg-[#E7F5F3] px-3.5 py-1 rounded-full">
                COMMUNITY COMMITMENT
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#172321] font-heading tracking-tight">
                Extending Health Beyond Our Campus
              </h2>
              <p className="text-sm text-[#64736F] leading-relaxed">
                True to Ghanaian community spirit, we run continuous mobile outreach programs providing free hypertension checks, diabetes screenings, clean water awareness, and maternal counseling in surrounding districts.
              </p>

              <div className="space-y-2 text-xs text-[#172321]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#075E54]" />
                  <span>Routine community screening at town halls and local markets</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#075E54]" />
                  <span>Free maternal and child nutrition education workshops</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#075E54]" />
                  <span>Collaboration with local health directorates and chiefs</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('facilities')}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-[#075E54] text-[#075E54] hover:bg-[#E7F5F3] font-semibold text-xs transition-colors"
                >
                  <span>Explore Our Medical Facilities & Equipment →</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. Contact CTA */}
      <section className="py-16 bg-[#075E54] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white">
            Experience Quality Healthcare at K..A Busia Memorial Hospital
          </h2>
          <p className="text-xs sm:text-sm text-[#E1EBE7] max-w-xl mx-auto">
            Whether you need a routine check-up, maternal care, or urgent medical evaluation, our dedicated clinical team is here for you.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenAppointment}
              className="w-full sm:w-auto px-7 py-3 rounded-xl bg-[#D6A84F] hover:bg-[#C3953E] text-[#172321] font-bold text-sm shadow-md transition-all"
            >
              Book an Appointment
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-sm border border-white/30 transition-all"
            >
              Contact Hospital Campus
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
