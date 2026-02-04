import { AppProviders } from './providers';
import { AuthGuard } from './components/AuthGuard';
import { Home } from './pages/Home';

function App() {
  return (
    <AppProviders>
      <AuthGuard>
        <Home />
      </AuthGuard>
    </AppProviders>
  );
}

export default App;
