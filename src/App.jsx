import './App.css'
import Pages from "@/pages/index.jsx"
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <Pages />
      <Toaster
        position="bottom-right"
        theme="light" // Branco com texto escuro
        richColors={false} // Remove cores fortes
      />
    </>
  )
}

export default App