function PageNotFound() {

  return (
    <div className="pt-28 pl-10 pr-28 justify-center items-center text-center space-y-4">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <button
        className="button-red button-text red-glow"
        aria-label="Home"
        onClick={() => {window.location.href = "/manage-film";}}
      >
        Home
      </button>
    </div>
  );
}

export default PageNotFound;
