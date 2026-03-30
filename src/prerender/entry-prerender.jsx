/**
 * Server entry for build-time prerender (Vite SSR load).
 */
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Landing from '../pages/Landing.jsx';
import About from '../pages/About.jsx';
import ResearchStatic from './ResearchStatic.jsx';
import LecturesStatic from './LecturesStatic.jsx';
import CV from '../pages/CV.jsx';

function PrerenderApp() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Landing />} />
        <Route path="about" element={<About />} />
        <Route path="research" element={<ResearchStatic />} />
        <Route path="lectures" element={<LecturesStatic />} />
        <Route path="cv" element={<CV />} />
      </Route>
    </Routes>
  );
}

export function render(url) {
  return renderToString(
    <MemoryRouter initialEntries={[url]}>
      <PrerenderApp />
    </MemoryRouter>
  );
}
