const { getRepository, Like } = require("typeorm");
const User = require("../entity/user.entity");
const AppDataSource = require("../data-source");
const userRepository = AppDataSource.getRepository(User.UserEntity);
class UserRepository {
  async findAll(dto) {
    const whereConditions = {};

    if (dto.name) {
      whereConditions.name = Like(`%${dto.name}%`);
    }

    if (dto.address) {
      whereConditions.address = Like(`%${dto.address}%`);
    }

    if (dto.type) {
      whereConditions.type = dto.type;
    }

    if (dto.email) {
      whereConditions.email = Like(`%${dto.email}%`);
    }

    const users = await userRepository.find({ where: whereConditions });
    return users;
  }

  async findById(id) {
    const user = await userRepository.findOneBy({ id });
    return user;
  }

  async create(user) {
    const { name, email, address } = user;
    const newUser = userRepository.create({ name, email, address });
    await userRepository.save(newUser);
    return newUser;
  }

  async update(id, user) {
    return await userRepository.update(id, user);
  }

  async delete(id) {
    return await userRepository.softDelete(id);
  }
}

module.exports = UserRepository;
