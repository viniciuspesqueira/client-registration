const express = require('express');
const router = express.Router();
const db = require('../db');

const UFS = [
  "AC",
  "AL",
  "AP",
  "AM",
  "BA",
  "CE",
  "DF",
  "ES",
  "GO",
  "MA",
  "MT",
  "MS",
  "MG",
  "PA",
  "PB",
  "PR",
  "PE",
  "PI",
  "RJ",
  "RN",
  "RS",
  "RO",
  "RR",
  "SC",
  "SP",
  "SE",
  "TO",
]

function parseClient(body) {
  const errors = []
  const name = (body.name ?? "").trim()
  const age = body.age === "" || body.age == null ? null : Number(body.age)

  if (name.length < 2 || name.length > 120)
    errors.push("Nome deve ter entre 2 e 120 caracteres.")
  if (age !== null && (!Number.isInteger(age) || age < 0 || age > 130))
    errors.push("Idade inválida.")
  if (!UFS.includes(body.UF)) errors.push("UF inválida.")

  return { errors, data: { name, age, UF: body.UF } }
}

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const docs = await db.selectClients();
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
  const idclient = Number(req.params.idclient);
  if (!Number.isInteger(idclient)) return res.redirect("/?erro=1")
  try {
    const result = await db.selectClient(idclient);
    res.render('new', {title: 'Client Edition', result,action: '/edit/' + idclient});
  }
  catch(error) {
    res.redirect('/?erro=1');
  }
});

// POST new page
router.post('/new', async (req, res) => {
  const { errors, data } = parseClient(req.body);

  if (errors.length > 0) {
    res.render('new', { title: 'New Client', result: req.body, action: "/new", errors });
    return;
  }

  try {
    await db.insertClient(data);
    res.redirect('/?new=true');
  }
  catch(error) {
    console.error("Falha ao inserir cliente:", error)
    res.redirect("/?erro=1")
  }
});

// POST edit page
router.post('/edit/:idclient', async (req, res) => {
  const idclient = Number(req.params.idclient);
  if (!Number.isInteger(idclient)) return res.redirect("/?erro=1")
  const { errors, data } = parseClient(req.body);

  if (errors.length > 0) {
    res.render('new', { title: 'Client Edition', result: req.body, action: "/edit/" + req.params.idclient, errors });
    return;
  }

  try {
    await db.updateClient(idclient, data);
    res.redirect('/?edit=true');
  } catch(error) {
    console.error("Falha ao editar cliente:", error)
    res.redirect("/?erro=1")
  }
})

// POST delete page
router.post('/delete/:idclient', async (req, res) => {
  const idclient = Number(req.params.idclient);
  if (!Number.isInteger(idclient)) return res.redirect("/?erro=1")

  try {
    await db.deleteClient(idclient);
    res.redirect('/?delete=true');
  }
  catch(error) {
    console.error("Falha ao excluir cliente:", error)
    res.redirect('/?erro=1');
  }
})

module.exports = router;
