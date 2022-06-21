import { isPlayEnd } from "../Manager/ADManager";
import AudioManager from "../Manager/AudioManager";
import baseManager from "../Manager/baseManager";
import GameData from "../Manager/GameData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class mall extends baseManager {

    @property(cc.Node)
    mask:cc.Node = null;
    
    @property(cc.Node)
    content:cc.Node = null;;

    onLoad () {
        this.bind_event();
        this.init_ui();
    }

    start () {

    }

    update (dt) {}
    
    // 按钮绑定事件
    bind_event(){
        // 给按钮绑定事件
        for(let i = 0;i < this.content.children.length;i++){
            var clickEventHandler = new cc.Component.EventHandler();
            clickEventHandler.target = this.node; // 这个 node 节点是你的事件处理代码组件所属的节点
            clickEventHandler.component = "mall";// 这个是代码文件名
            clickEventHandler.handler = "click_light";
            clickEventHandler.customEventData = `${i}`; // 将自定义数据放到节点上，方便你在回调中拿到
            var button = this.content.children[i].getChildByName("button").getComponent(cc.Button);
            button.transition = cc.Button.Transition.SCALE;
            button.zoomScale = 1.2;
            button.clickEvents.push(clickEventHandler);
        }
    }

    init_ui(){
        // 根据数据渲染ui
        for(let i = 0;i < this.content.children.length;i++){
            let list = GameData.getInstance().local_data.guanghuan;
            let button = this.content.children[i].getChildByName("button");
            switch(true){
                case list[i] === 0:
                    cc.find('shiyong',button).active = false;
                    cc.find('yishiyong',button).active = false;
                    // 如果金币足够就直接显示价格购买 金币不足就显示免费获取
                    if(GameData.getInstance().local_data.jinbi >= GameData.getInstance().mall_price[i]){
                        cc.find('jinbigoumai',button).active = true;
                        cc.find('mianfeihuode',button).active = false;
                    }else{
                        cc.find('jinbigoumai',button).active = false;
                        cc.find('mianfeihuode',button).active = true;
                    }

                    break;

                case list[i] === 1:
                    cc.find('jinbigoumai',button).active = false;
                    cc.find('shiyong',button).active = true;
                    cc.find('yishiyong',button).active = false;
                    cc.find('mianfeihuode',button).active = false;
                    break;

                case list[i] === 2:
                    cc.find('jinbigoumai',button).active = false;
                    cc.find('shiyong',button).active = false;
                    cc.find('yishiyong',button).active = true;
                    cc.find('mianfeihuode',button).active = false;
                    break;
            }
        }
    }

    // 点击按钮
    click_light(e,value){
        let button = e.target;
        AudioManager.getInstance().playSound("点击按钮音");
        if(cc.find('jinbigoumai',button).active){
            // 判断金币是否足够
            if(GameData.getInstance().local_data.jinbi >= GameData.getInstance().mall_price[parseInt(value)]){
                // 购买 减少所需金币 把状态改为已购买 并且重新渲染ui
                GameData.getInstance().local_data.jinbi -= GameData.getInstance().mall_price[parseInt(value)];
                GameData.getInstance().local_data_set("jinbi",GameData.getInstance().local_data.jinbi);
                GameData.getInstance().local_data.guanghuan[parseInt(value)] = 1;
                GameData.getInstance().local_data_set("guanghuan",GameData.getInstance().local_data.guanghuan);
                this.init_ui();
            }
        }
        else if(cc.find('mianfeihuode',button).active){
            if(isPlayEnd()){
                GameData.getInstance().local_data.guanghuan[parseInt(value)] = 1;
                GameData.getInstance().local_data_set("guanghuan",GameData.getInstance().local_data.guanghuan);
                this.init_ui();
            }
        }
        else if(cc.find('shiyong',button).active){
            if(GameData.getInstance().local_data.guanghuan[parseInt(value)] === 1){
                let guanghuan = cc.instantiate(cc.find("land",button.parent).children[0]); //取出光环
                let fish = GameData.leadFish.node;
                let label = fish.getChildByName("label");
                // 移除其他正在使用的光环 并更改数据 并且重新渲染ui
                for(let i = 0;i < GameData.getInstance().local_data.guanghuan.length;i++){
                    if(GameData.getInstance().local_data.guanghuan[i] === 2 && i !== parseInt(value)){
                        GameData.getInstance().local_data.guanghuan[i] = 1;
                        if(cc.find("guanghuan",fish)) {
                            cc.find("guanghuan",fish).destroy();
                            label.setPosition(cc.v2(label.x,value > 2 ? label.y - 50 : label.y - 30)); // 根据光环的索引来设置label的位置
                        }
                    }
                }
                GameData.getInstance().local_data.guanghuan[parseInt(value)] = 2;
                GameData.getInstance().local_data_set("guanghuan",GameData.getInstance().local_data.guanghuan);
                this.init_ui();

                // 带上光环
                guanghuan.name = 'guanghuan';
                guanghuan.setParent(fish);
                // 设置光环坐标 不挡住鱼
                guanghuan.setPosition(cc.v2(label.x,label.y - 10));
                label.setPosition(cc.v2(label.x,value > 2 ? label.y + 50 : label.y + 30));
            }
        }
        else if(cc.find('yishiyong',button).active){
            if(GameData.getInstance().local_data.guanghuan[parseInt(value)] === 2){
                let fish = GameData.leadFish.node;
                let label = fish.getChildByName("label");
                // 更改数据 渲染ui
                GameData.getInstance().local_data.guanghuan[parseInt(value)] = 1;
                GameData.getInstance().local_data_set("guanghuan",GameData.getInstance().local_data.guanghuan);
                this.init_ui();

                // 移除光环 并且将label的坐标下调
                if(cc.find("guanghuan",fish)){
                    cc.find("guanghuan",fish).destroy();
                    label.setPosition(cc.v2(label.x,value > 2 ? label.y - 50 : label.y - 30));
                    console.log("取消已使用",value);
                }
            }
        }

    }

    // 点击退出页面
    click_back(){
        AudioManager.getInstance().playSound("点击按钮音");
        this.node.emit("remove");
    }
}
