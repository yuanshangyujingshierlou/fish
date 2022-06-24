import AudioManager from "../Manager/AudioManager";
import GameData from "../Manager/GameData";
import { ViewManager } from "../Manager/ViewManager";
import { round } from "./upgrade_type";

const {ccclass, property} = cc._decorator;

@ccclass
export default class ut_lead_fish extends cc.Component {
    score:number = 0; //分数
    aniName:string = "";    //当前动画名称 用来标记动画监听事件
    fishIndex:number = 0; // 鱼的层级 不能回头只能向前或者向上下 
    frameParent:cc.Node = null; // 盒子父节点
    onLoad () {
        GameData.ut_lead_fish = this;
        this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).timeScale = 1.5;
        this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.COMPLETE,(e)=>{
            if(this.aniName == "shengli-1"){
                this.aniName = "daiji-1";
                this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).playAnimation("daiji-1",0);
            }else if(this.aniName == "chi-1"){
                this.aniName = "shengli-1";
                this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).timeScale = 1;
                this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).playAnimation("shengli-1",1);
            }
        },this);
    }

    start () {
        this.score = parseInt(cc.find("tatol_score",this.node).getComponent(cc.Label).string);
    }

    update (dt) {
        // console.log(this.node.x,this.node.y)
    }

    // 打斗动画
    fightAnimation(pos:cc.Vec2){
        let ut = GameData.upgrade_type;
        ut.yanwu = cc.instantiate(ut.yanwuPfb);
        ut.yanwu.getComponent(dragonBones.ArmatureDisplay).once(dragonBones.EventObject.COMPLETE,this.fightEnd,this);
        ut.yanwu.getComponent(dragonBones.ArmatureDisplay).timeScale = 2;
        ut.yanwu.getComponent(dragonBones.ArmatureDisplay).playAnimation("newAnimation",1);
        ut.yanwu.setParent(ut.node);
        ut.yanwu.setPosition(pos);
    }

    // 打斗结束
    fightEnd(){
        let monsterCompoent = this.getRoundComponent(GameData.upgrade_type.now_round);
        let aniCompoent = monsterCompoent.targetFish.getChildByName('animation').getComponent(dragonBones.ArmatureDisplay); //获取动画组件
        if(this.score >= monsterCompoent.target_score){        // 如果数值比怪物高
            // 播放吃对鱼的音效
            AudioManager.getInstance().playSound("闯关模式吃对鱼后音效");
            if(monsterCompoent.targetFish.name.indexOf("boss") != -1){ //如果是boss
                switch(GameData.upgrade_type.now_round){
                    case 1:
                        aniCompoent.playAnimation("shengli",1); //启动动画
                        this.round_win(); //关卡胜利
                        break;
                    case 2:
                        aniCompoent.once(dragonBones.EventObject.COMPLETE,()=>{ //监听动画结束
                            if(aniCompoent.animationName == "shibai"){ //如果是失败动画
                                aniCompoent.playAnimation("daiji",0); //启动动画
                                this.round_win(); //关卡胜利
                            }
                        },this); //启动动画
                        aniCompoent.playAnimation("shibai",1); //启动动画
                        break;
                    case 3:
                    case 4:
                        aniCompoent.once(dragonBones.EventObject.COMPLETE,()=>{ //监听动画结束
                            if(aniCompoent.animationName == "shibai"){ //如果是失败动画
                                aniCompoent.playAnimation("daiji",0); //启动动画
                                this.round_win(); //关卡胜利
                            }
                        },this); //启动动画
                        aniCompoent.timeScale = 2;
                        aniCompoent.playAnimation("shibai",1); //启动动画
                        break;
                }

            }
            else if(monsterCompoent.targetFish.name.indexOf("monster") != -1){   //如果是怪物
                let ut = GameData.upgrade_type; // 获取关卡模式节点
                let score = parseInt(monsterCompoent.targetFish.getChildByName("label").getComponent(cc.Label).string); //拿到目标点分数
                this.frameParent = monsterCompoent.targetFish.parent; // 获取父节点
                this.aniName = "shengli-1";// 标记当前动画
                this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).playAnimation(this.aniName,1); //启动动画
                this.syncScore(score);  //更新分数
                ut.yanwu.destroy();   //销毁烟雾节点
                monsterCompoent.targetFish.destroy();//销毁目标节点
                if(GameData.upgrade_type.now_round == 4 && GameData.mapComponent.frameNum == 4){ //如果有三个盒子 并且打完了目前目标
                    GameData.mapComponent.addFrame(this.frameParent); //就自动加一个盒子
                }
            }
            if(GameData.upgrade_type.now_round <= 2)    {
                GameData.upgrade_tpye_move.isMove = false; //关闭移动锁
            }else{
                if(this.frameParent) {
                    this.node.setPosition(this.frameParent.getPosition().x + this.frameParent.parent.x, this.frameParent.getPosition().y +this.frameParent.parent.y);
                }else{
                    this.node.setPosition(this.node.getPosition().x + this.node.width / 2,this.node.getPosition().y);
                }
            }
        }else{ //如果数值比怪物低
            if(monsterCompoent.targetFish.name.indexOf("boss") != -1){ //如果是boss
                if(GameData.upgrade_type.now_round == 2){ //如果是第二关
                    aniCompoent.once(dragonBones.EventObject.COMPLETE,()=>{ //监听动画结束
                        if(aniCompoent.animationName == "shengli"){ //如果是boss胜利动画
                            console.log("游戏失败"); //游戏失败
                            ViewManager.showView('fail_page'); //显示失败页面
                        }
                    }) //监听动画结束
                    aniCompoent.playAnimation("shengli",1); //启动动画
                }else{
                    console.log("游戏失败");
                    ViewManager.showView('fail_page');
                }
            }else if(monsterCompoent.targetFish.name.indexOf("monster") != -1){
                console.log("游戏失败");
                ViewManager.showView('fail_page');
            }
        }
    }

    // 关卡胜利
    round_win(){
        let monsterCompoent = this.getRoundComponent(GameData.upgrade_type.now_round); //获取不同关卡的组件
        this.aniName = "shengli-1";// 标记当前动画
        this.node.setPosition(monsterCompoent.targetFish.x - monsterCompoent.targetFish.width/2 - this.node.width / 2,this.node.y); // 设置位置 不然会挡住boss
        let ut = GameData.upgrade_type; // 获取关卡模式节点
        let label = monsterCompoent.targetFish.getChildByName("label").getComponent(cc.Label); //拿到分数目标点
        label.node.active = false; // 取消掉boss分数
        this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).playAnimation(this.aniName,1); //启动 升级动画
        ut.yanwu.destroy();   //销毁烟雾节点
        this.syncScore(parseInt(label.string));  //更新分数
        ViewManager.showView("win_page"); // 显示胜利页面
    }
    // 同步分数
    syncScore(score:number){
        this.score += score;
        let nowScore = cc.find("now_score",this.node).getComponent(cc.Label); // 获取加分节点
        nowScore.string = `${score}`; // 更新分数
        nowScore.node.active = true; // 启动分数动画
    }

    // 道具动画
    propAnimation(node:cc.Node){
        let string = node.getChildByName("qipaoLabel").getComponent(cc.Label).string; //拿到目标点分数
        let score = this.getNumber(string); //拿到目标点分数
        this.aniName = "chi-1";// 标记当前动画
        this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).once(dragonBones.EventObject.START,()=>{ //注册动画监听事件 在开始的时候调用
            if(this.aniName == "chi-1"){
                cc.tween(node.getChildByName("qipaoLabel")).to(0.2,{opacity:0})
                .call(()=>{
                    this.propAddScore(score);
                    if(GameData.upgrade_type.now_round <= 2)GameData.upgrade_tpye_move.isMove = false; //关闭移动锁
                    node.destroy();
                },this)
                .start();
            }
        },this);
        this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).timeScale = 2; //更改动画速率
        this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).playAnimation(this.aniName,1); //启动动画
    }

    // 道具加分
    propAddScore(magnification:number){
        this.score *= magnification;
        let tatol_score = this.node.getChildByName("tatol_score"); // 获取总分节点
        let monsterCompoent = this.getRoundComponent(GameData.upgrade_type.now_round);
        this.frameParent = monsterCompoent.targetFish.parent; // 获取父节点
        if(GameData.upgrade_type.now_round == 4 && GameData.mapComponent.frameNum == 4){ // 如果有四个框了
            GameData.mapComponent.addFrame(this.frameParent); // 添加一个新的框
        }
        cc.tween(tatol_score).to(0.1,{scale:1.2}).to(0.2,{scale:1}).call(()=>{
            tatol_score.getComponent(cc.Label).string = `${this.score}`;// 更新总分数
            if(GameData.upgrade_type.now_round < 4){ //如果不是最后一关
                cc.tween(cc.find('Canvas/Main Camera'))
                .call(()=>{
                    let posX = this.node.x - cc.find('Canvas/Main Camera').x
                    GameData.upgrade_type.cameraX += (posX + GameData.screenSize.width/2 - this.node.width / 2 - 30); // 更新摄像机位置
                    GameData.upgrade_type.background_move(); // 背景移动
                    monsterCompoent.targetFish = null;
                    monsterCompoent.removeFish();
                    GameData.upgrade_type.lastCameraX = cc.find('Canvas/Main Camera').x;
                })
                .to(0.5,{x:this.node.x + GameData.screenSize.width / 2 - this.node.width / 2 - 30})
                .call(()=>{
                    GameData.upgrade_type.nowCameraX = cc.find('Canvas/Main Camera').x;
                    GameData.upgrade_type.distanceX += (GameData.upgrade_type.nowCameraX - GameData.upgrade_type.lastCameraX);
                })
                .start();
            }else{
                monsterCompoent.targetFish = null;
                monsterCompoent.removeFish();
            }
        }).start();
    }

    // 提取字符串中的数字 按十进制转换
    getNumber(string:string){
        let score = string.match(/[0-9]/g); // 匹配数字
        let num = 0;
        for(let i = 0;i<score.length;i++){
            num += parseInt(score[i]) * Math.pow(10,score.length-i-1);
        }
        return num;
    }

    // 返回关卡对应的组件
    getRoundComponent(round:number){
        if(round <= 2){
            return GameData.monsterFish_Component;
        }else{
            return GameData.mapComponent;
        }
    }
}
