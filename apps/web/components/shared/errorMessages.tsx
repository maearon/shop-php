import React from 'react';

export type ErrorMessageType = {
  [key: string]: string[];
};

type Props = {
  errorMessage: ErrorMessageType;
};

const ErrorMessage: React.FC<Props> = ({ errorMessage }) => {
  const keys = Object.keys(errorMessage);

  if (keys.length === 0) return null;

  return (
    <div id="error_explanation" className="mt-4">
      <div className="alert alert-danger">
        The form contains {keys.length} error{keys.length !== 1 ? 's' : ''}.
      </div>

      <ul className="text-sm text-red-600 list-disc ml-5">
        {keys.map((key) =>
          errorMessage[key].map((msg, idx) => (
            <li key={`${key}-${idx}`}>
              <strong>{key}</strong>: {msg}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ErrorMessage;
