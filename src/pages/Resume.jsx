import { Briefcase, GraduationCap, Star } from 'lucide-react';
import { RevealOnScroll } from '../components/RevealOnScroll';
import { RESUME_DATA } from '../data/resume';
import { Seo } from '../components/Seo';

export default function Resume() {
  return (
    <section className="pt-32 pb-20 min-h-screen relative z-10 bg-black/30 backdrop-blur-md">
      <Seo title="Parcours · ARIS ID Studio" path="/parcours" noindex />
      <div className="max-w-6xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-4">MON PARCOURS</h1>
            <p className="text-neutral-400 text-lg md:text-xl font-light max-w-2xl mx-auto">De la création graphique à la direction artistique, chaque étape a forgé ma vision.</p>
          </div>
        </RevealOnScroll>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
          <div>
            <RevealOnScroll delay={100}>
              <div className="flex items-center gap-3 mb-8"><Briefcase className="text-purple-500" size={24} /><h2 className="text-2xl font-bold text-white uppercase tracking-wider">Expériences</h2></div>
              <div className="space-y-8 border-l border-white/10 pl-8 relative">
                {RESUME_DATA.experience.map((exp, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-black border border-purple-500 group-hover:bg-purple-500 transition-colors"></div>
                    <div className="bg-white/5 p-6 rounded-sm border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                      <div className="flex flex-col md:flex-row justify-between md:items-start mb-2">
                        <h3 className="text-lg font-bold text-white">{exp.role}</h3>
                        <span className="text-purple-400 text-xs font-mono bg-purple-500/10 px-2 py-1 rounded-sm border border-purple-500/20">{exp.period}</span>
                      </div>
                      <div className="text-sm text-neutral-400 mb-4 font-medium uppercase tracking-wide">{exp.company} - {exp.location}</div>
                      <p className="text-neutral-300 text-sm leading-relaxed">{exp.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
          </div>
          <div>
            <RevealOnScroll delay={200}>
              <div className="flex items-center gap-3 mb-8"><GraduationCap className="text-purple-500" size={24} /><h2 className="text-2xl font-bold text-white uppercase tracking-wider">Formations</h2></div>
              <div className="space-y-8 border-l border-white/10 pl-8 relative">
                {RESUME_DATA.education.map((edu, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -left-[37px] top-2 w-4 h-4 rounded-full bg-black border border-purple-500 group-hover:bg-purple-500 transition-colors"></div>
                    <div className="bg-white/5 p-6 rounded-sm border border-white/10 hover:border-purple-500/50 hover:bg-white/10 transition-all duration-300">
                      <div className="flex flex-col md:flex-row justify-between md:items-start mb-2">
                        <h3 className="text-lg font-bold text-white">{edu.degree}</h3>
                        <span className="text-purple-400 text-xs font-mono bg-purple-500/10 px-2 py-1 rounded-sm border border-purple-500/20">{edu.period}</span>
                      </div>
                      <div className="text-sm text-neutral-400 uppercase tracking-wide">{edu.school} - {edu.location}</div>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={300}>
              <div className="mt-16">
                <div className="flex items-center gap-3 mb-8"><Star className="text-purple-500" size={24} /><h2 className="text-2xl font-bold text-white uppercase tracking-wider">Compétences</h2></div>
                <div className="mb-8">
                  <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-4">Savoir-faire</h3>
                  <div className="flex flex-wrap gap-2">{RESUME_DATA.skills.map((skill, i) => (<span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-neutral-300 text-xs rounded-full hover:border-purple-500 transition-colors cursor-default">{skill}</span>))}</div>
                </div>
                <div>
                  <h3 className="text-sm text-neutral-500 uppercase tracking-widest mb-4">Savoir-être</h3>
                  <div className="flex flex-wrap gap-2">{RESUME_DATA.softSkills.map((skill, i) => (<span key={i} className="px-3 py-1 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs rounded-full hover:bg-purple-500/20 transition-colors cursor-default">{skill}</span>))}</div>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
