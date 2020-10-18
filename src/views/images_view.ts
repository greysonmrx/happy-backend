import Image from '../models/Image';

class ImagesView {
  public render(image: Image) {
    return {
      id: image.id,
      url: `http://192.168.100.52:5000/uploads/${image.path}`,
    }
  }

  public renderMany(images: Array<Image>) {
    return images.map(image => this.render(image));
  }
}

export default ImagesView;
