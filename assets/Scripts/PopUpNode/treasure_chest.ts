import AudioManager from "../Manager/AudioManager";
import baseManager from "../Manager/baseManager";
import GameData from "../Manager/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class treasure_chest extends baseManager {
    @property(cc.Node)
    content:cc.Node = null;

    jinbi_all_this_round:number = 0;
    already_open:number = 0;
    onLoad () {
        this.init_ui();
        this.already_open = this.random_two(1,3)
    }

    start () {

    }

    update (dt) {}

    init_ui(){
        // this.already_opened = this.random_three(1,e.target.children.length);
        for(let i = 0;i < this.content.children.length;i++){
            cc.find(`block${i+1}/land/treasure_chest`,this.content).active = true;
            cc.find(`block${i+1}/land/jinbi`,this.content).active = false;

            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "treasure_chest";// 这个是代码文件名
            clickEventHandler.handler = "open_random";
            var button = this.content.children[i].getComponent(cc.Button);
            button.clickEvents.push(clickEventHandler);
        }
    }


    open_random(e){
        // 金币数量随机
        if(this.already_open > 0){
            //播放点击宝箱音效
            AudioManager.getInstance().playSound("点击宝箱音");
            this.already_open -= 1;
            let num = Math.random();
            switch(true){
                case num < 0.75:
                    cc.find(`land/jinbi/Label`,e.target).getComponent(cc.Label).string = "50";
                    break;
                case num < 0.85:
                    cc.find(`land/jinbi/Label`,e.target).getComponent(cc.Label).string = "100";
                    break;
                case num < 0.92:
                    cc.find(`land/jinbi/Label`,e.target).getComponent(cc.Label).string = "150";
                    break;
                case num < 0.97:
                    cc.find(`land/jinbi/Label`,e.target).getComponent(cc.Label).string = "200";
                    break;
                case num < 0.99:
                    cc.find(`land/jinbi/Label`,e.target).getComponent(cc.Label).string = "250";
                    break;
                case num < 1:
                    cc.find(`land/jinbi/Label`,e.target).getComponent(cc.Label).string = "300";
                    break;
                    }
            cc.find(`land/jinbi`,e.target).active = true;
            cc.find(`land/treasure_chest`,e.target).active = false;
            e.target.getComponent(cc.Button).destroy();
            this.jinbi_all_this_round += parseInt(cc.find(`land/jinbi/Label`,e.target).getComponent(cc.Label).string);
            GameData.getInstance().local_data.jinbi += this.jinbi_all_this_round;
            GameData.getInstance().local_data_set("jinbi",GameData.getInstance().local_data.jinbi);

            if(this.already_open == 0){
                cc.find("bottom_button",this.node).active = true;
            }
        }
    }

    // 两数之间随机数
    random_two(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }


    // 点击退出弹窗按钮
    on_click_close(){
        this.node.destroy();
    }

    // 点击播放广告继续开宝箱
    on_click_play_ad(){
        this.node.destroy(); 
        // GameData.getInstance().show_ad(); //播放广告成功+3次机会

    }
}
