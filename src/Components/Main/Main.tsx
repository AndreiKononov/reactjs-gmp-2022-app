import { PropsWithChildren } from 'react';
// import './Main.scss';

function Main({ children }: PropsWithChildren<{}>) {
  return <div className="main">{children}</div>;
}

export default Main;
