import { Repository, EntityRepository } from 'typeorm';

import Appointment from '../infra/typeorm/entities/Appointment';

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment> {
  public async findDate(date: Date): Promise<Appointment | null> {
    const findeDateRepo = await this.findOne({
      where: { date },
    });
    return findeDateRepo || null;
  }
}

export default AppointmentRepository;
