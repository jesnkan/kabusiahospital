import React, { useState } from 'react';
import { 
  Building2, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  Calendar, 
  ShieldCheck, 
  Search,
  Filter
} from 'lucide-react';
import { DEPARTMENTS, Department } from '../data/hospitalData';

interface DepartmentsPageProps {
  onOpenAppointment: (departmentId?: string) => void;
}

export const DepartmentsPage: React.FC<DepartmentsPageProps> = ({ onOpenAppointment }) => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'clinical' | 'diagnostic' | 'support' | 'specialized'>('all');
  const [search, setSearch] = useState('');

  const filteredDepts = DEPARTMENTS.filter((dept) => {
    const matchesFilter = selectedFilter === 'all' || dept.category === selectedFilter;
    const matchesSearch =
      dept.name.toLowerCase().includes(search.toLowerCase()) ||
      dept.description.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F7FAF8]">
      
      {/* Hero */}
      <section className="bg-[#05453E] text-white py-14 sm:py-18 border-b border-[#0C776B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider bg-[#075E54] px-4 py-1.5 rounded-full border border-[#D6A84F]/30">
            CLINICAL DIVISIONS
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white">
            Hospital Departments & Clinics
          </h1>
          <p className="text-sm sm:text-base text-[#E1EBE7] leading-relaxed">
            Our hospital organizes care across specialized clinical, diagnostic, and emergency divisions to deliver fast, coordinated treatment.
          </p>
        </div>
      </section>

      {/* Filter and Notice */}
      <section className="bg-white border-b border-[#E1EBE7] py-4 sticky top-[69px] z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
            <button
              onClick={() => setSelectedFilter('all')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === 'all'
                  ? 'bg-[#075E54] text-white'
                  : 'bg-[#F7FAF8] text-[#172321] border border-[#E1EBE7]'
              }`}
            >
              All Departments ({DEPARTMENTS.length})
            </button>
            <button
              onClick={() => setSelectedFilter('clinical')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === 'clinical'
                  ? 'bg-[#075E54] text-white'
                  : 'bg-[#F7FAF8] text-[#172321] border border-[#E1EBE7]'
              }`}
            >
              Clinical OPD
            </button>
            <button
              onClick={() => setSelectedFilter('specialized')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === 'specialized'
                  ? 'bg-[#075E54] text-white'
                  : 'bg-[#F7FAF8] text-[#172321] border border-[#E1EBE7]'
              }`}
            >
              Specialized Units
            </button>
            <button
              onClick={() => setSelectedFilter('diagnostic')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === 'diagnostic'
                  ? 'bg-[#075E54] text-white'
                  : 'bg-[#F7FAF8] text-[#172321] border border-[#E1EBE7]'
              }`}
            >
              Laboratory & Diagnostics
            </button>
            <button
              onClick={() => setSelectedFilter('support')}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedFilter === 'support'
                  ? 'bg-[#075E54] text-white'
                  : 'bg-[#F7FAF8] text-[#172321] border border-[#E1EBE7]'
              }`}
            >
              Support & Pharmacy
            </button>
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-[#64736F] absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter department name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-[#E1EBE7] rounded-lg bg-[#F7FAF8] focus:outline-none focus:ring-2 focus:ring-[#075E54]"
            />
          </div>

        </div>
      </section>

      {/* Main Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Clinical Organization Note */}
          <div className="mb-8 p-3.5 rounded-2xl bg-[#E7F5F3] border border-[#2F8F83]/30 text-xs text-[#075E54] flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#075E54] flex-shrink-0" />
              <span>
                <strong>Clinical Organization:</strong> All clinical and diagnostic units operate under structured patient safety guidelines with dedicated departmental heads.
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#075E54]">
              Active: {filteredDepts.length} units
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDepts.map((dept) => (
              <div
                key={dept.id}
                className="card-hover-lift bg-white rounded-3xl border border-[#E1EBE7] overflow-hidden shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 bg-gray-100 overflow-hidden">
                    <img
                      src={dept.image}
                      alt={dept.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    <span className="absolute top-3 left-3 bg-white/95 text-[#075E54] text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {dept.category}
                    </span>

                    <h3 className="absolute bottom-3 left-4 right-4 text-lg font-bold text-white font-heading leading-tight">
                      {dept.name}
                    </h3>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs text-[#64736F] leading-relaxed">
                      {dept.fullOverview}
                    </p>

                    <div className="space-y-2 text-xs text-[#172321] pt-2 border-t border-[#E1EBE7]">
                      <div className="flex items-start gap-2">
                        <User className="w-3.5 h-3.5 text-[#075E54] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Clinical Head:</strong> <span className="text-[#64736F]">{dept.headOfDepartment}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#075E54] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Location:</strong> <span className="text-[#64736F]">{dept.location}</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#075E54] flex-shrink-0 mt-0.5" />
                        <div>
                          <strong>Hours:</strong> <span className="text-[#64736F]">{dept.hours}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-[#E1EBE7]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#075E54] block mb-2">
                        Key Clinical Services:
                      </span>
                      <ul className="space-y-1 text-[11px] text-[#64736F]">
                        {dept.keyServices.slice(0, 3).map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#075E54] mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onOpenAppointment(dept.id)}
                    className="w-full py-2.5 px-4 bg-[#E7F5F3] hover:bg-[#075E54] text-[#075E54] hover:text-white rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
                  >
                    <Calendar className="w-4 h-4 text-[#D6A84F]" />
                    <span>Inquire / Book Consultation</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};
