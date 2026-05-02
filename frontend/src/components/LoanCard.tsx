import { useStore } from '../store/userStore'

const fmt = (n: number) => `₹${(n/100000).toFixed(0)}L`

export default function LoanCard() {
  const { loanData } = useStore()
  if (!loanData) return null

  const prob  = loanData.approval_probability
  const color = prob>=70 ? '#00C4B4' : prob>=45 ? '#F5A623' : '#ef4444'
  const circ  = 2 * Math.PI * 15.9

  return (
    <div style={{background:'white', borderRadius:'20px', padding:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
      <h2 style={{fontSize:'1.1rem', fontWeight:800, color:'#0A1628', marginBottom:'16px'}}>🏦 Loan Eligibility Engine</h2>

      <div style={{display:'flex', alignItems:'center', gap:'24px', marginBottom:'20px'}}>
        <div style={{position:'relative', width:'96px', height:'96px', flexShrink:0}}>
          <svg viewBox="0 0 36 36" width="96" height="96" style={{transform:'rotate(-90deg)'}}>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke="#e5e7eb" strokeWidth="3"/>
            <circle cx="18" cy="18" r="15.9" fill="none" stroke={color} strokeWidth="3"
              strokeDasharray={`${(prob/100)*circ} ${circ}`} strokeLinecap="round"/>
          </svg>
          <div style={{position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
            <span style={{fontSize:'1.1rem', fontWeight:900, color}}>{prob}%</span>
            <span style={{fontSize:'10px', color:'#9ca3af'}}>Approval</span>
          </div>
        </div>
        <div>
          <div style={{fontWeight:700, fontSize:'14px', color: loanData.approved?'#00C4B4':'#ef4444', marginBottom:'4px'}}>
            {loanData.approved ? '✅ Likely Approved' : '⚠️ Needs Strengthening'}
          </div>
          <p style={{fontSize:'12px', color:'#6b7280', marginBottom:'6px'}}>{loanData.recommendation}</p>
          <div style={{fontSize:'12px', color:'#6b7280'}}>Interest Rate: <b style={{color:'#0A1628'}}>{loanData.interest_rate}% p.a.</b></div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'12px', marginBottom:'16px'}}>
        {[
          {label:'Suggested Loan', value:fmt(loanData.suggested_loan_inr)},
          {label:'EMI (7 yr)',     value:`₹${loanData.emi_7yr.toLocaleString()}/mo`},
          {label:'EMI (10 yr)',    value:`₹${loanData.emi_10yr.toLocaleString()}/mo`},
        ].map((s,i) => (
          <div key={i} style={{background:'#f9fafb', borderRadius:'12px', padding:'12px', textAlign:'center'}}>
            <div style={{fontSize:'1rem', fontWeight:900, color:'#0A1628'}}>{s.value}</div>
            <div style={{fontSize:'11px', color:'#9ca3af', marginTop:'2px'}}>{s.label}</div>
          </div>
        ))}
      </div>

      <a href="https://www.poonawallafincorp.com/education-loan" target="_blank" rel="noreferrer" style={{
        display:'block', textAlign:'center', background:'#F5A623', color:'#0A1628',
        fontWeight:700, padding:'12px', borderRadius:'12px', textDecoration:'none', fontSize:'14px'
      }}>
        Apply Now at Poonawalla Fincorp →
      </a>
    </div>
  )
}