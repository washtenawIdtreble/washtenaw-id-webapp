import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';


describe(App.name, () => {
  test("renders categories component", () => {
      render(<App/>);
      const categoriesComponent = screen.getByTestId("categories-page");
      expect(categoriesComponent).toBeInTheDocument();
  });
});