const { USER, ITEM } = require('./dataTypes');

const OPERATIONS_LIST = {
  data: [],
  getOperationsByChatId: function (chatId) {
    return this.data.find(e => e[USER.CHAT_ID] === chatId)[USER.ITEMS];
  },
  getListModelsByChatID: function (chatId) {
    return this.getOperationsByChatId(chatId)
      .filter(
        (e, idx, arr) =>
          idx ===
          arr.findIndex(elem => elem[ITEM.MODEL_NAME] === e[ITEM.MODEL_NAME])
      )
      .map(e => [
        {
          text: `${e[ITEM.MODEL_NAME]} _vc:${e[ITEM.VENDOR_CODE].slice(0, 9)}`,
        },
      ]);
  },
  getListSKUsByChatIdAndVendorCode: function (chatId, vendorCode) {
    return this.getOperationsByChatId(chatId)
      .filter(
        (e, idx, arr) =>
          e[ITEM.VENDOR_CODE].slice(0, 9) === vendorCode &&
          idx ===
            arr.findIndex(
              elem => elem[ITEM.VENDOR_CODE] === e[ITEM.VENDOR_CODE]
            )
      )
      .map(e => [{ text: `${e[ITEM.ITEM_NAME]} _id:${e[ITEM.ITEM_ID]} ` }]);
  },
};

module.exports = {
  OPERATIONS_LIST,
};
