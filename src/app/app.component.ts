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
  getCheckSum: string;
  chosenUuid: string;

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
    this.fileUploadService.getSignedUrl(this.fileType).subscribe(res0 => {
      const SPLITRES = res0.toString().split('||');
      this.fileUrl = SPLITRES[0];
      this.getUUID = SPLITRES[1];
      console.log(SPLITRES);
      console.log(this.fileUrl);
      console.log(this.getUUID);

      this.fileUploadService.putFileWithUrl(this.fileObj, this.fileUrl).subscribe(
        (data) => {
          console.log(data.headers.get('ETag'));
          this.checkSum = data.headers.get('ETag');
          this.checkSum = this.checkSum.split('"')[1];

          console.log('------');
          console.log(this.getUUID);
          console.log(this.checkSum);
          this.fileUploadService.sendCheckSum(this.getUUID, this.checkSum).subscribe(
            (res1) => {
              console.log('res 1: ' + res1);
              console.log(res1);
            }
          );
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

  getCheckSumFromButton(): void {
    this.fileUploadService.getCheckSum(this.chosenUuid).subscribe((res) => {
      // @ts-ignore
      this.getCheckSum = res.Item.checkSum;
      console.log(this.getCheckSum);
    });
  }

  onUuidCheckSumPicked(event): void {
    this.chosenUuid = (event.target as HTMLInputElement).value;
  }
}
