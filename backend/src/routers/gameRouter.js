import express from 'express';

import getById from '../controllers/game/getById.js';
import listAll from '../controllers/game/listAll.js';
import create from '../controllers/game/create.js';
import update from '../controllers/game/update.js';
import remove from '../controllers/game/remove.js';

const router = express.Router();

router.get('/', listAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;