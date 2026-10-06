import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Stethoscope, 
  Calendar, 
  Filter,
  Activity
} from 'lucide-react';
import { SERVICES } from '../data/hospitalData';

interface ServicesPageProps {
  onSelectService: (serviceId: string) => void;
  onOpenAppointment: (departmentId?: string) => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onSelectService,
  onOpenAppointment,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'General OPD',
    'Maternity, Obstetrics & Gynaecology',
    'Emergency & Trauma Centre',
    'Laboratory & Pathology',
    'Pharmacy',
    'Radiology & Imaging',
    'Internal Medicine',
    'Public Health',
  ];

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesSearch =
        service.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.departmentName.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' || service.departmentName === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F7FAF8]">
      
      {/* Hero Banner */}
      <section className="bg-[#05453E] text-white py-14 sm:py-18 border-b border-[#0C776B] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider bg-[#075E54] px-4 py-1.5 rounded-full border border-[#D6A84F]/30">
            HEALTHCARE EXCELLENCE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white">
            Our Healthcare Services
          </h1>
          <p className="text-sm sm:text-base text-[#E1EBE7] leading-relaxed">
            Comprehensive, patient-centred clinical care designed to support your family’s lifelong health.
          </p>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="sticky top-[69px] z-30 bg-white border-b border-[#E1EBE7] py-4 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Search Input */}
            <div className="relative flex-1 w-full">
              <Search className="w-4 h-4 text-[#64736F] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Search services (e.g. malaria, antenatal, blood test, ultrasound)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm border border-[#E1EBE7] rounded-xl bg-[#F7FAF8] focus:outline-none focus:ring-2 focus:ring-[#075E54] focus:bg-white"
              />
            </div>

            {/* Category Dropdown on small screens */}
            <div className="sm:hidden w-full">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#E1EBE7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#075E54]"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Pills on larger screens */}
          <div className="hidden sm:flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-[#64736F] flex-shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
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

      {/* Services Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex items-center justify-between mb-8 text-xs text-[#64736F]">
            <span>Showing {filteredServices.length} healthcare services</span>
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                }}
                className="text-[#075E54] font-semibold hover:underline"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="card-hover-lift bg-white rounded-3xl border border-[#E1EBE7] overflow-hidden shadow-sm flex flex-col justify-between group"
              >
                <div>
                  {/* Service Header */}
                  <div className="p-6 pb-4 bg-gradient-to-r from-[#075E54] to-[#0D3B35] text-white relative overflow-hidden">
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/20 text-[#D6A84F] flex items-center justify-center shadow-xs">
                        <Activity className="w-5 h-5" />
                      </div>
                      <span className="bg-[#D6A84F] text-[#075E54] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-xs">
                        {service.departmentName}
                      </span>
                    </div>

                    <h2 className="text-xl font-bold font-heading text-white">
                      {service.name}
                    </h2>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <p className="text-xs sm:text-sm text-[#172321] leading-relaxed">
                      {service.fullDescription}
                    </p>

                    {/* Who it is for */}
                    <div className="p-3.5 bg-[#F7FAF8] rounded-xl border border-[#E1EBE7] space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#075E54] block">
                        Who This Is For:
                      </span>
                      <ul className="space-y-1 text-xs text-[#64736F]">
                        {service.whoItIsFor.slice(0, 2).map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#075E54] mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* What to expect */}
                    <div className="p-3.5 bg-[#F7FAF8] rounded-xl border border-[#E1EBE7] space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#D6A84F] block">
                        What To Expect:
                      </span>
                      <ul className="space-y-1 text-xs text-[#64736F]">
                        {service.whatToExpect.slice(0, 2).map((item, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#D6A84F] mt-1.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Footer Actions */}
                <div className="p-6 pt-0 flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() => onSelectService(service.id)}
                    className="w-full sm:flex-1 py-2.5 px-4 text-xs font-bold text-[#075E54] bg-[#E7F5F3] hover:bg-[#075E54] hover:text-white rounded-xl transition-colors text-center"
                  >
                    View Service Details
                  </button>
                  <button
                    onClick={() => onOpenAppointment(service.departmentId)}
                    className="w-full sm:flex-1 py-2.5 px-4 text-xs font-semibold text-white bg-[#075E54] hover:bg-[#05453E] rounded-xl transition-colors text-center flex items-center justify-center gap-1.5"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#D6A84F]" />
                    <span>Book For This Service</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

          {filteredServices.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E1EBE7]">
              <Stethoscope className="w-12 h-12 text-[#64736F] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#172321]">No healthcare services found</h3>
              <p className="text-xs text-[#64736F] mt-1">Try another search term or reset your category selection.</p>
            </div>
          )}

        </div>
      </section>

      {/* Emergency Assurance Banner */}
      <section className="py-12 bg-[#075E54] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3">
          <h3 className="text-xl sm:text-2xl font-bold font-heading">
            Unsure which department or service is right for you?
          </h3>
          <p className="text-xs sm:text-sm text-[#E1EBE7] max-w-xl mx-auto">
            Our General OPD triaging team evaluates non-emergency patients on arrival and directs you to the optimal clinical specialist.
          </p>
          <div className="pt-2">
            <button
              onClick={() => onOpenAppointment('opd')}
              className="px-6 py-3 rounded-xl bg-[#D6A84F] hover:bg-[#C3953E] text-[#172321] font-bold text-xs uppercase tracking-wider"
            >
              Book General OPD Triage
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
