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
router.post('/signup',
check('name', 'Nome é Obrigatório').notEmpty().exists().isLength({min: 3}),
check('name', 'Nome Excede o Limite de Caracteres').isLength({max: 25}),
check('email', 'Por Favor Digite um Email Válido').isEmail(),
check('password', 'Por Favor Digite uma Senha com 6 ou Mais Caracteres').isLength({min: 6}),
async (req, res) => {
  const ip = requestIp.getClientIp(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
      name,
      email,
      password
  } = req.body;

  let iChars = "!@#$%^&*()+=-[]\\\';,./{}|\":<>?";
  let iCharsEmail = "!#$%^&*()+=-[]\\\';,/{}|\":<>?";

  if(name.includes(' ')) {
    res.status(400).json({errors:[{msg: "Campos Não Devem Conter Espaços"}]});
  }

  for (var i = 0; i < name.length; i++) {
      if (iChars.indexOf(name.charAt(i)) != -1) {
          return res.status(400).json({errors:[{msg: "Caracteres Inválidos"}]});
      }
  }
  for (var i = 0; i < email.length; i++) {
    if (iCharsEmail.indexOf(email.charAt(i)) != -1) {
        return res.status(400).json({errors:[{msg: "Caracteres Inválidos"}]});
    }
}
  try {

    let user =  await User.findOne({$or:[ 
      {email}, {name} 
    ]})

    if(user) {
      return res.status(400).json({errors: [{msg: 'Usuário já Existe'}]})
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
router.post('/login',
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
        const user = await User.findOne({email});
        if(!user ) {
          return res.status(400).json({errors:[{msg: 'Credenciais Inválidas'}]});
        }
        await User.updateOne({email}, {ip});

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
            { expiresIn: '15 days' },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            })
    } catch (err) {
        console.error(err);
        res.status(500).send('Erro de Servidor');
    }
    
    
})


module.exports = router;