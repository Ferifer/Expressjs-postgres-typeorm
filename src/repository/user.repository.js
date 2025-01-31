const { getRepository } = require("typeorm");
const User = require("../entity/user.entity");
const AppDataSource = require("../data-source");
const userRepository = AppDataSource.getRepository(User.UserEntity);
class UserRepository {
  async findAll() {
    const users = await userRepository.find({ where: { deleted_at: null } });
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

  // async update(id, user) {
  //   return await getRepository(User).update(id, user);
  // }

  //   async delete(id) {
  //     return await getRepository(User).delete(id);
  //   }
}

module.exports = UserRepository;
