import free_type from "../game/free_type";
import gameStart from "../game/gameStart";
import leadFish from "../game/leadFish";
import leadFishMove from "../game/leadFishMove";
import mapTypeLeadFishMove from "../game/mapTypeLeadFishMove";
import mapComponent from "../game/map_Component";
import monsterFish_Component from "../game/monsterFish_Component";
import upgrade_tpye_move from "../game/upgrade_tpye_move";
import upgrade_type from "../game/upgrade_type";
import ut_lead_fish from "../game/ut_lead_fish";
import ViewMain from "../ViewMain";

export default class GameData{
    public static instance:GameData
    static getInstance(): GameData
    {
        if(this.instance == null)
        {
            this.instance = new GameData();
        }
        return this.instance;
    }

    // 需要存到本地的数据
    local_data = {
        free_round : 1,         // 自由模式当前关卡 
        jinbi : 0,              // 用户金币数
        login_day : 1,          // 登录第几天数
        last_login_time : 0,    // 上次登录时间 0是第一次登录
        reward_status : false,  // 当日奖励领取情况 false未领取 true已领取
        guanghuan:[0    
            ,0,0
            ,0,0
            ,0],                // 用户当前商店拥有的光环 0代表没买 1代表买了 2代表正在使用
        
    }
    // 保存数据存到本地
    local_data_set(key,value){
        this.local_data[key] = value;
        localStorage.setItem("fish_data",JSON.stringify(GameData.getInstance().local_data));
        if(key === "jinbi" ){
            if(GameData.ViewMain.gameType === "ziyou"){
                GameData.free_type.update_jinbi();
            }else if(GameData.ViewMain.gameType === "guanqia"){
                GameData.upgrade_type.update_jinbi();
            }
        }
    }

    //非新用户 获取数据 存到当前缓存中
    local_data_perserve(obj: any) {
        this.local_data = obj;
    }

    // 商城商品价格
    mall_price = [
        1000,
        2000,
        3000,
        4000,
        5000,
        6000,
    ]

    // 签到奖励表
    sign_in_reward = {
        1 : 100,
        2 : 200,
        3 : 300,
        4 : 400,
        5 : 500,
        6 : 600,
        7 : 1000,
    }

    // 把脚本注册到全局
    public static gameStart:gameStart =new gameStart();
    public static Popup
    public static leadFishMove:leadFishMove;
    public static leadFish:leadFish;
    public static free_type:free_type;
    public static ViewMain:ViewMain;
    public static upgrade_type:upgrade_type;
    public static monsterFish_Component:monsterFish_Component;
    public static upgrade_tpye_move: upgrade_tpye_move;
    public static ut_lead_fish: ut_lead_fish;
    public static mapTypeLeadFishMove: mapTypeLeadFishMove;
    public static mapComponent:mapComponent;
    // 屏幕大小
    public static screenSize:{
        width:number,
        height:number
    }

    // 画布大小
    public static canvasSize:{
        width:number,
        height:number
    }

    // 声音属性
    public static music:{
        soundVolume?:number,
        musicVolume?:number
    }={}

    // 怪物鱼的数量
    public static monsterFishNumber:number;

    // 全局保存怪物鱼的数据
    public static monsterFish = {    
        __get__(keyname:string){
            if(this[keyname]) return this[keyname];
            return undefined;
        },
    
        __set__(keyname:string, value:any){
            this[keyname] =  value;
        },
    }
    // 游戏是否结束
    public static isPlay:boolean;
    // 游戏是否暂停
    public static isPause:boolean = false;
    // 游戏暂停导致鱼还没有开始动作
    public static pauseFishMove_action_name:Array<string> = [];
    // 模板
    public static muban = {
            __get__(keyname:string){
                if(this[keyname]) return this[keyname];
                return undefined;
            },
        
            __set__(keyname:string, value:any){
                this[keyname] =  value;
            },
        }
    

    // 移动坐标
    public static dir:cc.Vec2 = cc.v2(0,0);

    // toast内容
    static toastText: string = "";
    // 主角的数据
    public static lead_fish = {
        // 是否激活
        isActivation:false,
        // 头朝方向
        direction:"",
        // 主角当前鱼的ani
        ani_name:""
    }
    

    public static monster_fish_setAnimation(node:cc.Node, ani_name:string ,loop:number){
        if(!GameData.monsterFish.__get__(node.name) || !node) return;  
        switch(GameData.monsterFish.__get__(node.name)["direction"]){
            case "right":
                node.scaleX = 1;
                break;
            case "left":
                node.scaleX = -1;
                break;
        }
        node.getComponent(dragonBones.ArmatureDisplay).playAnimation(ani_name,loop);
    }

    // 主角鱼播放动画
    public static lead_fish_setAnimation(node:cc.Node, ani_name:string ,loop:number){
        if(!GameData.lead_fish.isActivation || !node) return;  
        switch(GameData.lead_fish.direction){
            case "right":
                node.scaleX = 1;
                break;
            case "left":
                node.scaleX = -1;
                break;
        }
        if(ani_name != "qianyi-1"){
            if(ani_name == "chi-1") node.getComponent(dragonBones.ArmatureDisplay).timeScale = 2.5;
            node.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.LOOP_COMPLETE,()=>{
                if(ani_name == "shengli-1"){GameData.free_type.upgrade_lead_fish();}
                node.getComponent(dragonBones.ArmatureDisplay).timeScale = 1;
                node.getComponent(dragonBones.ArmatureDisplay).playAnimation("qianyi-1",0);
            })
        }
        node.getComponent(dragonBones.ArmatureDisplay).playAnimation(ani_name,loop);
    }
    
    // 遍历节点 通过关键字获取节点
    public static check_node_name(node:cc.Node, name:string){
        if(!node) return;
        let node_child = null;
        for(let i = 0; i < node.children.length; i++){
            if(node.children[i].name.indexOf(name) != -1){
                node_child = node.children[i];
            } 
        }
        if(node_child){
            return node_child;
        }else{
            return null;
        }
    }
}
