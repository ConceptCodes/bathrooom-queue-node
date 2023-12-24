import { db } from "@lib/db";
import { Bathroom, bathroomTable, NewBathroom } from "@lib/db/schema";
import { eq } from "drizzle-orm";
import {
  CreateEntityError,
  DeleteEntityError,
  GetAllEntitiesError,
  GetEntityByIdError,
  InternalError,
  UpdateEntityError,
} from "@/exceptions";

export default class BathroomService {
  public async getAll(): Promise<Bathroom[]> {
    try {
      const bathrooms = await db.select().from(bathroomTable);
      return bathrooms;
    } catch (error) {
      // @ts-expect-error
      throw new GetAllEntitiesError(error.message);
    }
  }

  public async getById(id: Bathroom["id"]): Promise<Bathroom> {
    try {
      const bathroom = await db
        .select()
        .from(bathroomTable)
        .where(eq(bathroomTable.id, id));

      if (bathroom.length === 0) {
        throw new GetEntityByIdError(`Bathroom with id ${id} does not exist.`);
      }

      return bathroom[0];
    } catch (error) {
      if (error instanceof GetEntityByIdError) throw error;
      throw new InternalError(`Unable to get bathroom with id ${id}`);
    }
  }

  public async create(data: NewBathroom): Promise<undefined> {
    try {
      await db.insert(bathroomTable).values(data);
      return undefined;
    } catch (error) {
      // @ts-expect-error
      throw new CreateEntityError(error.message);
    }
  }

  public async update(
    id: Bathroom["id"],
    data: Partial<Bathroom>
  ): Promise<Bathroom> {
    try {
      const bathroom = await db
        .update(bathroomTable)
        .set(data)
        .where(eq(bathroomTable.id, id));

      return bathroom[0];
    } catch (error) {
      // @ts-expect-error
      throw new UpdateEntityError(error.message);
    }
  }

  public async delete(id: Bathroom["id"]): Promise<undefined> {
    try {
      await db.delete(bathroomTable).where(eq(bathroomTable.id, id));
      return undefined;
    } catch (error) {
      // @ts-expect-error
      throw new DeleteEntityError(error.message);
    }
  }
}
