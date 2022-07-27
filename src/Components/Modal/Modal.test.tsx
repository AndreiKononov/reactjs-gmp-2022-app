import { render } from '@testing-library/react';
import Modal from './Modal';

const mockCreatePortal = jest.fn();

jest.mock('react-dom', () => ({
  ...(jest.requireActual('react-dom') as any),
  createPortal() {
    mockCreatePortal();
  },
}));

describe('Modal', () => {
  it('should call createPortal', () => {
    const mockHandleClose = jest.fn();

    render(
      <Modal title="Test title" handleClose={mockHandleClose}>
        Modal content
      </Modal>
    );

    expect(mockCreatePortal).toHaveBeenCalled();
  });
});
