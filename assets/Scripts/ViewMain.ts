import gameStart from "./game/gameStart";
import leadFish from "./game/leadFish";
import leadFishMove from "./game/leadFishMove";
import AudioManager from "./Manager/AudioManager";
import GameData from "./Manager/GameData";
import { ViewManager } from "./Manager/ViewManager";

const {ccclass, property} = cc._decorator;
@ccclass
export default class ViewMain extends cc.Component {
    
    public static instance:ViewMain;
    static getInstance(): ViewMain
    {
        if(this.instance == null)
        {
            this.instance = new ViewMain();
        }
        return this.instance;
    }

    // 游戏是否开始
    isPlay:boolean;

    @property(cc.Prefab)
    fish_list:cc.Prefab = null;

    @property(cc.Prefab)
    guanghuan_list:cc.Prefab = null;

    gameType:string = ""; // 游戏模式

    @property(cc.Node)
    bg:cc.Node = null;

    onLoad () {
        GameData.ViewMain = this;
        // 判断是否是新玩家
        if(!localStorage.getItem("fish_data")){
            // 是新用户 存数据到本地
            localStorage.setItem("fish_data",JSON.stringify(GameData.getInstance().local_data));
        }else{
            // 不是新用户 获取储存的数据 放到本地来
            GameData.getInstance().local_data_perserve(JSON.parse(localStorage.getItem("fish_data")));
        }

        // 获取窗口信息
        GameData.screenSize = cc.view.getVisibleSize();
        GameData.canvasSize = cc.view.getCanvasSize();

        //传入怪物鱼数值
        GameData.monsterFishNumber = 10;

        this.loading_Animation();
        AudioManager.getInstance().playMusic("大厅背景声音");
    }

    start () {
        this.adaptionBG();
        this.daily_sign();
    }

    update (dt) {}

    // 每日签到
    daily_sign(){
        if(GameData.getInstance().local_data.last_login_time === 0){
            GameData.getInstance().local_data.last_login_time = new Date().getTime();
            GameData.getInstance().local_data.reward_status = false;
        }else{
            let now_time = new Date().getTime();
            let last_time = GameData.getInstance().local_data.last_login_time;
            let day = Math.floor((now_time - last_time)/(24*60*60*1000));
            if(day > 0){
                GameData.getInstance().local_data.last_login_time = now_time;
                GameData.getInstance().local_data.login_day += day;
                GameData.getInstance().local_data.reward_status = false;
            }
        }
        console.log("登录天数："+GameData.getInstance().local_data.login_day);
    }

    // 点击签到按钮
    click_sign_in(){
        AudioManager.getInstance().playSound("点击按钮音");
        ViewManager.showView("sign_in")
    }
    // 点击商城按钮
    clickMall(){
        AudioManager.getInstance().playSound("点击按钮音");
        ViewManager.showView("mall");
    }

    // 适配自由模式背景
    adaptionBG(){
        let bg = cc.find("background",this.node);
        bg.width = GameData.screenSize.width * 3;
        bg.children.forEach(child => {
            child.width = GameData.screenSize.width;
            console.log(child.width)
        });
    }

    // 自由模式
    click_ziyou_Start(){
        AudioManager.getInstance().playSound("点击按钮音");
        // 开始游戏
        GameData.isPlay = true;
        this.click_Start_Animation("ziyou");
    }
    // 关卡模式
    click_shengji_Start(e){
        AudioManager.getInstance().playSound("点击按钮音");
        this.click_Start_Animation("guanqia");
    }

    // 点击开始 ui移除动画
    click_Start_Animation(type:string){
        this.gameType = type;
        let logo = cc.find("Canvas/homePage/logo");
        let cg = cc.find("Canvas/homePage/chuangguanmoshi");
        let ziyou = cc.find("Canvas/homePage/ziyoumoshi");
        cc.tween(logo).to(0.5,{y:GameData.screenSize.height / 2 + logo.height/2}).start();
        cc.tween(cg).to(0.5,{x:GameData.screenSize.width / 2 + cg.width/2}).start();
        cc.tween(ziyou).to(0.5,{x:-GameData.screenSize.width / 2 - ziyou.width/2}).start();
        setTimeout(()=>{
            logo.parent.active = false
            if(type == "ziyou"){
                if(!GameData.gameStart.isInit) {
                    cc.find("Canvas/ziyoumoshi").active = true;
                }
            }else if(type == "guanqia"){
                GameData.upgrade_type.init(GameData.upgrade_type.now_round);
            }
        },501);
    }

    // 开始界面loading动画
    loading_Animation(){
        let logo = cc.find("Canvas/homePage/logo");
        let cg = cc.find("Canvas/homePage/chuangguanmoshi");
        let ziyou = cc.find("Canvas/homePage/ziyoumoshi");
        logo.parent.active = true;

        cc.tween(logo).to(0.5,{y:GameData.screenSize.height / 2 - logo.height/2 - 130}).start();
        cc.tween(cg).to(0.5,{x:0}).start();
        cc.tween(ziyou).to(0.5,{x:-20}).start();
    }

}
