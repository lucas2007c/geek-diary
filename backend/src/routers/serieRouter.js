import express from 'express';

import getById from '../controllers/serie/getById.js';
import listAll from '../controllers/serie/listAll.js';
import create from '../controllers/serie/create.js';
import update from '../controllers/serie/update.js';
import remove from '../controllers/serie/remove.js';

const router = express.Router();

router.get('/', listAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;