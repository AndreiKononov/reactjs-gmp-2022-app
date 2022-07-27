import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { NextImageCustom } from './NextImageCustom';

jest.mock('next/image', () => {
  return ({ alt }) => (
    <div>
      <img alt={alt} />
    </div>
  );
});

describe('NextImageCustom', () => {
  it('should render next/image', () => {
    const { getByAltText } = render(<NextImageCustom alt="alt text" />);

    const image = getByAltText('alt text');
    expect(image).toBeInTheDocument();
  });
});
