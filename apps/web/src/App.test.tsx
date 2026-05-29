import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { App } from './App';

describe('App', () => {
  it('renders the starter heading', () => {
    const markup = renderToStaticMarkup(<App />);

    expect(markup).toContain('Task Tracker Pro');
    expect(markup).toContain('Base preparada para los ejercicios del curso.');
  });
});
