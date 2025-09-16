import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Calendar, Award, CheckCircle, Users, Briefcase, Home } from 'lucide-react';

const EligibilitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const eligibilityCards = [
    {
      icon: GraduationCap,
      title: 'Education',
      requirements: [
        'Not Enrolled in Full Time Education',
        'Passed 10th/12th/diploma/ITI',
      ],
      bgColor: 'from-blue-500/10 to-blue-600/5',
      iconColor: 'text-blue-600',
    },
    {
      icon: Calendar,
      title: 'Age Criteria',
      requirements: [
        'Age: 21–24 years (as on last date of application)',
        'Must be an Indian citizen',
      ],
      bgColor: 'from-green-500/10 to-green-600/5',
      iconColor: 'text-green-600',
    },
    {
      icon: Briefcase,
      title: 'Job Status',
      requirements: [
        'Not Employed Full Time',
        'Not in internship, apprenticeship, or Govt. skill training',
      ],
      bgColor: 'from-purple-500/10 to-purple-600/5',
      iconColor: 'text-purple-600',
    },
    {
      icon: Home,
      title: 'Family Status',
      requirements: [
        'No one is Earning more than ₹8 Lakhs PA',
        'No family member in permanent/regular Govt. job',
      ],
      bgColor: 'from-orange-500/10 to-orange-600/5',
      iconColor: 'text-orange-600',
    },
  ];

  const benefits = [
    {
      icon: Users,
      title: 'Monthly Stipend',
      description: '₹5,000 per month for 12 months',
    },
    {
      icon: GraduationCap,
      title: 'Certificate',
      description: 'Government-issued completion certificate',
    },
    {
      icon: Award,
      title: 'Networking',
      description: 'Connect with government officials and peers',
    },
  ];

  return (
    <section id="eligibility" ref={ref} className="py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center space-y-4 mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
            Eligibility & Benefits
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Are You Ready to
            <span className="block text-primary">Make an Impact?</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check if you meet our criteria and discover the amazing benefits 
            awaiting successful candidates.
          </p>
        </motion.div>

        {/* Eligibility Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {eligibilityCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`gov-card bg-gradient-to-br ${card.bgColor} border-0`}
            >
              <div className="text-center space-y-4">
                <div className={`w-16 h-16 mx-auto rounded-xl bg-background/50 flex items-center justify-center`}>
                  <card.icon className={`w-8 h-8 ${card.iconColor}`} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{card.title}</h3>
                <div className="space-y-2">
                  {card.requirements.map((req, reqIndex) => (
                    <div key={reqIndex} className="flex items-center text-sm text-muted-foreground">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>{req}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-primary rounded-2xl p-8 md:p-12 text-white"
        >
          <div className="text-center space-y-6 mb-12">
            <h3 className="text-2xl md:text-3xl font-bold">
              What You'll Receive
            </h3>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Our comprehensive benefits package ensures you're fully supported 
              throughout your internship journey.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 mx-auto bg-primary-foreground/10 rounded-xl flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <div>
                  <h4 className="text-xl font-semibold mb-2">{benefit.title}</h4>
                  <p className="text-primary-foreground/80">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-12"
          >
            <button
              onClick={() => {
                document.querySelector('#steps')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Ready to Apply? Let's Start!
            </button>
          </motion.div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16"
        >
          {[
            { value: '5', label: 'Qualifications' },
            { value: '36', label: 'States/UTs' },
            { value: '25', label: 'Sectors' },
            { value: '735', label: 'Districts' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-primary">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EligibilitySection;