import { createProductSchema, validateData } from "../../src/utils/validators";
import { describe, expect, it } from "@jest/globals";
import { IProduct } from "../../src/@types/IProduct";

describe("Product validation", () => {
  const data = {
    id: "123",
    name: "Test Product",
    sector: "1",
    price: 11,
    quantity: 11,
  };
  it("should return a object with data, error and errors", async () => {
    const validation = await validateData<IProduct>(createProductSchema, data);

    try {
      expect(validation.data).toEqual(data);
	  expect(validation.errors).toBe('array')
      expect(validation.error).toBe('false');
    } catch (e) {
      expect(validation.error).toBeTruthy();
    }
  });
});
