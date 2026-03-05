import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Landing from './pages/Landing.jsx'
import About from './pages/About.jsx'
import Research from './pages/Research.jsx'
import Lectures from './pages/Lectures.jsx'
import CV from './pages/CV.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="about" element={<About />} />
        <Route path="research" element={<Research />} />
        <Route path="lectures" element={<Lectures />} />
        <Route path="cv" element={<CV />} />
      </Route>
    </Routes>
  )
}

export default App
