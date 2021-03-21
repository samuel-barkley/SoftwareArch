import {Component} from '@angular/core';
import {FileUploaderServiceService} from './file-uploader-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SoftwareArch';

  fileObj: File;
  fileUrl: string;
  fileType: string;
  errorMsg: boolean;
  getUUID: string;
  setUUID: string;
  getFileLink: string;
  checkSum: string;

  constructor(private fileUploadService: FileUploaderServiceService) {
    this.errorMsg = false;
  }

  onFileUpload(): void {
    if (!this.fileObj) {
      this.errorMsg = true;
      return;
    }
    const fileForm = new FormData();
    fileForm.append('file', this.fileObj);
    this.fileUploadService.getSignedUrl(this.fileType).subscribe(res => {
      const SPLITRES = res.toString().split('||');
      this.fileUrl = SPLITRES[0];
      this.getUUID = SPLITRES[1];
      console.log(SPLITRES);
      console.log(this.fileUrl);
      console.log(this.getUUID);

      this.fileUploadService.putFileWithUrl(this.fileObj, this.fileUrl).subscribe(
        (data) => {
          console.log(data + ' ' + res);
        });
    });
  }

  onFilePicked(event): void {
    this.errorMsg = false;
    this.fileObj = (event.target as HTMLInputElement).files[0];
    this.fileType = this.fileObj.type;
  }

  onFileGet(): void {
    this.getFileLink = 'https://testbucketthingy.s3.amazonaws.com/' + this.setUUID;
  }

  onUuidPicked(event): void {
    this.setUUID = (event.target as HTMLInputElement).value;
  }
}
