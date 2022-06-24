import AudioManager from "../Manager/AudioManager";
import GameData from "../Manager/GameData";
import treasure_chest from "../PopUpNode/treasure_chest";
import upgrade_tpye_move from "./upgrade_tpye_move";
export enum round {
    first_round = 1,
    second_round = 2,
    third_round = 3,
    fourth_round = 4,
    fifth_round = 5
}
const {ccclass, property} = cc._decorator;

@ccclass
export default class upgrade_type extends cc.Component {
    @property(cc.Label) 
    jinbi_label:cc.Label = null; // 金币数展示

    @property(cc.Node)
    ui_node:cc.Node = null; // ui

    @property(cc.Label)
    guanqiaLabel:cc.Label = null;  // 关卡数展示
    @property(cc.Prefab)
    yanwuPfb:cc.Prefab = null; //烟雾预制点
    cameraX:number = 0;    // 摄像机坐标
    cameraY:number = 0;    // 摄像机坐标
    yanwu:cc.Node = null; // 全局绑定烟雾
    @property(cc.Prefab)
    roundList:Array<cc.Prefab> = []; //关卡预制点

    
    nowCameraX: number = 0;  // 当前摄像机X坐标
    lastCameraX: number = 0;  // 上次摄像机X坐标
    distanceX:number = 0;
    now_round:round = null; // 当前关卡
    round_label:number = 1; // 关卡数展示

    left:cc.Node;
    middle:cc.Node;
    right:cc.Node;
    onLoad () {
        GameData.upgrade_type = this;
        this.now_round  = round.first_round;
    }

    start () {
        this.left = cc.find("Canvas/background").children[0]; // 左边
        this.middle = cc.find("Canvas/background").children[1]; // 中间
        this.right = cc.find("Canvas/background").children[2]; // 右边
    }

    update (dt) {
        this.ui_follow_camera();
    }
    // 背景二方连续
    public background_move(): void {
        // 横屏连续
        let road_num = this.distanceX;
        let camera = cc.find("Canvas/Main Camera");
        if(road_num >= camera.width / 3 * 2){ // 如果摄像机偏移超过一半.3
            if(GameData.ViewMain.bg.getComponent(cc.Layout)) GameData.ViewMain.bg.getComponent(cc.Layout).enabled = false;
            this.left.x = this.right.x + this.right.width; // 左边移动到右边的右边
            let right_spare = this.right;             // 存起来右边备用
            this.right = this.left; // 右边替换为左边
            this.left = this.middle; // 左边替换为中间
            this.middle = right_spare; // 中间替换为右边
            this.distanceX = 0;
        }else if(road_num <= -camera.width / 3 * 2){
            this.right.x = this.left.x - this.left.width; // 右边移动到左边的左边
            let left_spare = this.left;            // 存起来左边备用
            this.left = this.right; // 左边替换为右边
            this.right = this.middle; // 右边替换为中间
            this.middle = left_spare; // 中间替换为左边
            this.distanceX = 0;
        }
    }


    public init(num:round): void {
        console.log("初始化关卡" + num);
        // 播放关卡模式音乐
        AudioManager.getInstance().playMusic("关卡模式bgm");
        if(!(num && this.roundList[num - 1])) return;
        let string:string;
        if(num <= 3) {
            string = "hengpinglianxu";
        }else{
            string = "shupinglianxu";
        }
        for(let i = 0;i < GameData.ViewMain.bg.children.length;i++){
            cc.resources.load(`images/bj/lianxu/${string}`,cc.SpriteFrame,(err, spriteFrame:cc.SpriteFrame) => {
                if(err){
                    cc.error(err);
                }else if(spriteFrame){
                    GameData.ViewMain.bg.children[i].getComponent(cc.Sprite).spriteFrame = spriteFrame;
                    GameData.ViewMain.bg.children[i].width = GameData.screenSize.width;
                    GameData.ViewMain.bg.children[i].height = GameData.screenSize.height;
                }
            })
        }
        this.now_round = num;
        let round:cc.Node = cc.instantiate(this.roundList[num - 1]);
        this.ui_node.active = true;
        round.setParent(this.node);
        this.update_jinbi();
        this.update_round_label();
    }

    removeRound(num:round): void {  //移除关卡 并且重置到num关
        let round = GameData.check_node_name(GameData.upgrade_type.node,"round");
        round.removeFromParent(); //移除关卡
        round.destroy();
        if(!num) return; //如果没有数字传入 就移除关卡结束
        if(num == 5) num = new treasure_chest().random_two(1,4);
        cc.find("Canvas/background").getComponent(cc.Layout).enabled = true;
        cc.tween(cc.find("Canvas/Main Camera")).to(0.8,{x:0,y:0}).call(()=>{
            this.init(num);
            this.cameraX = 0; // 摄像机偏移清零
            this.cameraY = 0; // 摄像机偏移清零
            this.distanceX = 0; // 玩家距离摄像机偏移清零
            this.nowCameraX = 0;  // 当前摄像机X坐标
            this.lastCameraX = 0;  // 上次摄像机X坐标
            this.left = cc.find("Canvas/background").children[0]; // 左边
            this.middle = cc.find("Canvas/background").children[1]; // 中间
            this.right = cc.find("Canvas/background").children[2]; // 右边
        }
        ).start();
    }
    // 金币数量展示
    update_jinbi(){
        this.jinbi_label.string = `${GameData.getInstance().local_data.jinbi}`;
    }

    update_round_label(){ // 关卡数展示
        this.guanqiaLabel.string = `${this.round_label}`;
    }

    // ui跟随摄像机
    public ui_follow_camera(): void {
        let camera = cc.find("Canvas/Main Camera");
        this.ui_node.setPosition(camera.getPosition());
    }
 
    // 返回大厅
    public back_hall(): void {
        AudioManager.getInstance().playSound("点击按钮音");
        this.removeRound(NaN);
        cc.director.loadScene("main");
    }
}
