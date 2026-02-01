import { motion } from 'framer-motion';
import { Download, Hash, Type, Palette } from 'lucide-react';

export const Socials = () => {
  const colors = [
    { name: 'Primary 600', hex: '#4f46e5', class: 'bg-primary-600' },
    { name: 'Secondary 600', hex: '#e11d48', class: 'bg-secondary-600' },
    { name: 'Primary 900', hex: '#312e81', class: 'bg-primary-900' },
    { name: 'Mid Gradient Start', hex: '#818cf8', class: 'bg-[#818cf8]' },
    { name: 'Mid Gradient End', hex: '#6366f1', class: 'bg-[#6366f1]' },
  ];

  return (
    <div className="pt-20 pb-32 md:pt-32 md:pb-48 bg-white dark:bg-slate-950 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">
            Social Media Kit
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            Everything you need to share your TechStack Conference experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Logo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800"
          >
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center">
              <Download className="w-6 h-6 mr-3 text-primary-600" />
              Official Logo
            </h2>
            <div className="bg-white dark:bg-black/20 p-12 rounded-xl flex items-center justify-center mb-6 border border-slate-100 dark:border-slate-800">
              <img src="/logo.svg" alt="TechStack Conference Logo" className="w-48 h-48" />
            </div>
            <div className="flex gap-4 justify-center">
              <a 
                href="/logo.svg" 
                download 
                className="inline-flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Download SVG
              </a>
            </div>
          </motion.div>

          {/* Brand Assets */}
          <div className="space-y-8">
             {/* Social Tag */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <Hash className="w-5 h-5 mr-3 text-primary-600" />
                Official Hashtag
              </h2>
              <div className="p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                <code className="text-2xl font-mono text-primary-600 dark:text-primary-400 font-bold">
                  #TechStack2026
                </code>
              </div>
            </motion.div>

            {/* Typography */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <Type className="w-5 h-5 mr-3 text-primary-600" />
                Typography
              </h2>
              <div className="space-y-2">
                <p className="text-4xl font-bold text-slate-900 dark:text-white">Inter</p>
                <p className="text-slate-600 dark:text-slate-400">
                  The primary typeface for TechStack Conference is Inter, a variable font family carefully crafted & designed for computer screens.
                </p>
              </div>
            </motion.div>

            {/* Colors */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-slate-50 dark:bg-slate-900 p-8 rounded-2xl border border-slate-200 dark:border-slate-800"
            >
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-3 text-primary-600" />
                Brand Colors
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {colors.map((color) => (
                  <div key={color.name} className="space-y-2">
                    <div className={`h-16 rounded-lg shadow-sm ${color.class}`}></div>
                    <div>
                      <p className="text-sm font-medium text-slate-900 dark:text-white">{color.name}</p>
                      <p className="text-xs text-slate-500 font-mono">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};
