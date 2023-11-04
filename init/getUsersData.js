const { ITEM, USER } = require('../data');
const { itemsList, usersList } = require('./json');

const getItemsListByUserID = (itemsList, userId) => {
  return itemsList.filter(e => e[ITEM.USER_ID] === userId);
};

const createUser = (user, itemsList) => {
  const result = {};
  result[USER.CHAT_ID] = user[USER.CHAT_ID];
  result[USER.USER_ID] = user[USER.USER_ID];
  result[USER.USER_NAME] = user[USER.USER_NAME];
  result[USER.ITEMS] = getItemsListByUserID(itemsList, user[USER.USER_ID]);
  return result;
};

const getItemsList = () => {
  return itemsList;
};

const getUsersList = () => {
  return usersList;
};

const getUsersData = () => {
  const itemsList = getItemsList();
  //   console.log(itemsList);
  return getUsersList().map(e => createUser(e, itemsList));
};

module.exports = {
  getUsersData,
};
