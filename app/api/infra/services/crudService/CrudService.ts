import { supabase } from "@/app/api/infra/createClient";

export class CrudService<
  T extends Record<string, any>,
  C extends Record<string, any> = Partial<T>,
  U extends Record<string, any> = Partial<T>,
> {
  constructor(protected readonly tableName: string) {}

  async create(data: C): Promise<T> {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .insert([data])
      .select()
      .single();

    if (error) {
      console.error(
        `[CrudService][${this.tableName}] Create Error:`,
        error.message,
      );
      throw new Error(
        `Failed to create record in ${this.tableName}: ${error.message}`,
      );
    }

    return result as T;
  }

  async update(id: string, data: U): Promise<T> {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .update(data)
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error(
        `[CrudService][${this.tableName}] Update Error:`,
        error.message,
      );
      throw new Error(
        `Failed to update record with id ${id} in ${this.tableName}: ${error.message}`,
      );
    }

    if (!result) {
      throw new Error(`Record with id ${id} not found in ${this.tableName}`);
    }

    return result as T;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase.from(this.tableName).delete().eq("id", id);

    if (error) {
      console.error(
        `[CrudService][${this.tableName}] Delete Error:`,
        error.message,
      );
      throw new Error(
        `Failed to delete record with id ${id} from ${this.tableName}: ${error.message}`,
      );
    }
  }

  async findById(id: string): Promise<T | null> {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .select()
      .eq("id", id)
      .single();

    if (error && error.code !== "PGRST116") {
      // PGRST116 is the PostgREST error code for a single row not found.
      console.error(
        `[CrudService][${this.tableName}] FindById Error:`,
        error.message,
      );
      throw new Error(
        `Error fetching record with id ${id} from ${this.tableName}: ${error.message}`,
      );
    }

    return result ? (result as T) : null;
  }

  async findAll(): Promise<T[]> {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .select();

    if (error) {
      console.error(
        `[CrudService][${this.tableName}] FindAll Error:`,
        error.message,
      );
      throw new Error(
        `Error fetching records from ${this.tableName}: ${error.message}`,
      );
    }

    return (result || []) as T[];
  }

  async findByName(name: string): Promise<T[]> {
    const { data: result, error } = await supabase
      .from(this.tableName)
      .select()
      .eq("name", name);

    if (error) {
      console.error(
        `[CrudService][${this.tableName}] FindByName Error:`,
        error.message,
      );
      throw new Error(
        `Error fetching records sorted by name ${name} from ${this.tableName}: ${error.message}`,
      );
    }

    return (result || []) as T[];
  }
}
