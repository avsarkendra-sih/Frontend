import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { 
  FileText, 
  UserCheck, 
  Video, 
  Award, 
  ArrowRight,
  Clock,
  Calendar,
  Users
} from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';

const StepsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { openSignUpModal, isAuthenticated } = useAuthStore();

  const steps = [
    {
      number: 1,
      icon: FileText,
      title: 'Online Application',
      description: 'Fill out the comprehensive application form with your academic details and preferences.',
      duration: '15 minutes',
      color: 'from-blue-500 to-blue-600',
    },
    {
      number: 2,
      icon: UserCheck,
      title: 'Document Verification',
      description: 'Upload required documents including academic transcripts, ID proof, and certificates.',
      duration: '2-3 days',
      color: 'from-green-500 to-green-600',
    },
    {
      number: 3,
      icon: Video,
      title: 'Virtual Interview',
      description: 'Participate in a structured interview to assess your skills and motivation.',
      duration: '30 minutes',
      color: 'from-purple-500 to-purple-600',
    },
    {
      number: 4,
      icon: Award,
      title: 'Selection & Onboarding',
      description: 'Successful candidates receive offer letters and join the orientation program.',
      duration: '1 week',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  const timeline = [
    { phase: 'Application Opens', date: 'January 1', status: 'current' },
    { phase: 'Application Deadline', date: 'February 15', status: 'upcoming' },
    { phase: 'Interviews Begin', date: 'February 20', status: 'upcoming' },
    { phase: 'Results Announced', date: 'March 1', status: 'upcoming' },
    { phase: 'Program Starts', date: 'March 15', status: 'upcoming' },
  ];

  return (
    <section id="steps" ref={ref} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Application Process
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Your Journey to
            <span className="block text-primary">Government Innovation</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to join India's most prestigious 
            internship program and start making a difference.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative mb-20">
          {/* Connection Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary/20 via-primary/40 to-primary/20 hidden lg:block" />
          
          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Step Content */}
                <div className="flex-1 w-full">
                  <div className={`gov-card bg-gradient-to-br ${step.color}/5 border-${step.color.split(' ')[1].split('-')[1]}-500/20 hover:shadow-2xl transition-all duration-300`}>
                    <div className="flex items-start space-x-4">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center flex-shrink-0`}>
                        <step.icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="w-4 h-4 mr-1" />
                            {step.duration}
                          </div>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                        
                        {step.number === 1 && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : {}}
                            transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                            className="mt-4"
                          >
                            <button
                              onClick={openSignUpModal}
                              className="btn-gov-primary inline-flex items-center group"
                            >
                              {isAuthenticated ? 'Start Application' : 'Sign Up to Apply'}
                              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step Number Circle */}
                <div className="relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.2 }}
                    className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg`}
                  >
                    <span className="text-2xl font-bold text-white">{step.number}</span>
                  </motion.div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 w-full hidden lg:block" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="bg-muted/50 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-2">Important Dates</h3>
            <p className="text-muted-foreground">Mark your calendar for key milestones</p>
          </div>

          <div className="grid md:grid-cols-5 gap-4">
            {timeline.map((item, index) => (
              <motion.div
                key={item.phase}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className={`text-center p-4 rounded-lg ${
                  item.status === 'current' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background border border-border'
                }`}
              >
                <div className={`w-8 h-8 rounded-full mx-auto mb-2 flex items-center justify-center ${
                  item.status === 'current' ? 'bg-primary-foreground/20' : 'bg-primary/10'
                }`}>
                  <Calendar className={`w-4 h-4 ${
                    item.status === 'current' ? 'text-primary-foreground' : 'text-primary'
                  }`} />
                </div>
                <div className={`text-sm font-semibold mb-1 ${
                  item.status === 'current' ? 'text-primary-foreground' : 'text-foreground'
                }`}>
                  {item.date}
                </div>
                <div className={`text-xs ${
                  item.status === 'current' ? 'text-primary-foreground/80' : 'text-muted-foreground'
                }`}>
                  {item.phase}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="text-center mt-16"
        >
          <h3 className="text-xl font-semibold text-foreground mb-4">Need Help?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-gov-outline inline-flex items-center">
              <Users className="w-4 h-4 mr-2" />
              Contact Support
            </button>
            <button className="btn-gov-outline">
              View FAQ
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StepsSection;