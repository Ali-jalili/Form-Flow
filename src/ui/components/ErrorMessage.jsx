/** @format */

function ErrorMessage({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[200px] text-center px-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md w-full">
        <p className="text-red-600 text-sm font-medium">{message}</p>
      </div>
    </div>
  );
}

export default ErrorMessage;
