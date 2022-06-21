import GameData from "../Manager/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class upgrade_tpye_move extends cc.Component {
    nowPos = cc.v2(0,0);
    isClick_leadfish:boolean = false; // 有没有点击主角
    isMove:boolean = false;           // 主角是否正在移动 移动中无法被点击
    speed:number = 650;               // 主角移动速度
    angle:number = null;              // 主角移动角度
    
    protected onLoad () {
        GameData.upgrade_tpye_move = this;
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

    }
    // 触摸开始
    touch_Start(event:cc.Event.EventTouch){
        if(this.isMove) return;
        this.isClick_leadfish = true;
        let pos = event.getLocation();
        let nodePos = this.node.convertToNodeSpaceAR(pos);
        this.nowPos = cc.v2(pos.x - GameData.screenSize.width / 2 - nodePos.x + this.node.width / 2,pos.y - GameData.screenSize.height / 2 - nodePos.y);

    }
    // 触摸移动
    touch_Move(event:cc.Event.EventTouch){
        if(this.isMove) return;
        let pos = event.getLocation();
        let movePos = cc.v2(pos.x - GameData.screenSize.width / 2 + GameData.upgrade_type.cameraX,pos.y - GameData.screenSize.height / 2);
        // 绘制虚线
        let round = GameData.check_node_name(GameData.upgrade_type.node,"round");
        let g = round.getChildByName('draw_line').getComponent(cc.Graphics);
        this.drawLineOfDashes(g,this.nowPos,movePos);
        // 算出角度
        this.angle = this.getVectorRadians(this.nowPos.x,this.nowPos.y,movePos.x,movePos.y);
    }
    // 触摸结束
    touch_End(event:cc.Event.EventTouch){
        this.isClick_leadfish = false;
        let round = GameData.check_node_name(GameData.upgrade_type.node,"round");
        let g = round.getChildByName('draw_line').getComponent(cc.Graphics);
        g.clear();
        this.nowPos = cc.v2(0,0);
    }
    // 触摸取消
    touch_Cancel(event:cc.Event.EventTouch){
        this.isClick_leadfish = false;
        let round = GameData.check_node_name(GameData.upgrade_type.node,"round");
        let g = round.getChildByName('draw_line').getComponent(cc.Graphics);
        g.clear(); 
        this.nowPos = cc.v2(0,0);
    }
    // 绘制虚线
    drawLineOfDashes(g: cc.Graphics, from: cc.Vec2, to: cc.Vec2, stroke: boolean = true, length: number = 20, interval: number = 20): void {
        if (g) {
            g.clear();
            let off = to.sub(from);
            let dir = off.normalize();
            let dis = off.mag();
            let delta = dir.mul(length + interval);
            let delta1 = dir.mul(length);
            let n = Math.floor(dis / (length + interval));
            for (let i = 0; i < n; ++i) {
                let start = from.add(delta.mul(i));
                g.moveTo(start.x, start.y);
                let end = start.add(delta1);
                g.lineTo(end.x, end.y);
            }
            let start1 = from.add(delta.mul(n));
            g.moveTo(start1.x, start1.y);
            if (length < dis - (length + interval) * n) {
                let end = start1.add(delta1);
                g.lineTo(end.x, end.y);
            } else {
                g.lineTo(to.x, to.y);
            }
            if (stroke) g.stroke();
        }
    }
    // 计算角度
    getVectorRadians( x1,  y1,  x2,  y2){
        let len_y = y2 - y1;
        let len_x = x2 - x1;

        let tan_yx = Math.abs(len_y)/Math.abs(len_x);
        let angle = 0;
        if(len_y > 0 && len_x < 0) {
            angle = -Math.atan(tan_yx) * 180 / Math.PI + 180;
        }
        else if (len_y > 0 && len_x > 0) {
            angle = Math.atan(tan_yx) * 180 / Math.PI ;
        } 
        else if(len_y < 0 && len_x < 0) {
            angle = Math.atan(tan_yx) * 180 / Math.PI - 180;
        } 
        else if(len_y < 0 && len_x > 0) {
            angle = -Math.atan(tan_yx) * 180 / Math.PI ;
        }
        return angle
    }
}
