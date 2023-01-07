import { ref, type Ref } from 'vue';

export function useFileList() {
  const files: Ref<UploadableFile[]> = ref([]);

  function addFiles(newFiles: File[]) {
    const newUploaddableFiles = [...newFiles]
    .map((file) => new UploadableFile(file))
    .filter((file) => !isFileExists(file.id))

    files.value = files.value.concat(newUploaddableFiles);
  }

 

  function removeFile(file: UploadableFile) {
    const index = files.value.indexOf(file);
    
    if(index > -1) {
        files.value.splice(index, 1);
    }
  }

  function isFileExists(otherId: string) {
    return files.value.some(({id}) => id === otherId);
  }

  return {
    addFiles, removeFile, files
  }
}

class UploadableFile {
  public file: File | null = null;
  public id = '';
  public url = '';
  public status = null;

  constructor(file: File) {
    this.file = file;
    this.id = `${file.name}-${file.size}-${file.lastModified}-${file.type}`;
    this.url = URL.createObjectURL(file);
    this.status = null;
  }
}
