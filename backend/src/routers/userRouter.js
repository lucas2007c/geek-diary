import express from 'express';

import getById from '../controllers/user/getById.js';
import listAll from '../controllers/user/listAll.js';
import create from '../controllers/user/create.js';
import update from '../controllers/user/update.js';
import remove from '../controllers/user/remove.js';
import auth from '../middlewares/auth.js'

const router = express.Router();
router.use('/', auth)

router.get('/', listAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', update);
router.delete('/:id', remove);

export default router;