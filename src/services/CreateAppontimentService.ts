/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface RequestDTO {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService {
  public async execute({
    date,
    provider_id,
  }: RequestDTO): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentsRepository);
    const dateFormated = startOfHour(date);

    const findAppointmentInSameDate = await appointmentRepository.findDate(
      dateFormated,
    );

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: dateFormated,
    });
    appointmentRepository.save(appointment);
    return appointment;
  }
}
export default CreateAppointmentService;
