'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FloatingContact.module.css';

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (showWhatsApp) setShowWhatsApp(false);
  };

  const handleWhatsAppClick = () => {
    setShowWhatsApp(true);
  };

  const whatsappNumber = "919663424256"; // Assuming the one from footer
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi beMore Studio, I'd like to discuss a design project.`;

  return (
    <div className={styles.wrapper}>
      <AnimatePresence>
        {isOpen && !showWhatsApp && (
          <motion.div 
            className={styles.menu}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <a 
              href="/contact" 
              className={styles.menuItem}
              onClick={() => setIsOpen(false)}
            >
              <span className={styles.menuLabel}>BOOK FREE CONSULTATION</span>
              <div className={styles.menuIcon}>🗓️</div>
            </a>
            <button 
              className={styles.menuItem}
              onClick={handleWhatsAppClick}
            >
              <span className={styles.menuLabel}>WHATSAPP CHAT</span>
              <div className={`${styles.menuIcon} ${styles.whatsappIcon}`}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.171.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.747-2.834-2.515-2.921-2.629-.087-.114-.708-.941-.708-1.793 0-.852.446-1.273.605-1.441.159-.169.346-.21.462-.21h.304c.116 0 .27-.044.392.245.122.289.418 1.019.458 1.102.04.082.061.182.006.299-.055.117-.087.195-.174.299-.087.104-.174.232-.252.315-.079.083-.162.176-.067.339.095.163.421.696.903 1.127.621.556 1.142.73 1.305.811.163.081.258.068.354-.041.095-.11.411-.478.521-.643.11-.165.221-.137.373-.082.152.055.96.452 1.125.534.165.082.275.123.315.191.04.068.04.392-.104.797z"/>
                </svg>
              </div>
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showWhatsApp && (
          <motion.div 
            className={styles.whatsappBox}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
          >
            <div className={styles.waHeader}>
              <div className={styles.waHeaderIcon}>
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.171.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.747-2.834-2.515-2.921-2.629-.087-.114-.708-.941-.708-1.793 0-.852.446-1.273.605-1.441.159-.169.346-.21.462-.21h.304c.116 0 .27-.044.392.245.122.289.418 1.019.458 1.102.04.082.061.182.006.299-.055.117-.087.195-.174.299-.087.104-.174.232-.252.315-.079.083-.162.176-.067.339.095.163.421.696.903 1.127.621.556 1.142.73 1.305.811.163.081.258.068.354-.041.095-.11.411-.478.521-.643.11-.165.221-.137.373-.082.152.055.96.452 1.125.534.165.082.275.123.315.191.04.068.04.392-.104.797z"/>
                </svg>
              </div>
              <div className={styles.waHeaderText}>
                <h3>Start a Conversation</h3>
                <p>Hi! Click one of our member below to chat on <strong>WhatsApp</strong></p>
              </div>
              <button className={styles.waClose} onClick={() => setShowWhatsApp(false)}>✕</button>
            </div>
            <div className={styles.waBody}>
              <p className={styles.waNote}>The team typically replies in a few minutes.</p>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className={styles.waMember}>
                <div className={styles.memberAvatar}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.171.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.747-2.834-2.515-2.921-2.629-.087-.114-.708-.941-.708-1.793 0-.852.446-1.273.605-1.441.159-.169.346-.21.462-.21h.304c.116 0 .27-.044.392.245.122.289.418 1.019.458 1.102.04.082.061.182.006.299-.055.117-.087.195-.174.299-.087.104-.174.232-.252.315-.079.083-.162.176-.067.339.095.163.421.696.903 1.127.621.556 1.142.73 1.305.811.163.081.258.068.354-.041.095-.11.411-.478.521-.643.11-.165.221-.137.373-.082.152.055.96.452 1.125.534.165.082.275.123.315.191.04.068.04.392-.104.797z"/>
                  </svg>
                  <div className={styles.onlineDot} />
                </div>
                <div className={styles.memberName}>
                  beMore Design Studio
                </div>
                <div className={styles.waIconSmall}>
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.171.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.747-2.834-2.515-2.921-2.629-.087-.114-.708-.941-.708-1.793 0-.852.446-1.273.605-1.441.159-.169.346-.21.462-.21h.304c.116 0 .27-.044.392.245.122.289.418 1.019.458 1.102.04.082.061.182.006.299-.055.117-.087.195-.174.299-.087.104-.174.232-.252.315-.079.083-.162.176-.067.339.095.163.421.696.903 1.127.621.556 1.142.73 1.305.811.163.081.258.068.354-.041.095-.11.411-.478.521-.643.11-.165.221-.137.373-.082.152.055.96.452 1.125.534.165.082.275.123.315.191.04.068.04.392-.104.797z"/>
                  </svg>
                </div>
              </a>
            </div>
            <div className={styles.waFooter}>
               <svg className={styles.footerIcon} viewBox="0 0 24 24" width="20" height="20"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" fill="currentColor"/></svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        className={`${styles.trigger} ${isOpen ? styles.triggerActive : ''}`}
        onClick={toggleMenu}
      >
        {isOpen ? '✕' : (
          <div className={styles.triggerInner}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.19-2.19a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
            <div className={styles.onlineStatus} />
          </div>
        )}
      </button>
    </div>
  );
}
