import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  AlertTriangle, 
  Lightbulb, 
  Filter
} from 'lucide-react';
import { HEALTH_ARTICLES } from '../data/hospitalData';

interface HealthInformationPageProps {
  onSelectArticle: (articleId: string) => void;
  onOpenAppointment: () => void;
}

export const HealthInformationPage: React.FC<HealthInformationPageProps> = ({
  onSelectArticle,
  onOpenAppointment: _onOpenAppointment,
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    'All',
    'Chronic Care',
    'Maternal Health',
    'Child Health',
    'Preventive Health',
    'Wellness',
    'Emergency Care',
  ];

  const filteredArticles = useMemo(() => {
    return HEALTH_ARTICLES.filter((art) => {
      const matchesSearch =
        art.title.toLowerCase().includes(search.toLowerCase()) ||
        art.summary.toLowerCase().includes(search.toLowerCase());
      const matchesCat =
        selectedCategory === 'All' || art.category === selectedCategory;
      return matchesSearch && matchesCat;
    });
  }, [search, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#F7FAF8]">
      
      {/* Hero Header */}
      <section className="bg-[#05453E] text-white py-14 sm:py-18 border-b border-[#0C776B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-bold text-[#D6A84F] uppercase tracking-wider bg-[#075E54] px-4 py-1.5 rounded-full border border-[#D6A84F]/30">
            HEALTH EDUCATION & WELLNESS
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-heading tracking-tight text-white">
            Health Information Library
          </h1>
          <p className="text-sm sm:text-base text-[#E1EBE7] leading-relaxed">
            Culturally relevant, medically verified guides to help you and your family prevent illnesses, manage chronic conditions, and thrive.
          </p>
        </div>
      </section>

      {/* Search & Category Filter */}
      <section className="bg-white border-b border-[#E1EBE7] py-4 sticky top-[69px] z-30 shadow-2xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#64736F] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search health topics (e.g. blood pressure, malaria, antenatal, vaccines, nutrition)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm border border-[#E1EBE7] rounded-xl bg-[#F7FAF8] focus:outline-none focus:ring-2 focus:ring-[#075E54] focus:bg-white"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-3.5 h-3.5 text-[#64736F] flex-shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#075E54] text-white'
                    : 'bg-[#F7FAF8] text-[#172321] hover:bg-[#E7F5F3] border border-[#E1EBE7]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* Main Articles Grid */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Medical Disclaimer Banner */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <strong>Medical Disclaimer:</strong> Articles are authored by healthcare professionals for public awareness and do not replace personalized in-person clinical consultations. If you feel unwell, please visit our General OPD.
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="bg-white rounded-3xl border border-[#E1EBE7] overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="p-5 pb-3 bg-gradient-to-r from-[#F7FAF8] to-[#E7F5F3] border-b border-[#E1EBE7] flex items-center justify-between">
                    <span className="bg-[#075E54] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      {article.category}
                    </span>
                    <span className="text-[11px] font-medium text-[#64736F] flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#075E54]" />
                      {article.readTime}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-2 text-[11px] text-[#64736F]">
                      <span>{article.date}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-[#172321] font-heading group-hover:text-[#075E54] transition-colors leading-snug">
                      {article.title}
                    </h2>

                    <p className="text-xs text-[#64736F] line-clamp-3 leading-relaxed">
                      {article.summary}
                    </p>

                    {article.ghanaSpecificTip && (
                      <div className="p-3 bg-[#FBF4E4] rounded-xl border border-[#D6A84F]/30 text-[11px] text-[#93661C] flex items-start gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-[#D6A84F] flex-shrink-0 mt-0.5" />
                        <span className="line-clamp-2">{article.ghanaSpecificTip}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectArticle(article.id)}
                    className="w-full py-2.5 px-4 bg-[#E7F5F3] hover:bg-[#075E54] text-[#075E54] hover:text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Read Full Educational Article</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#D6A84F]" />
                  </button>
                </div>

              </div>
            ))}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#E1EBE7]">
              <BookOpen className="w-12 h-12 text-[#64736F] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#172321]">No articles found</h3>
              <p className="text-xs text-[#64736F] mt-1">Try another search query or select another category.</p>
            </div>
          )}

        </div>
      </section>

    </div>
  );
};
