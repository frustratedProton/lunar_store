import express from "express";

const router = express.Router();

router.get('/sign-up', signUp);
router.get('sign-in', signIn);

export default router;