type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return <div className="p-2 mb-4 text-sm text-red-800 border-2 border-red-200 rounded-lg">{message}</div>;
}

export default ErrorMessage;
