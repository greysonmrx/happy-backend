import Orphanage from '../models/Orphanage';
import ImagesView from './images_view';

class OrphanagesView {
  public render(orphanage: Orphanage) {
    const imagesView = new ImagesView();

    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      whatsapp: orphanage.whatsapp,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      images: imagesView.renderMany(orphanage.images),
    };
  }

  public renderMany(orphanages: Array<Orphanage>) {
    return orphanages.map(orphanage => this.render(orphanage));
  }
}

export default OrphanagesView;
