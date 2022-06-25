import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController, IonInfiniteScroll, LoadingController, MenuController, ModalController } from '@ionic/angular';
import { HomeService } from 'src/app/providers/home.service';
import { LoginComponent } from '../login/login.component';
import { UserService } from 'src/app/providers/user'
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { Api } from 'src/app/providers/api';
import { TaskService } from 'src/app/providers/task.service';
import { CommonService } from 'src/app/providers/common';
import * as moment from 'moment';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  page: any = 1
  per_page: any = 12
  totalPages: any;
  hasLoadMore: boolean = false
  ngoList: any = []
  timerTime = 540 * 60 * 1000;
  current_date: any = Date()
  _camera_source_type: any;
  filePath: string;
  total_task:any=[]
  is_loader:boolean=false
  completed_task:any=[]
  is_skelton:boolean=false
  dashboard_data: any = []
  public lineChartData: ChartDataSets[] = [
    // { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    // { data: [50, 545, , 60, 78, 70, 56], label: 'Series B' },
  ];
  public lineChartLabels: Label[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  public lineChartOptions: (ChartOptions & { responsive: true,}) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];
  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  constructor(public modalCtrl: ModalController, public home: HomeService, public user: UserService, public androidPermissions: AndroidPermissions, public camera: Camera,
    public file: File, public transfer: FileTransfer, public api: Api, public task: TaskService, public common: CommonService,  public menu: MenuController,private alertCtrl:AlertController,
    public loadingController:LoadingController) { }

  ngOnInit() {
    this.getNgoList()
    this.getDashboard()
    console.log(this.user.profile)
  }

  ngAfterViewInit(){
    if(localStorage.getItem(this.common.PUNCH_STATUS) == 'punchin'){
      this.common.left_time = moment().diff(moment(this.common.punch_in_time), 'seconds')
      this.runCounter()
    }
  }


  async openLogin() {
    const modal = await this.modalCtrl.create({
      component: LoginComponent,
      componentProps: {}
    });
    await modal.present();

  }

  getNgoList() {
    this.home.getNgoList(this.page, this.per_page).subscribe(resp => {
      if (resp.success) {
        this.totalPages = Math.ceil(resp.data.total / resp.data.per_page);
        this.hasLoadMore = this.page < this.totalPages;
        this.ngoList = this.ngoList.concat(resp.data.data)
        if (this.hasLoadMore) {
          this.page++;
          if (this.infiniteScroll)
            this.infiniteScroll.complete();
        } else {
          if (this.infiniteScroll) {
            this.infiniteScroll.complete();
            this.infiniteScroll.disabled = true;
          }

        }
      }
    })
  }


  getDashboard() {
    this.is_skelton=true
    this.home.getDashboard(this.user.profile.id).subscribe(resp => {
      if (resp.success) {
        console.log(resp)
        this.is_skelton=false
        this.dashboard_data = resp.data
        if(this.dashboard_data && this.dashboard_data.tdy_task_count > 0){
          this.dashboard_data.tdy_task.forEach(element => {
            if(element.status == 'Active' || element.status == null){
              element.check_status=false
            }
            if(element.status == 'completed'){
              element.check_status=true
            }
          });
        }

        if(this.dashboard_data.weekly_data && this.dashboard_data.weekly_data.length > 0){
          this.dashboard_data.weekly_data.forEach(element => {
            // this.lineChartData['data'].push(element.total_task)
            // this.lineChartData['albel']='Total tasks'
            this.total_task=this.total_task.concat(element.total_task)
            this.completed_task=this.completed_task.concat(element.completed)
            this.lineChartData = [
              { data: this.completed_task, label: 'Completed' },
            ];
          });

          console.log( this.lineChartData)
        }
      }
    })
  }

  // getLivePicture() {
  //   let PERMISSIONS_NEEDED = [
  //     this.androidPermissions.PERMISSION.CAMERA,
  //     this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE
  //   ];

  //   this.androidPermissions.checkPermission(PERMISSIONS_NEEDED[0]).then((result) => {

  //     // If no permission, request permission.
  //     if (!result.hasPermission) {
  //       //  alert("REQUEST-PERMISSION");
  //       this.androidPermissions.requestPermissions(PERMISSIONS_NEEDED).then((_) => {
  //         this.openCamera();

  //       })
  //         .catch(err => {
  //           alert("REQUEST-PERMISSION-ERROR: " + JSON.stringify(err)); // <<<<<<<<<<<<<<<< error
  //         });
  //     }
  //     // If permission is already granted, proceed normally.
  //     else {
  //       this.openCamera()
  //       // alert("ALREADY-HAVE-PERMISSION");
  //     }
  //   }
  //   )


  // }


  openCamera(flag) {

    const options: CameraOptions = {
      quality: 90,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: 1,
      // targetWidth: 350,
      // targetHeight: 350,
      allowEdit: false
    }
    this.camera.getPicture(options).then((imageData) => {
      this.uploadImage(imageData,flag)
    }, (err) => {
      // Handle error
      console.log(err)
    });

  }

  async uploadImage(image,flag) {
    this.is_loader=true
    this.common.is_loader=true
    var endpoint=flag == 'in'?  "/punch/in/": "/punch/out/"
    var url = this.api.url + endpoint + this.user.profile.id;
    this.filePath = image
    let options: FileUploadOptions = {
      fileKey: 'in_img',
      fileName: image,
      params: {},
      headers: {
        'x-api-key': this.user.apiKey
      },
      mimeType: "image/jpeg",
      chunkedMode: false,
      httpMethod: "POST",
    }

    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.onProgress((progressEvent: ProgressEvent) => {
      console.log(progressEvent);
    })

    // this.common.presentToast('Uploading...');

    fileTransfer.upload('file://' + this.filePath, url, options).then((data) => {
      console.log(data)
      let result: any = {};
      try {
        result = JSON.parse(data.response);
        this.is_loader=false
        this.common.is_loader=false
        console.log(result)
        this.common.punch_status=flag == 'in' ? result.data.punch_in_status : result.data.punch_out_sts
        localStorage.setItem(this.common.PUNCH_STATUS,this.common.punch_status)
        if(flag == 'in'){
        this.common.punch_in_time=moment(new Date());
        localStorage.setItem(this.common.PUNCH_IN_TIME,this.common.punch_in_time)
        this.runCounter()
        }
      } catch (err) {
        console.log(data.response);
        this.is_loader=false
        this.common.is_loader=false
        console.log(err);
      }
      if (result.data) {

        // this.common.presentToast('Successfully uploaded');
      } else {

      }
      // this.common.hideIonicLoader();
    }, (err) => {
      console.log(err);

      // this.common.hideIonicLoader();
    })

  }


  taskCompeleted(event) {
    if(this.common.punch_status == 'punchin'){
    console.log(event.detail)
    var data = {
      status: event.detail.checked ? 'completed' : 'Active',
      id: event.detail.value
    }
    this.task.updateTask(data).subscribe(resp => {
      if (resp.success) {
        let index = this.dashboard_data.tdy_task.findIndex(x => x.task_id == event.detail.value)
        this.dashboard_data.tdy_task[index].status = event.detail.checked ? 'completed' : 'active'
        let that=this
        setTimeout(()=>{
          that.dashboard_data.tdy_task[index].check_status = event.detail.checked ? true :false
        },100)
        // this.common.presentToast(event.detail.checked ? 'Task Completed' : 'Task is Active')
        var task_count:any;
        this.dashboard_data.tdy_task.forEach(element => {
          if(element.status == 'active'){
            return
          }else{
            task_count=task_count+1
          }
        });

        if(task_count == this.dashboard_data.tdy_task.length){
          this.common.presentToast("Today's task has been completed")
        }
      }

    }, error => {
      this.getDashboard()
    })
  }else{
    this.common.presentToast("Please Punch In First")
    let that=this
    setTimeout(()=>{
      let index = that.dashboard_data.tdy_task.findIndex(x => x.task_id == event.detail.value)
      that.dashboard_data.tdy_task[index].check_status = false
      return;
    },500)

  }
  }

  getFirstname(name){
    if(name && name !=null){
    var fname=name.split(' ')
    return fname[0]
    }
  }

  openMenu() {
    this.menu.open();
  }

  runCounter(){
    let ab=setInterval(async () => {
      if(this.common.left_time <= this.timerTime){
        this.common.left_time++
      }else{
        clearInterval(ab);
        let src = 'assets/audio/home-ringtone-4438.mp3';
        let audio = new Audio(src);
        audio.play();
        const alert = await this.alertCtrl.create({
          header: 'Notification',
          message: "Please Punch-Out, your time is over",
          buttons: [ {
              text: 'Ok',
              handler: () => {
                audio.pause()
              }
            }
          ]
        });
    
    
        await alert.present();
      }
    }, 1000);
  }

  openCheck(task){
    if(this.common.punch_status =='punchin'){
    console.log(task)
    if(task.active == "completed"){
      task.active='active'
    }else{
      task.active='completed'
    }
    console.log(task)
  }else{
    this.common.presentToast("Please Punch IN First")
    task.active='active'
    return;
  }

}


doRefresh(event){
  this.getDashboard()
  if(event){
    event.target.complete()
  }
}
}
