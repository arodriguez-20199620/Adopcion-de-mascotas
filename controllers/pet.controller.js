const Mascota = require('../models/mascota');

const mascotaGet = async (req, res) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, mascota] = await Promise.all([
        Mascota.countDocuments(query),
        Mascota.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.status(200).json({
        total,
        mascota
    });
}
const mascotaById = async (req, res) => {
    const { id } = req.params;
    const mascota = await Mascota.findOne({ _id: id });

    res.status(200).json({
        mascota
    });
}

const mascotaPost = async (req, res) => {
    const { nombre, raza, edad, sexo, tipo } = req.body;
    const mascota = new Mascota({ nombre, raza, edad, sexo, tipo });

    await mascota.save();
    res.status(200).json({
        mascota
    });
}

const mascotaDelete = async (req, res) => {
    const { id } = req.params;
    await Mascota.findByIdAndUpdate(id, { estado: false });

    const mascota = await Mascota.findOne({ _id: id });

    res.status(200).json({
        msg: 'Usuario eliminado exitosamente',
        mascota
    });
}

const mascotaPut = async (req, res) => {
    const { id } = req.params;
    const { _id, estado, ...resto } = req.body;

    await Mascota.findByIdAndUpdate(id, resto);

    const mascota = await Mascota.findOne({ _id: id });

    res.status(200).json({
        msg: 'Usuario Actualizado exitosamente',
        mascota
    })
}

module.exports = {
    mascotaGet,
    mascotaById,
    mascotaPost,
    mascotaDelete,
    mascotaPut,
}