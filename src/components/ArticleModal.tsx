import React from 'react';
import { X, Clock, Calendar, AlertTriangle, Lightbulb, BookOpen, Share2 } from 'lucide-react';
import { HealthArticle } from '../data/hospitalData';

interface ArticleModalProps {
  article: HealthArticle | null;
  onClose: () => void;
  onOpenAppointment: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenAppointment,
}) => {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-[#E1EBE7] my-8 overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header Image & Close */}
        <div className="relative h-48 sm:h-60 w-full overflow-hidden bg-[#075E54]">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-full object-cover opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full backdrop-blur-xs transition-colors"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="inline-block text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#D6A84F] text-[#172321] mb-2 font-heading">
              {article.category}
            </span>
            <h2 className="text-lg sm:text-2xl font-bold font-heading leading-tight drop-shadow-sm">
              {article.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-white/80 mt-1.5">
              <span>{article.date}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
              <span>•</span>
              <span>By {article.author}</span>
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-7 max-h-[60vh] overflow-y-auto space-y-4 text-sm">
          
          {/* Ghana-Specific Clinical Advice Callout */}
          {article.ghanaSpecificTip && (
            <div className="p-4 rounded-xl bg-[#FBF4E4] border border-[#D6A84F]/40 text-[#172321] flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-[#D6A84F] flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#93661C] mb-1">
                  Ghana Community Health Insight
                </h4>
                <p className="text-xs text-[#172321] leading-relaxed">
                  {article.ghanaSpecificTip}
                </p>
              </div>
            </div>
          )}

          {/* Article Paragraphs */}
          <div className="space-y-3.5 text-[#172321] leading-relaxed">
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="text-sm text-[#172321]">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Medical Disclaimer Alert */}
          <div className="mt-6 p-3.5 rounded-xl bg-[#F7FAF8] border border-[#E1EBE7] flex items-start gap-2.5 text-xs text-[#64736F]">
            <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-[#172321]">Medical Information Disclaimer:</strong> This article provides general public education and is not a clinical diagnosis or treatment prescription. If you are experiencing symptoms, please consult a medical officer at K.A. Busia Memorial Hospital or your nearest clinic.
            </div>
          </div>

          {/* Footer CTA */}
          <div className="pt-4 border-t border-[#E1EBE7] flex flex-col sm:flex-row items-center justify-between gap-3">
            <span className="text-xs text-[#64736F]">
              Have questions about this condition?
            </span>
            <div className="flex gap-2 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="flex-1 sm:flex-initial px-4 py-2 border border-[#E1EBE7] rounded-lg text-xs font-medium hover:bg-gray-50"
              >
                Close Article
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenAppointment();
                }}
                className="flex-1 sm:flex-initial px-4 py-2 bg-[#075E54] hover:bg-[#05453E] text-white rounded-lg text-xs font-semibold"
              >
                Speak to a Doctor
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
