import { Link } from 'react-router-dom'
import { Zap, MessageCircle, Shield, Globe, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import Navbar from '../components/ui/Navbar'
import Footer from '../components/ui/Footer'
import { Button } from '../components/ui/button'

const inView = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
}

export default function About() {
  return (
    <div className="min-h-screen bg-surface text-text-primary">
      <Navbar />

      <main className="pt-28 sm:pt-32 pb-20 sm:pb-24">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-medium leading-[1.05] tracking-tight"
          >
            About PayPulse
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-lg sm:text-xl text-muted mt-4 max-w-2xl leading-relaxed"
          >
            Replacing complex banking forms with a simple conversation.
          </motion.p>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <motion.div {...inView} transition={{ duration: 0.5 }} className="bg-surface-card border border-border rounded-2xl p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-text-primary">Our Story</h2>
              <p className="text-sm sm:text-base text-muted leading-relaxed">
                PayPulse was born from a simple observation: banking interfaces are
                unnecessarily complex. In a world of AI assistants and natural language
                interfaces, why should sending money require navigating through five
                screens and filling out multiple forms?
              </p>
              <p className="text-sm sm:text-base text-muted leading-relaxed mt-4">
                We built PayPulse to prove that banking can be as simple as sending a
                text message. Just type what you want to do, and we handle the rest.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-surface-card border border-border rounded-2xl p-6 sm:p-8"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-text-primary">Tech Stack</h2>
              <div className="space-y-3">
                {[
                  { label: 'Frontend', value: 'React 18, Tailwind CSS, Lucide' },
                  { label: 'Backend', value: 'FastAPI, SQLAlchemy, Python 3.11' },
                  { label: 'Database', value: 'PostgreSQL / SQLite' },
                  { label: 'Payments', value: 'OPay Sandbox API' },
                  { label: 'Auth', value: 'JWT tokens, ephemeral sessions' },
                ].map((s, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-2 border-b border-border last:border-0 gap-0.5 sm:gap-4">
                    <span className="text-xs sm:text-sm text-muted">{s.label}</span>
                    <code className="text-[10px] sm:text-xs font-mono text-accent sm:text-right">{s.value}</code>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-center text-text-primary">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {[
                { icon: MessageCircle, title: 'Simplicity First', desc: 'Every feature asks: "Can this be simpler?" If yes, we simplify.' },
                { icon: Shield, title: 'Security by Design', desc: 'PINs and OTPs are never stored. Isolated ephemeral sessions.' },
                { icon: Globe, title: 'Open & Accessible', desc: 'Built on open standards. Works on any device. No lock-in.' },
              ].map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="bg-surface-card border border-border rounded-xl p-5 sm:p-6 text-center"
                >
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg border border-border flex items-center justify-center mx-auto mb-3 sm:mb-4 text-accent">
                    <v.icon size={16} />
                  </div>
                  <h3 className="font-semibold text-sm sm:text-base mb-1.5 sm:mb-2 text-text-primary">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mt-12 sm:mt-16 text-center bg-surface-card border border-border rounded-2xl p-8 sm:p-10"
          >
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2 text-text-primary">Ready to try it?</h2>
            <p className="text-sm sm:text-base text-muted mb-6">Jump in and send your first payment in seconds.</p>
            <Link to="/login">
              <Button variant="primary" size="lg">
                Launch App <ArrowRight size={18} />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
