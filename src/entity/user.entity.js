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
    password: {
      type: "varchar",
      nullable: true,
    },
    access_token: {
      type: "varchar",
      nullable: true,
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
      deleteDate: true,
      nullable: true,
    },
  },
  relations: {
    bookings: {
      type: "one-to-many",
      target: "Booking",
    },
  },
});

module.exports = { UserEntity };
