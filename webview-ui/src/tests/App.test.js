import { render, screen } from '@testing-library/react';
import App from '../App';
describe('App', () => {
    it('renders headline', () => {
        render(<App />);
        const heading = screen.getByText(/Sprint App/i);
        expect(heading).toBeInTheDocument();
    });
});
//# sourceMappingURL=App.test.js.map