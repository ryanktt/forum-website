const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const requestIp = require('request-ip');
const { check, validationResult} = require('express-validator');

const router = express.Router();

// @route    POST /
// @desc     Register user
// @access   Public
router.post('/auth/signup',
check('name', 'Nome é obrigatório').notEmpty(),
check('email', 'Por favor digite um email válido').isEmail(),
check('password', 'Por favor digite uma senha com 6 ou mais caracteres').isLength({min: 6}),
async (req, res) => {
  const ip = requestIp.getClientIp(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
      name,
      email,
      password, 
      password2
  } = req.body;


  if(password !== password2) {
    res.json({errors: [{msg: 'Senhas não coincidem.'}]})
  }
  try {
    let user =  await User.findOne({email: email})

    if(user) {
      return res.json({errors: [{msg: 'Usuário já existe'}]})
    }
    user = new User({name, email, password, ip});

    const salt =  await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword

    await user.save();
    
    const payload = {
        user: {
          id: user.id
        }
    }

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
    );
  } catch(err) {
    console.error(err);
    res.status(500).send('Server error')
  }
  
})

// @route    POST /
// @desc     Login user
// @access   Public
router.post('/auth/login',
check('email', 'Por favor digite um email válido').isEmail(),
check('password', 'Senha é obrigatório').exists(),
async (req, res) => {
  
    const ip = requestIp.getClientIp(req);
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    const {
        email,
        password
    } = req.body

    try {
        const user = await User.findOne({email})
        if(!user ) {
          return res.json({errors:[{msg: 'Credenciais Inválidas'}]});
        }

        const passwordMatch  =  await bcrypt.compare(password, user.password);

        if(!passwordMatch ) { 
          return res.status(400).json({errors:[{msg: 'Credenciais Inválidas'}]});
        }

        const payload = {
            user: {
              id: user.id
            }
        }
        jwt.sign(
            payload, 
            process.env.JWT_SECRET,
            { expiresIn: '5 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            })
        console.log('success')
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
    
    
})


module.exports = router;