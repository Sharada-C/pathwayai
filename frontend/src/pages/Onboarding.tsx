import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useStore } from '../store/userStore'
import api from '../api/client'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { Loader2 } from 'lucide-react'

const COUNTRIES = ["USA","Canada","Germany","UK","Australia","Singapore","Switzerland","India"]
const INTERESTS  = ["AI","Data Science","ML","Systems","Robotics","NLP","Analytics","Security","Research"]
const SKILLS     = ["Python","Java","C++","R","SQL","ML","DSA","Web Dev","Cloud","Statistics"]

const inp: React.CSSProperties = {width:'100%', border:'1px solid #d1d5db', borderRadius:'8px', padding:'8px 12px', fontSize:'14px', outline:'none', boxSizing:'border-box'}
const lbl: React.CSSProperties = {display:'block', fontSize:'13px', fontWeight:600, color:'#374151', marginBottom:'4px'}

export default function Onboarding() {
  const { register, handleSubmit } = useForm<any>({
    defaultValues: { intake_year: 2026, work_experience_years: 0, has_collateral: false }
  })
  const { setProfile, setRecommendations, setTimeline } = useStore()
  const navigate = useNavigate()
  const [loading, setLoading]       = useState(false)
  const [selCountries, setSelCountries] = useState<string[]>([])
  const [selInterests, setSelInterests] = useState<string[]>([])
  const [selSkills,    setSelSkills]    = useState<string[]>([])

  const toggle = (arr: string[], val: string, setArr: (a:string[])=>void) =>
    setArr(arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val])

  const onSubmit = async (data: any) => {
    const profile = {
      ...data,
      preferred_countries:   selCountries,
      interests:             selInterests,
      skills:                selSkills,
      cgpa:                  +data.cgpa,
      budget_inr:            +data.budget_inr,
      family_income_inr:     +data.family_income_inr,
      work_experience_years: +data.work_experience_years,
      has_collateral:        !!data.has_collateral,
    }
    setLoading(true)
    try {
      const [careerRes, timelineRes] = await Promise.all([
        api.post('/api/career/recommend',  profile),
        api.post('/api/timeline/generate', profile),
      ])
      setProfile(profile)
      setRecommendations(careerRes.data.recommendations)
      setTimeline(timelineRes.data.timeline)
      toast.success('Profile analysed! ✅')
      navigate('/dashboard')
    } catch {
      toast.error('Backend not running. Start the backend first!')
    } finally {
      setLoading(false)
    }
  }

  const Chip = ({ label, active, onClick }: any) => (
    <button type="button" onClick={onClick} style={{
      padding:'4px 12px', borderRadius:'999px', fontSize:'13px', fontWeight:500, cursor:'pointer',
      border: active ? '1px solid #00C4B4' : '1px solid #d1d5db',
      background: active ? '#00C4B4' : 'white',
      color: active ? '#0A1628' : '#6b7280',
    }}>{label}</button>
  )

  return (
    <div style={{maxWidth:'680px', margin:'0 auto', padding:'40px 16px'}}>
      <div style={{background:'white', borderRadius:'20px', boxShadow:'0 4px 24px rgba(0,0,0,0.1)', padding:'40px'}}>
        <h2 style={{fontSize:'1.5rem', fontWeight:900, color:'#0A1628', marginBottom:'4px'}}>Tell Us About Yourself</h2>
        <p style={{color:'#6b7280', fontSize:'14px', marginBottom:'24px'}}>We'll personalise your entire journey in seconds.</p>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Row 1 */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px'}}>
            <div>
              <label style={lbl}>Full Name</label>
              <input {...register('name', {required:true})} placeholder="Arjun Verma" style={inp} />
            </div>
            <div>
              <label style={lbl}>Target Degree</label>
              <select {...register('target_degree')} style={inp}>
                <option value="MS">MS (Master of Science)</option>
                <option value="MBA">MBA</option>
                <option value="MTech">MTech</option>
                <option value="MIM">MIM (Management)</option>
              </select>
            </div>
          </div>

          {/* Row 2 */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px'}}>
            <div>
              <label style={lbl}>CGPA (out of 10)</label>
              <input type="number" step="0.1" min="0" max="10" {...register('cgpa')} placeholder="7.8" style={inp} />
            </div>
            <div>
              <label style={lbl}>Total Budget (₹)</label>
              <input type="number" {...register('budget_inr')} placeholder="3000000" style={inp} />
              <p style={{fontSize:'11px', color:'#9ca3af', marginTop:'2px'}}>e.g. 3000000 = ₹30L</p>
            </div>
          </div>

          {/* Row 3 */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'16px'}}>
            <div>
              <label style={lbl}>Family Annual Income (₹)</label>
              <input type="number" {...register('family_income_inr')} placeholder="800000" style={inp} />
            </div>
            <div>
              <label style={lbl}>Work Experience (years)</label>
              <input type="number" min="0" max="10" {...register('work_experience_years')} placeholder="0" style={inp} />
            </div>
          </div>

          {/* Row 4 */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'16px', marginBottom:'20px'}}>
            <div>
              <label style={lbl}>Target Intake Year</label>
              <select {...register('intake_year')} style={inp}>
                <option value={2026}>2026</option>
                <option value={2027}>2027</option>
              </select>
            </div>
            <div style={{display:'flex', alignItems:'center', gap:'8px', paddingTop:'24px'}}>
              <input type="checkbox" {...register('has_collateral')} id="col" style={{width:'16px', height:'16px', accentColor:'#00C4B4'}} />
              <label htmlFor="col" style={{fontSize:'13px', color:'#374151'}}>I have collateral for loan</label>
            </div>
          </div>

          {/* Countries */}
          <div style={{marginBottom:'16px'}}>
            <label style={lbl}>Preferred Countries</label>
            <div style={{display:'flex', flexWrap:'wrap', gap:'8px', marginTop:'4px'}}>
              {COUNTRIES.map(c => <Chip key={c} label={c} active={selCountries.includes(c)} onClick={() => toggle(selCountries, c, setSelCountries)} />)}
            </div>
          </div>

          {/* Interests */}
          <div style={{marginBottom:'16px'}}>
            <label style={lbl}>Areas of Interest</label>
            <div style={{display:'flex', flexWrap:'wrap', gap:'8px', marginTop:'4px'}}>
              {INTERESTS.map(i => <Chip key={i} label={i} active={selInterests.includes(i)} onClick={() => toggle(selInterests, i, setSelInterests)} />)}
            </div>
          </div>

          {/* Skills */}
          <div style={{marginBottom:'24px'}}>
            <label style={lbl}>Your Skills</label>
            <div style={{display:'flex', flexWrap:'wrap', gap:'8px', marginTop:'4px'}}>
              {SKILLS.map(s => <Chip key={s} label={s} active={selSkills.includes(s)} onClick={() => toggle(selSkills, s, setSelSkills)} />)}
            </div>
          </div>

          <button type="submit" disabled={loading} style={{
            width:'100%', background:'#0A1628', color:'white', fontWeight:700,
            padding:'14px', borderRadius:'12px', border:'none', cursor:'pointer',
            fontSize:'15px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px'
          }}>
            {loading ? <><Loader2 size={18} className="animate-spin"/> Analysing...</> : 'Analyse My Profile →'}
          </button>
        </form>
      </div>
    </div>
  )
}