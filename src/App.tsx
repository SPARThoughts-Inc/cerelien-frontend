import { useState } from 'react'
import { AuthGuard } from './components/auth/AuthGuard'
import { AppShell } from './components/layout/AppShell'
import { PatientDashboard } from './components/dashboard/PatientDashboard'
import { ChatWindow } from './components/chat/ChatWindow'
import { VoiceCallPanel } from './components/voice/VoiceCallPanel'

const DEMO_PATIENT_ID = 'demo-patient-001'

function AppContent() {
  const [activePath, setActivePath] = useState('/dashboard')
  return (
    <AppShell activePath={activePath} onNavigate={setActivePath}>
      {activePath === '/dashboard' && <PatientDashboard patientId={DEMO_PATIENT_ID} />}
      {activePath === '/chat' && <ChatWindow patientId={DEMO_PATIENT_ID} />}
      {activePath === '/voice' && <VoiceCallPanel identity="clinician" />}
    </AppShell>
  )
}

function App() {
  return (
    <AuthGuard>
      <AppContent />
    </AuthGuard>
  )
}

export default App
