const { EntitySchema } = require("typeorm");

const BookingEntity = new EntitySchema({
  // Functionmembuat table
  name: "Booking",
  tableName: "booking", // nama table di database
  columns: {
    //Membuat Kolom di database sesuai dengan isi object (columns)
    id: {
      //Nama kolom
      primary: true, //primary key kolom
      type: "int", // type data
      generated: true, // auto increment damn otomatis terisi
    },
    user_id: {
      type: "int",
    },
    lapangan_id: {
      type: "int",
    },
    duration: {
      type: "int",
    },
    payment_status: {
      type: "boolean",
      default: false,
      //ketika inputan dari user tidak ada,
      //maka dia akan terisi secara otomatis sesuai dengan nilai defaulnya
    },
    total_price: {
      type: "int",
    },
    order_date: {
      type: "timestamp", //ex. 2025-02-04T17:00:00.000Z
    },
    // Wajib ada
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
    user: {
      //penamaan relasi dari table booking ke user
      type: "many-to-one", // tipe relasi ex. one to one , one to many, many to one
      target: "User", //ambil dari nama table entity name
      cascade: true, // fitur yang menghapus baris,
      //ketika data ini di hapus (hard delete) maka data yg berelasi akan di hapus
      joinColumn: { name: "user_id" },
      //sebagai kolom referensi / acuan di table tersebut untuk menyamakan dengan id table tujuan
    },
    lapangan: {
      type: "many-to-one",
      target: "Lapangan",
      cascade: true,
      joinColumn: { name: "lapangan_id" },
    },
  },
});

module.exports = { BookingEntity };
