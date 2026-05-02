import { useStore } from '../store/userStore'
import { useNavigate } from 'react-router-dom'
import CareerResults from '../components/CareerResults'
import ROICard       from '../components/ROICard'
import LoanCard      from '../components/LoanCard'
import Timeline      from '../components/Timeline'
import Chatbot       from '../components/Chatbot'
import { useEffect } from 'react'

export default function Dashboard() {
  const { profile, recommendations } = useStore()
  const navigate = useNavigate()

  useEffect(() => { if (!profile) navigate('/') }, [profile])
  if (!profile) return null

  return (
    <div style={{maxWidth:'1200px', margin:'0 auto', padding:'32px 16px'}}>
      {/* Banner */}
      <div style={{background:'#0A1628', color:'white', borderRadius:'20px', padding:'24px 32px', display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'32px', flexWrap:'wrap', gap:'16px'}}>
        <div>
          <p style={{color:'#00C4B4', fontSize:'12px', fontWeight:600, letterSpacing:'2px', textTransform:'uppercase'}}>Welcome back</p>
          <h1 style={{fontSize:'1.6rem', fontWeight:900, margin:'4px 0'}}>{profile.name}'s Dashboard</h1>
          <p style={{color:'#8BA3BC', fontSize:'13px'}}>
            CGPA {profile.cgpa} · Budget ₹{(profile.budget_inr/100000).toFixed(0)}L · {profile.target_degree} · Intake {profile.intake_year}
          </p>
        </div>
        <div style={{textAlign:'right'}}>
          <div style={{fontSize:'2.5rem', fontWeight:900, color:'#00C4B4'}}>{recommendations.length}</div>
          <div style={{fontSize:'13px', color:'#8BA3BC'}}>Universities Matched</div>
        </div>
      </div>

      {/* Layout */}
      <div style={{display:'grid', gridTemplateColumns:'1fr 380px', gap:'32px'}}>
        <div style={{display:'flex', flexDirection:'column', gap:'24px'}}>
          <CareerResults />
          <ROICard />
          <LoanCard />
          <Timeline />
        </div>
        <div>
          <div style={{position:'sticky', top:'16px'}}>
            <Chatbot />
          </div>
        </div>
      </div>
    </div>
  )
}