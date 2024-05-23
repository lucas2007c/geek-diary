import express from 'express';

import getById from '../controllers/serie/getById.js';
import listAll from '../controllers/serie/listAll.js';
import create from '../controllers/serie/create.js';
import update from '../controllers/serie/update.js';
import remove from '../controllers/serie/remove.js';
import auth from '../middlewares/auth.js'

const router = express.Router();
router.use(auth)

router.get('/:userID', listAll);
router.get('/:id/:userID', getById);
router.post('/', create);
router.put('/:id/:userID', update);
router.delete('/:id/:userID', remove);

export default router;