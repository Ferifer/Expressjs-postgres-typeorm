const { getRepository, Like } = require("typeorm");
const User = require("../entity/user.entity");
const AppDataSource = require("../data-source");
const { hashPassword } = require("../utils/auth");
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
    const { name, password, email, address } = user;
    // Hash the password
    const hashedPassword = await hashPassword(password);
    const newUser = userRepository.create({
      name,
      password: hashedPassword,
      email,
      address,
    });
    await userRepository.save(newUser);
    return newUser;
  }

  async update(id, user) {
    return await userRepository.update(id, user);
  }

  async delete(id) {
    return await userRepository.softDelete(id);
  }

  async login(username, password) {
    const user = await userRepository.findOne({
      where: { name: username, password: password },
    });
    return user;
  }

  async findByEmail(email) {
    const user = await userRepository.findOne({
      where: { email: `%${email}%` },
    });
    return user;
  }
}

module.exports = UserRepository;
