import { useStore } from '../store/userStore'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'

const fmt = (n: number) => `₹${(n/100000).toFixed(0)}L`

export default function ROICard() {
  const { roiData, selectedUniversity } = useStore()
  if (!roiData) return (
    <div style={{background:'white', borderRadius:'20px', padding:'32px', textAlign:'center', color:'#9ca3af', border:'2px dashed #e5e7eb', boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
      📊 Click "Analyse ROI & Loan" on any university above
    </div>
  )

  const chartData = [
    { name:'Tuition',    value: Math.round(roiData.tuition_inr/100000) },
    { name:'Living',     value: Math.round(roiData.living_cost_inr/100000) },
    { name:'Interest',   value: Math.round((roiData.total_investment_inr - roiData.total_cost_inr)/100000) },
    { name:'Yr1 Salary', value: Math.round(roiData.expected_salary_inr/100000) },
  ]
  const colors = ['#0A1628','#00C4B4','#F5A623','#22c55e']

  return (
    <div style={{background:'white', borderRadius:'20px', padding:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
      <h2 style={{fontSize:'1.1rem', fontWeight:800, color:'#0A1628', marginBottom:'4px'}}>📈 ROI Analysis</h2>
      {selectedUniversity && <p style={{fontSize:'13px', color:'#6b7280', marginBottom:'16px'}}>{selectedUniversity.name} · {roiData.country}</p>}

      <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'12px', marginBottom:'20px'}}>
        {[
          {label:'Total Cost',      value:fmt(roiData.total_cost_inr),           color:'#0A1628'},
          {label:'Expected Salary', value:fmt(roiData.expected_salary_inr)+'/yr', color:'#16a34a'},
          {label:'Payback Period',  value:roiData.payback_years+' yrs',          color:'#00C4B4'},
          {label:'5-Year ROI',      value:roiData.roi_5yr_percent+'%',           color:'#F5A623'},
        ].map((s,i) => (
          <div key={i} style={{background:'#f9fafb', borderRadius:'12px', padding:'12px', textAlign:'center'}}>
            <div style={{fontSize:'1.2rem', fontWeight:900, color:s.color}}>{s.value}</div>
            <div style={{fontSize:'11px', color:'#6b7280', marginTop:'2px'}}>{s.label}</div>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={chartData}>
          <XAxis dataKey="name" tick={{fontSize:11}} />
          <YAxis tick={{fontSize:11}} unit="L" />
          <Tooltip formatter={(v:any) => `₹${v}L`} />
          <Bar dataKey="value" radius={[6,6,0,0]}>
            {chartData.map((_,i) => <Cell key={i} fill={colors[i]} />)}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div style={{
        marginTop:'16px', textAlign:'center', padding:'10px', borderRadius:'10px', fontWeight:600, fontSize:'13px',
        background: roiData.verdict.includes('Excellent')?'rgba(0,196,180,0.15)':roiData.verdict.includes('Good')?'rgba(245,166,35,0.15)':'rgba(234,88,12,0.15)',
        color: roiData.verdict.includes('Excellent')?'#00C4B4':roiData.verdict.includes('Good')?'#b45309':'#ea580c',
      }}>{roiData.verdict}</div>
    </div>
  )
}