var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Foto = require('../models').foto;

router.get('/findAll/json',
    function (req, res, next) {
        Foto.findAll({
            attributes: {
                exclude:
                    ["updatedAt"]
            }
        })
            .then(fotos => {
                res.json(fotos);
            })
            .catch(error =>
                res.status(400).send(error))
    });

router.get('/findAll/view', function (req, res, next) {
    Foto.findAll({
        attributes: { exclude: ["updatedAt"] }
    })
        .then(fotos => {
            res.render('fotos', { title: 'Fotos', arrFotos: fotos });
        })
        .catch(error => res.status(400).send(error))
});

router.get('/photos/add', function (req, res, next) {
    res.render('agregarFoto', { title: 'Express' });
});

router.get('/photos/edit', function (req, res, next) {
    res.render('editarFoto', { title: 'Express' });
});

router.get('/photos/edit/:id', async function (req, res, next) {
    const photoId = req.params.id;
    const URL = `http://localhost:4444/rest/fotos/findById/${photoId}/json`;
  
    try {
      const response = await axios.get(URL);
      const photo = response.data;
  
      // Render the form with the current photo details
      res.render('editPhoto', {
        id: photoId, // Pass the ID to the view
        title: photo.titulo,
        description: photo.descripcion,
        rate: photo.calificacion,
      });
    } catch (error) {
      console.error('Error fetching photo:', error.message);
      res.redirect('/');
    }
  });

router.get('/photos/delete', function (req, res, next) {
    res.render('eliminarFoto', { title: 'Express' });
});
module.exports = router;
