import { useState, useRef, useEffect } from 'react'
import { useStore } from '../store/userStore'
import api from '../api/client'
import { Send, Bot, User } from 'lucide-react'

interface Msg { role: 'user' | 'model'; text: string }

const SUGGESTIONS = [
  "What GRE score for UofT?",
  "How much loan for Canada MS?",
  "Is Germany free for Indians?",
  "When to start my SOP?",
]

export default function Chatbot() {
  const { profile } = useStore()
  const [messages, setMessages] = useState<Msg[]>([
    { role: 'model', text: `Hi ${profile?.name || 'there'}! 👋 I'm your PathwayAI Mentor. Ask me anything about universities, exams, or loans!` }
  ])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:'smooth' }) }, [messages])

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return
    const userMsg: Msg = { role:'user', text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)
    try {
      const history = [...messages, userMsg].map(m => ({ role: m.role, parts: [m.text] }))
      const res = await api.post('/api/chat/message', { messages: history, user_context: profile || {} })
      setMessages(prev => [...prev, { role:'model', text: res.data.reply }])
    } catch {
      setMessages(prev => [...prev, { role:'model', text:'Sorry, connection issue. Is the backend running?' }])
    } finally { setLoading(false) }
  }

  return (
    <div style={{background:'white', borderRadius:'20px', boxShadow:'0 2px 12px rgba(0,0,0,0.08)', display:'flex', flexDirection:'column', height:'600px', overflow:'hidden'}}>
      {/* Header */}
      <div style={{background:'#0A1628', color:'white', padding:'16px', display:'flex', alignItems:'center', gap:'10px'}}>
        <Bot style={{color:'#00C4B4'}} size={20}/>
        <div style={{flex:1}}>
          <p style={{fontWeight:700, fontSize:'14px', margin:0}}>AI Mentor</p>
          <p style={{fontSize:'11px', color:'#8BA3BC', margin:0}}>Powered by Gemini 1.5 Flash</p>
        </div>
        <div style={{width:'8px', height:'8px', borderRadius:'50%', background:'#00C4B4'}}/>
      </div>

      {/* Messages */}
      <div style={{flex:1, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:'12px'}}>
        {messages.map((m, i) => (
          <div key={i} style={{display:'flex', gap:'8px', flexDirection: m.role==='user'?'row-reverse':'row'}}>
            <div style={{width:'28px', height:'28px', borderRadius:'50%', background: m.role==='user'?'#0A1628':'#00C4B4', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0}}>
              {m.role==='user' ? <User size={14} color="white"/> : <Bot size={14} color="#0A1628"/>}
            </div>
            <div style={{
              maxWidth:'80%', padding:'10px 14px', borderRadius:'16px', fontSize:'13px', lineHeight:1.5,
              background: m.role==='user'?'#0A1628':'#f3f4f6',
              color: m.role==='user'?'white':'#1f2937',
              borderTopRightRadius: m.role==='user'?'4px':'16px',
              borderTopLeftRadius:  m.role==='model'?'4px':'16px',
            }}>{m.text}</div>
          </div>
        ))}
        {loading && (
          <div style={{display:'flex', gap:'8px'}}>
            <div style={{width:'28px', height:'28px', borderRadius:'50%', background:'#00C4B4', display:'flex', alignItems:'center', justifyContent:'center'}}>
              <Bot size={14} color="#0A1628"/>
            </div>
            <div style={{background:'#f3f4f6', padding:'10px 14px', borderRadius:'16px', borderTopLeftRadius:'4px', display:'flex', gap:'4px', alignItems:'center'}}>
              {[0,1,2].map(i => <div key={i} style={{width:'6px', height:'6px', borderRadius:'50%', background:'#9ca3af', animation:'bounce 1s infinite', animationDelay:`${i*0.15}s`}}/>)}
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>

      {/* Suggestions */}
      {messages.length === 1 && (
        <div style={{padding:'0 12px 8px', display:'flex', flexWrap:'wrap', gap:'6px'}}>
          {SUGGESTIONS.map((s,i) => (
            <button key={i} onClick={() => sendMessage(s)} style={{
              fontSize:'11px', background:'rgba(0,196,180,0.1)', color:'#00C4B4',
              border:'1px solid rgba(0,196,180,0.3)', padding:'4px 10px', borderRadius:'999px', cursor:'pointer'
            }}>{s}</button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{padding:'12px', borderTop:'1px solid #e5e7eb', display:'flex', gap:'8px'}}>
        <input value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key==='Enter' && sendMessage(input)}
          placeholder="Ask about universities, loans, exams..."
          style={{flex:1, border:'1px solid #d1d5db', borderRadius:'10px', padding:'8px 12px', fontSize:'13px', outline:'none'}}/>
        <button onClick={() => sendMessage(input)} disabled={loading} style={{
          background:'#0A1628', color:'white', border:'none', borderRadius:'10px', padding:'8px 12px', cursor:'pointer'
        }}>
          <Send size={16}/>
        </button>
      </div>
    </div>
  )
}