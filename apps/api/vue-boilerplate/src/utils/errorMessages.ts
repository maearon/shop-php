export type ErrorMessageType = {
  [key: string]: string[];
};

type Props = {
  errorMessage: ErrorMessageType;
};

const errorMessage = (errors: string[]) => {
  return `
    <div id="error_explanation">
      ${Object.keys(errorMessage).length !== 0 ? `
        <div class="alert alert-danger">
          The form contains ${Object.keys(errorMessage).length} error
          ${Object.keys(errorMessage).length !== 1 ? 's' : ''}.
        </div>
      ` : ''}
      ${Object.keys(errorMessage).map((key) => `
        <ul key="${key}">
          ${Array.isArray(errorMessage[key]) ? errorMessage[key].map((error, index) => `
            <li key="${index}">
              ${key} ${error}
            </li>
          `).join('') : `
            <li>
              ${key}: ${String(errorMessage[key])}
            </li>
          `}
        </ul>
      `).join('')}
    </div>
  `;
};
