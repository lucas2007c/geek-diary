import express from 'express';

import getById from '../controllers/user/getById.js';
import listAll from '../controllers/user/listAll.js';
import create from '../controllers/user/create.js';
import update from '../controllers/user/update.js';
import remove from '../controllers/user/remove.js';
import auth from '../middlewares/auth.js'

const router = express.Router();

router.get('/', auth, listAll);
router.get('/:id', auth, getById);
router.post('/', create);
router.put('/:id', auth, update);
router.delete('/:id', auth, remove);

export default router;