import express from 'express';

import getById from '../controllers/game/getById.js';
import listAll from '../controllers/game/listAll.js';
import create from '../controllers/game/create.js';
import update from '../controllers/game/update.js';
import remove from '../controllers/game/remove.js';
import auth from '../middlewares/auth.js'

const router = express.Router();
router.use(auth)

router.get('/:userID', listAll);
router.get('/:id/:userID', getById);
router.post('/', create);
router.put('/:id/:userID', update);
router.delete('/:id/:userID', remove);

export default router;