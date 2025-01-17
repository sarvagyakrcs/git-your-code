export function getFileType(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return 'image';
      case 'pdf':
        return 'pdf';
      case 'doc':
      case 'docx':
        return 'document';
      case 'xls':
      case 'xlsx':
        return 'spreadsheet';
      case 'ppt':
      case 'pptx':
        return 'presentation';
      default:
        return 'unknown';
    }
  }
  
  