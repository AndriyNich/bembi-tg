const { getUsersData } = require('./getUsersData');

const initMainList = receiver => {
  receiver.push(...getUsersData());
};

module.exports = {
  initMainList,
};
