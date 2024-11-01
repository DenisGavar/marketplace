class ProductService {
  constructor(logger, productRepository) {
    this.productRepository = productRepository;
    this.logger = logger;
  }

  async create(data) {
    const op = "services.product.create";
    const message = { op: op };
    this.logger.info("", message);

    const product = await this.productRepository.create(data);
    return product;
  }

  async getAll() {
    const op = "services.product.getAll";
    const message = { op: op };
    this.logger.info("", message);

    const categories = await this.productRepository.getAll();
    return categories;
  }

  async getById(id) {
    const op = "services.product.getById";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const product = await this.productRepository.getById(id);
    return product;
  }

  async update(id, data) {
    const op = "services.product.update";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const product = await this.productRepository.update(id, data);
    return product;
  }

  async delete(id) {
    const op = "services.product.delete";
    const message = { op: op, id: id };
    this.logger.info("", message);

    const product = await this.productRepository.delete(id);
    return product;
  }
}

module.exports = ProductService;
