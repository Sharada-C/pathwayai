import { useStore } from '../store/userStore'

const CAT_COLOR: Record<string,[string,string]> = {
  planning:    ['#dbeafe','#1d4ed8'],
  exam:        ['#ede9fe','#7c3aed'],
  documents:   ['#fef9c3','#a16207'],
  finance:     ['#ccfbf1','#0f766e'],
  application: ['#f0f9ff','#0369a1'],
  visa:        ['#ffedd5','#c2410c'],
  departure:   ['#dcfce7','#15803d'],
}

export default function Timeline() {
  const { timeline, profile } = useStore()
  if (!timeline.length) return null

  return (
    <div style={{background:'white', borderRadius:'20px', padding:'24px', boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
      <h2 style={{fontSize:'1.1rem', fontWeight:800, color:'#0A1628', marginBottom:'4px'}}>📅 Smart Timeline</h2>
      <p style={{fontSize:'13px', color:'#6b7280', marginBottom:'20px'}}>
        Personalised for {profile?.name} · {profile?.target_degree} · Intake {profile?.intake_year}
      </p>
      <div style={{position:'relative'}}>
        <div style={{position:'absolute', left:'16px', top:0, bottom:0, width:'2px', background:'#e5e7eb'}}/>
        <div style={{display:'flex', flexDirection:'column', gap:'16px', paddingLeft:'40px'}}>
          {timeline.map((step: any, i: number) => {
            const [bg, text] = CAT_COLOR[step.category] || ['#f3f4f6','#374151']
            return (
              <div key={i} style={{position:'relative'}}>
                <div style={{position:'absolute', left:'-32px', top:'4px', width:'14px', height:'14px', borderRadius:'50%', background: step.priority==='high'?'#00C4B4':'#d1d5db', border:'2px solid white'}}/>
                <div style={{background:'#f9fafb', borderRadius:'12px', padding:'12px 14px', border:'1px solid #f3f4f6'}}>
                  <div style={{display:'flex', alignItems:'center', gap:'8px', marginBottom:'4px'}}>
                    <span style={{fontSize:'11px', fontWeight:600, color:'#9ca3af'}}>{step.month}</span>
                    <span style={{fontSize:'11px', padding:'1px 8px', borderRadius:'999px', background:bg, color:text, fontWeight:600}}>{step.category}</span>
                  </div>
                  <p style={{fontWeight:700, color:'#0A1628', fontSize:'13px', margin:'0 0 2px'}}>{step.task}</p>
                  <p style={{fontSize:'12px', color:'#6b7280', margin:0}}>{step.detail}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}