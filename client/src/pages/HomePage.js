// // src/pages/HomePage.js
// import { Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { TypeAnimation } from 'react-type-animation';
// import './HomePage.css'; // Create this CSS file

// export default function HomePage() {
//   return (
//     <div className="homepage">
//       {/* Animated Background */}
//       <div className="stars"></div>
//       <div className="twinkling"></div>
      
//       {/* Main Content */}
//       <motion.div 
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 1 }}
//         className="container"
//       >
//         <motion.h1
//           animate={{ y: [-20, 0], opacity: [0, 1] }}
//           transition={{ duration: 0.8 }}
//         >
//           Welcome to <span className="logo">Roastrology</span> 🔮
//         </motion.h1>

//         <motion.div
//           initial={{ scale: 0.9 }}
//           animate={{ scale: 1 }}
//           transition={{ duration: 0.5 }}
//           className="tagline"
//         >
//           <TypeAnimation
//             sequence={[
//               "Where your resume gets roasted...",
//               1500,
//               "Where your career gets doomed...",
//               1500,
//               "Where the stars judge you...",
//               1500,
//               "All in good fun! 😈",
//               2000
//             ]}
//             wrapper="h2"
//             cursor={true}
//             repeat={Infinity}
//           />
//         </motion.div>

//         <motion.div
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           className="cta-container"
//         >
//         <Link to="/ask-with-resume" className="cta-button">
//             Get Roasted Now
//         </Link>
//         </motion.div>

//         <motion.div
//           animate={{ 
//             y: [0, -10, 0],
//             rotate: [0, 5, -5, 0]
//           }}
//           transition={{ 
//             repeat: Infinity,
//             duration: 4,
//             ease: "easeInOut"
//           }}
//           className="zodiac-wheel"
//         >
          
//         </motion.div>

//         <div className="funny-disclaimer">
//           <motion.p
//             animate={{ opacity: [0.6, 1, 0.6] }}
//             transition={{ duration: 2, repeat: Infinity }}
//           >
//             ⚠️ Warning: May cause existential career crises
//           </motion.p>
//           <p>99% of participants cried. The other 1% were lying.</p>
//         </div>
//       </motion.div>
//     </div>
//   );
// }




// src/pages/HomePage.js
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import './HomePage.css';

export default function HomePage() {
  return (
    <div className="homepage">
      {/* Animated Background */}
      <div className="stars"></div>
      <div className="twinkling"></div>
      
      {/* Main Content */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="container"
      >
        <motion.h1
          animate={{ y: [-20, 0], opacity: [0, 1] }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="logo">Roastrology</span> 🔮
        </motion.h1>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="tagline"
        >
          <TypeAnimation
            sequence={[
              "Where your resume gets roasted...",
              1500,
              "Where your career gets doomed...",
              1500,
              "Where the stars judge you...",
              1500,
              "See how your day will go...",
              1500,
              "All in good fun! 😈",
              2000
            ]}
            wrapper="h2"
            cursor={true}
            repeat={Infinity}
          />
        </motion.div>

        <div className="button-group">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-container"
          >
            <Link to="/ask-with-resume" className="cta-button">
              Get Roasted Now
            </Link>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-container"
          >
            <Link to="/resume-horoscope" className="cta-button">
              Will the Stars Roast You Too?
            </Link>
          </motion.div>
        </div>

        <motion.div
          animate={{ 
            y: [0, -10, 0],
          }}
          transition={{ 
            repeat: Infinity,
            duration: 4,
            ease: "easeInOut"
          }}
          className="zodiac-wheel"
        >
        
        </motion.div>

        <div className="funny-disclaimer">
          <motion.p
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⚠️ Warning: May cause existential career crises
          </motion.p>
          <p>99% of participants cried. The other 1% were lying.</p>
          <p className="daily-prediction-tagline">Find out if today's stars align with your resume!</p>
        </div>
      </motion.div>
    </div>
  );
}