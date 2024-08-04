/**
 * Controller for managing lists and list items.
 * @namespace
 */
const List = require('./../db/helper/list');
const ListItem = require('./../db/helper/list_item');

const listController = {
  /**
   * Retrieves all items in a specific list.
   * @async
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Object} - Response containing an array of list items.
   * @throws {Error} - Throws an error if there's an issue with fetching the list items.
   */
  showLists: async (req, res) => {
    try {
      const user = res.locals.user;

      const lists = await List.findAllById(user.user_id);

      return res.status(200).json({ lists: lists });
    } catch (error) {
      res.status(500).json({ msg: error?.message ?? 'Internal Server Error' });
    }
  },
  /**
   * Retrieves all items in a specific list.
   * @async
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @returns {Object} - Response containing an array of list items.
   * @throws {Error} - Throws an error if there's an issue with fetching the list items.
   */
  showList: async (req, res) => {
    try {
      const user = res.locals.user;
      const listId = req.params.id;

      // checking information valid or not
      if (!listId) {
        throw new Error('Missing field list id');
      }

      const list = await List.findById(listId, { user_id: user.user_id });

      if (!list) {
        throw new Error('There isnt a list with this id');
      }
      const listItems = await ListItem.findAllByListId(listId);

      return res.status(200).json({ items: listItems });
    } catch (error) {
      res.status(500).json({ msg: error?.message ?? 'Internal Server Error' });
    }
  },
  /**
   * Adds a list item to a specific list.
   * @async
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @throws {Error} - Throws an error if there are missing fields or other issues.
   */
  addToList: async (req, res) => {
    try {
      const user = res.locals.user;
      const { contentId, contentName, listId } = req.body;

      // checking information valid or not
      if (!contentId || !contentName || !listId) {
        throw new Error('Missing field (listId or contentName or contentId)');
      }

      const list = await List.findById(listId);

      const listItemCheck = await ListItem.findByListId(listId, {
        item: contentId,
      });

      if (!list || list.user_id !== user.user_id) {
        throw new Error('There isnt a list with this id');
      }
      //   check if the item is present on the list or not
      if (listItemCheck && listId === list.id) {
        throw new Error('This content is already added to your list.');
      }

      //  add the item to the list
      const listItem = await ListItem.create(contentId, contentName, listId);
      return res
        .status(200)
        .json({ msg: 'Item successully added to your list.', listItem: listItem });
    } catch (error) {
      res.status(500).json({ msg: error?.message ?? 'Internal Server Error' });
    }
  },

  /**
   * Creates a new list
   * @async
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @throws {Error} - Throws an error if there are missing fields or other issues.
   */
  createList: async (req, res) => {
    try {
      const user = res.locals.user;
      const { name } = req.body;

      //   Checking list name
      if (!name) {
        throw new Error('Please provide a list name');
      }
      const checkList = await List.findByName(name, { user_id: user.user_id });

      if (checkList) {
        throw new Error('You already have a list with this name');
      }

      const list = await List.create(name, user.user_id);

      return res.status(200).json({ list: list });
    } catch (error) {
      res.status(500).json({ msg: error?.message ?? 'Internal Server Error' });
    }
  },

  /**
   * Delete the list.
   * @async
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @throws {Error} - Throws an error if there are missing fields or other issues.
   */
  deleteList: async (req, res) => {
    try {
      const user = res.locals.user;
      const { listId } = req.body;
      const list = await List.findById(listId);

      if (!list) {
        throw new Error('No such list already exist with this listId');
      }
      if (list.user_id != user.user_id) {
        throw new Error('Unauthorized operation');
      }

      // deleting list items first

      await ListItem.deleteAllByListId(listId);
      await list.destroy();
      res.status(200).json({ msg: 'List deleted sucessfully' });
    } catch (error) {
      res.status(500).json({ msg: error?.message ?? 'Internal Server Error' });
    }
  },

  /**
   * Remove a list item to a specific list.
   * @async
   * @param {Object} req - Express request object.
   * @param {Object} res - Express response object.
   * @throws {Error} - Throws an error if there are missing fields or other issues.
   */
  removeFromList: async (req, res) => {
    try {
      const user = res.locals.user;
      const { contentId, listId } = req.body;

      // validate information
      if (!contentId || !listId) {
        throw new Error('Missing field (listId or contentId)');
      }

      // check if list is present or not
      const list = await List.findById(listId);

      if (!list || list.user_id !== user.user_id) {
        throw new Error('There isnt a list with this id for you.');
      }

      //   check if list item is present or not
      const listItem = await ListItem.findByContentId(contentId);

      if (!listItem) {
        throw new Error('This already is already not present on your listd');
      }

      await listItem.destroy();

      return res.status(200).json({ msg: 'Item successully removed to your list.' });
    } catch (error) {
      res.status(500).json({ msg: error?.message ?? 'Internal Server Error' });
    }
  },
};

module.exports = listController;
