// Mengambil / import data table yg telah di buat
//dynamic path
const Booking = require("../entity/booking.entity");
const Lapangan = require("../entity/lapangan.entity");
// Memulai koneksi ke database
const AppDataSource = require("../data-source");
const bookingRepository = AppDataSource.getRepository(Booking.BookingEntity);
const lapanganRepository = AppDataSource.getRepository(Lapangan.LapanganEntity);

class BookingRepository {
  async findAll(dto) {
    // find sama saja dengan query (select * from )
    const booking = await bookingRepository.find();
    if (dto.username) {
      //logic booking where
    }
    //ketika return/mengembalikan data jika tidak membutuhkan custom response bisa langsung return booking
    const data = booking.map((item) => {
      return {
        // item / apapun itu aliasing nama berisi object data booking
        id: item.id,
        user_id: item.user_id,
        lapangan_id: item.lapangan_id,
        duration: item.duration,
        // case payment status menggunakan ternary
        // kondisi:
        // jika terpenuhi / sama maka kasih value yg di inginkan setelah tanda '?'
        // jika tidak maka kasih value yg di inginkan setelah tanda ':'
        payment_status: item.payment_status === true ? "paid" : "unpaid",
        total_price: item.total_price,
        order_date: item.order_date,
      };
    });
    return data;
  }

  async findById(id) {
    //ketika pakai findone maka hasil nya itu berbentuk object '{}'
    const booking = await bookingRepository.findOne({
      // where adalah kondisi
      where: { id: id },
      // Jika Relations maka bisa panggil nama dari relasi di table yang telah kita buat
      //relations: {
      //   user: { //ambil name dari sini
      //   },
      // },
      relations: {
        user: true,
        lapangan: true,
      },
    });
    const data = {
      id: booking.id,
      username: booking.user.name,
      nama_lapangan: booking.lapangan.name,
      alamat_lapangan: booking.lapangan.address,
      type_lapangan: booking.lapangan.type,
      duration: booking.duration,
      payment_status: booking.payment_status === true ? "paid" : "unpaid",
      total_price: booking.total_price,
      order_date: booking.order_date,
      // created_at: "2025-02-04T23:09:50.730Z",
      // updated_at: "2025-02-04T23:09:50.730Z",
      // deleted_at: null,
      // user: {
      //   id: 6,
      //   name: "nana",
      //   email: "yusa@mail.com",
      //   address: "karangpucung",
      //   type: "general",
      //   created_at: "2025-02-04T23:07:47.659Z",
      //   updated_at: "2025-02-04T23:07:47.659Z",
      //   deleted_at: null,
      // },
      // lapangan: {
      //   id: 2,
      //   name: "lapangan 1",
      //   address: "Karangklesem",
      //   type: "mini",
      //   price: 100000,
      //   created_at: "2025-02-04T22:55:45.713Z",
      //   updated_at: "2025-02-04T22:55:45.713Z",
      //   deleted_at: null,
      // },
    };
    // return booking;
    return data;
  }

  async create(dataBooking) {
    const { user_id, lapangan_id, duration, order_date } = dataBooking;
    const dataLapangan = await lapanganRepository.findOneBy({
      id: lapangan_id,
    });
    let paymentStatus = false;
    if (dataBooking.payment_status === true) {
      paymentStatus = true;
    }
    const totalPrice = parseInt(dataLapangan.price) * parseInt(duration);
    const newData = bookingRepository.create({
      user_id,
      lapangan_id,
      duration,
      payment_status: paymentStatus,
      total_price: totalPrice,
      order_date,
    });
    await bookingRepository.save(newData);
    return newData;
  }

  async update(id, user) {
    return await userRepository.update(id, user);
  }

  async delete(id) {
    return await userRepository.softDelete(id);
  }
}

module.exports = BookingRepository;
