import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { plainToClass } from 'class-transformer';
import { User } from '../../users/entities/user.entity';
import { RoleEnum } from '../../roles/roles.enum';
import { StatusEnum } from '../../statuses/statuses.enum';

export default class CreateAdmin implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    const countAdmin = await connection
      .createQueryBuilder()
      .select()
      .from(User, 'User')
      .where('"User"."roleId" = :roleId', { roleId: RoleEnum.admin })
      .getCount();

    if (countAdmin === 0) {
      await connection
        .createQueryBuilder()
        .insert()
        .into(User)
        .values([
          plainToClass(User, {
            firstName: 'Super',
            lastName: 'Admin',
            email: 'admin@example.com',
            password: 'secret',
            role: {
              id: RoleEnum.admin,
              name: 'Admin',
            },
            status: {
              id: StatusEnum.active,
              name: 'Active',
            },
          }),
        ])
        .execute();
    }
  }
}
