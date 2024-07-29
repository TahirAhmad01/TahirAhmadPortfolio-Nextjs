import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Index from '@/app/page'
 
describe('Home', () => {
  it('renders a heading', () => {
    render(<Index />)
 
    const heading = screen.getByRole('heading', { level: 1 })
 
    expect(heading).toBeInTheDocument()
  })
})