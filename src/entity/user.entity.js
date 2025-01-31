const { EntitySchema } = require("typeorm");

const UserEntity = new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    email: {
      type: "varchar",
      unique: true,
    },
    address: {
      type: "varchar",
    },
    type: {
      type: "enum",
      enum: ["member", "general", "admin"],
      default: "general",
    },
    created_at: {
      type: "timestamp",
      createDate: true, // Otomatis terisi ketika insert/create data
    },
    updated_at: {
      type: "timestamp",
      updateDate: true, // Otomatis terisi/terupdate ketika update datanya
    },
    deleted_at: {
      type: "timestamp",
      nullable: true,
    },
  },
});

module.exports = { UserEntity };
