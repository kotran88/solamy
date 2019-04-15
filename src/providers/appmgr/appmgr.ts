import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Events, Platform } from "ionic-angular";
// import { EmailValidator } from '../../../node_modules/@angular/forms';

@Injectable()
export class AppmgrProvider {
    sqlite: SQLite = null;
    database: SQLiteObject = null;
    userInfo = {
        user_id : 0,
        name : "",
        email : "",
        login_type : '',
        mem_type : 0,
        login_flag : 0,
       // 
        push_flag: 1,
        status: 1,
        address: '',
        zipcode: '',
        building: '',
        contact: '',
        month_fee: 0,
        service_intro: 1
    };
    // saveInfo = {
    //   email : "",
    //   password : "",
    //   mem_type : 0
    // };
    /********test*********/
    // userInfo = {
    //     user_id : 1,
    //     name : "test",
    //     email : "test@mail.com",
        // login_type : 0,
    //     mem_type : 0,
    //     login_flag : 1,
    //     // 
    //     push_flag: 1,
    //     status: 1,
    //     address: '',
    //     contact: '',
    //     month_fee: 0
    // };
    
    saveInfo = {
      email : "",
      password : "",
      mem_type : 0
    };
    /*********************/
    constructor(
      public event : Events,
      private platform : Platform) 
    {
      this.platform.ready().then(() => {
        if(this.platform.is('android') || this.platform.is('ios')) {
          this.sqlite = new SQLite();
          var self = this;
          self.sqlite.create({
              name: 'solarmy.db',
              location: 'default'
          }).then((db: SQLiteObject) => {
              self.database = db;
              self.sqliteGetUserData();
              console.log("db created!!!");

          });
        }
      });
    }

    getQuo(){
      
    }
    sqliteGetUserData() {
      console.log("sqliteGetUserData come")
      this.database.executeSql('CREATE TABLE IF NOT EXISTS userinf(rowid INTEGER PRIMARY KEY, user_id INT, name TEXT, email TEXT, login_type TEXT, mem_type INT, login_flag INT, '+
          'push_flag INT, status INT, address TEXT, zipcode TEXT, building TEXT, contact TEXT, month_fee INT, service_intro INT)', [])
      .then(res =>console.log('Executed SQL'))
      .catch(e => {
          alert("sqliteGetUserData CREATE Catch : "+JSON.stringify(e) );
      });
      this.database.executeSql('SELECT * FROM userinf ', [])
      .then(res => {
        if(res.rows.length == 0) {
            this.database.executeSql('INSERT INTO userinf VALUES(NULL,?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
              [this.userInfo.user_id, this.userInfo.name, this.userInfo.email, this.userInfo.login_type, this.userInfo.mem_type, this.userInfo.login_flag,
                this.userInfo.push_flag, this.userInfo.status, this.userInfo.address, this.userInfo.zipcode, this.userInfo.building, 
                this.userInfo.contact, this.userInfo.month_fee, this.userInfo.service_intro])
            .then(res => {
                // alert("sqliteGetUserData1... type="+this.userInfo.mem_type+":"+"login_flag="+this.userInfo.login_flag);
                this.event.publish("get_sqlite_data", this.userInfo);
                console.log("userInfo come"+this.userInfo);
            })
            .catch(e => {alert("sqliteGetUserData : "+JSON.stringify(e));});
        } else {                
            this.userInfo.user_id = res.rows.item(0).user_id;
            this.userInfo.name = res.rows.item(0).name;
            this.userInfo.email = res.rows.item(0).email;
            this.userInfo.login_type = res.rows.item(0).login_type;
            this.userInfo.mem_type = res.rows.item(0).mem_type;
            this.userInfo.login_flag = res.rows.item(0).login_flag;
            
            this.userInfo.push_flag = res.rows.item(0).push_flag;
            this.userInfo.status = res.rows.item(0).status;
            this.userInfo.address = res.rows.item(0).address;
            this.userInfo.zipcode = res.rows.item(0).zipcode;
            this.userInfo.building = res.rows.item(0).building;
            this.userInfo.contact = res.rows.item(0).contact;
            this.userInfo.month_fee = res.rows.item(0).month_fee;
            this.userInfo.service_intro = res.rows.item(0).service_intro;

            this.event.publish("get_sqlite_data", this.userInfo);
        }
        // ////////////////////// for save data
        this.database.executeSql('CREATE TABLE IF NOT EXISTS saveInfo(rowid INTEGER PRIMARY KEY, email TEXT, password TEXT, mem_type INT)', [])
        .then(res =>console.log('Executed SQL'))
        .catch(e => {
            alert("sqliteGetUserData CREATE Catch : "+JSON.stringify(e) );
        });
        this.database.executeSql('SELECT * FROM saveInfo ', [])
          .then(res => {
            if(res.rows.length == 0) {
                this.database.executeSql('INSERT INTO saveInfo VALUES(NULL,?, ?, ?)',
                            [this.saveInfo.email, this.saveInfo.password, this.saveInfo.mem_type])
                .then(res => {

                })
                .catch(e => {alert("sqliteGetUserData saveInfo : "+JSON.stringify(e));});
            } else {                
                this.saveInfo.email = res.rows.item(0).email;
                this.saveInfo.password = res.rows.item(0).password;
            }
        })
        .catch(e => {
            alert("sqliteGetUserData executeSql Catch : "+JSON.stringify(e));            
        });
      });
    }

