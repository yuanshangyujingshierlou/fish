import GameData from "../Manager/GameData";
import ViewMain from "../ViewMain";
const {ccclass, property} = cc._decorator;

@ccclass
export default class leadFishMove extends cc.Component {
    lead_fish:cc.Node = null;

    speed:number = 400;

    lastPos:cc.Vec2;
    nowPos:cc.Vec2;

    line_interval:cc.Vec2 = cc.v2(0,0);
    onLoad () {
        GameData.leadFishMove = this;
        this.node.on(cc.Node.EventType.TOUCH_START,this.touch_Start.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_MOVE,this.touch_Move.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_END,this.touch_End.bind(this));
        this.node.on(cc.Node.EventType.TOUCH_CANCEL,this.touch_Cancel.bind(this));
    }
    protected onEnable(): void {

    }

    start () {

    }
    update (dt) {
        // 触摸移动 移动范围太小不检测 免得晃动
        if(GameData.dir.mag() < 0.5 || isNaN(GameData.dir.x)|| isNaN(GameData.dir.y)){
            return;
        }
        if(this.lead_fish){
            let vx = this.speed * GameData.dir.x;
            let vy = this.speed * GameData.dir.y;
            let sx = vx * dt;
            let sy = vy * dt;
            // 鱼不能越界
            if(this.lead_fish.x >= GameData.screenSize.width / 2 * 3 - this.lead_fish.width / 2 - 50){
                this.lead_fish.x = this.lead_fish.x - 2;
            }else if(this.lead_fish.x < -(GameData.screenSize.width / 2) * 3 + this.lead_fish.width / 2 + 50){
                this.lead_fish.x = this.lead_fish.x + 2;
            }else if(this.lead_fish.y <= -(GameData.screenSize.height / 2) + this.lead_fish.height / 2 + 50){
                this.lead_fish.y = this.lead_fish.y + 2;
            }else if(this.lead_fish.y >= GameData.screenSize.height / 2 - this.lead_fish.height / 2 - 50){
                this.lead_fish.y = this.lead_fish.y - 2;
            }else{
                // 控制鱼移动
                this.lead_fish.x += sx;
                this.lead_fish.y += sy;
            }

             // 相机设置边界
            if(this.lead_fish.x > GameData.screenSize.width / 2 * 3 - cc.find("Canvas/Main Camera").width / 2
                || this.lead_fish.x < -(GameData.screenSize.width / 2) * 3  + cc.find("Canvas/Main Camera").width / 2){
                cc.find("Canvas/Main Camera").x = cc.find("Canvas/Main Camera").x > 0 ? GameData.screenSize.width / 2 * 3 - cc.find("Canvas/Main Camera").width / 2
                                                                                        :-(GameData.screenSize.width / 2) * 3 + cc.find("Canvas/Main Camera").width / 2;
            }else{
                cc.find("Canvas/Main Camera").x += sx;
                cc.find("ui",this.node.parent).x +=sx;
            }

            // 鱼设置角度
            let r = Math.atan2(GameData.dir.y,GameData.dir.x);
            let degree = r * 180 / Math.PI; //角度
            this.lead_fish.angle = degree;
            // 根据角度设置鱼头方向
            switch(this.lead_fish.angle !== null){
                case (this.lead_fish.angle > 90 || this.lead_fish.angle < -90):
                    this.lead_fish.scaleX = -1
                    this.lead_fish.children.forEach(child => {
                        child.scaleX = -1;
                    });
                    this.lead_fish.angle = degree + 180;
                    GameData.lead_fish.direction = "left";
                    break;
                
                case (this.lead_fish.angle < 90 || this.lead_fish.angle > -90):
                    this.lead_fish.scaleX = 1;
                    this.lead_fish.children.forEach(child => {
                        child.scaleX = 1;
                    });
                    this.lead_fish.angle = degree;
                    GameData.lead_fish.direction = "right";
                    break;
            }
        }
    }
    // 触摸开始
    touch_Start(event:cc.Event.EventTouch){
        if(GameData.isPause) return;
        let pos = event.getLocation();
        this.lastPos = this.node.convertToNodeSpaceAR(pos);
    }
    // 滑动过程
    touch_Move(event:cc.Event.EventTouch){
        if(GameData.isPause) return;
        let pos = event.getLocation();
        this.nowPos = this.node.convertToNodeSpaceAR(pos);
        let len_xie = this.nowPos.sub(this.lastPos).mag();

        let len_cos_mag = cc.v2({x:this.lastPos.x,y:0}).sub(cc.v2({x:this.nowPos.x,y:0})).mag();
        let len_sin_mag = cc.v2({x:0,y:this.lastPos.y}).sub(cc.v2({x:0,y:this.nowPos.y})).mag();

        let len_cos = this.lastPos.x > this.nowPos.x ? -len_cos_mag : len_cos_mag;
        let len_sin = this.lastPos.y > this.nowPos.y ? -len_sin_mag : len_sin_mag;
        GameData.dir.x = len_cos / len_xie;
        GameData.dir.y = len_sin / len_xie;
    }
    // 触摸结束
    touch_End(){
        GameData.dir = cc.v2(0,0);
        this.lastPos = cc.v2(0,0);
        this.nowPos = cc.v2(0,0);
    }

    // 触摸在屏幕外结束
    touch_Cancel(){
        GameData.dir = cc.v2(0,0);
        this.lastPos = cc.v2(0,0);
        this.nowPos = cc.v2(0,0);
    }

    bindingFish(){
        if(cc.find("Canvas/ziyoumoshi/fish_touch_content/leadfish")){
            this.lead_fish = cc.find("Canvas/ziyoumoshi/fish_touch_content/leadfish");
        }else{
            console.log("加载鱼失败");
        }
    }
}
