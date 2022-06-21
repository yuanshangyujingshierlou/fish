window.__require = function e(t, n, a) {
function o(r, c) {
if (!n[r]) {
if (!t[r]) {
var s = r.split("/");
s = s[s.length - 1];
if (!t[s]) {
var l = "function" == typeof __require && __require;
if (!c && l) return l(s, !0);
if (i) return i(s, !0);
throw new Error("Cannot find module '" + r + "'");
}
r = s;
}
var d = n[r] = {
exports: {}
};
t[r][0].call(d.exports, function(e) {
return o(t[r][1][e] || e);
}, d, d.exports, e, t, n, a);
}
return n[r].exports;
}
for (var i = "function" == typeof __require && __require, r = 0; r < a.length; r++) o(a[r]);
return o;
}({
AdaptarManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "77051/RczpBuKy0pEiGKBQV", "AdaptarManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = function() {
function e() {
this.fullWidth = 0;
this.fullHeight = 0;
}
e.getInstance = function() {
null == this.instance && (this.instance = new e());
return this.instance;
};
e.prototype.initLandscape = function() {
var t = cc.view.getFrameSize(), n = t.height, a = t.width;
this.fullWidth = n / a * e.WIDTH;
this.fullHeight = e.WIDTH;
};
e.prototype.initVertical = function() {
var t = cc.view.getFrameSize(), n = t.height, a = t.width;
this.fullHeight = n / a * e.WIDTH;
this.fullWidth = e.WIDTH;
};
e.prototype.adaptarBg = function(e) {
if (e) {
e.width = this.fullWidth;
e.height = this.fullHeight;
e.setPosition(cc.v2(0, 0));
}
};
e.prototype.adaptarLogo = function(e) {
e && (e.y = this.fullHeight / 2 - 380);
};
e.prototype.adapterVerticalUIBottom = function(e) {
if (e) {
e.y = -this.fullHeight / 2 + 67;
this.fullHeight / this.fullWidth > 2 && (e.y = -this.fullHeight / 2 + 127);
}
};
e.prototype.adapterFightUIBottom = function() {};
e.prototype.adapterDarwMoneyDownUI = function(e) {
e && (e.y = -this.fullHeight / 2 + 20);
};
e.prototype.adapterFightUITop = function(e) {
if (e) if (this.fullHeight >= 1400) {
e.y = this.fullHeight / 2;
e.getChildByName("dongtaiIcon") && (e.getChildByName("dongtaiIcon").y = e.getChildByName("dongtaiIcon").y - 120);
} else e.y = this.fullHeight / 2;
};
e.prototype.adapterFightUIMoveNode = function(e) {
e && (1280 == this.fullHeight ? e.y = -177 : this.fullHeight > 1280 && this.fullHeight < 1400 ? e.y = -177 - (this.fullHeight - 1280) / 2 : this.fullHeight >= 1400 && (e.y = -177 - (this.fullHeight - 1280 - 80) / 2));
};
e.prototype.adapterVerticalUITop = function(e) {
if (e) {
e.y = this.fullHeight / 2 - 70;
this.fullHeight / this.fullWidth > 1.8 && (e.y = this.fullHeight / 2 - 70);
}
};
e.prototype.adapterVerticalUIBody = function(t) {
if (t) {
t.y = (this.fullHeight - e.HEIGHT) / 2;
this.fullHeight / this.fullWidth > 1.8 && (t.y = (this.fullHeight - e.HEIGHT) / 4);
}
};
e.prototype.isChangPing = function() {
var e = cc.view.getFrameSize();
return e.height / e.width > 2;
};
e.prototype.adapterVerticalUIFindTop = function(e) {
if (e) {
e.y = this.fullHeight / 2;
this.fullHeight / this.fullWidth > 2 && (e.y = this.fullHeight / 2);
}
};
e.prototype.adapterVerticalUIWnd = function(t) {
if (t) {
t.x = e.WIDTH / 2;
t.y = this.fullHeight / 2;
}
};
e.WIDTH = 750;
e.HEIGHT = 1334;
return e;
}();
n.default = a;
cc._RF.pop();
}, {} ],
AudioManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "b3e997xaWtDYpWkaaJaM9N0", "AudioManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = e("./GameData"), o = function() {
function e() {
this.musicVolume = .7;
this.soundVolume = .7;
this.bgMusicAudioID = -1;
}
e.getInstance = function() {
null == this.instance && (this.instance = new e());
return this.instance;
};
e.prototype.init = function() {
cc.game.on(cc.game.EVENT_HIDE, function() {});
cc.game.on(cc.game.EVENT_SHOW, function() {});
a.default.music.musicVolume ? this.musicVolume = a.default.music.musicVolume : this.musicVolume = .5;
a.default.music.soundVolume ? this.soundVolume = a.default.music.soundVolume : this.soundVolume = .5;
};
e.prototype.playMusic = function(t) {
var n = this;
cc.resources.load(e.AUDIO_URL + t, cc.AudioClip, function(e, t) {
n.bgMusicAudioID >= 0 && cc.audioEngine.stop(n.bgMusicAudioID);
n.bgMusicAudioID = cc.audioEngine.play(t, !0, n.musicVolume);
});
};
e.prototype.playSound = function(t) {
var n = this;
cc.resources.load(e.AUDIO_URL + t, cc.AudioClip, function(e, t) {
n.soundVolume > 0 && cc.audioEngine.play(t, !1, n.soundVolume);
});
};
e.prototype.setSoundVolume = function(e) {
if (this.soundVolume != e) {
this.soundVolume = e;
a.default.music.musicVolume = this.soundVolume;
}
};
e.prototype.pauseBgM = function() {
this.bgMusicAudioID >= 0 && cc.audioEngine.pause(this.bgMusicAudioID);
};
e.prototype.setMusicVolume = function(e) {
this.bgMusicAudioID >= 0 && (e > 0 ? cc.audioEngine.resume(this.bgMusicAudioID) : cc.audioEngine.pause(this.bgMusicAudioID));
if (this.musicVolume != e) {
this.musicVolume = e;
cc.audioEngine.setVolume(this.bgMusicAudioID, e);
a.default.music.musicVolume = this.musicVolume;
}
};
e.prototype.pauseAll = function() {
cc.audioEngine.pauseAll();
};
e.prototype.resumeAll = function() {
cc.audioEngine.resumeAll();
};
e.AUDIO_URL = "music/";
return e;
}();
n.default = o;
cc._RF.pop();
}, {
"./GameData": "GameData"
} ],
ColorAssembler2D: [ function(e, t) {
"use strict";
cc._RF.push(t, "cb2a284OKFOiLDwiw2bdw1u", "ColorAssembler2D");
cc.Class({
extends: cc.Component,
properties: {
colors: [ cc.Color ]
},
onLoad: function() {},
onEnable: function() {
cc.director.once(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
},
onDisable: function() {
cc.director.off(cc.Director.EVENT_AFTER_DRAW, this._updateColors, this);
this.node._renderFlag |= cc.RenderFlow.FLAG_COLOR;
},
_updateColors: function() {
var e = this.getComponent(cc.RenderComponent);
if (e) {
var t = e._assembler;
if (t instanceof cc.Assembler2D) {
var n = t._renderData.uintVDatas[0];
if (n) for (var a = this.node.color, o = t.floatsPerVert, i = 0, r = t.colorOffset, c = n.length; r < c; r += o) n[r] = (this.colors[i++] || a)._val;
}
}
}
});
cc._RF.pop();
}, {} ],
GameData: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "5f837G992ZD8bR6B4/e0AVH", "GameData");
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = e("../game/gameStart"), o = function() {
function e() {
this.local_data = {
free_round: 1,
jinbi: 0,
login_day: 1,
last_login_time: 0,
reward_status: !1,
guanghuan: [ 0, 0, 0, 0, 0, 0 ]
};
this.mall_price = [ 1e3, 2e3, 3e3, 4e3, 5e3, 6e3 ];
this.sign_in_reward = {
1: 100,
2: 200,
3: 300,
4: 400,
5: 500,
6: 600,
7: 1e3
};
}
e.getInstance = function() {
null == this.instance && (this.instance = new e());
return this.instance;
};
e.prototype.local_data_set = function(t, n) {
this.local_data[t] = n;
localStorage.setItem("fish_data", JSON.stringify(e.getInstance().local_data));
"jinbi" === t && ("ziyou" === e.ViewMain.gameType ? e.free_type.update_jinbi() : "guanqia" === e.ViewMain.gameType && e.upgrade_type.update_jinbi());
};
e.prototype.local_data_perserve = function(e) {
this.local_data = e;
};
e.monster_fish_setAnimation = function(t, n, a) {
if (e.monsterFish.__get__(t.name) && t) {
switch (e.monsterFish.__get__(t.name).direction) {
case "right":
t.scaleX = 1;
break;

case "left":
t.scaleX = -1;
}
t.getComponent(dragonBones.ArmatureDisplay).playAnimation(n, a);
}
};
e.lead_fish_setAnimation = function(t, n, a) {
if (e.lead_fish.isActivation && t) {
switch (e.lead_fish.direction) {
case "right":
t.scaleX = 1;
break;

case "left":
t.scaleX = -1;
}
if ("qianyi-1" != n) {
"chi-1" == n && (t.getComponent(dragonBones.ArmatureDisplay).timeScale = 2.5);
t.getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.LOOP_COMPLETE, function() {
"shengli-1" == n && e.free_type.upgrade_lead_fish();
t.getComponent(dragonBones.ArmatureDisplay).timeScale = 1;
t.getComponent(dragonBones.ArmatureDisplay).playAnimation("qianyi-1", 0);
});
}
t.getComponent(dragonBones.ArmatureDisplay).playAnimation(n, a);
}
};
e.check_node_name = function(e, t) {
if (e) {
for (var n = null, a = 0; a < e.children.length; a++) -1 != e.children[a].name.indexOf(t) && (n = e.children[a]);
return n || null;
}
};
e.gameStart = new a.default();
e.music = {};
e.monsterFish = {
__get__: function(e) {
if (this[e]) return this[e];
},
__set__: function(e, t) {
this[e] = t;
}
};
e.isPause = !1;
e.pauseFishMove_action_name = [];
e.muban = {
__get__: function(e) {
if (this[e]) return this[e];
},
__set__: function(e, t) {
this[e] = t;
}
};
e.dir = cc.v2(0, 0);
e.toastText = "";
e.lead_fish = {
isActivation: !1,
direction: "",
ani_name: ""
};
return e;
}();
n.default = o;
cc._RF.pop();
}, {
"../game/gameStart": "gameStart"
} ],
PopUpDataManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "87d26ef1H5MYazqrR+mtYaE", "PopUpDataManager");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("./GameData"), c = e("./ViewManager"), s = cc._decorator, l = s.ccclass, d = (s.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
this.node.zIndex = 99;
c.ViewManager.PopUpComponent = this;
};
t.prototype.start = function() {
this.node.on("child-removed", this.onChildRemoved, this);
};
t.prototype.onChildRemoved = function(e) {
if (r.default.isPlay) {
this.resumeGame();
"treasure_chest" == e.name && r.default.lead_fish_setAnimation(r.default.leadFish.node, "shengli-1", 0);
}
};
t.prototype.resumeGame = function() {
Object.keys(r.default.monsterFish).forEach(function(e) {
if (r.default.monsterFish[e].name && -1 != r.default.monsterFish[e].name.indexOf("monster")) {
var t = r.default.monsterFish[e].name, n = r.default.free_type.node.getChildByName("monster");
if (n.getChildByName(t)) {
n.getChildByName(t).resumeAllActions();
n.getChildByName(t).getComponent(dragonBones.ArmatureDisplay).timeScale = 1;
r.default.isPause = !1;
n.getChildByName(t).emit("resume");
}
}
}.bind(this));
};
t.prototype.update = function() {};
return i([ l ], t);
}(cc.Component));
n.default = d;
cc._RF.pop();
}, {
"./GameData": "GameData",
"./ViewManager": "ViewManager"
} ],
ViewMain: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ae936K44HhLZIypSfc1qEaJ", "ViewMain");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("./Manager/AudioManager"), c = e("./Manager/GameData"), s = e("./Manager/ViewManager"), l = cc._decorator, d = l.ccclass, u = l.property, f = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.fish_list = null;
t.guanghuan_list = null;
t.gameType = "";
t.bg = null;
return t;
}
n = t;
t.getInstance = function() {
null == this.instance && (this.instance = new n());
return this.instance;
};
t.prototype.onLoad = function() {
c.default.ViewMain = this;
localStorage.getItem("fish_data") ? c.default.getInstance().local_data_perserve(JSON.parse(localStorage.getItem("fish_data"))) : localStorage.setItem("fish_data", JSON.stringify(c.default.getInstance().local_data));
c.default.screenSize = cc.view.getVisibleSize();
c.default.canvasSize = cc.view.getCanvasSize();
c.default.monsterFishNumber = 10;
this.loading_Animation();
r.default.getInstance().playMusic("大厅背景声音");
};
t.prototype.start = function() {
this.adaptionBG();
this.daily_sign();
};
t.prototype.update = function() {};
t.prototype.daily_sign = function() {
if (0 === c.default.getInstance().local_data.last_login_time) {
c.default.getInstance().local_data.last_login_time = new Date().getTime();
c.default.getInstance().local_data.reward_status = !1;
} else {
var e = new Date().getTime(), t = c.default.getInstance().local_data.last_login_time, n = Math.floor((e - t) / 864e5);
if (n > 0) {
c.default.getInstance().local_data.last_login_time = e;
c.default.getInstance().local_data.login_day += n;
c.default.getInstance().local_data.reward_status = !1;
}
}
console.log("登录天数：" + c.default.getInstance().local_data.login_day);
};
t.prototype.click_sign_in = function() {
r.default.getInstance().playSound("点击按钮音");
s.ViewManager.showView("sign_in");
};
t.prototype.clickMall = function() {
r.default.getInstance().playSound("点击按钮音");
s.ViewManager.showView("mall");
};
t.prototype.adaptionBG = function() {
var e = cc.find("background", this.node);
e.width = 3 * c.default.screenSize.width;
e.children.forEach(function(e) {
e.width = c.default.screenSize.width;
console.log(e.width);
});
};
t.prototype.click_ziyou_Start = function() {
r.default.getInstance().playSound("点击按钮音");
c.default.isPlay = !0;
this.click_Start_Animation("ziyou");
};
t.prototype.click_shengji_Start = function() {
r.default.getInstance().playSound("点击按钮音");
this.click_Start_Animation("guanqia");
};
t.prototype.click_Start_Animation = function(e) {
this.gameType = e;
var t = cc.find("Canvas/homePage/logo"), n = cc.find("Canvas/homePage/chuangguanmoshi"), a = cc.find("Canvas/homePage/ziyoumoshi");
cc.tween(t).to(.5, {
y: c.default.screenSize.height / 2 + t.height / 2
}).start();
cc.tween(n).to(.5, {
x: c.default.screenSize.width / 2 + n.width / 2
}).start();
cc.tween(a).to(.5, {
x: -c.default.screenSize.width / 2 - a.width / 2
}).start();
setTimeout(function() {
t.parent.active = !1;
"ziyou" == e ? c.default.gameStart.isInit || (cc.find("Canvas/ziyoumoshi").active = !0) : "guanqia" == e && c.default.upgrade_type.init(c.default.upgrade_type.now_round);
}, 501);
};
t.prototype.loading_Animation = function() {
var e = cc.find("Canvas/homePage/logo"), t = cc.find("Canvas/homePage/chuangguanmoshi"), n = cc.find("Canvas/homePage/ziyoumoshi");
e.parent.active = !0;
cc.tween(e).to(.5, {
y: c.default.screenSize.height / 2 - e.height / 2 - 130
}).start();
cc.tween(t).to(.5, {
x: 0
}).start();
cc.tween(n).to(.5, {
x: -20
}).start();
};
var n;
i([ u(cc.Prefab) ], t.prototype, "fish_list", void 0);
i([ u(cc.Prefab) ], t.prototype, "guanghuan_list", void 0);
i([ u(cc.Node) ], t.prototype, "bg", void 0);
return n = i([ d ], t);
}(cc.Component);
n.default = f;
cc._RF.pop();
}, {
"./Manager/AudioManager": "AudioManager",
"./Manager/GameData": "GameData",
"./Manager/ViewManager": "ViewManager"
} ],
ViewManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "6d526DFDZtKwayq6Cbw7cpJ", "ViewManager");
Object.defineProperty(n, "__esModule", {
value: !0
});
n.ViewManager = void 0;
var a = e("./GameData"), o = function() {
function e() {}
e.showView = function(t) {
var n = this;
cc.find(t, e.PopUpComponent.node) ? console.log(t + "窗体已经展示") : cc.resources.load("prefab/" + t, function(a, o) {
if (a) console.log(a); else if (o) {
cc.instantiate(o).setParent(e.PopUpComponent.node);
n.PopupPageData.forEach(function(e) {
t == e && console.log("打开了弹窗:", t);
});
}
});
};
e.closeView = function(t) {
var n = cc.find(t, e.PopUpComponent.node);
n ? n.removeFromParent() : console.log(t + "窗体已经被移除");
};
e.flToast = function(t) {
a.default.toastText = t;
e.showView("dialog");
};
e.PopupPageData = [ "mall", "sign_in", "fail_page", "treasure_chest", "win_page" ];
return e;
}();
n.ViewManager = o;
cc._RF.pop();
}, {
"./GameData": "GameData"
} ],
baseManager: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "01fcawA6P5BoJ4csIhhJ6Lt", "baseManager");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("./GameData"), c = cc._decorator, s = c.ccclass, l = (c.property, function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {};
t.prototype.onEnable = function() {
var e = this;
this.node.once("remove", function() {
r.default.gameStart.gameContinue();
cc.tween(e.node).call(function() {
cc.find("mask", e.node) && (cc.find("mask", e.node).active = !1);
}).to(.15, {
scale: 0
}).call(function() {
this.node.removeFromParent();
}.bind(e)).start();
});
this.node.setPosition(cc.find("Canvas/Main Camera").getPosition());
if ("ziyou" == r.default.ViewMain.gameType) {
r.default.leadFishMove.touch_End();
Object.keys(r.default.monsterFish).forEach(function(e) {
if (r.default.monsterFish[e].name && -1 != r.default.monsterFish[e].name.indexOf("monster")) {
var t = r.default.monsterFish[e].name, n = r.default.free_type.node.getChildByName("monster");
if (n.getChildByName(t)) {
n.getChildByName(t).pauseAllActions();
n.getChildByName(t).getComponent(dragonBones.ArmatureDisplay).timeScale = 0;
r.default.isPause = !0;
n.getChildByName(t).emit("pause");
}
}
}.bind(this));
} else r.default.ViewMain.gameType;
};
t.prototype.onDestroy = function() {};
t.prototype.onDisable = function() {};
t.prototype.start = function() {};
t.prototype.update = function() {};
return i([ s ], t);
}(cc.Component));
n.default = l;
cc._RF.pop();
}, {
"./GameData": "GameData"
} ],
dialog: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e8744JDbwdKa5erYbM+QoBj", "dialog");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/GameData"), c = cc._decorator, s = c.ccclass, l = (c.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.message = function(e) {
var t = this, n = cc.find("/text", this.node).getComponent(cc.Label);
n.string = e;
var a = cc.find("/background", this.node);
a.width = n.node.width / .9;
a.height = n.node.height / .9;
this.node.setPosition(0, -100);
this.node.scale = .7;
this.node.opacity = 130;
this.node.zIndex = 10;
cc.tween(this.node).to(.25, {
scale: 1,
opacity: 255,
y: 0
}).delay(.5).to(.4, {
scale: .7,
opacity: 130,
y: 100
}).call(function() {
t.node.removeFromParent();
}).start();
};
t.prototype.onLoad = function() {
this.message(r.default.toastText);
};
t.prototype.start = function() {};
t.prototype.update = function() {};
return i([ s ], t);
}(cc.Component));
n.default = l;
cc._RF.pop();
}, {
"../Manager/GameData": "GameData"
} ],
fail_page: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "0e1513v9RhATpTDCZO5yBHu", "fail_page");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/baseManager"), c = e("../Manager/GameData"), s = e("../game/upgrade_type"), l = e("../Manager/AudioManager"), d = cc._decorator, u = d.ccclass, f = (d.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
t.prototype.onLoad = function() {
if (c.default.ViewMain.gameType) {
l.default.getInstance().playSound("失败");
var e = "ziyou" === c.default.ViewMain.gameType;
cc.find("bottom", this.node).children.forEach(function(t) {
cc.find("ziyoumoshi", t).active = e;
cc.find("guanqiamoshi", t).active = !e;
});
}
};
t.prototype.start = function() {};
t.prototype.update = function() {};
t.prototype.click_restart = function() {
l.default.getInstance().playSound("点击按钮音");
if ("ziyou" == c.default.ViewMain.gameType) {
console.log("看了广告");
this.node.removeFromParent();
} else if ("guanqia" == c.default.ViewMain.gameType) {
this.node.removeFromParent();
c.default.upgrade_type.removeRound(s.round.first_round);
}
};
t.prototype.click_back = function() {
l.default.getInstance().playSound("点击按钮音");
if ("ziyou" == c.default.ViewMain.gameType) {
this.node.removeFromParent();
c.default.free_type.gameOver();
cc.director.loadScene("main");
} else if ("guanqia" == c.default.ViewMain.gameType) {
console.log("广告播放成功");
this.node.removeFromParent();
c.default.upgrade_type.removeRound(c.default.upgrade_type.now_round);
}
};
return i([ u ], t);
}(r.default));
n.default = f;
cc._RF.pop();
}, {
"../Manager/AudioManager": "AudioManager",
"../Manager/GameData": "GameData",
"../Manager/baseManager": "baseManager",
"../game/upgrade_type": "upgrade_type"
} ],
free_type: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "fce94BUYcRAe7PF5xWdHgKJ", "free_type");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/AudioManager"), c = e("../Manager/GameData"), s = e("../Manager/ViewManager"), l = e("../PopUpNode/treasure_chest"), d = e("../ViewMain"), u = e("./leadFish"), f = cc._decorator, p = f.ccclass, h = f.property, g = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.now_icon = null;
t.next_icon = null;
t.mubiao_label = null;
t.progressbar = null;
t.now_exp = 0;
t.next_node = null;
t.jinbi_label = null;
return t;
}
t.prototype.onLoad = function() {
c.default.free_type = this;
};
t.prototype.onEnable = function() {
this.upgrade_experience = 100 + 10 * Math.pow(c.default.getInstance().local_data.free_round, 2);
this.now_exp = 100;
this.random_bg();
this.init();
this.init_progressBar(c.default.leadFish.node.getComponent(dragonBones.ArmatureDisplay).dragonAsset.name);
this.load_npc_fish();
this.update_jinbi();
};
t.prototype.onDisable = function() {};
t.prototype.start = function() {};
t.prototype.update = function() {};
t.prototype.update_jinbi = function() {
this.jinbi_label.string = "" + c.default.getInstance().local_data.jinbi;
};
t.prototype.init = function() {
r.default.getInstance().playMusic("自由模式背景音");
c.default.gameStart.isInit || c.default.gameStart.initLeadFish("yu1_ske", cc.v2(0, 0));
};
t.prototype.random_bg = function() {
for (var e = new l.default().random_two(1, 2), t = function(t) {
cc.resources.load("images/bj/round" + e + "/round" + e + "-" + (t + 1), cc.SpriteFrame, function(e, n) {
if (e) cc.error(e); else if (n) {
c.default.ViewMain.bg.children[t].getComponent(cc.Sprite).spriteFrame = n;
c.default.ViewMain.bg.children[t].width = c.default.screenSize.width;
}
});
}, n = 0; n < c.default.ViewMain.bg.children.length; n++) t(n);
};
t.prototype.init_progressBar = function(e) {
var t = e.match(/\w/g).join(""), n = cc.find("Canvas").getComponent(d.default).fish_list, a = t.match(/[1-9]/);
if (parseInt(a[0]) < n.data.children.length) {
var o = cc.instantiate(n.data.getChildByName(t)), i = t.slice(0, a.index), r = t.slice(a.index + 1), s = i + (parseInt(a[0]) + 1) + r, l = cc.instantiate(n.data.getChildByName(s));
this.next_node = l;
this.now_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAsset = o.getComponent(dragonBones.ArmatureDisplay).dragonAsset;
this.now_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAtlasAsset = o.getComponent(dragonBones.ArmatureDisplay).dragonAtlasAsset;
this.next_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAsset = l.getComponent(dragonBones.ArmatureDisplay).dragonAsset;
this.next_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAtlasAsset = l.getComponent(dragonBones.ArmatureDisplay).dragonAtlasAsset;
this.next_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).playAnimation("daiji-1", 0);
this.now_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).playAnimation("daiji-1", 0);
} else {
this.now_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAsset = this.next_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAsset;
this.now_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAtlasAsset = this.next_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).dragonAtlasAsset;
this.now_icon.getChildByName("ani").getComponent(dragonBones.ArmatureDisplay).playAnimation("daiji-1", 0);
}
var u = 58.4 / this.now_icon.getChildByName("ani").width, f = 51.2 / this.now_icon.getChildByName("ani").height, p = 58.4 / this.next_icon.getChildByName("ani").width, h = 51.2 / this.next_icon.getChildByName("ani").height;
this.now_icon.getChildByName("ani").scaleX = u;
this.now_icon.getChildByName("ani").scaleY = f;
this.next_icon.getChildByName("ani").scaleX = p;
this.next_icon.getChildByName("ani").scaleY = h;
cc.find("dengji/label", this.now_icon).getComponent(cc.Label).string = "LV." + c.default.getInstance().local_data.free_round;
cc.find("dengji/label", this.next_icon).getComponent(cc.Label).string = "LV." + (c.default.getInstance().local_data.free_round + 1);
this.mubiao_label.string = "LV." + (c.default.getInstance().local_data.free_round + 1);
this.progressbar.progress = 0;
};
t.prototype.update_progressBar = function(e) {
this.now_exp += e;
var t = this.now_exp / this.upgrade_experience;
if (t >= 1) {
c.default.getInstance().local_data_set("free_round", c.default.getInstance().local_data.free_round + 1);
this.now_exp = 0;
s.ViewManager.showView("treasure_chest");
} else this.progressbar.progress = t;
};
t.prototype.upgrade_lead_fish = function() {
r.default.getInstance().playSound("吃鱼升级");
var e = c.default.leadFish.node.getComponent(dragonBones.ArmatureDisplay).dragonAsset.name.match(/\w/g).join(""), t = e.match(/[1-9]/);
if (parseInt(t[0]) < 8) {
var n = e.slice(0, t.index), a = e.slice(t.index + 1), o = n + (parseInt(t[0]) + 1) + a, i = cc.find("Canvas").getComponent(d.default).fish_list, s = cc.instantiate(i.data.getChildByName(o));
s.name = "leadfish";
s.addComponent(u.default);
s.group = "lead";
s.scale = 1;
s.getChildByName("label").getComponent(cc.Label).string = "LV." + c.default.getInstance().local_data.free_round;
for (var l = 0; l < c.default.getInstance().local_data.guanghuan.length; l++) if (2 === c.default.getInstance().local_data.guanghuan[l]) {
console.log("光环", l);
var f = cc.instantiate(cc.find("Canvas").getComponent(d.default).guanghuan_list.data.getChildByName("guanghuan-" + (l + 1) + "_ske"));
f.name = "guanghuan";
f.setParent(s);
f.setPosition(cc.v2(s.getChildByName("label").x, s.getChildByName("label").y - 10));
s.getChildByName("label").setPosition(cc.v2(s.getChildByName("label").x, l > 2 ? s.getChildByName("label").y + 50 : s.getChildByName("label").y + 30));
break;
}
s.active = !1;
cc.resources.load("Texture/fnt/putong-wangjiadengji", cc.BitmapFont, function(e, t) {
e ? console.log(e) : s.getChildByName("label").getComponent(cc.Label).font = t;
});
s.setParent(cc.find("Canvas/ziyoumoshi/fish_touch_content"));
c.default.lead_fish.ani_name = o;
c.default.lead_fish.isActivation = !0;
s.setPosition(c.default.leadFish.node.getPosition());
c.default.leadFish.node.removeFromParent();
c.default.leadFishMove.bindingFish();
s.active = !0;
c.default.lead_fish_setAnimation(c.default.leadFish.node, "qianyi-1", 0);
} else c.default.leadFish.node.getChildByName("label").getComponent(cc.Label).string = "LV." + c.default.getInstance().local_data.free_round;
this.init_progressBar(c.default.leadFish.node.getComponent(dragonBones.ArmatureDisplay).dragonAsset.name);
};
t.prototype.load_npc_fish = function() {
if (cc.find("monster", this.node).children.length < c.default.monsterFishNumber) for (var e = cc.find("Canvas/ziyoumoshi/monster").children.length, t = 0; t < c.default.monsterFishNumber - e; t++) {
var n = Math.random(), a = void 0, o = void 0;
switch (!0) {
case n < .6:
a = c.default.getInstance().local_data.free_round;
break;

case n < .9:
a = c.default.getInstance().local_data.free_round + 1;
break;

case n < .98:
a = c.default.getInstance().local_data.free_round + 2;
break;

default:
a = c.default.getInstance().local_data.free_round + 3;
}
o = a;
a > 8 && (o = a % 8 + 1);
c.default.gameStart.initMonsterFish("yu" + o + "_ske", t, a);
}
};
t.prototype.gameOver = function() {
c.default.leadFishMove.lead_fish.removeFromParent();
c.default.leadFishMove.lead_fish = null;
c.default.isPlay = !1;
c.default.lead_fish.ani_name = "";
c.default.lead_fish.isActivation = !1;
Object.keys(c.default.monsterFish).forEach(function(e) {
c.default.monsterFish[e].name && -1 != c.default.monsterFish[e].name.indexOf("monster") && delete c.default.monsterFish[e];
});
cc.find("monster", this.node).children.forEach(function(e) {
e.removeFromParent();
e.destroy();
});
c.default.leadFishMove.touch_End();
this.node.active = !1;
};
t.prototype.back_hall = function() {
r.default.getInstance().playSound("点击按钮音");
this.node.removeFromParent();
c.default.free_type.gameOver();
cc.director.loadScene("main");
};
i([ h(cc.Node) ], t.prototype, "now_icon", void 0);
i([ h(cc.Node) ], t.prototype, "next_icon", void 0);
i([ h(cc.Label) ], t.prototype, "mubiao_label", void 0);
i([ h(cc.ProgressBar) ], t.prototype, "progressbar", void 0);
i([ h(cc.Label) ], t.prototype, "jinbi_label", void 0);
return i([ p ], t);
}(cc.Component);
n.default = g;
cc._RF.pop();
}, {
"../Manager/AudioManager": "AudioManager",
"../Manager/GameData": "GameData",
"../Manager/ViewManager": "ViewManager",
"../PopUpNode/treasure_chest": "treasure_chest",
"../ViewMain": "ViewMain",
"./leadFish": "leadFish"
} ],
gameStart: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "e296f6haSVE9bJOFLAJz1rV", "gameStart");
Object.defineProperty(n, "__esModule", {
value: !0
});
var a = e("../Manager/GameData"), o = e("../ViewMain"), i = e("./leadFish"), r = function() {
function e() {
this.isInit = !1;
}
e.prototype.initLeadFish = function(e, t) {
var n = cc.find("Canvas").getComponent(o.default).fish_list, r = cc.instantiate(n.data.getChildByName(e));
r.name = "leadfish";
r.addComponent(i.default);
r.group = "lead";
r.scale = 1;
r.getChildByName("label").getComponent(cc.Label).string = "LV." + a.default.getInstance().local_data.free_round;
for (var c = 0; c < a.default.getInstance().local_data.guanghuan.length; c++) if (2 === a.default.getInstance().local_data.guanghuan[c]) {
console.log("光环", c);
var s = cc.instantiate(cc.find("Canvas").getComponent(o.default).guanghuan_list.data.getChildByName("guanghuan-" + (c + 1) + "_ske"));
s.name = "guanghuan";
s.setParent(r);
s.setPosition(cc.v2(r.getChildByName("label").x, r.getChildByName("label").y - 10));
r.getChildByName("label").setPosition(cc.v2(r.getChildByName("label").x, c > 2 ? r.getChildByName("label").y + 50 : r.getChildByName("label").y + 30));
break;
}
cc.resources.load("Texture/fnt/putong-wangjiadengji", cc.BitmapFont, function(e, t) {
e ? console.log(e) : r.getChildByName("label").getComponent(cc.Label).font = t;
});
r.setParent(cc.find("Canvas/ziyoumoshi/fish_touch_content"));
a.default.lead_fish.ani_name = e;
a.default.lead_fish.isActivation = !0;
r.setPosition(t);
a.default.leadFishMove.bindingFish();
a.default.lead_fish_setAnimation(r, "qianyi-1", 0);
};
e.prototype.initMonsterFish = function(e, t, n) {
var i = {
name: "",
direction: "",
level: n
}, r = cc.find("Canvas").getComponent(o.default).fish_list, c = cc.instantiate(r.data.getChildByName(e));
c.name = "monster" + (new Date().getTime() + Math.random());
i.name = c.name;
a.default.monsterFish.__set__(i.name, i);
c.scale = 1;
c.getChildByName("label").getComponent(cc.Label).string = "LV." + n;
c.setParent(cc.find("Canvas/ziyoumoshi/monster"));
var s, l = Math.random() - .5 >= 0, d = a.default.screenSize.height / 2 * Math.random();
d = d + a.default.screenSize.height / 2 + c.height / 2 >= a.default.screenSize.height ? a.default.screenSize.height / 2 - c.height : d;
c.setPosition((l ? -a.default.screenSize.width / 2 * 3 : a.default.screenSize.width / 2 * 3) + (l ? -c.width : c.width) / 2, l ? d : -d);
if (c.x > 0) {
s = cc.tween(c).call(function() {
c.scaleX = -1;
c.children.forEach(function(e) {
e.scaleX = -1;
});
i.direction = "left";
a.default.monsterFish.__set__(i.name, i);
a.default.monster_fish_setAnimation(c, "qianyi-1", 0);
}).to(15, {
x: -a.default.screenSize.width / 2 * 3 - c.width / 2
}).delay(.2).call(function() {
c.scaleX = 1;
c.children.forEach(function(e) {
e.scaleX = 1;
});
i.direction = "right";
a.default.monsterFish.__set__(i.name, i);
a.default.monster_fish_setAnimation(c, "qianyi-1", 0);
}).to(15, {
x: a.default.screenSize.width / 2 * 3 + c.width / 2
}).union().repeatForever();
c.on("pause", function() {
a.default.isPause && c.pauseAllActions();
}, this);
c.on("resume", function() {
a.default.isPause || c.resumeAllActions();
for (var e = 0; e < a.default.pauseFishMove_action_name.length; e++) if (a.default.pauseFishMove_action_name[e] == c.name) {
a.default.free_type.node.getChildByName("monster").getChildByName(a.default.pauseFishMove_action_name[e]).stopAllActions();
s.start();
}
});
} else {
s = cc.tween(c).call(function() {
c.scaleX = 1;
c.children.forEach(function(e) {
e.scaleX = 1;
});
i.direction = "right";
a.default.monsterFish.__set__(i.name, i);
a.default.monster_fish_setAnimation(c, "qianyi-1", 0);
}).to(15, {
x: a.default.screenSize.width / 2 * 3 + c.width / 2
}).delay(.2).call(function() {
c.scaleX = -1;
c.children.forEach(function(e) {
e.scaleX = -1;
});
i.direction = "left";
a.default.monsterFish.__set__(i.name, i);
a.default.monster_fish_setAnimation(c, "qianyi-1", 0);
}).to(15, {
x: -a.default.screenSize.width / 2 * 3 - c.width / 2
}).union().repeatForever();
c.on("pause", function() {
a.default.isPause && c.pauseAllActions();
});
c.on("resume", function() {
a.default.isPause || c.resumeAllActions();
for (var e = 0; e < a.default.pauseFishMove_action_name.length; e++) if (a.default.pauseFishMove_action_name[e] == c.name) {
a.default.free_type.node.getChildByName("monster").getChildByName(a.default.pauseFishMove_action_name[e]).stopAllActions();
s.start();
a.default.pauseFishMove_action_name = [];
}
});
}
setTimeout(function() {
a.default.isPause ? a.default.pauseFishMove_action_name.push(c.name) : s.start();
}, 500 * t);
};
e.prototype.gamePause = function() {
cc.director.pause();
};
e.prototype.gameContinue = function() {
cc.director.resume();
};
return e;
}();
n.default = r;
cc._RF.pop();
}, {
"../Manager/GameData": "GameData",
"../ViewMain": "ViewMain",
"./leadFish": "leadFish"
} ],
leadFishMove: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ed8a8SYt9ZC76hyVl7T5+Gv", "leadFishMove");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/GameData"), c = cc._decorator, s = c.ccclass, l = (c.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.lead_fish = null;
t.speed = 400;
t.line_interval = cc.v2(0, 0);
return t;
}
t.prototype.onLoad = function() {
r.default.leadFishMove = this;
this.node.on(cc.Node.EventType.TOUCH_START, this.touch_Start.bind(this));
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touch_Move.bind(this));
this.node.on(cc.Node.EventType.TOUCH_END, this.touch_End.bind(this));
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touch_Cancel.bind(this));
};
t.prototype.onEnable = function() {};
t.prototype.start = function() {};
t.prototype.update = function(e) {
if (!(r.default.dir.mag() < .5) && this.lead_fish) {
var t = this.speed * r.default.dir.x * e, n = this.speed * r.default.dir.y * e;
if (this.lead_fish.x >= r.default.screenSize.width / 2 * 3 - this.lead_fish.width / 2) this.lead_fish.x = this.lead_fish.x - 2; else if (this.lead_fish.x < -r.default.screenSize.width / 2 * 3 + this.lead_fish.width / 2) this.lead_fish.x = this.lead_fish.x + 2; else if (this.lead_fish.y <= -r.default.screenSize.height / 2 + this.lead_fish.height / 2) this.lead_fish.y = this.lead_fish.y + 2; else if (this.lead_fish.y >= r.default.screenSize.height / 2 - this.lead_fish.height / 2) this.lead_fish.y = this.lead_fish.y - 2; else {
this.lead_fish.x += t;
this.lead_fish.y += n;
}
if (this.lead_fish.x > r.default.screenSize.width / 2 * 3 - cc.find("Canvas/Main Camera").width / 2 || this.lead_fish.x < -r.default.screenSize.width / 2 * 3 + cc.find("Canvas/Main Camera").width / 2) cc.find("Canvas/Main Camera").x = cc.find("Canvas/Main Camera").x > 0 ? r.default.screenSize.width / 2 * 3 - cc.find("Canvas/Main Camera").width / 2 : -r.default.screenSize.width / 2 * 3 + cc.find("Canvas/Main Camera").width / 2; else {
cc.find("Canvas/Main Camera").x += t;
cc.find("ui", this.node.parent).x += t;
}
var a = 180 * Math.atan2(r.default.dir.y, r.default.dir.x) / Math.PI;
this.lead_fish.angle = a;
switch (null !== this.lead_fish.angle) {
case this.lead_fish.angle > 90 || this.lead_fish.angle < -90:
this.lead_fish.scaleX = -1;
this.lead_fish.children.forEach(function(e) {
e.scaleX = -1;
});
this.lead_fish.angle = a + 180;
r.default.lead_fish.direction = "left";
break;

case this.lead_fish.angle < 90 || this.lead_fish.angle > -90:
this.lead_fish.scaleX = 1;
this.lead_fish.children.forEach(function(e) {
e.scaleX = 1;
});
this.lead_fish.angle = a;
r.default.lead_fish.direction = "right";
}
}
};
t.prototype.touch_Start = function(e) {
if (!r.default.isPause) {
var t = e.getLocation();
this.lastPos = this.node.convertToNodeSpaceAR(t);
}
};
t.prototype.touch_Move = function(e) {
if (!r.default.isPause) {
var t = e.getLocation();
this.nowPos = this.node.convertToNodeSpaceAR(t);
var n = this.nowPos.sub(this.lastPos).mag(), a = cc.v2({
x: this.lastPos.x,
y: 0
}).sub(cc.v2({
x: this.nowPos.x,
y: 0
})).mag(), o = cc.v2({
x: 0,
y: this.lastPos.y
}).sub(cc.v2({
x: 0,
y: this.nowPos.y
})).mag(), i = this.lastPos.x > this.nowPos.x ? -a : a, c = this.lastPos.y > this.nowPos.y ? -o : o;
r.default.dir.x = i / n;
r.default.dir.y = c / n;
}
};
t.prototype.touch_End = function() {
r.default.dir = cc.v2(0, 0);
this.lastPos = cc.v2(0, 0);
this.nowPos = cc.v2(0, 0);
};
t.prototype.touch_Cancel = function() {
r.default.dir = cc.v2(0, 0);
this.lastPos = cc.v2(0, 0);
this.nowPos = cc.v2(0, 0);
};
t.prototype.bindingFish = function() {
cc.find("Canvas/ziyoumoshi/fish_touch_content/leadfish") ? this.lead_fish = cc.find("Canvas/ziyoumoshi/fish_touch_content/leadfish") : console.log("加载鱼失败");
};
return i([ s ], t);
}(cc.Component));
n.default = l;
cc._RF.pop();
}, {
"../Manager/GameData": "GameData"
} ],
leadFish: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "9c919YrqFhNR7rVsz/pbkxd", "leadFish");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/AudioManager"), c = e("../Manager/GameData"), s = e("../Manager/ViewManager"), l = cc._decorator, d = l.ccclass, u = (l.property, 
function(e) {
o(t, e);
function t() {
return null !== e && e.apply(this, arguments) || this;
}
n = t;
t.getInstance = function() {
null == this.instance && (this.instance = new n());
return this.instance;
};
t.prototype.onLoad = function() {
c.default.leadFish = this;
cc.director.getCollisionManager().enabled = !0;
};
t.prototype.start = function() {};
t.prototype.update = function() {};
t.prototype.onCollisionEnter = function(e, t) {
var n = c.default.monsterFish.__get__(e.node.name);
if (c.default.getInstance().local_data.free_round >= n.level) {
c.default.lead_fish_setAnimation(t.node, "chi-1", 1);
r.default.getInstance().playSound("吃鱼音效");
c.default.free_type.update_progressBar(10 * n.level);
e.node.removeFromParent();
Reflect.deleteProperty(c.default.monsterFish, e.node.name);
c.default.free_type.load_npc_fish();
} else s.ViewManager.showView("fail_page");
};
t.prototype.onCollisionExit = function() {};
var n;
return n = i([ d ], t);
}(cc.Component));
n.default = u;
cc._RF.pop();
}, {
"../Manager/AudioManager": "AudioManager",
"../Manager/GameData": "GameData",
"../Manager/ViewManager": "ViewManager"
} ],
mall: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "4114exoRRtBcbhg5pMdHp6Z", "mall");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/AudioManager"), c = e("../Manager/baseManager"), s = e("../Manager/GameData"), l = cc._decorator, d = l.ccclass, u = l.property, f = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.mask = null;
t.content = null;
return t;
}
t.prototype.onLoad = function() {
this.bind_event();
this.init_ui();
};
t.prototype.start = function() {};
t.prototype.update = function() {};
t.prototype.bind_event = function() {
for (var e = 0; e < this.content.children.length; e++) {
var t = new cc.Component.EventHandler();
t.target = this.node;
t.component = "mall";
t.handler = "click_light";
t.customEventData = "" + e;
var n = this.content.children[e].getChildByName("button").getComponent(cc.Button);
n.transition = cc.Button.Transition.SCALE;
n.zoomScale = 1.2;
n.clickEvents.push(t);
}
};
t.prototype.init_ui = function() {
for (var e = 0; e < this.content.children.length; e++) {
var t = s.default.getInstance().local_data.guanghuan, n = this.content.children[e].getChildByName("button");
switch (!0) {
case 0 === t[e]:
cc.find("shiyong", n).active = !1;
cc.find("yishiyong", n).active = !1;
if (s.default.getInstance().local_data.jinbi >= s.default.getInstance().mall_price[e]) {
cc.find("jinbigoumai", n).active = !0;
cc.find("mianfeihuode", n).active = !1;
} else {
cc.find("jinbigoumai", n).active = !1;
cc.find("mianfeihuode", n).active = !0;
}
break;

case 1 === t[e]:
cc.find("jinbigoumai", n).active = !1;
cc.find("shiyong", n).active = !0;
cc.find("yishiyong", n).active = !1;
cc.find("mianfeihuode", n).active = !1;
break;

case 2 === t[e]:
cc.find("jinbigoumai", n).active = !1;
cc.find("shiyong", n).active = !1;
cc.find("yishiyong", n).active = !0;
cc.find("mianfeihuode", n).active = !1;
}
}
};
t.prototype.click_light = function(e, t) {
var n = e.target;
r.default.getInstance().playSound("点击按钮音");
if (cc.find("jinbigoumai", n).active) {
if (s.default.getInstance().local_data.jinbi >= s.default.getInstance().mall_price[parseInt(t)]) {
s.default.getInstance().local_data.jinbi -= s.default.getInstance().mall_price[parseInt(t)];
s.default.getInstance().local_data_set("jinbi", s.default.getInstance().local_data.jinbi);
s.default.getInstance().local_data.guanghuan[parseInt(t)] = 1;
s.default.getInstance().local_data_set("guanghuan", s.default.getInstance().local_data.guanghuan);
this.init_ui();
}
} else if (cc.find("mianfeihuode", n).active) {
console.log("免费获取", t);
s.default.getInstance().local_data.guanghuan[parseInt(t)] = 1;
s.default.getInstance().local_data_set("guanghuan", s.default.getInstance().local_data.guanghuan);
this.init_ui();
} else if (cc.find("shiyong", n).active) {
if (1 === s.default.getInstance().local_data.guanghuan[parseInt(t)]) {
for (var a = cc.instantiate(cc.find("land", n.parent).children[0]), o = (c = s.default.leadFish.node).getChildByName("label"), i = 0; i < s.default.getInstance().local_data.guanghuan.length; i++) if (2 === s.default.getInstance().local_data.guanghuan[i] && i !== parseInt(t)) {
s.default.getInstance().local_data.guanghuan[i] = 1;
if (cc.find("guanghuan", c)) {
cc.find("guanghuan", c).destroy();
o.setPosition(cc.v2(o.x, t > 2 ? o.y - 50 : o.y - 30));
}
}
s.default.getInstance().local_data.guanghuan[parseInt(t)] = 2;
s.default.getInstance().local_data_set("guanghuan", s.default.getInstance().local_data.guanghuan);
this.init_ui();
a.name = "guanghuan";
a.setParent(c);
a.setPosition(cc.v2(o.x, o.y - 10));
o.setPosition(cc.v2(o.x, t > 2 ? o.y + 50 : o.y + 30));
}
} else if (cc.find("yishiyong", n).active && 2 === s.default.getInstance().local_data.guanghuan[parseInt(t)]) {
var c;
o = (c = s.default.leadFish.node).getChildByName("label");
s.default.getInstance().local_data.guanghuan[parseInt(t)] = 1;
s.default.getInstance().local_data_set("guanghuan", s.default.getInstance().local_data.guanghuan);
this.init_ui();
if (cc.find("guanghuan", c)) {
cc.find("guanghuan", c).destroy();
o.setPosition(cc.v2(o.x, t > 2 ? o.y - 50 : o.y - 30));
console.log("取消已使用", t);
}
}
};
t.prototype.click_back = function() {
r.default.getInstance().playSound("点击按钮音");
this.node.emit("remove");
};
i([ u(cc.Node) ], t.prototype, "mask", void 0);
i([ u(cc.Node) ], t.prototype, "content", void 0);
return i([ d ], t);
}(c.default);
n.default = f;
cc._RF.pop();
}, {
"../Manager/AudioManager": "AudioManager",
"../Manager/GameData": "GameData",
"../Manager/baseManager": "baseManager"
} ],
mapTypeLeadFishMove: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f3d88VcdrJH+YNbdqPR9yw9", "mapTypeLeadFishMove");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/GameData"), c = e("./ut_lead_fish"), s = cc._decorator, l = s.ccclass, d = (s.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nowPos = cc.v2(0, 0);
t.isClick_leadfish = !1;
t.isTouch = !1;
t.speed = 400;
t.angle = null;
return t;
}
t.prototype.onLoad = function() {
r.default.mapTypeLeadFishMove = this;
this.node.on(cc.Node.EventType.TOUCH_START, this.touch_Start.bind(this));
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touch_Move.bind(this));
this.node.on(cc.Node.EventType.TOUCH_END, this.touch_End.bind(this));
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touch_Cancel.bind(this));
};
t.prototype.onEnable = function() {};
t.prototype.start = function() {};
t.prototype.update = function() {};
t.prototype.touch_Start = function() {
this.isTouch = !0;
this.lastPos = this.node.getPosition();
};
t.prototype.touch_Move = function(e) {
this.isTouch && this.node.setPosition(this.node.parent.convertToNodeSpaceAR(e.getLocation()).x + r.default.upgrade_type.cameraX, this.node.parent.convertToNodeSpaceAR(e.getLocation()).y + r.default.upgrade_type.cameraY);
};
t.prototype.touch_End = function() {
var e = this;
this.isTouch = !1;
if (r.default.mapComponent.isTouchEnter) {
r.default.mapComponent.isTouchEnter = !1;
if (4 == r.default.upgrade_type.now_round) {
4 == r.default.mapComponent.frameNum && (this.node.getComponent(c.default).frameParent = null);
r.default.mapComponent.addFrame(this.node.getComponent(c.default).frameParent);
r.default.mapComponent.frameNum += 1;
}
if (r.default.mapComponent.isHasMonster) {
this.node.setPosition(r.default.mapComponent.targetPointPos.x - this.node.width / 2, r.default.mapComponent.targetPointPos.y);
this.node.getComponent(c.default).fightAnimation(r.default.mapComponent.targetPointPos);
} else if (r.default.mapComponent.isProp) {
this.node.setPosition(r.default.mapComponent.targetPointPos.x, r.default.mapComponent.targetPointPos.y);
this.node.getComponent(c.default).propAnimation(r.default.mapComponent.targetFish);
r.default.mapComponent.isProp = !1;
} else {
this.node.setPosition(r.default.mapComponent.targetPointPos.x, r.default.mapComponent.targetPointPos.y);
if (4 == r.default.upgrade_type.now_round) return;
cc.tween(cc.find("Canvas/Main Camera")).call(function() {
var t = e.node.x - cc.find("Canvas/Main Camera").x;
r.default.upgrade_type.cameraX += t;
r.default.upgrade_type.background_move();
}).to(.5, {
x: this.node.x
}).start();
}
} else this.node.setPosition(this.lastPos);
};
t.prototype.touch_Cancel = function() {
this.isTouch = !1;
this.node.setPosition(this.lastPos);
};
return i([ l ], t);
}(cc.Component));
n.default = d;
cc._RF.pop();
}, {
"../Manager/GameData": "GameData",
"./ut_lead_fish": "ut_lead_fish"
} ],
map_Component: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d014d29IbxNzJrzFv/YLd75", "map_Component");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/GameData"), c = cc._decorator, s = c.ccclass, l = (c.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.isTouchEnter = !1;
t.targetFish = null;
t.frameNum = 1;
t.mubiaohezi = null;
return t;
}
t.prototype.onLoad = function() {
var e = this;
r.default.mapComponent = this;
this.node.children.forEach(function(t) {
t.on(cc.Node.EventType.MOUSE_ENTER, e.touchEnter, e);
t.on(cc.Node.EventType.MOUSE_LEAVE, e.touchLeave, e);
t.on(cc.Node.EventType.MOUSE_UP, e.touchUp, e);
});
};
t.prototype.start = function() {};
t.prototype.update = function() {};
t.prototype.touchEnter = function(e) {
var t = this;
if (r.default.mapTypeLeadFishMove.isTouch) {
this.isTouchEnter = !0;
this.targetPointPos = cc.v2(e.target.getPosition().x + e.target.parent.x, e.target.getPosition().y + e.target.parent.y);
e.target.children.forEach(function(e) {
if (-1 != e.name.indexOf("monster") || -1 != e.name.indexOf("boss")) {
t.isHasMonster = !0;
t.targetFish = e;
t.target_score = parseInt(e.getChildByName("label").getComponent(cc.Label).string);
t.target_index = parseInt(e.name.slice(e.name.indexOf("_") + 1, e.name.length));
} else {
t.isHasMonster = !1;
if (-1 != e.name.indexOf("x")) {
t.isProp = !0;
t.targetFish = e;
}
}
});
}
};
t.prototype.touchLeave = function() {
this.isTouchEnter = !1;
this.targetPointPos = null;
};
t.prototype.touchUp = function() {};
t.prototype.removeFish = function() {};
t.prototype.addFrame = function(e) {
if (e) {
if (r.default.mapComponent.targetPointPos) {
console.log(r.default.mapComponent.targetFish.name);
this.frameNum <= 4 ? r.default.mapComponent.targetPointPos = e.getPosition().y < r.default.mapComponent.targetPointPos.y ? cc.v2(e.getPosition()) : r.default.mapComponent.targetPointPos : -1 != this.targetFish.name.indexOf("x") ? r.default.mapComponent.targetPointPos = e.getPosition().y + e.parent.getPosition().y < r.default.mapComponent.targetPointPos.y ? cc.v2(e.getPosition().x + e.parent.getPosition().x, e.getPosition().y + e.parent.getPosition().y) : r.default.mapComponent.targetPointPos : r.default.mapComponent.targetPointPos = e.getPosition().y + e.parent.getPosition().y < r.default.mapComponent.targetPointPos.y ? cc.v2(e.getPosition().x + e.parent.getPosition().x, e.getPosition().y + e.parent.getPosition().y + e.height) : r.default.mapComponent.targetPointPos;
}
var t = cc.instantiate(e);
t.setPosition(0, 0);
t.width = this.node.parent.getChildByName("mapList").width;
r.default.ut_lead_fish.frameParent = null;
e.destroy();
this.node.parent.getChildByName("mapList").addChild(t);
t.setSiblingIndex(0);
if (4 == this.frameNum) {
var n = this.node.parent.getChildByName("mapList");
r.default.ut_lead_fish.node.setPosition(n.children[this.frameNum - 1].x - n.children[this.frameNum - 1].parent.x + n.children[this.frameNum - 1].width - r.default.ut_lead_fish.node.width / 2, n.children[this.frameNum - 1].y - n.children[this.frameNum - 1].parent.y - n.children[this.frameNum - 1].height);
this.node.width = 500;
this.node.height = 818;
this.node.getComponent(cc.Layout).paddingBottom = 0;
console.log(this.node.width, this.node.height);
this.node.children.forEach(function(e) {
e.setPosition(0, 0);
});
this.node.getComponent(cc.Layout).updateLayout();
this.node.setPosition(2e3, r.default.ut_lead_fish.node.y + 450 + 368 - 75);
cc.tween(this.node).to(1, {
x: r.default.ut_lead_fish.node.x + 120 + 50 + 250,
y: this.node.y - 150 - 40 - 120 - 75 - 20
}).start();
var a = cc.find("Canvas/Main Camera").getPosition();
cc.tween(cc.find("Canvas/Main Camera")).to(1, {
x: r.default.ut_lead_fish.node.x - (r.default.screenSize.width - 740) / 2 + r.default.screenSize.width / 2,
y: r.default.ut_lead_fish.node.y - 150 + r.default.screenSize.height / 2
}).call(function() {
var e = cc.find("Canvas/Main Camera").y - a.y;
r.default.upgrade_type.cameraY += e;
var t = cc.find("Canvas/Main Camera").x - a.x;
r.default.upgrade_type.cameraX += t;
r.default.ut_lead_fish.node.getChildByName("animation").scaleX = .65;
}).start();
}
}
};
return i([ s ], t);
}(cc.Component));
n.default = l;
cc._RF.pop();
}, {
"../Manager/GameData": "GameData"
} ],
monsterFish_Component: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "f9c552iIoZE7Z7tiIfqPoO6", "monsterFish_Component");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/GameData"), c = cc._decorator, s = c.ccclass, l = (c.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.targetFish = null;
t.isTouchEnter = !1;
t.target_pos = null;
t.target_name = "";
return t;
}
t.prototype.onLoad = function() {
var e = this;
r.default.monsterFish_Component = this;
this.node.children.forEach(function(t) {
t.on(cc.Node.EventType.MOUSE_ENTER, e.touchEnter, e);
t.on(cc.Node.EventType.MOUSE_LEAVE, e.touchLeave, e);
t.on(cc.Node.EventType.MOUSE_UP, e.touchUp, e);
});
};
t.prototype.start = function() {};
t.prototype.update = function() {};
t.prototype.touchEnter = function(e) {
if (r.default.upgrade_tpye_move.isClick_leadfish) {
this.isTouchEnter = !0;
this.target_name = e.target.name;
this.target_index = parseInt(this.target_name.slice(this.target_name.indexOf("_") + 1, this.target_name.length));
-1 == this.target_name.indexOf("x") && (this.target_score = parseInt(e.target.getChildByName("label").getComponent(cc.Label).string));
}
};
t.prototype.touchLeave = function() {};
t.prototype.touchUp = function(e) {
var t = this;
if (this.isTouchEnter && this.target_index >= r.default.ut_lead_fish.fishIndex) {
this.isTouchEnter = !1;
r.default.upgrade_tpye_move.isMove = !0;
r.default.ut_lead_fish.fishIndex = this.target_index;
var n = r.default.upgrade_tpye_move.node;
this.targetFish = e.target;
var a = e.target.getPosition(), o = a.sub(n.getPosition()).mag() / r.default.upgrade_tpye_move.speed;
n.angle = r.default.upgrade_tpye_move.angle;
r.default.upgrade_tpye_move.angle = null;
cc.tween(n).call(function() {
if (-1 != t.target_name.indexOf("x")) {
var e = t.target_name.slice(0, t.target_name.indexOf("_"));
if (!t.targetFish || !t.targetFish.getChildByName(e).getComponent(dragonBones.ArmatureDisplay)) return;
t.targetFish.getChildByName(e).getComponent(dragonBones.ArmatureDisplay).once(dragonBones.EventObject.COMPLETE, function() {
t.targetFish.getChildByName(e).getComponent(dragonBones.ArmatureDisplay).enabled = !1;
}, t);
t.targetFish.getChildByName(e).getComponent(dragonBones.ArmatureDisplay).timeScale = 2;
t.targetFish.getChildByName(e).getComponent(dragonBones.ArmatureDisplay).playAnimation("xiaoshi", 1);
} else t.target_name.indexOf("boss");
}).to(o, {
x: a.x,
y: a.y
}).call(function() {
-1 != this.target_name.indexOf("monster") ? r.default.ut_lead_fish.fightAnimation(a) : -1 != this.target_name.indexOf("x") ? r.default.ut_lead_fish.propAnimation(this.targetFish) : -1 != this.target_name.indexOf("boss") && r.default.ut_lead_fish.fightAnimation(a);
n.angle = 0;
}.bind(this)).start();
}
};
t.prototype.removeFish = function() {
this.node.children.forEach(function(e) {
parseInt(e.name.slice(e.name.indexOf("_") + 1, e.name.length)) < r.default.ut_lead_fish.fishIndex && cc.tween(e).by(.5, {
opacity: 0,
x: -300
}).call(function() {
e.destroy();
}).start();
});
};
return i([ s ], t);
}(cc.Component));
n.default = l;
cc._RF.pop();
}, {
"../Manager/GameData": "GameData"
} ],
now_score: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "10023rXizxMOK8RbFgeLvso", "now_score");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/GameData"), c = cc._decorator, s = c.ccclass, l = (c.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.pos = cc.v2(0, 0);
return t;
}
t.prototype.onLoad = function() {};
t.prototype.onEnable = function() {
var e = this;
this.pos = this.node.getPosition();
var t = r.default.ut_lead_fish.node.getChildByName("tatol_score");
cc.tween(this.node).to(.1, {
scale: 1.2
}).to(.4, {
x: -50,
scale: .8,
opacity: 87
}).call(function() {
cc.tween(t).to(.1, {
scale: 1.2
}).to(.2, {
scale: 1
}).call(function() {
t.getComponent(cc.Label).string = "" + r.default.ut_lead_fish.score;
}).start();
e.node.active = !1;
e.node.setPosition(e.pos);
}).start();
};
t.prototype.start = function() {};
t.prototype.onDisable = function() {
var e = this;
if (r.default.upgrade_type.now_round <= 2) {
this.node.scale = 1;
if (-1 === r.default.monsterFish_Component.targetFish.name.indexOf("boss")) cc.tween(cc.find("Canvas/Main Camera")).call(function() {
var t = e.node.parent.x - cc.find("Canvas/Main Camera").x;
r.default.upgrade_type.cameraX += t;
r.default.upgrade_type.background_move();
r.default.monsterFish_Component.targetFish = null;
r.default.monsterFish_Component.removeFish();
}).to(.5, {
x: this.node.parent.x
}).call(function() {
if (8 == r.default.monsterFish_Component.target_index && 2 == r.default.upgrade_type.now_round && r.default.monsterFish_Component.node.getChildByName("boss_9")) {
var e = r.default.monsterFish_Component.node.getChildByName("boss_9"), t = e.x + e.width / 2 - cc.find("Canvas/Main Camera").width / 2;
r.default.upgrade_type.cameraX += t - r.default.upgrade_type.cameraX;
r.default.upgrade_type.background_move();
cc.tween(cc.find("Canvas/Main Camera")).to(.5, {
x: t
}).start();
}
}).start(); else {
r.default.monsterFish_Component.targetFish = null;
r.default.monsterFish_Component.removeFish();
}
} else {
this.node.scale = 1;
if (3 == r.default.upgrade_type.now_round) -1 === r.default.mapComponent.targetFish.name.indexOf("boss") && cc.tween(cc.find("Canvas/Main Camera")).call(function() {
var t = e.node.parent.x - cc.find("Canvas/Main Camera").x;
r.default.upgrade_type.cameraX += t;
r.default.upgrade_type.background_move();
r.default.mapComponent.targetFish = null;
}).to(.5, {
x: this.node.parent.x
}).call(function() {
if (11 == r.default.mapComponent.target_index && 3 == r.default.upgrade_type.now_round && r.default.mapComponent.node.getChildByName("block12") && r.default.mapComponent.node.getChildByName("block12").getChildByName("boss")) {
var e = r.default.mapComponent.node.getChildByName("block12"), t = e.x + e.width / 2 - cc.find("Canvas/Main Camera").width / 2;
r.default.upgrade_type.cameraX += t - r.default.upgrade_type.cameraX;
r.default.upgrade_type.background_move();
cc.tween(cc.find("Canvas/Main Camera")).to(.5, {
x: t
}).start();
}
}).start(); else if (r.default.ut_lead_fish.frameParent) {
var t = !1;
r.default.ut_lead_fish.frameParent.children.forEach(function(e) {
if (-1 !== e.name.indexOf("monster")) {
t = !0;
r.default.mapComponent.targetFish = e;
r.default.mapComponent.target_score = parseInt(e.getChildByName("label").getComponent(cc.Label).string);
r.default.mapComponent.targetPointPos = cc.v2(e.getPosition().x + e.parent.x + e.parent.parent.x, e.getPosition().y + e.parent.y + e.parent.parent.y);
}
});
t && r.default.ut_lead_fish.fightAnimation(r.default.mapComponent.targetPointPos);
}
}
};
t.prototype.update = function() {};
return i([ s ], t);
}(cc.Component));
n.default = l;
cc._RF.pop();
}, {
"../Manager/GameData": "GameData"
} ],
sign_in: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ff448R341FPgJ5rlFYb3934", "sign_in");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/AudioManager"), c = e("../Manager/baseManager"), s = e("../Manager/GameData"), l = cc._decorator, d = l.ccclass, u = l.property, f = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.mask = null;
t.content = null;
return t;
}
t.prototype.onLoad = function() {
this.init_ui();
};
t.prototype.start = function() {};
t.prototype.update = function() {};
t.prototype.click_single_reward = function() {
r.default.getInstance().playSound("点击按钮音");
if (!s.default.getInstance().local_data.reward_status) {
s.default.getInstance().local_data.jinbi += s.default.getInstance().sign_in_reward[s.default.getInstance().local_data.login_day % 7];
s.default.getInstance().local_data_set("jinbi", s.default.getInstance().local_data.jinbi);
}
s.default.getInstance().local_data_set("reward_status", !0);
this.node.emit("remove");
};
t.prototype.click_double_reward = function() {
r.default.getInstance().playSound("点击按钮音");
if (!s.default.getInstance().local_data.reward_status) {
s.default.getInstance().local_data.jinbi += 2 * s.default.getInstance().sign_in_reward[s.default.getInstance().local_data.login_day % 7];
s.default.getInstance().local_data_set("jinbi", s.default.getInstance().local_data.jinbi);
}
s.default.getInstance().local_data_set("reward_status", !0);
this.node.emit("remove");
};
t.prototype.init_ui = function() {
for (var e = s.default.getInstance().local_data.login_day % 7; e <= this.content.children.length; e++) e === s.default.getInstance().local_data.login_day % 7 ? cc.find("yilingqu", this.content.children[e - 1]).active = s.default.getInstance().local_data.reward_status : cc.find("yilingqu", this.content.children[e - 1]).active = !1;
};
i([ u(cc.Node) ], t.prototype, "mask", void 0);
i([ u(cc.Node) ], t.prototype, "content", void 0);
return i([ d ], t);
}(c.default);
n.default = f;
cc._RF.pop();
}, {
"../Manager/AudioManager": "AudioManager",
"../Manager/GameData": "GameData",
"../Manager/baseManager": "baseManager"
} ],
treasure_chest: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "ccc71P6QfVBEL7RTjcVQ+oA", "treasure_chest");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/AudioManager"), c = e("../Manager/baseManager"), s = e("../Manager/GameData"), l = cc._decorator, d = l.ccclass, u = l.property, f = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.content = null;
t.jinbi_all_this_round = 0;
t.already_open = 0;
return t;
}
t.prototype.onLoad = function() {
this.init_ui();
this.already_open = this.random_two(1, 3);
};
t.prototype.start = function() {};
t.prototype.update = function() {};
t.prototype.init_ui = function() {
for (var e = 0; e < this.content.children.length; e++) {
cc.find("block" + (e + 1) + "/land/treasure_chest", this.content).active = !0;
cc.find("block" + (e + 1) + "/land/jinbi", this.content).active = !1;
var t = new cc.Component.EventHandler();
t.target = this.node;
t.component = "treasure_chest";
t.handler = "open_random";
this.content.children[e].getComponent(cc.Button).clickEvents.push(t);
}
};
t.prototype.open_random = function(e) {
if (this.already_open > 0) {
r.default.getInstance().playSound("点击宝箱音");
this.already_open -= 1;
var t = Math.random();
switch (!0) {
case t < .75:
cc.find("land/jinbi/Label", e.target).getComponent(cc.Label).string = "50";
break;

case t < .85:
cc.find("land/jinbi/Label", e.target).getComponent(cc.Label).string = "100";
break;

case t < .92:
cc.find("land/jinbi/Label", e.target).getComponent(cc.Label).string = "150";
break;

case t < .97:
cc.find("land/jinbi/Label", e.target).getComponent(cc.Label).string = "200";
break;

case t < .99:
cc.find("land/jinbi/Label", e.target).getComponent(cc.Label).string = "250";
break;

case t < 1:
cc.find("land/jinbi/Label", e.target).getComponent(cc.Label).string = "300";
}
cc.find("land/jinbi", e.target).active = !0;
cc.find("land/treasure_chest", e.target).active = !1;
e.target.getComponent(cc.Button).destroy();
this.jinbi_all_this_round += parseInt(cc.find("land/jinbi/Label", e.target).getComponent(cc.Label).string);
s.default.getInstance().local_data.jinbi += this.jinbi_all_this_round;
s.default.getInstance().local_data_set("jinbi", s.default.getInstance().local_data.jinbi);
0 == this.already_open && (cc.find("bottom_button", this.node).active = !0);
}
};
t.prototype.random_two = function(e, t) {
return Math.floor(Math.random() * (t - e + 1) + e);
};
t.prototype.on_click_close = function() {
this.node.destroy();
};
t.prototype.on_click_play_ad = function() {
this.node.destroy();
};
i([ u(cc.Node) ], t.prototype, "content", void 0);
return i([ d ], t);
}(c.default);
n.default = f;
cc._RF.pop();
}, {
"../Manager/AudioManager": "AudioManager",
"../Manager/GameData": "GameData",
"../Manager/baseManager": "baseManager"
} ],
upgrade_tpye_move: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "2e303ZiAZdD7pzP0O1IAciy", "upgrade_tpye_move");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/GameData"), c = cc._decorator, s = c.ccclass, l = (c.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.nowPos = cc.v2(0, 0);
t.isClick_leadfish = !1;
t.isMove = !1;
t.speed = 400;
t.angle = null;
return t;
}
t.prototype.onLoad = function() {
r.default.upgrade_tpye_move = this;
this.node.on(cc.Node.EventType.TOUCH_START, this.touch_Start.bind(this));
this.node.on(cc.Node.EventType.TOUCH_MOVE, this.touch_Move.bind(this));
this.node.on(cc.Node.EventType.TOUCH_END, this.touch_End.bind(this));
this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.touch_Cancel.bind(this));
};
t.prototype.onEnable = function() {};
t.prototype.start = function() {};
t.prototype.update = function() {};
t.prototype.touch_Start = function(e) {
if (!this.isMove) {
this.isClick_leadfish = !0;
var t = e.getLocation(), n = this.node.convertToNodeSpaceAR(t);
this.nowPos = cc.v2(t.x - r.default.screenSize.width / 2 - n.x + this.node.width / 2, t.y - r.default.screenSize.height / 2 - n.y);
}
};
t.prototype.touch_Move = function(e) {
if (!this.isMove) {
var t = e.getLocation(), n = cc.v2(t.x - r.default.screenSize.width / 2 + r.default.upgrade_type.cameraX, t.y - r.default.screenSize.height / 2), a = r.default.check_node_name(r.default.upgrade_type.node, "round").getChildByName("draw_line").getComponent(cc.Graphics);
this.drawLineOfDashes(a, this.nowPos, n);
this.angle = this.getVectorRadians(this.nowPos.x, this.nowPos.y, n.x, n.y);
}
};
t.prototype.touch_End = function() {
this.isClick_leadfish = !1;
r.default.check_node_name(r.default.upgrade_type.node, "round").getChildByName("draw_line").getComponent(cc.Graphics).clear();
this.nowPos = cc.v2(0, 0);
};
t.prototype.touch_Cancel = function() {
this.isClick_leadfish = !1;
r.default.check_node_name(r.default.upgrade_type.node, "round").getChildByName("draw_line").getComponent(cc.Graphics).clear();
this.nowPos = cc.v2(0, 0);
};
t.prototype.drawLineOfDashes = function(e, t, n, a, o, i) {
void 0 === a && (a = !0);
void 0 === o && (o = 20);
void 0 === i && (i = 20);
if (e) {
e.clear();
for (var r = n.sub(t), c = r.normalize(), s = r.mag(), l = c.mul(o + i), d = c.mul(o), u = Math.floor(s / (o + i)), f = 0; f < u; ++f) {
var p = t.add(l.mul(f));
e.moveTo(p.x, p.y);
var h = p.add(d);
e.lineTo(h.x, h.y);
}
var g = t.add(l.mul(u));
e.moveTo(g.x, g.y);
if (o < s - (o + i) * u) {
h = g.add(d);
e.lineTo(h.x, h.y);
} else e.lineTo(n.x, n.y);
a && e.stroke();
}
};
t.prototype.getVectorRadians = function(e, t, n, a) {
var o = a - t, i = n - e, r = Math.abs(o) / Math.abs(i), c = 0;
o > 0 && i < 0 ? c = 180 * -Math.atan(r) / Math.PI + 180 : o > 0 && i > 0 ? c = 180 * Math.atan(r) / Math.PI : o < 0 && i < 0 ? c = 180 * Math.atan(r) / Math.PI - 180 : o < 0 && i > 0 && (c = 180 * -Math.atan(r) / Math.PI);
return c;
};
return i([ s ], t);
}(cc.Component));
n.default = l;
cc._RF.pop();
}, {
"../Manager/GameData": "GameData"
} ],
upgrade_type: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "d6af7kpNOtAxaYiaa5gAihU", "upgrade_type");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
n.round = void 0;
var r, c = e("../Manager/AudioManager"), s = e("../Manager/GameData"), l = e("../PopUpNode/treasure_chest");
(function(e) {
e[e.first_round = 1] = "first_round";
e[e.second_round = 2] = "second_round";
e[e.third_round = 3] = "third_round";
e[e.fourth_round = 4] = "fourth_round";
e[e.fifth_round = 5] = "fifth_round";
})(r = n.round || (n.round = {}));
var d = cc._decorator, u = d.ccclass, f = d.property, p = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.jinbi_label = null;
t.ui_node = null;
t.guanqiaLabel = null;
t.yanwuPfb = null;
t.cameraX = 0;
t.cameraY = 0;
t.yanwu = null;
t.roundList = [];
t.distanceX = 0;
t.now_round = null;
t.round_label = 1;
return t;
}
t.prototype.onLoad = function() {
s.default.upgrade_type = this;
this.now_round = r.first_round;
};
t.prototype.start = function() {};
t.prototype.update = function() {
this.ui_follow_camera();
};
t.prototype.background_move = function() {
var e = this.cameraX - this.distanceX, t = cc.find("Canvas/Main Camera"), n = cc.find("Canvas/background").children[0], a = cc.find("Canvas/background").children[1], o = cc.find("Canvas/background").children[2];
if (e >= t.width / 2) {
s.default.ViewMain.bg.getComponent(cc.Layout) && (s.default.ViewMain.bg.getComponent(cc.Layout).enabled = !1);
n.x = o.x + o.width;
var i = o;
o = n;
n = a;
a = i;
this.distanceX = this.cameraX;
} else if (e <= -t.width / 2) {
o.x = n.x - n.width;
var r = n;
n = o;
o = a;
a = r;
this.distanceX = this.cameraX;
}
};
t.prototype.init = function(e) {
console.log("初始化关卡" + e);
c.default.getInstance().playMusic("关卡模式bgm");
if (e && this.roundList[e - 1]) {
var t;
t = e <= 3 ? "hengpinglianxu" : "shupinglianxu";
for (var n = function(e) {
cc.resources.load("images/bj/lianxu/" + t, cc.SpriteFrame, function(t, n) {
if (t) cc.error(t); else if (n) {
s.default.ViewMain.bg.children[e].getComponent(cc.Sprite).spriteFrame = n;
s.default.ViewMain.bg.children[e].width = s.default.screenSize.width;
s.default.ViewMain.bg.children[e].height = s.default.screenSize.height;
}
});
}, a = 0; a < s.default.ViewMain.bg.children.length; a++) n(a);
this.now_round = e;
var o = cc.instantiate(this.roundList[e - 1]);
this.ui_node.active = !0;
o.setParent(this.node);
this.update_jinbi();
this.update_round_label();
}
};
t.prototype.removeRound = function(e) {
var t = this;
s.default.check_node_name(s.default.upgrade_type.node, "round").removeFromParent();
if (e) {
5 == e && (e = new l.default().random_two(1, 4));
cc.find("Canvas/background").getComponent(cc.Layout).enabled = !0;
cc.tween(cc.find("Canvas/Main Camera")).to(.8, {
x: 0,
y: 0
}).call(function() {
t.init(e);
t.cameraX = 0;
t.cameraY = 0;
t.distanceX = 0;
}).start();
}
};
t.prototype.update_jinbi = function() {
this.jinbi_label.string = "" + s.default.getInstance().local_data.jinbi;
};
t.prototype.update_round_label = function() {
this.guanqiaLabel.string = "" + this.round_label;
};
t.prototype.ui_follow_camera = function() {
var e = cc.find("Canvas/Main Camera");
this.ui_node.setPosition(e.getPosition());
};
t.prototype.back_hall = function() {
c.default.getInstance().playSound("点击按钮音");
this.removeRound(NaN);
cc.director.loadScene("main");
};
i([ f(cc.Label) ], t.prototype, "jinbi_label", void 0);
i([ f(cc.Node) ], t.prototype, "ui_node", void 0);
i([ f(cc.Label) ], t.prototype, "guanqiaLabel", void 0);
i([ f(cc.Prefab) ], t.prototype, "yanwuPfb", void 0);
i([ f(cc.Prefab) ], t.prototype, "roundList", void 0);
return i([ u ], t);
}(cc.Component);
n.default = p;
cc._RF.pop();
}, {
"../Manager/AudioManager": "AudioManager",
"../Manager/GameData": "GameData",
"../PopUpNode/treasure_chest": "treasure_chest"
} ],
ut_lead_fish: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "85809/kQLxO/bFj8o0OVIvM", "ut_lead_fish");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/AudioManager"), c = e("../Manager/GameData"), s = e("../Manager/ViewManager"), l = cc._decorator, d = l.ccclass, u = (l.property, 
function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.score = 0;
t.aniName = "";
t.fishIndex = 0;
t.frameParent = null;
return t;
}
t.prototype.onLoad = function() {
var e = this;
c.default.ut_lead_fish = this;
this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).on(dragonBones.EventObject.COMPLETE, function() {
if ("shengli-1" == e.aniName) {
e.aniName = "daiji-1";
e.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).playAnimation("daiji-1", 0);
} else if ("chi-1" == e.aniName) {
e.aniName = "shengli-1";
e.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).timeScale = 1;
e.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).playAnimation("shengli-1", 1);
}
}, this);
};
t.prototype.start = function() {
this.score = parseInt(cc.find("tatol_score", this.node).getComponent(cc.Label).string);
};
t.prototype.update = function() {};
t.prototype.fightAnimation = function(e) {
var t = c.default.upgrade_type;
t.yanwu = cc.instantiate(t.yanwuPfb);
t.yanwu.getComponent(dragonBones.ArmatureDisplay).once(dragonBones.EventObject.COMPLETE, this.fightEnd, this);
t.yanwu.getComponent(dragonBones.ArmatureDisplay).timeScale = 1.5;
t.yanwu.getComponent(dragonBones.ArmatureDisplay).playAnimation("newAnimation", 1);
t.yanwu.setParent(t.node);
t.yanwu.setPosition(e);
};
t.prototype.fightEnd = function() {
var e = this, t = this.getRoundComponent(c.default.upgrade_type.now_round), n = t.targetFish.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay);
if (this.score >= t.target_score) {
r.default.getInstance().playSound("闯关模式吃对鱼后音效");
if (-1 != t.targetFish.name.indexOf("boss")) switch (c.default.upgrade_type.now_round) {
case 1:
n.playAnimation("shengli", 1);
this.round_win();
break;

case 2:
n.once(dragonBones.EventObject.COMPLETE, function() {
if ("shibai" == n.animationName) {
n.playAnimation("daiji", 0);
e.round_win();
}
}, this);
n.playAnimation("shibai", 1);
break;

case 3:
case 4:
n.once(dragonBones.EventObject.COMPLETE, function() {
if ("shibai" == n.animationName) {
n.playAnimation("daiji", 0);
e.round_win();
}
}, this);
n.timeScale = 2;
n.playAnimation("shibai", 1);
} else if (-1 != t.targetFish.name.indexOf("monster")) {
var a = c.default.upgrade_type, o = parseInt(t.targetFish.getChildByName("label").getComponent(cc.Label).string);
this.frameParent = t.targetFish.parent;
this.aniName = "shengli-1";
this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).playAnimation(this.aniName, 1);
this.syncScore(o);
a.yanwu.destroy();
t.targetFish.destroy();
4 == c.default.upgrade_type.now_round && 4 == c.default.mapComponent.frameNum && c.default.mapComponent.addFrame(this.frameParent);
}
c.default.upgrade_type.now_round <= 2 ? c.default.upgrade_tpye_move.isMove = !1 : this.frameParent ? this.node.setPosition(this.frameParent.getPosition().x + this.frameParent.parent.x, this.frameParent.getPosition().y + this.frameParent.parent.y) : this.node.setPosition(this.node.getPosition().x + this.node.width / 2, this.node.getPosition().y);
} else if (-1 != t.targetFish.name.indexOf("boss")) if (2 == c.default.upgrade_type.now_round) {
n.once(dragonBones.EventObject.COMPLETE, function() {
if ("shengli" == n.animationName) {
console.log("游戏失败");
s.ViewManager.showView("fail_page");
}
});
n.playAnimation("shengli", 1);
} else {
console.log("游戏失败");
s.ViewManager.showView("fail_page");
} else if (-1 != t.targetFish.name.indexOf("monster")) {
console.log("游戏失败");
s.ViewManager.showView("fail_page");
}
};
t.prototype.round_win = function() {
var e = this.getRoundComponent(c.default.upgrade_type.now_round);
this.aniName = "shengli-1";
this.node.setPosition(e.targetFish.x - e.targetFish.width / 2 - this.node.width / 2, this.node.y);
var t = c.default.upgrade_type, n = e.targetFish.getChildByName("label").getComponent(cc.Label);
n.node.active = !1;
this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).playAnimation(this.aniName, 1);
t.yanwu.destroy();
this.syncScore(parseInt(n.string));
s.ViewManager.showView("win_page");
};
t.prototype.syncScore = function(e) {
this.score += e;
var t = cc.find("now_score", this.node).getComponent(cc.Label);
t.string = "" + e;
t.node.active = !0;
};
t.prototype.propAnimation = function(e) {
var t = this, n = e.getChildByName("qipaoLabel").getComponent(cc.Label).string, a = this.getNumber(n);
this.aniName = "chi-1";
this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).once(dragonBones.EventObject.START, function() {
"chi-1" == t.aniName && cc.tween(e.getChildByName("qipaoLabel")).to(.2, {
opacity: 0
}).call(function() {
t.propAddScore(a);
c.default.upgrade_type.now_round <= 2 && (c.default.upgrade_tpye_move.isMove = !1);
e.destroy();
}, t).start();
}, this);
this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).timeScale = 2;
this.node.getChildByName("animation").getComponent(dragonBones.ArmatureDisplay).playAnimation(this.aniName, 1);
};
t.prototype.propAddScore = function(e) {
var t = this;
this.score *= e;
var n = this.node.getChildByName("tatol_score"), a = this.getRoundComponent(c.default.upgrade_type.now_round);
this.frameParent = a.targetFish.parent;
4 == c.default.upgrade_type.now_round && 4 == c.default.mapComponent.frameNum && c.default.mapComponent.addFrame(this.frameParent);
cc.tween(n).to(.1, {
scale: 1.2
}).to(.2, {
scale: 1
}).call(function() {
n.getComponent(cc.Label).string = "" + t.score;
if (c.default.upgrade_type.now_round < 4) cc.tween(cc.find("Canvas/Main Camera")).call(function() {
var e = t.node.x - cc.find("Canvas/Main Camera").x;
c.default.upgrade_type.cameraX += e;
c.default.upgrade_type.background_move();
a.targetFish = null;
a.removeFish();
}).to(.5, {
x: t.node.x
}).start(); else {
a.targetFish = null;
a.removeFish();
}
}).start();
};
t.prototype.getNumber = function(e) {
for (var t = e.match(/[0-9]/g), n = 0, a = 0; a < t.length; a++) n += parseInt(t[a]) * Math.pow(10, t.length - a - 1);
return n;
};
t.prototype.getRoundComponent = function(e) {
return e <= 2 ? c.default.monsterFish_Component : c.default.mapComponent;
};
return i([ d ], t);
}(cc.Component));
n.default = u;
cc._RF.pop();
}, {
"../Manager/AudioManager": "AudioManager",
"../Manager/GameData": "GameData",
"../Manager/ViewManager": "ViewManager"
} ],
win_page: [ function(e, t, n) {
"use strict";
cc._RF.push(t, "8abb9C5cJdFaYj8dNAKbOa2", "win_page");
var a, o = this && this.__extends || (a = function(e, t) {
return (a = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
})(e, t);
}, function(e, t) {
a(e, t);
function n() {
this.constructor = e;
}
e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n());
}), i = this && this.__decorate || function(e, t, n, a) {
var o, i = arguments.length, r = i < 3 ? t : null === a ? a = Object.getOwnPropertyDescriptor(t, n) : a;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) r = Reflect.decorate(e, t, n, a); else for (var c = e.length - 1; c >= 0; c--) (o = e[c]) && (r = (i < 3 ? o(r) : i > 3 ? o(t, n, r) : o(t, n)) || r);
return i > 3 && r && Object.defineProperty(t, n, r), r;
};
Object.defineProperty(n, "__esModule", {
value: !0
});
var r = e("../Manager/AudioManager"), c = e("../Manager/baseManager"), s = e("../Manager/GameData"), l = cc._decorator, d = l.ccclass, u = l.property, f = function(e) {
o(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.animation = null;
t.jinbi = null;
t.now_round_reward = 0;
return t;
}
t.prototype.onLoad = function() {
var e = this;
r.default.getInstance().playSound("胜利弹窗");
s.default.upgrade_type.round_label += 1;
this.animation.once(dragonBones.EventObject.COMPLETE, function() {
e.animation.playAnimation("daiji", 0);
}, this);
};
t.prototype.start = function() {
this.animation.playAnimation("jinru", 1);
this.now_round_reward = parseInt(this.jinbi.string);
};
t.prototype.update = function() {};
t.prototype.click_giveup = function() {
r.default.getInstance().playSound("点击按钮音");
s.default.getInstance().local_data.jinbi += this.now_round_reward;
s.default.getInstance().local_data_set("jinbi", s.default.getInstance().local_data.jinbi);
this.node.removeFromParent();
s.default.upgrade_type.removeRound(s.default.upgrade_type.now_round + 1);
};
t.prototype.click_ad_double = function() {
r.default.getInstance().playSound("点击按钮音");
console.log("播放广告，双倍领取");
s.default.getInstance().local_data.jinbi += 2 * this.now_round_reward;
s.default.getInstance().local_data_set("jinbi", s.default.getInstance().local_data.jinbi);
this.node.removeFromParent();
s.default.upgrade_type.removeRound(s.default.upgrade_type.now_round + 1);
};
i([ u(dragonBones.ArmatureDisplay) ], t.prototype, "animation", void 0);
i([ u(cc.Label) ], t.prototype, "jinbi", void 0);
return i([ d ], t);
}(c.default);
n.default = f;
cc._RF.pop();
}, {
"../Manager/AudioManager": "AudioManager",
"../Manager/GameData": "GameData",
"../Manager/baseManager": "baseManager"
} ]
}, {}, [ "AdaptarManager", "AudioManager", "ColorAssembler2D", "GameData", "PopUpDataManager", "ViewManager", "baseManager", "dialog", "fail_page", "mall", "sign_in", "treasure_chest", "win_page", "ViewMain", "free_type", "gameStart", "leadFish", "leadFishMove", "mapTypeLeadFishMove", "map_Component", "monsterFish_Component", "now_score", "upgrade_tpye_move", "upgrade_type", "ut_lead_fish" ]);