const { EntitySchema } = require("typeorm");

const LapanganEntity = new EntitySchema({
  name: "Lapangan",
  tableName: "lapangan",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    name: {
      type: "varchar",
    },
    address: {
      type: "varchar",
    },
    type: {
      type: "enum",
      enum: ["mini", "medium", "large"],
      default: "mini",
    },
    price: {
      type: "integer",
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

module.exports = { LapanganEntity };
