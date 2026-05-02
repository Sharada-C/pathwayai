import { useStore } from '../store/userStore'
import { MapPin, TrendingUp, Award, ExternalLink } from 'lucide-react'
import api from '../api/client'
import { useState } from 'react'
import toast from 'react-hot-toast'

const fmt = (n: number) => `₹${(n/100000).toFixed(0)}L`
const FLAG: Record<string,string> = {USA:"🇺🇸",Canada:"🇨🇦",Germany:"🇩🇪",UK:"🇬🇧",Australia:"🇦🇺",Singapore:"🇸🇬",Switzerland:"🇨🇭",India:"🇮🇳"}

export default function CareerResults() {
  const { recommendations, profile, setRoiData, setLoanData, setSelectedUniversity } = useStore()
  const [loading, setLoading] = useState<string|null>(null)

  const analyseUni = async (uni: any) => {
    setLoading(uni.name)
    setSelectedUniversity(uni)
    try {
      const [roiRes, loanRes] = await Promise.all([
        api.post('/api/roi/calculate',  { profile, country: uni.country, tuition_inr: uni.avg_fees_inr }),
        api.post('/api/loan/predict',   { profile, loan_amount_inr: uni.avg_fees_inr * 0.8 }),
      ])
      setRoiData(roiRes.data)
      setLoanData(loanRes.data)
      toast.success(`Analysis ready for ${uni.name}!`)
    } catch { toast.error('Backend error') }
    finally { setLoading(null) }
  }

  return (
    <div style={{background:'white', borderRadius:'20px', padding:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
      <h2 style={{fontSize:'1.1rem', fontWeight:800, color:'#0A1628', marginBottom:'16px'}}>🎯 AI Career Navigator — Your Top Matches</h2>
      <div style={{display:'flex', flexDirection:'column', gap:'12px'}}>
        {recommendations.map((uni: any, i: number) => (
          <div key={i} style={{border:'1px solid #e5e7eb', borderRadius:'12px', padding:'16px'}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'8px'}}>
              <div>
                <p style={{fontWeight:700, color:'#0A1628', fontSize:'14px'}}>{FLAG[uni.country]||'🌍'} {uni.name}</p>
                <p style={{fontSize:'12px', color:'#6b7280'}}>{uni.program} · Intake: {uni.intake}</p>
              </div>
              <span style={{
                background: uni.fit_score>=75?'#00C4B4':uni.fit_score>=50?'#F5A623':'#9ca3af',
                color: uni.fit_score>=75?'#0A1628':'white',
                fontSize:'12px', fontWeight:700, padding:'2px 10px', borderRadius:'999px'
              }}>{uni.fit_score}% Fit</span>
            </div>
            <div style={{display:'flex', gap:'16px', fontSize:'12px', color:'#6b7280', marginBottom:'10px', flexWrap:'wrap'}}>
              <span>🏆 Rank #{uni.ranking}</span>
              <span>📍 {uni.country}</span>
              <span>💼 {fmt(uni.avg_salary_inr)}/yr</span>
              <span>💰 Fees: {fmt(uni.avg_fees_inr)}</span>
            </div>
            <button onClick={() => analyseUni(uni)} disabled={loading===uni.name} style={{
              background:'#0A1628', color:'white', border:'none', borderRadius:'8px',
              padding:'6px 14px', fontSize:'12px', cursor:'pointer', display:'flex', alignItems:'center', gap:'4px'
            }}>
              <ExternalLink size={12}/> {loading===uni.name ? 'Analysing...' : 'Analyse ROI & Loan'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}