import { useNavigate } from 'react-router-dom'
import { ArrowRight, Brain, TrendingUp, CreditCard, Calendar, MessageCircle } from 'lucide-react'

const features = [
  { icon: Brain,         title: "AI Career Navigator",     desc: "Matched to top universities by CGPA, skills & budget." },
  { icon: TrendingUp,    title: "ROI & Salary Predictor",  desc: "See your 5-year return on investment before you apply." },
  { icon: CreditCard,    title: "Loan Eligibility Engine", desc: "ML model predicts your approval probability instantly." },
  { icon: Calendar,      title: "Smart Timeline",          desc: "Month-by-month roadmap from GRE to graduation." },
  { icon: MessageCircle, title: "AI Mentor Chatbot",       desc: "Ask anything about exams, universities, loans." },
]

export default function Home() {
  const navigate = useNavigate()
  return (
    <div style={{background:'#0A1628', minHeight:'100vh', color:'white'}}>
      {/* Hero */}
      <div style={{textAlign:'center', padding:'80px 24px 40px'}}>
        <div style={{display:'inline-block', background:'rgba(0,196,180,0.15)', color:'#00C4B4', fontSize:'13px', fontWeight:600, padding:'4px 16px', borderRadius:'999px', marginBottom:'16px'}}>
          TenzorX 2026 — Poonawalla Fincorp
        </div>
        <h1 style={{fontSize:'clamp(2rem,5vw,3.5rem)', fontWeight:900, lineHeight:1.2, marginBottom:'16px'}}>
          Your Dream Degree.<br/>
          <span style={{color:'#00C4B4'}}>Smartly Financed.</span>
        </h1>
        <p style={{color:'#8BA3BC', fontSize:'1.1rem', maxWidth:'520px', margin:'0 auto 32px'}}>
          India's first AI platform combining career guidance, university matching,
          ROI analysis and loan eligibility — in one place.
        </p>
        <button
          onClick={() => navigate('/onboarding')}
          style={{background:'#00C4B4', color:'#0A1628', fontWeight:700, padding:'14px 32px', borderRadius:'12px', fontSize:'1.1rem', border:'none', cursor:'pointer', display:'inline-flex', alignItems:'center', gap:'8px'}}
        >
          Start My Journey <ArrowRight size={20} />
        </button>
      </div>

      {/* Features */}
      <div style={{background:'#1A2E45', padding:'60px 24px'}}>
        <h2 style={{textAlign:'center', fontSize:'1.6rem', fontWeight:700, marginBottom:'40px'}}>
          5 AI Modules. <span style={{color:'#00C4B4'}}>One Platform.</span>
        </h2>
        <div style={{display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(260px,1fr))', gap:'20px', maxWidth:'1000px', margin:'0 auto'}}>
          {features.map((f, i) => (
            <div key={i} style={{background:'#0A1628', borderRadius:'16px', padding:'24px', border:'1px solid rgba(0,196,180,0.2)'}}>
              <f.icon style={{color:'#00C4B4', marginBottom:'12px'}} size={28} />
              <h3 style={{fontWeight:700, marginBottom:'8px', fontSize:'1rem'}}>{f.title}</h3>
              <p style={{color:'#8BA3BC', fontSize:'0.875rem', lineHeight:1.6}}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}