export default function ErrorMessage({ message = "Something went wrong.", onRetry }) {
  return (
    <div className="state-card error-state">
      <strong>Something went wrong</strong>
      <p>{message}</p>
      {onRetry && <button className="btn btn-secondary" onClick={onRetry}>Try again</button>}
    </div>
  );
}
