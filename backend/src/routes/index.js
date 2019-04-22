import express from 'express';
import * as userController from '../controllers/userController';
import * as doctorController from '../controllers/doctorController';
import validate from '../handlers/validation';
import { SaveUser } from '../middlewares/validators';
import isLoggedIn from '../middlewares/auth';

const router = express.Router();

router.get('/', (req, res) => {
    res.json({message: 'أهلًا بالعالم'});
});

// User Routes
router.post('/account/signup', validate(SaveUser), userController.register);
router.post('/account/signin', userController.login);
router.get('/account/me', isLoggedIn, userController.me);
router.get('/account/profile', isLoggedIn, userController.getProfile);

// Doctor Routes
router.get('/doctors', doctorController.index);

export default router;