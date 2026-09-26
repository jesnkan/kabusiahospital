import React, { useState, useMemo } from 'react';
import { 
  Search, 
  X, 
  Stethoscope, 
  Building2, 
  User, 
  BookOpen, 
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { 
  SERVICES, 
  DEPARTMENTS, 
  DOCTORS, 
  HEALTH_ARTICLES, 
  FAQS 
} from '../data/hospitalData';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (serviceId: string) => void;
  onSelectDoctor: (doctorId: string) => void;
  onSelectArticle: (articleId: string) => void;
  onNavigatePage: (pageId: string) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
  onSelectDoctor,
  onSelectArticle,
  onNavigatePage,
}) => {
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        services: SERVICES.slice(0, 3),
        departments: DEPARTMENTS.slice(0, 3),
        doctors: DOCTORS.slice(0, 3),
        articles: HEALTH_ARTICLES.slice(0, 3),
        faqs: [],
      };
    }

    return {
      services: SERVICES.filter(
        (s) => s.name.toLowerCase().includes(q) || s.shortDescription.toLowerCase().includes(q)
      ),
      departments: DEPARTMENTS.filter(
        (d) => d.name.toLowerCase().includes(q) || d.description.toLowerCase().includes(q)
      ),
      doctors: DOCTORS.filter(
        (doc) =>
          doc.name.toLowerCase().includes(q) ||
          doc.specialty.toLowerCase().includes(q) ||
          doc.departmentName.toLowerCase().includes(q)
      ),
      articles: HEALTH_ARTICLES.filter(
        (a) => a.title.toLowerCase().includes(q) || a.summary.toLowerCase().includes(q)
      ),
      faqs: FAQS.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      ),
    };
  }, [query]);

  if (!isOpen) return null;

  const totalResults =
    results.services.length +
    results.departments.length +
    results.doctors.length +
    results.articles.length +
    results.faqs.length;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-3 sm:p-6 pt-16 sm:pt-20 bg-black/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#E1EBE7] overflow-hidden animate-in zoom-in-95 duration-150">
        
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-[#E1EBE7] flex items-center gap-3 bg-[#F7FAF8]">
          <Search className="w-5 h-5 text-[#075E54] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder="Search departments, doctors, services, health topics (e.g. malaria, maternity, opd)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full text-base sm:text-lg bg-transparent focus:outline-none text-[#172321] placeholder:text-[#64736F]"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="text-[#64736F] hover:text-[#172321] p-1 rounded-md"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="text-xs bg-gray-200 px-2 py-1 rounded text-gray-700 hover:bg-gray-300"
            >
              ESC
            </button>
          )}
        </div>

        {/* Results Container */}
        <div className="max-h-[65vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          
          {query && totalResults === 0 && (
            <div className="text-center py-12 text-[#64736F]">
              <p className="text-base font-medium">No results found for "{query}"</p>
              <p className="text-xs mt-1">Try searching for generic terms like "emergency", "doctor", "lab", or "maternity".</p>
            </div>
          )}

          {!query && (
            <p className="text-xs font-semibold uppercase tracking-wider text-[#64736F]">
              Suggested Searches & Highlights
            </p>
          )}

          {/* Services Results */}
          {results.services.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#075E54] uppercase tracking-wider mb-2.5">
                <Stethoscope className="w-4 h-4" />
                <span>Services ({results.services.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.services.map((service) => (
                  <div
                    key={service.id}
                    onClick={() => {
                      onSelectService(service.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-[#E7F5F3] cursor-pointer transition-colors border border-transparent hover:border-[#2F8F83]/30 flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-[#172321] group-hover:text-[#075E54]">
                        {service.name}
                      </h4>
                      <p className="text-xs text-[#64736F] line-clamp-1">{service.shortDescription}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#64736F] group-hover:text-[#075E54] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Departments Results */}
          {results.departments.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#075E54] uppercase tracking-wider mb-2.5">
                <Building2 className="w-4 h-4" />
                <span>Departments ({results.departments.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.departments.map((dept) => (
                  <div
                    key={dept.id}
                    onClick={() => {
                      onNavigatePage('departments');
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-[#E7F5F3] cursor-pointer transition-colors border border-transparent hover:border-[#2F8F83]/30 flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-[#172321] group-hover:text-[#075E54]">
                        {dept.name}
                      </h4>
                      <p className="text-xs text-[#64736F] line-clamp-1">{dept.location} • {dept.hours}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#64736F] group-hover:text-[#075E54] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Doctors Results */}
          {results.doctors.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#075E54] uppercase tracking-wider mb-2.5">
                <User className="w-4 h-4" />
                <span>Doctors & Specialists ({results.doctors.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.doctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => {
                      onSelectDoctor(doc.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-[#E7F5F3] cursor-pointer transition-colors border border-transparent hover:border-[#2F8F83]/30 flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-[#172321] group-hover:text-[#075E54]">
                        {doc.name}
                      </h4>
                      <p className="text-xs text-[#64736F]">{doc.specialty} • {doc.departmentName}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#64736F] group-hover:text-[#075E54] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Health Articles Results */}
          {results.articles.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#075E54] uppercase tracking-wider mb-2.5">
                <BookOpen className="w-4 h-4" />
                <span>Health Articles & Education ({results.articles.length})</span>
              </div>
              <div className="space-y-1.5">
                {results.articles.map((art) => (
                  <div
                    key={art.id}
                    onClick={() => {
                      onSelectArticle(art.id);
                      onClose();
                    }}
                    className="p-3 rounded-xl hover:bg-[#E7F5F3] cursor-pointer transition-colors border border-transparent hover:border-[#2F8F83]/30 flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="text-sm font-semibold text-[#172321] group-hover:text-[#075E54]">
                        {art.title}
                      </h4>
                      <p className="text-xs text-[#64736F] line-clamp-1">{art.summary}</p>
                    </div>
                    <ArrowRight className="w-4 h-4 text-[#64736F] group-hover:text-[#075E54] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs Results */}
          {results.faqs.length > 0 && (
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#075E54] uppercase tracking-wider mb-2.5">
                <HelpCircle className="w-4 h-4" />
                <span>Frequently Asked Questions ({results.faqs.length})</span>
              </div>
              <div className="space-y-2">
                {results.faqs.map((faq, i) => (
                  <div key={i} className="p-3 rounded-xl bg-[#F7FAF8] border border-[#E1EBE7]">
                    <h4 className="text-sm font-semibold text-[#172321]">{faq.question}</h4>
                    <p className="text-xs text-[#64736F] mt-1 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#F7FAF8] border-t border-[#E1EBE7] text-center text-xs text-[#64736F]">
          Press <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded font-mono text-[10px]">Esc</kbd> to close or click outside
        </div>

      </div>
    </div>
  );
};
