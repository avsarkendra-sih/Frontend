import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Target, Users, Lightbulb, Trophy, ArrowRight } from 'lucide-react';

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const features = [
    {
      icon: Target,
      title: 'Real Impact',
      description: 'Work on actual government projects that directly benefit millions of citizens',
    },
    {
      icon: Users,
      title: 'Expert Mentorship',
      description: 'Learn from senior government officials and industry leaders',
    },
    {
      icon: Lightbulb,
      title: 'Innovation Focus',
      description: 'Use cutting-edge technology to solve complex governance challenges',
    },
    {
      icon: Trophy,
      title: 'Career Growth',
      description: 'Build valuable skills and connections for your professional future',
    },
  ];

  return (
    <section id="about" ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                About the Program
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                Empowering Tomorrow's
                <span className="block text-primary">Public Service Leaders</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                The PM Internship Program is a flagship initiative designed to bridge the gap 
                between academic excellence and practical governance. Join thousands of talented 
                individuals making a real difference in India's digital transformation journey.
              </p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">Why Choose PM Internship?</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button 
                className="btn-gov-primary inline-flex items-center justify-center group"
                onClick={() => {
                  document.querySelector('#steps')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                How to Apply
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                className="btn-gov-outline"
                onClick={() => {
                  document.querySelector('#eligibility')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Check Eligibility
              </button>
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              
              <div className="gov-card bg-gray-300 from-primary/5 to-primary/10 border-primary/20">
                <div className="space-y-6">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto bg-primary rounded-xl flex items-center justify-center mb-4">
                      <Trophy className="w-8 h-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground">Excellence in Innovation</h3>
                    <p className="text-muted-foreground">Join India's most prestigious internship program</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">12</div>
                      <div className="text-sm text-muted-foreground">Week Program</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">25+</div>
                      <div className="text-sm text-muted-foreground">Ministries</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">100+</div>
                      <div className="text-sm text-muted-foreground">Projects</div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-2xl font-bold text-primary">₹50K</div>
                      <div className="text-sm text-muted-foreground">Stipend</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: -10 } : {}}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-semibold"
              >
                Applications Open
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                animate={isInView ? { opacity: 1, scale: 1, rotate: 5 } : {}}
                transition={{ duration: 0.5, delay: 1 }}
                className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-semibold"
              >
                Govt. Certified
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;