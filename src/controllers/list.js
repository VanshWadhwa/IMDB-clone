const List = require('./../db/helper/list');
const ListItem = require('./../db/helper/list_item');

const listController = {
  // view list
  showLists: async (req, res) => {
    try {
      const user = res.locals.user;

      const lists = await List.findAllById(user.user_id);

      return res.status(200).json({ lists: lists });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },
  showList: async (req, res) => {
    try {
      const user = res.locals.user;
      const listId = req.params.id;

      // checking information valid or not
      if (!listId) {
        return res.status(400).json({ msg: 'Missing field list id' });
      }

      const list = await List.findById(listId, { user_id: user.user_id });

      if (!list) {
        return res.status(400).json({ msg: "There isn't a list with this id" });
      }
      const listItems = await ListItem.findAllByListId(listId);

      return res.status(200).json({ items: listItems });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },
  // add to list
  addToList: async (req, res) => {
    try {
      const user = res.locals.user;
      const { contentId, contentName, listId } = req.body;

      // checking information valid or not
      if (!contentId || !contentName || !listId)
        return res.status(400).json({ msg: 'Missing field (listId or contentName or contentId)' });

      const list = await List.findById(listId);

      const listItemCheck = await ListItem.findByListId(listId, {
        item: contentId,
      });

      if (!list || list.user_id !== user.user_id) {
        return res.status(400).json({ msg: "There isn't a list with this id" });
      }
      //   check if the item is present on the list or not
      if (listItemCheck && listId === list.id) {
        return res.status(400).json({ msg: 'This content is already added to your list.' });
      }

      //  add the item to the list
      const listItem = await ListItem.create(contentId, contentName, listId);
      return res
        .status(200)
        .json({ msg: 'Item successully added to your list.', listItem: listItem });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },

  // create list
  createList: async (req, res) => {
    try {
      const user = res.locals.user;
      const { name } = req.body;

      //   Checking list name
      if (!name) {
        return res.status(400).json({ msg: 'Please provide a list name' });
      }
      const checkList = await List.findByName(name, { user_id: user.user_id });

      if (checkList) {
        return res.status(400).json({ msg: 'You already have a list with this name' });
      }

      const list = await List.create(name, user.user_id);

      // await List.create({ name, user_id: user.user_id });

      return res.status(200).json({ list: list });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },

  // delete list - cascade (this will delete the list and all the listItem of the list)
  deleteList: async (req, res) => {
    try {
      const user = res.locals.user;
      const { listId } = req.body;
      const list = await List.findById(listId);

      if (!list) {
        return res.status(400).json({ msg: 'No such list already exist with this listId' });
      }
      if (list.user_id != user.user_id) {
        return res.status(400).json({ msg: 'Unauthorized operation' });
      }

      // deleting list items first

      await ListItem.deleteAllByListId(listId);
      await list.destroy();
      res.status(200).json({ msg: 'List deleted sucessfully' });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },

  // remove from list - with content Id
  removeFromList: async (req, res) => {
    try {
      const user = res.locals.user;
      const { contentId, listId } = req.body;

      // validate information
      if (!contentId || !listId)
        return res.status(400).json({ msg: 'Missing field (listId or contentId)' });

      // check if list is present or not
      const list = await List.findById(listId);

      if (!list || list.user_id !== user.user_id) {
        return res.status(400).json({ msg: "There isn't a list with this id for you." });
      }

      //   check if list item is present or not
      const listItem = await ListItem.findByContentId(contentId);

      if (!listItem) {
        return res.status(400).json({ msg: 'This already is already not present on your list' });
      }

      await listItem.destroy();

      return res.status(200).json({ msg: 'Item successully removed to your list.' });
    } catch (error) {
      return res.status(500).json({ msg: 'Internal Server Error' });
    }
  },
};

module.exports = listController;
