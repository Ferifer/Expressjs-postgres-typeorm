// Mengambil / import data table yg telah di buat
//dynamic path
const Booking = require("../entity/booking.entity");
const Lapangan = require("../entity/lapangan.entity");
// Memulai koneksi ke database
const AppDataSource = require("../data-source");
const { Like } = require("typeorm");
const bookingRepository = AppDataSource.getRepository(Booking.BookingEntity);
const lapanganRepository = AppDataSource.getRepository(Lapangan.LapanganEntity);

class BookingRepository {
  async findAll(dto) {
    const whereConditions = {};
    if (dto.username) {
      // pilih nama relasinya kemudian pilih kolomnya
      whereConditions.user = { name: Like(`%${dto.username}%`) };
    }
    const bookings = await bookingRepository.find({
      relations: { user: true, lapangan: true },
      where: whereConditions,
    });
    return bookings.map((item) => ({
      id: item.id,
      user_id: item.user_id,
      username: item.user.name,
      lapangan_id: item.lapangan_id,
      nama_lapangan: item.lapangan.name,
      alamat_lapangan: item.lapangan.address,
      type_lapangan: item.lapangan.type,
      duration: item.duration,
      payment_status: item.payment_status ? "paid" : "unpaid",
      total_price: item.total_price,
      order_date: item.order_date,
    }));
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
