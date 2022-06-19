
import GmaeData  from "../Manager/GameData"

const {ccclass, property} = cc._decorator;

@ccclass
export default class dialog extends cc.Component {

//     private dialogPool = new cc.NodePool();
    /** 显示消息弹窗 */
    message(msg: string){
//         let dlg: cc.Node;
//         if(this.dialogPool.size() > 0) dlg = this.dialogPool.get();
//         else dlg = cc.instantiate(this.dialog);

        let text = cc.find('/text',this.node).getComponent(cc.Label);
        text.string = msg;
        let bg = cc.find('/background',this.node);
        bg.width = text.node.width / 0.9;
        bg.height = text.node.height / 0.9;
        this.node.setPosition(0, -100);
        this.node.scale = 0.7;
        this.node.opacity = 130;
        this.node.zIndex = 10;

        cc.tween(this.node)
        .to(0.25, {
            scale: 1
            ,opacity: 255
            ,y: 0
        }).delay(0.5)
        .to(0.4, {
            scale: 0.7
            ,opacity: 130
            ,y: 100
        }).call(()=>{
                this.node.removeFromParent();
//              this.dialogPool.put(this.node);
        }).start();
    }

    onLoad () {
        this.message(GmaeData.toastText);
    }

    start () {

    }

    update (dt) {}
}
