import { motion } from 'framer-motion';

const AnnouncementBar = () => {
  const announcements = [
    "1. Internship Screening & Selection Ongoing!",
    "2. Check your onboarding, email, and SMS regularly. Confirm joining via the Internship tile on your dashboard.",
    "3. Verify your Aadhaar-seeded bank account status on your dashb00."
  ];

  return (
    <div className="bg-blue-600 text-white mt-[10px] py-2 overflow-hidden">
      <motion.div
        animate={{ x: ['100%', '-100%'] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear'
        }}
        className="whitespace-nowrap text-sm font-medium"
      >
        {announcements.join(' | ')}
      </motion.div>
    </div>
  );
};

export default AnnouncementBar;