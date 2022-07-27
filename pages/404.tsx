import Link from 'next/link';
// import './PageNotFound.scss';

const PageNotFound = () => (
  <div className="page-not-found">
    <h1 className="title">Page not found</h1>
    <p>
      <Link href="/">
        <a className="link">Go to the home page</a>
      </Link>
    </p>
  </div>
);

export default PageNotFound;
