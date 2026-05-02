import { create } from 'zustand'

export const useStore = create<any>((set: any) => ({
  profile:             null,
  setProfile:          (profile: any) => set({ profile }),
  recommendations:     [],
  setRecommendations:  (recommendations: any) => set({ recommendations }),
  roiData:             null,
  setRoiData:          (roiData: any) => set({ roiData }),
  loanData:            null,
  setLoanData:         (loanData: any) => set({ loanData }),
  timeline:            [],
  setTimeline:         (timeline: any) => set({ timeline }),
  selectedUniversity:  null,
  setSelectedUniversity: (selectedUniversity: any) => set({ selectedUniversity }),
}))