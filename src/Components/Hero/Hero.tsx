import { PropsWithChildren } from 'react';
// import './Hero.scss';

export function Hero({ children }: PropsWithChildren<{}>) {
  return (
    <div className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">{children}</div>
    </div>
  );
}
