import { GraduationCap } from 'lucide-react'

export default function Navbar() {
  return (
    <nav style={{background:'#0A1628'}} className="text-white px-6 py-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center gap-3">
        <GraduationCap style={{color:'#00C4B4'}} size={28} />
        <span className="text-xl font-bold">
          Pathway<span style={{color:'#00C4B4'}}>AI</span>
        </span>
      </div>
      <div className="text-xs text-gray-400 italic">
        Powered by Poonawalla Fincorp × TenzorX 2026
      </div>
    </nav>
  )
}