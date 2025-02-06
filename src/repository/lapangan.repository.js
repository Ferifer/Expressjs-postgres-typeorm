const { getRepository } = require("typeorm");
const Lapangan = require("../entity/lapangan.entity");
const AppDataSource = require("../data-source");
const lapanganRepository = AppDataSource.getRepository(Lapangan.LapanganEntity);
class LapanganRepository {
  async findAll() {
    const lapangans = await lapanganRepository.find();
    return lapangans;
  }

  async findById(id) {
    const lapangan = await lapanganRepository.findOneBy({ id });
    return lapangan;
  }

  async create(lapangan) {
    const { name, price, type, address } = lapangan;
    const newLapangan = lapanganRepository.create({
      name,
      price,
      type,
      address,
    });
    await lapanganRepository.save(newLapangan);
    return newLapangan;
  }

  async update(id, lapangan) {
    return await lapanganRepository.update(id, lapangan);
  }

  async delete(id) {
    return await lapanganRepository.softDelete(id);
  }
}

module.exports = LapanganRepository;
