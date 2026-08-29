const express = require('express');
const router = express.Router();
const db = require('../db');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await db.selectClients();
    console.log(docs);
    res.render('index', {docs});
    console.log("Index renderizado!");
  }
  catch(error) {
    next(error);
  }
});

// GET new page
router.get('/new', (req, res, next) => {
  res.render('new', { title: 'New Client', result: {}, action: "/new"});
})

router.get('/edit/:idclient', async(req, res) => {
  const idclient = parseInt(req.params.idclient);
  try {
    const result = await db.selectClient(idclient);
    res.render('new', {title: 'Client Edition', result,action: '/edit/' + idclient});
  }
  catch(error) {
    res.redirect('/?erro=' + error);
  }
});

router.post('/new', async (req, res) => {
  const name = req.body.name;
  const age =! req.body.age ? null:
  parseInt(req.body.age);
  const UF = req.body.UF;
  try {
    await db.insertClient({name, age, UF});
    res.redirect('/?new=true');
  }
  catch(error) {
    res.redirect('/?erro=' + error);
  }
});

// POST edit page
router.post('/edit/:idclient', async (req, res) => {
  const idclient = parseInt(req.params.idclient);
  const name = req.body.name;
  const age =! req.body.age ? null : parseInt(req.body.age);
  const UF = req.body.UF;

  try {
    await db.updateClient(idclient, {name, age, UF});
    res.redirect('/?edit=true');
  } catch(error) {
    res.redirect('/?erro=' + error);
  }
})

// GET delete page
router.get('/delete/:idclient', async (req, res) => {
  const idclient = parseInt(req.params.idclient);
  try {
    await db.deleteClient(idclient);
    res.redirect('/?delete=true');
  }
  catch(error) {
    res.redirect('/?erro=' + error);
  }
})

module.exports = router;
