import { PropsWithChildren } from 'react';
// import './Header.scss';

export const Header = ({ children }: PropsWithChildren<{}>) => <header className="header">{children}</header>;
