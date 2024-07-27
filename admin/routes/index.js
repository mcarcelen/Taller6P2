var express = require('express');
var router = express.Router();
const axios = require('axios');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/photos/save', async function (req, res, next) {
  let { title, description, rate } = req.body
  const URL = 'http://localhost:4444/rest/fotos/save'
  let data = {
    titulo: title,
    descripcion: description,
    calificacion: rate,
    ruta: ''
  }
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  const response = await axios.post(URL, data, config);
  if (response.status == '200' &&
    response.statusText == 'OK') {
    res.redirect('/fotos/findAll/view')
  } else {
    res.redirect('/')
  }
});

router.post('/photos/update', async function (req, res, next) {
  let { title, description, rate } = req.body
  const URL = 'http://localhost:4444/rest/fotos/update'
  let data = {
    titulo: title,
    descripcion: description,
    calificacion: rate,
    ruta: ''
  }
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  const response = await axios.put(URL, data, config);
  if (response.status == '200' &&
    response.statusText == 'OK') {
    res.redirect('/fotos/findAll/view')
  } else {
    res.redirect('/')
  }
});

router.post('/photos/delete', async function (req, res, next) {
  
    let { id } = req.body;
    const URL = `http://localhost:4444/rest/fotos/delete/${id}`;
    const config = {
      proxy: {
        host: 'localhost',
        port: 4444
      }
    }

  const response = await axios.delete(URL, config);
  if (response.status == '200' &&
    response.statusText == 'OK') {
    res.redirect('/fotos/findAll/view')
  } else {
    res.redirect('/')
  }
  });

module.exports = router;
