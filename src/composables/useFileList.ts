import { ref, type Ref } from 'vue';

export function useFileList() {
  const files: Ref<UploadableFile[]> = ref([]);

  function addFiles(newFiles: File[]) {
    // if(!checkIfValidImages(newFiles)) {
    //     throw new Error("Only images are allowed to be uploaded");
    // }

    const newUploaddableFiles = [...newFiles]
      .map((file) => new UploadableFile(file))
      .filter((file) => !isFileExists(file.id));

    files.value = files.value.concat(newUploaddableFiles);
  }

  function checkIfValidImages(files: File[]) {
    return files.some((file) => file.type.startsWith('image/'));
  }

  function removeFile(file: UploadableFile) {
    const index = files.value.findIndex(({ id }) => id === file.id);
    if (index > -1) {
      files.value.splice(index, 1);
    }
  }

  function isFileExists(otherId: string) {
    return files.value.some(({ id }) => id === otherId);
  }

  return {
    addFiles,
    removeFile,
    files,
  };
}

export class UploadableFile {
  public file: File;
  public id;
  public url;
  public name;

  constructor(file: File) {
    this.file = file;
    this.name = file.name ?? '';
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
  }
}