    sqliteSaveUserData() 
    {
      if(this.platform.is('android') || this.platform.is('ios')) {
        this.database.executeSql('UPDATE userinf SET user_id="'+this.userInfo.user_id+'", name="'+this.userInfo.name+'", email="'+this.userInfo.email
          +'", login_type="'+this.userInfo.login_type+'", mem_type="'+this.userInfo.mem_type+'", login_flag="'+this.userInfo.login_flag+'", push_flag="'+this.userInfo.push_flag+'", status="'+this.userInfo.status
          +'", address="'+this.userInfo.address+'", zipcode="'+this.userInfo.zipcode+'", building="'+this.userInfo.building+'", contact="'+this.userInfo.contact+'", month_fee="'+this.userInfo.month_fee+'", service_intro="'+this.userInfo.service_intro+'" WHERE rowid=1', [])
        .then(res => { })
        .catch(e => {
            alert("sqliteSaveUserData executeSql Catch : "+JSON.stringify(e));
        });
      }
    }

    getUserInfo() {
      console.log("user info is : ");
      console.log(this.userInfo);
        return this.userInfo;
    }

    setUserInfoAll(data) {
      console.log("setUserInfoAll");
      this.userInfo.user_id = data.user_id ;
      this.userInfo.name = data.name ;
      this.userInfo.email = data.email ;
      this.userInfo.login_type = data.login_type ;
      this.userInfo.mem_type = data.mem_type ;
      this.userInfo.login_flag = data.login_flag ;

      this.userInfo.push_flag = data.push_flag ;
      this.userInfo.status = data.status ;
      this.userInfo.address = data.address ;
      this.userInfo.contact = data.contact ;
      this.userInfo.month_fee = data.month_fee ;
      // console.log('setUserInfoAll', this.userInfo);
      this.sqliteSaveUserData();        
    }

    setUserInfoIndivial(data) {
      this.userInfo.user_id = data.user_id ? data.user_id : this.userInfo.user_id;
      this.userInfo.name = data.name ? data.name : this.userInfo.name;
      this.userInfo.email = data.email ? data.email : this.userInfo.email;
      this.userInfo.login_type = data.login_type ? data.login_type : this.userInfo.login_type;
      this.userInfo.mem_type = data.mem_type ? data.mem_type : this.userInfo.mem_type;
      this.userInfo.login_flag = data.login_flag ? data.login_flag : this.userInfo.login_flag;

      this.userInfo.push_flag = data.push_flag ? data.push_flag : this.userInfo.push_flag;
      this.userInfo.status = data.status ? data.status : this.userInfo.status;
      this.userInfo.address = data.address ? data.address : this.userInfo.address;
      this.userInfo.zipcode = data.zipcode ? data.zipcode : this.userInfo.zipcode;
      this.userInfo.building = data.building ? data.building : this.userInfo.building;
      this.userInfo.contact = data.contact ? data.contact : this.userInfo.contact;
      this.userInfo.month_fee = data.month_fee ? data.month_fee : this.userInfo.month_fee;
      this.userInfo.service_intro = data.service_intro==0 ? 0 : 1;
      // console.log('setUserInfoIndivial', this.userInfo);
      this.sqliteSaveUserData();        
    }
    ////////////////// for save user email & password
    
    sqliteUpdateSaveData() { 
      if(this.platform.is('android') || this.platform.is('ios')) {
        this.database.executeSql('UPDATE saveInfo SET email="'+this.saveInfo.email+'", password="'+this.saveInfo.password+'", mem_type="'+this.saveInfo.mem_type+'" WHERE rowid=1', [])
        .then(res => {})
        .catch(e => {
            alert("sqliteSaveUserData executeSql Catch : "+JSON.stringify(e));
        });
      }
    }

    getSaveInfo() {
      return this.saveInfo;
    }

    setSaveInfo(data) {
      this.saveInfo.email = data.email;
      this.saveInfo.password = data.password;
      this.saveInfo.mem_type = data.mem_type;
      
      // console.log("this.saveInfo=", this.saveInfo);
      this.sqliteUpdateSaveData();        
    }
}
