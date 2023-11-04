function PageNotFound() {
  return (
    <div className="pt-28 pl-10 pr-28 justify-center items-center text-center space-y-4">
      <h2>Back to Manage Film</h2>
      <button
        className="button-red button-text red-glow"
        aria-label="Back To Manage Film"
        onClick={() => {window.location.href = "/manage-film";}}
      >
        Back to Manage Film
      </button>
    </div>
  );
}

export default PageNotFound;
