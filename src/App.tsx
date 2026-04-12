import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import PhoneticLearning from './components/PhoneticLearning';
import RuleLearning from './components/RuleLearning';
import Practice from './components/Practice';
import Compare from './components/Compare';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/phonetics" element={<PhoneticLearning />} />
          <Route path="/rules" element={<RuleLearning />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/compare" element={<Compare />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
