import * as FileSystem from 'expo-file-system';
import { BASE_URL } from '../../config';

const imageDir = FileSystem.cacheDirectory + 'articles/';
const imageFileUri = (image: string) => imageDir + image;
const imageUrl = (image: string) => BASE_URL + '/uploads/articles/' + image;

async function ensureDirExists() {
  const dirInfo = await FileSystem.getInfoAsync(imageDir);
  if (!dirInfo.exists) {
    console.log('Article image directory doesn\'t exist, creating…');
    await FileSystem.makeDirectoryAsync(imageDir, { intermediates: true });
  }
}

export async function addImage(image: string) {
  try {
    await ensureDirExists();
    const fileUri = imageFileUri(image);
    const fileInfo = await FileSystem.getInfoAsync(fileUri);

    if (!fileInfo.exists) {
      console.log('Downloading', image, 'image files…');
      await FileSystem.downloadAsync(imageUrl(image), imageFileUri(image));
    }
  } catch (e) {
    console.error('Couldn\'t download image files:', e);
  }
}

export async function getSingleImage(image: string) {
  await ensureDirExists();

  const fileUri = imageFileUri(image);
  const fileInfo = await FileSystem.getInfoAsync(fileUri);

  if (!fileInfo.exists) {
    console.log('Image isn\'t cached locally. Downloading…');
    await FileSystem.downloadAsync(imageUrl(image), fileUri);
  }

  return fileUri;
}
