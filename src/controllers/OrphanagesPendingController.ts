import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import OrphanagesView from '../views/orphanages_view';

const orphanagesView = new OrphanagesView();

class OrphanagesPendingController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOne({
      where: { id, pending: true },
      relations: ['images'],
    });

    if (!orphanage) {
      return response.status(404).json({
        status: 'error',
        message: 'Orfanato não encontrado.'
      });
    }

    return response.json(orphanagesView.render(orphanage));
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      where: { pending: true },
      relations: ['images']
    });

    return response.json(orphanagesView.renderMany(orphanages));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      name,
      latitude,
      longitude,
      about,
      whatsapp,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const data = {
      name,
      latitude,
      longitude,
      about,
      whatsapp,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      pending: false,
    };

    // const schema = Yup.object().shape({
    //   name: Yup.string().required(),
    //   latitude: Yup.number().required(),
    //   longitude: Yup.number().required(),
    //   whatsapp: Yup.string().required(),
    //   about: Yup.string().required().max(300),
    //   instructions: Yup.string().required(),
    //   opening_hours: Yup.string().required(),
    //   open_on_weekends: Yup.boolean().required(),
    //   pending: Yup.boolean().required(),
    // });

    // try {
    //   await schema.validate(data, { abortEarly: false });
    // } catch(err) {
    //   return response.json({
    //     status: 'error',
    //     message: err.message,
    //   })
    // }

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOne({
      where: { id: request.params.id, pending: true },
    });

    if (!orphanage) {
      return response.status(404).json({
        status: 'error',
        message: 'Orfanato não encontrado',
      });
    }

    Object.assign(orphanage, data);

    const updated = await orphanagesRepository.save(orphanage);

    console.log(updated);

    return response.status(204).send();
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOne({
      where: { id, pending: true },
    });

    if (!orphanage) {
      return response.status(404).json({
        status: 'error',
        message: 'Orfanato não encontrado',
      });
    }

    await orphanagesRepository.delete(orphanage);

    return response.status(204).send();
  }

}

export default OrphanagesPendingController;
