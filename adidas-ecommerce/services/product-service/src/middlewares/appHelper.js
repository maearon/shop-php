const fullTitle = (pageTitle = '') => {
  const baseTitle = 'Ruby on Rails Tutorial Sample App';
  if (pageTitle === '') return baseTitle;
  return `${pageTitle} | ${baseTitle}`;
};

const fullFlash = (messageType = '', message = '') => {
  if (messageType !== '' && message !== '') return [messageType, message];
};

module.exports = {
  fullTitle,
  fullFlash,
};
