import { motion } from 'motion/react';
import { Mail, Instagram, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const council = [
    { name: "Radhe Tare", role: "President", image: "https://res.cloudinary.com/dqfrytgl5/image/upload/v1778328275/radhe_exspvq.png" },
    { name: "Jeshika Khard", role: "Vice President", image: "https://res.cloudinary.com/dqfrytgl5/image/upload/v1778328275/jeshika_khard_c7manq.png" },
    { name: "Anubhav Pandey", role: "Secretary", image: "https://res.cloudinary.com/dqfrytgl5/image/upload/v1778328274/anubhav_pandey_rug8qn.png" },
    { name: "Aastha Jain", role: "Treasurer", image: "https://res.cloudinary.com/dqfrytgl5/image/upload/v1778328274/aastha_jain_cua63m.png" },
    { name: "Rajat Agrawal", role: "Mentor", image: "https://res.cloudinary.com/dqfrytgl5/image/upload/v1778328275/rajat_agrawal_ue91sv.png" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-editorial-bg">
      {/* Hero Section */}
      <section id="hero" className="relative pt-24 pb-32 border-b border-editorial-fg/10">
        <div className="max-w-7xl mx-auto px-10 grid grid-cols-12 gap-12">
          <div className="col-span-12 md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-editorial-fg/40">Established MMXXIV</span>
                <div className="h-px flex-grow bg-editorial-fg/10" />
              </div>
              <h1 className="font-serif text-[clamp(2.5rem,8vw,5.5rem)] leading-[0.9] font-black uppercase tracking-tighter mb-8 text-editorial-fg">
                The Medicaps <br /><span className="italic text-editorial-accent">Maths Club.</span>
              </h1>
              <p className="text-xl text-editorial-fg/80 leading-relaxed mb-10 max-w-lg font-medium">
                The Maths Club is a vibrant community that encourages a love for mathematics through engaging activities. 
                Members participate in problem-solving sessions, math competitions, and guest lectures.
              </p>
              <div className="flex flex-wrap gap-6 text-[10px] font-bold uppercase tracking-widest">
                <Link to="/register" className="px-10 py-4 bg-editorial-fg text-white hover:bg-neutral-900 transition-all shadow-xl shadow-editorial-fg/20">
                  Join Club
                </Link>
              </div>
            </motion.div>
          </div>

          <div className="hidden md:flex col-span-5 border-l border-editorial-fg/10 pl-12 h-full py-4 space-y-12 flex-col justify-center">
             <div className="space-y-2">
                <p className="text-[10px] uppercase tracking-widest text-editorial-fg/40 font-bold">The Mission</p>
                <p className="text-sm leading-relaxed text-editorial-fg/70 italic font-medium">
                  "Encouraging collaboration and enhancing analytical skills through competitive problem-solving."
                </p>
             </div>
             <div className="aspect-[4/3] border border-editorial-fg/10 overflow-hidden transition-all duration-700">
                <img src="https://res.cloudinary.com/dqfrytgl5/image/upload/v1778328274/council_dlmq61.png" alt="Archive" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
             </div>
          </div>
        </div>
      </section>

      {/* Leadership: Faculty & Founder */}
      <section className="py-32 border-b border-editorial-fg/10">
        <div className="max-w-7xl mx-auto px-10">
          <div className="grid md:grid-cols-2 gap-24">
             {/* Faculty */}
             <div className="space-y-10 group">
                <div className="aspect-[3/4] bg-editorial-fg/5 border border-editorial-fg/10 transition-all duration-700 overflow-hidden relative">
                   <img src="https://res.cloudinary.com/dqfrytgl5/image/upload/v1778328445/pranjalik_1_qp2bjj.png" alt="Faculty" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div>
                   <p className="text-[9px] uppercase font-bold tracking-[0.3em] text-editorial-accent mb-2">Faculty Mentor</p>
                   <h3 className="font-serif text-4xl font-bold uppercase text-editorial-fg tracking-tight">Dr. Pranjali Kekre</h3>
                   <p className="text-xs text-editorial-fg/60 italic font-serif mt-4">"Guiding the next generation of innovators at Medicaps University."</p>
                </div>
             </div>
             {/* Founder */}
             <div className="space-y-10 md:pt-48 group">
                <div className="aspect-[3/4] bg-editorial-fg/5 border border-editorial-fg/10 transition-all duration-700 overflow-hidden relative">
                   <img src="https://res.cloudinary.com/dqfrytgl5/image/upload/v1778328274/founder_itfhy5.png" alt="Founder" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                </div>
                <div>
                   <p className="text-[9px] uppercase font-bold tracking-[0.3em] text-editorial-accent mb-2">The Founder</p>
                   <h3 className="font-serif text-4xl font-bold uppercase text-editorial-fg tracking-tight text-editorial-fg">Sourabh Jawale</h3>
                   <div className="flex gap-4 mt-6">
                      <a href="https://www.instagram.com/sourabh_thats_it/" target="_blank" rel="noopener noreferrer" className="p-2 border border-editorial-fg/20 hover:bg-editorial-fg hover:text-white transition-all">
                        <Instagram className="w-4 h-4" />
                      </a>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* Council Section with Pentagon Layout */}
      <section id="council" className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-10">
           <div className="mb-24 flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-editorial-accent mb-4">Tenure MMXXIV</span>
              <h2 className="font-serif text-7xl font-black uppercase tracking-tighter italic text-editorial-fg">The Council.</h2>
           </div>

           <div className="max-w-5xl mx-auto space-y-16">
              {/* President - The Peak of the Pentagon */}
              <div className="flex justify-center">
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="w-full max-w-[340px] group text-center"
                 >
                    <div className="aspect-square bg-gray-100 mb-6 overflow-hidden transition-all duration-700 border-2 border-editorial-fg shadow-2xl relative">
                       <img src={council[0].image} alt={council[0].name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                       <div className="absolute top-0 left-0 bg-editorial-fg text-white text-[8px] uppercase font-bold tracking-[0.3em] px-3 py-1.5">Executive</div>
                    </div>
                    <h4 className="font-serif text-2xl font-bold uppercase text-editorial-fg tracking-tight">{council[0].name}</h4>
                    <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-editorial-accent mt-1">{council[0].role}</p>
                 </motion.div>
              </div>

              {/* The "Rectangular" Grid Below */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                 {council.slice(1).map((member, i) => (
                    <motion.div 
                       key={i}
                       initial={{ opacity: 0, scale: 0.95 }}
                       whileInView={{ opacity: 1, scale: 1 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.1 }}
                       className="group text-center"
                    >
                       <div className="aspect-[4/5] bg-gray-100 mb-6 overflow-hidden transition-all duration-700 border border-editorial-fg/10 relative">
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
                       </div>
                       <h4 className="font-serif text-base font-bold uppercase text-editorial-fg tracking-tight leading-tight">{member.name}</h4>
                       <p className="text-[8px] uppercase font-bold tracking-widest text-editorial-accent mt-1.5">{member.role}</p>
                    </motion.div>
                 ))}
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
