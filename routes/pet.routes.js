const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const { existeMascotaById } = require('../helpers/db-validators');
const { mascotaGet, mascotaById, mascotaPost, mascotaDelete, mascotaPut } = require('../controllers/pet.controller');
const router = Router();

router.get("/", mascotaGet);

router.get(
    "/:id",
    [
        check("id","El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotaById);


router.post(
    "/",
    [
        check("nombre", "El nombre es obligatorio").not().isEmpty(),
        check("raza", "Debe de indicar la raza de la mascota obligatoriamente").not().isEmpty(),
        check("edad", "La edad debe ser obligatoria y debe ser un número").not().isEmpty().isNumeric(),
        check("sexo", "Indique el genero de la mascota").not().isEmpty(),
        check("tipo", "Indique el tipo de mascota sea un perro o gato").not().isEmpty(),
        validarCampos,
    ], mascotaPost);

router.delete(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotaDelete);

router.put(
    "/:id",
    [
        check("id", "El id no es un formato válido de MongoDB").isMongoId(),
        check("id").custom(existeMascotaById),
        validarCampos
    ], mascotaPut);
module.exports = router;