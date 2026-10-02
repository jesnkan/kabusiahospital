import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Stethoscope, 
  Clock, 
  Calendar, 
  ShieldCheck, 
  Globe2, 
  Award,
  UserCheck
} from 'lucide-react';
import { DOCTORS, DEPARTMENTS, Doctor } from '../data/hospitalData';

interface DoctorsPageProps {
  onSelectDoctor: (doctorId: string) => void;
  onOpenAppointment: (departmentId?: string, doctorId?: string) => void;
}

export const DoctorsPage: React.FC<DoctorsPageProps> = ({
  onSelectDoctor,
  onOpenAppointment,
}) => {
  const [search, setSearch] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredDoctors = useMemo(() => {
    return DOCTORS.filter((doc) => {
      const matchesSearch =
        doc.name.toLowerCase().includes(search.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(search.toLowerCase()) ||
        doc.departmentName.toLowerCase().includes(search.toLowerCase());

      const matchesDept =
        departmentFilter === 'all' || doc.departmentId === departmentFilter;

      return matchesSearch && matchesDept;
    });
  }, [search, departmentFilter]);

  return (
    <div className="min-h-screen bg-[#F7FAF8]">
      
      {/* Hero */}
      <section className="bg-[#05453E] text-white py-14 sm:py-18 border-b border-[#0C776B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider bg-[#075E54] px-4 py-1.5 rounded-full border border-[#D6A84F]/30">
            MEDICAL LEADERSHIP
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white">
            Find Doctors & Healthcare Professionals
          </h1>
          <p className="text-sm sm:text-base text-[#E1EBE7] leading-relaxed">
            Meet our dedicated team of medical officers, specialists, and nursing leaders providing patient-centred care across Ghana.
          </p>
        </div>
      </section>

      {/* Search & Filter Header */}
      <section className="bg-white border-b border-[#E1EBE7] py-4 sticky top-[69px] z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-[#64736F] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by physician name, specialty, or condition..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-[#E1EBE7] rounded-xl bg-[#F7FAF8] focus:outline-none focus:ring-2 focus:ring-[#075E54] focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-[#64736F] flex-shrink-0" />
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="w-full sm:w-60 px-3 py-2 text-xs border border-[#E1EBE7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
            >
              <option value="all">All Clinical Departments</option>
              {DEPARTMENTS.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

        </div>
      </section>

      {/* Directory Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Trust & Safe Medical Claim Note */}
          <div className="mb-8 p-4 rounded-2xl bg-[#E7F5F3] border border-[#2F8F83]/30 text-xs text-[#075E54] flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#075E54] flex-shrink-0 mt-0.5" />
            <div>
              <strong>Staff Credential Policy:</strong> In adherence to healthcare excellence and clinical governance, all medical officers, consultants, and nursing specialists are licensed and accredited under the Medical and Dental Council (MDC) and the Nursing and Midwifery Council (NMC) of Ghana.
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="card-hover-lift bg-white rounded-3xl border border-[#E1EBE7] overflow-hidden shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="p-6 pb-4 bg-gradient-to-br from-[#075E54] to-[#04332D] text-white relative overflow-hidden">
                    <div className="flex items-start justify-between gap-3 relative z-10">
                      <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-[#D6A84F] flex items-center justify-center text-xl font-bold font-heading shadow-inner">
                        {doc.name.replace('Dr. ', '').split(' ').map(n => n[0]).slice(0, 2).join('')}
                      </div>
                      <span className="bg-[#D6A84F] text-[#075E54] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        {doc.departmentName}
                      </span>
                    </div>
                    <div className="mt-3 flex items-center gap-1.5 text-xs text-[#E1EBE7]">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#D6A84F]" />
                      <span>MDC Ghana Verified Practitioner</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <div>
                      <h2 className="text-xl font-bold text-[#172321] font-heading group-hover:text-[#075E54] transition-colors">
                        {doc.name}
                      </h2>
                      <p className="text-xs font-semibold text-[#075E54] mt-0.5">
                        {doc.role}
                      </p>
                      <p className="text-xs text-[#D6A84F] font-semibold mt-0.5">
                        {doc.specialty}
                      </p>
                    </div>

                    <p className="text-xs text-[#64736F] line-clamp-3 leading-relaxed">
                      {doc.shortBio}
                    </p>

                    <div className="pt-3 border-t border-[#E1EBE7] space-y-2 text-xs">
                      <div className="flex items-start gap-2 text-[#172321]">
                        <Clock className="w-3.5 h-3.5 text-[#075E54] flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Clinic Days:</strong> {doc.availability}
                        </span>
                      </div>

                      <div className="flex items-start gap-2 text-[#172321]">
                        <Globe2 className="w-3.5 h-3.5 text-[#075E54] flex-shrink-0 mt-0.5" />
                        <span>
                          <strong>Languages:</strong> {doc.languages.join(', ')}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>

                <div className="p-6 pt-0 flex gap-2">
                  <button
                    onClick={() => onSelectDoctor(doc.id)}
                    className="flex-1 py-2.5 px-3 bg-[#E7F5F3] hover:bg-[#075E54] text-[#075E54] hover:text-white rounded-xl text-xs font-bold transition-colors text-center"
                  >
                    View Full Profile
                  </button>
                  <button
                    onClick={() => onOpenAppointment(doc.departmentId, doc.id)}
                    className="py-2.5 px-4 bg-[#075E54] hover:bg-[#05453E] text-white rounded-xl text-xs font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Book</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

          {filteredDoctors.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E1EBE7]">
              <UserCheck className="w-12 h-12 text-[#64736F] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#172321]">No physicians found</h3>
              <p className="text-xs text-[#64736F] mt-1">Try resetting your search query or department filter.</p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
