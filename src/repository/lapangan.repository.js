const { getRepository, In } = require("typeorm");
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

  // ========== BULK OPERATIONS ==========

  // Bulk Create with Transaction
  async bulkCreate(lapangans) {
    if (!Array.isArray(lapangans) || lapangans.length === 0) {
      throw new Error("Invalid input: Lapangans must be a non-empty array");
    }

    return await AppDataSource.transaction(async (manager) => {
      const repo = manager.getRepository(Lapangan.LapanganEntity);
      const newLapangans = lapangans.map(({ name, price, type, address }) => ({
        name,
        price,
        type,
        address,
      }));

      const insertedLapangans = await repo.insert(newLapangans);
      return insertedLapangans.identifiers;
    });
  }

  // Bulk Update with Transaction
  async bulkUpdate(lapangans) {
    if (!Array.isArray(lapangans) || lapangans.length === 0) {
      throw new Error("Invalid input: Lapangans must be a non-empty array");
    }

    return await AppDataSource.transaction(async (manager) => {
      const repo = manager.getRepository(Lapangan.LapanganEntity);
      const updatePromises = lapangans.map(
        ({ id, name, price, type, address }) =>
          repo.update(id, { name, price, type, address })
      );

      await Promise.all(updatePromises);
      return { message: "Bulk update successful" };
    });
  }

  // Bulk Delete with Soft Delete
  async bulkDelete(ids) {
    if (!Array.isArray(ids) || ids.length === 0) {
      throw new Error("Invalid input: IDs must be a non-empty array");
    }

    return await lapanganRepository.softDelete({ id: In(ids) });
  }
}

module.exports = LapanganRepository;
