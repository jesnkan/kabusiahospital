import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Calendar, 
  ArrowRight,
  Zap,
  Wind
} from 'lucide-react';
import { FACILITIES, HOSPITAL_INFO, FacilityItem } from '../data/hospitalData';

interface FacilitiesPageProps {
  onOpenAppointment: () => void;
  onNavigate: (page: string) => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ onOpenAppointment, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem | null>(null);

  const categories = [
    'All',
    'Reception',
    'Patient Wards',
    'Consultation Rooms',
    'Maternity',
    'Laboratory',
    'Pharmacy',
    'Waiting Areas',
    'Treatment Areas',
  ];

  const displayedFacilities = activeCategory === 'All'
    ? FACILITIES
    : FACILITIES.filter(f => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#F7FAF8]">
      
      {/* Hero */}
      <section className="bg-[#05453E] text-white py-14 sm:py-18 border-b border-[#0C776B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider bg-[#075E54] px-4 py-1.5 rounded-full border border-[#D6A84F]/30">
            MODERN CLINICAL INFRASTRUCTURE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white">
            Our Medical Campus & Facilities
          </h1>
          <p className="text-sm sm:text-base text-[#E1EBE7] leading-relaxed">
            Engineered to the highest standards of clinical hygiene, patient dignity, uninterrupted power, and serene recovery.
          </p>
        </div>
      </section>

      {/* Facilities Highlights Banner */}
      <section className="bg-white border-b border-[#E1EBE7] py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center flex-shrink-0">
                <Zap className="w-5 h-5 text-[#D6A84F]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#172321] uppercase">Dual Power Backup</h4>
                <p className="text-[11px] text-[#64736F]">Dual industrial generators & solar UPS support.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center flex-shrink-0">
                <Wind className="w-5 h-5 text-[#2F8F83]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#172321] uppercase">HEPA Air Filtration</h4>
                <p className="text-[11px] text-[#64736F]">Sterile laminar flow surgical suites.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-[#075E54]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#172321] uppercase">Infection Controls</h4>
                <p className="text-[11px] text-[#64736F]">Stringent clinical sanitation protocols.</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E7F5F3] text-[#075E54] flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-[#075E54]" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#172321] uppercase">Wheelchair Accessible</h4>
                <p className="text-[11px] text-[#64736F]">Ramps, elevators, and wide corridors.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="sticky top-[69px] z-30 bg-white border-b border-[#E1EBE7] py-3.5 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#075E54] text-white shadow-2xs'
                    : 'bg-[#F7FAF8] text-[#172321] hover:bg-[#E7F5F3] border border-[#E1EBE7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedFacilities.map((facility) => (
              <div
                key={facility.id}
                onClick={() => setSelectedFacility(facility)}
                className="bg-white rounded-3xl border border-[#E1EBE7] overflow-hidden shadow-sm hover:shadow-lg transition-all cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="p-6 pb-4 bg-gradient-to-r from-[#075E54] to-[#0D3B35] text-white relative overflow-hidden">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-[#D6A84F] flex items-center justify-center shadow-xs">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <span className="bg-[#D6A84F] text-[#075E54] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        {facility.category}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white font-heading leading-tight">
                      {facility.title}
                    </h3>
                  </div>

                  <div className="p-6 space-y-3">
                    <p className="text-xs text-[#64736F] leading-relaxed">
                      {facility.description}
                    </p>

                    <div className="pt-3 border-t border-[#E1EBE7] space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#075E54] block">
                        Features & Amenities:
                      </span>
                      {facility.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-[#172321]">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2F8F83] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <span className="text-xs font-bold text-[#075E54] group-hover:text-[#05453E] inline-flex items-center gap-1">
                    <span>Enlarge & View Details</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F] group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Facility Lightbox Modal */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#E1EBE7] overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-6 bg-gradient-to-r from-[#075E54] to-[#04332D] text-white relative overflow-hidden flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-[#D6A84F] flex items-center justify-center shadow-xs">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider block">
                    {selectedFacility.category}
                  </span>
                  <h3 className="text-xl font-bold font-heading text-white">
                    {selectedFacility.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedFacility(null)}
                className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            <div className="p-6 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D6A84F]">
                {selectedFacility.category}
              </span>
              <h3 className="text-2xl font-bold text-[#172321] font-heading">
                {selectedFacility.title}
              </h3>
              <p className="text-sm text-[#64736F] leading-relaxed">
                {selectedFacility.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-[#E1EBE7]">
                {selectedFacility.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#172321]">
                    <CheckCircle2 className="w-4 h-4 text-[#2F8F83]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button
                  onClick={() => setSelectedFacility(null)}
                  className="px-5 py-2.5 rounded-xl border border-[#E1EBE7] text-xs font-semibold hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    setSelectedFacility(null);
                    onOpenAppointment();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-[#075E54] hover:bg-[#05453E] text-white text-xs font-semibold"
                >
                  Book Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
