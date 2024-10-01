import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ExpenseForm from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ExpenseForm />
  </StrictMode>,
)
