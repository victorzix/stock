import { IProduct, ProductInstance } from "../../src/@types/IProduct";
import { createProductSchema, validateData } from "../../src/utils/validators";
import { describe, expect, it } from "@jest/globals";

describe("Product validation", () => {
  

  it("should validate a product", async () => {
    const data: IProduct = {
      name: "Test Product",
      sector: "1",
      price: 11,
      quantity: 11,
    };

    const validation = await validateData(createProductSchema, data);

    expect(validation.data).toEqual(data);
    expect(validation.errors).toHaveLength(0);
    expect(validation.error).toBe(false);
  });

  it("should not allow extra fields from input data", async () => {
    const data = {
      name: "Test Product",
      sector: "1",
      price: 11,
      quantity: 11,
      local: "Rio de Janeiro"
    };

    const validation = await validateData(createProductSchema, data);

    expect(validation.data).not.toHaveProperty('local');
  }) 

  it("should not accept wrong data type", async () => {
    const data = {
      name: 16,
      sector: 1,
      price: "11",
      quantity: "11"
    };

    const validation = await validateData(createProductSchema, data as any);

    expect(validation.error).toBe(true)
  })
});
