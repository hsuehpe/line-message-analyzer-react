import { render, screen } from '@testing-library/react';
import App from './App';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'

describe('App', () => {
  test('render App', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>
    );
    expect(screen.getByText('載入聊天')).toBeInTheDocument();
  
    history.push('/analyze');
    expect(screen.getByText('analyze')).toBeInTheDocument();
  });
});
