class VendorService {
  constructor(logger, vendorRepository) {
    this.vendorRepository = vendorRepository;
    this.logger = logger;
  }

  async create(data) {
    const op = "services.vendor.create";
    const message = { op: op };
    this.logger.info("", message);

    const vendor = await this.vendorRepository.create(data);
    return vendor;
  }

  async getAll() {
    const op = "services.vendor.getAll";
    const message = { op: op };
    this.logger.info("", message);

    const vendors = await this.vendorRepository.getAll();
    return vendors;
  }

  async getById(id) {
    const op = "services.vendor.getById";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const vendor = await this.vendorRepository.getById(id);
    return vendor;
  }

  async update(id, data) {
    const op = "services.vendor.update";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const vendor = await this.vendorRepository.update(id, data);
    return vendor;
  }

  async delete(id) {
    const op = "services.vendor.delete";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const vendor = await this.vendorRepository.delete(id);
    return vendor;
  }
}

module.exports = VendorService;
