import './index.css';
import { ViteReactSSG } from 'vite-react-ssg';
import App from './App.jsx';
import Home from './pages/Home.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Services from './pages/Services.jsx';
import About from './pages/About.jsx';
import Resume from './pages/Resume.jsx';
import Contact from './pages/Contact.jsx';
import Legal from './pages/Legal.jsx';
import Offers from './pages/Offers.jsx';
import NotFound from './pages/NotFound.jsx';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'projets', element: <Projects /> },
      { path: 'projets/:slug', element: <ProjectDetail /> },
      { path: 'services', element: <Services /> },
      { path: 'a-propos', element: <About /> },
      { path: 'parcours', element: <Resume /> },
      { path: 'contact', element: <Contact /> },
      { path: 'mentions-legales', element: <Legal /> },
      { path: 'offres', element: <Offers /> },
      { path: '*', element: <NotFound /> },
    ],
  },
];

export const createRoot = ViteReactSSG({ routes });
