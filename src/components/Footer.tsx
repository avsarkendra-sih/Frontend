import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Accessibility,
  Type,
  Contrast,
  ExternalLink,
} from "lucide-react";
import { useAccessibilityStore } from "@/store/useAccessibilityStore";

const Footer = () => {
  const { toggleHighContrast, isHighContrast, fontSize, setFontSize } =
    useAccessibilityStore();

  const quickLinks = [
    { name: "About Program", href: "#about" },
    { name: "Eligibility", href: "#eligibility" },
    { name: "How to Apply", href: "#steps" },
    { name: "Contact", href: "#contact" },
  ];

  const resources = [
    { name: "Application Form", href: "#", external: true },
    { name: "Guidelines", href: "#", external: true },
    { name: "FAQs", href: "#", external: true },
    { name: "Support", href: "#", external: true },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", name: "Facebook" },
    { icon: Twitter, href: "#", name: "Twitter" },
    { icon: Linkedin, href: "#", name: "LinkedIn" },
    { icon: Instagram, href: "#", name: "Instagram" },
  ];

  const accessibilityOptions = [
    {
      icon: Contrast,
      label: "High Contrast",
      action: toggleHighContrast,
      active: isHighContrast,
    },
  ];

  const fontSizeOptions = [
    { label: "Normal", value: "normal" as const },
    { label: "Large", value: "large" as const },
    { label: "Extra Large", value: "extra-large" as const },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Accessibility Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-primary-foreground/10 rounded-xl p-6 mb-12"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center space-x-3">
              <Accessibility className="w-6 h-6 text-primary-foreground" />
              <div>
                <h3 className="font-semibold text-lg">Accessibility Options</h3>
                <p className="text-sm text-primary-foreground/80">
                  Customize your experience
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {/* Font Size Controls */}
              <div className="flex items-center space-x-2">
                <Type className="w-5 h-5 text-primary-foreground/70" />
                <span className="text-sm">Text Size:</span>
                <div className="flex bg-primary-foreground/10 rounded-lg p-1">
                  {fontSizeOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFontSize(option.value)}
                      className={`px-3 py-1 rounded text-xs font-medium transition-colors gov-focus ${
                        fontSize === option.value
                          ? "bg-primary-foreground text-primary"
                          : "text-primary-foreground/70 hover:text-primary-foreground"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div className="flex items-center space-x-2">
                {accessibilityOptions.map((option) => (
                  <button
                    key={option.label}
                    onClick={option.action}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors gov-focus ${
                      option.active
                        ? "bg-primary-foreground text-primary"
                        : "bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
                    }`}
                    aria-label={`${option.active ? "Disable" : "Enable"} ${option.label.toLowerCase()}`}
                  >
                    <option.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-foreground/20 rounded-lg flex items-center justify-center">
                <span className="text-lg font-bold">PI</span>
              </div>
              <h3 className="text-xl font-bold">PM Internship</h3>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Empowering India's brightest minds to shape the future of
              governance through innovation, technology, and public service
              excellence.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-primary-foreground/10 hover:bg-primary-foreground/20 rounded-lg flex items-center justify-center transition-colors gov-focus"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <nav
              className="space-y-2"
              role="navigation"
              aria-label="Footer navigation"
            >
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors gov-focus"
                  onClick={(e) => {
                    if (link.href.startsWith("#")) {
                      e.preventDefault();
                      document
                        .querySelector(link.href)
                        ?.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Resources</h3>
            <nav
              className="space-y-2"
              role="navigation"
              aria-label="Resources navigation"
            >
              {resources.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center text-primary-foreground/80 hover:text-primary-foreground transition-colors gov-focus"
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                >
                  {link.name}
                  {link.external && <ExternalLink className="w-3 h-3 ml-1" />}
                </a>
              ))}
            </nav>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-foreground/70 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-primary-foreground/80">
                  <div>Ministry of Corporate Affairs</div>
                  <div>Shastri Bhavan, New Delhi 110001</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-primary-foreground/70" />
                <a
                  href="tel:+911123456789"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors gov-focus"
                >
                  +91 11 2345 6789
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-primary-foreground/70" />
                <a
                  href="mailto:internship@mca.gov.in"
                  className="text-sm text-primary-foreground/80 hover:text-primary-foreground transition-colors gov-focus"
                >
                  internship@mca.gov.in
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="border-t border-primary-foreground/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
        >
          <div className="text-sm text-primary-foreground/60">
            © 2024 Government of India. All rights reserved.
          </div>
          <div className="flex flex-wrap gap-6 text-sm">
            <a
              href="#"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors gov-focus"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors gov-focus"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-primary-foreground/60 hover:text-primary-foreground transition-colors gov-focus"
            >
              Accessibility Statement
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
