class ProductService {
  constructor(
    logger,
    productRepository,
    productCategoryRepository,
    transactor
  ) {
    this.productRepository = productRepository;
    this.productCategoryRepository = productCategoryRepository;
    this.logger = logger;
    this.transactor = transactor;
  }

  async create(data) {
    const op = "services.product.create";
    const message = { op: op };
    this.logger.info("", message);

    const product = await this.transactor.runInTransaction(async () => {
      const product = await this.productRepository.create(data);

      for (const category of data.categories) {
        await this.productCategoryRepository.create(
          product,
          category.categoryId
        );
      }

      return product;
    });

    return product;
  }

  async getAll() {
    const op = "services.product.getAll";
    const message = { op: op };
    this.logger.info("", message);

    const products = await this.productRepository.getAll();
    return products;
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

    const { categories } = data;
    const product = await this.transactor.runInTransaction(async () => {
      // Find the existing product and its categories
      let product = await this.productRepository.getById(id);
      if (!product) {
        throw new Error(`Product with ID ${id} not found`);
      }

      const existingCategories = product.categories;

      // Compare request categories with existing ones
      for (const category of categories) {
        const existingCategory = existingCategories.find(
          (record) => record.categoryId === category.categoryId
        );

        // If category is new, add it
        if (!existingCategory) {
          await this.productCategoryRepository.create(id, category.categoryId);
        }
      }

      // Mark categories for deletion
      const toDelete = [];

      existingCategories.forEach((existingCategory) => {
        if (
          !categories.find(
            (category) => category.categoryId === existingCategory.categoryId
          )
        ) {
          toDelete.push(existingCategory.categoryId);
        }
      });

      // Delete categories not present in the request
      for (const categoryId of toDelete) {
        await this.productCategoryRepository.delete(id, categoryId);
      }

      product = await this.productRepository.update(id, data);
      return product;
    });

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
