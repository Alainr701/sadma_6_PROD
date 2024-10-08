// utils/file-utils.ts

export class FileUtils {
    static convertFileToBase64(file: File): Promise<string | ArrayBuffer | null> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result as string;
          const type = base64String.split(';')[0].split(':')[1];
          if (['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'].includes(type)) {
            resolve(reader.result);
          } else {
            reject(new Error('Only support pdf, png, jpg, jpeg'));
          }
        };
        reader.onerror = (error) => reject(error);
      });
    }
  }
  