import GmaeData  from "./GameData";

export default class AudioManager {
    private static instance: AudioManager; 
    static getInstance(): AudioManager
    {
        if(this.instance == null)
        {
            this.instance = new AudioManager();
        }
        return this.instance;
    }
    static AUDIO_URL ='music/';
    musicVolume:number =  0.7; 
    soundVolume:number =  0.7;
    bgMusicAudioID:number = -1; //当前背景音乐的ID
    init(){
        cc.game.on(cc.game.EVENT_HIDE, function () {
            // console.log("声音暂停"+"============AudioManager的第19行");
            // cc.audioEngine.pauseAll();
        });
        cc.game.on(cc.game.EVENT_SHOW, function () {
            // console.log("播放声音"+"============AudioManager的第23行");
            // cc.audioEngine.resumeAll();
        });
        if(!GmaeData.music.musicVolume){
            this.musicVolume = 0.5;
        }else{
            this.musicVolume = GmaeData.music.musicVolume;
        }
            
        if(!GmaeData.music.soundVolume){
            this.soundVolume = 0.5;
        }else{
            this.soundVolume = GmaeData.music.soundVolume;
        }
    }
    //播放音乐
    playMusic(url:string){
        if(this.bgMusicAudioID >= 0){
            cc.audioEngine.stop(this.bgMusicAudioID);
        }
        cc.resources.load(AudioManager.AUDIO_URL+url, cc.AudioClip, function (err, clip:cc.AudioClip) {
            if(err) console.log(err)
            else if(clip){
                this.bgMusicAudioID = cc.audioEngine.play(clip,true,this.musicVolume);
            }
        });
    }
    //播放音效
    playSound(url:string){
        // var audioUrl = this.getUrl(url);
        var self = this;
        cc.resources.load(AudioManager.AUDIO_URL+url, cc.AudioClip, function (err, clip:cc.AudioClip) {
            if(self.soundVolume > 0){
                var audioId = cc.audioEngine.play(clip,false,self.soundVolume); 
                cc.audioEngine.setFinishCallback(audioId,()=>{
                    cc.audioEngine.stop(audioId);
                })
            }
        });
    }
    //设置音效大小
    setSoundVolume(v:number){
        if(this.soundVolume != v){
            this.soundVolume = v;
            GmaeData.music.musicVolume = this.soundVolume;
        }
    }
    pauseBgM(){
        if(this.bgMusicAudioID >= 0){
            cc.audioEngine.pause(this.bgMusicAudioID);
        }
    }
    //设置音乐大小
    setMusicVolume(v:number){
        if(this.bgMusicAudioID >= 0){
            if(v > 0){
                cc.audioEngine.resume(this.bgMusicAudioID);//恢复播放指定的音频
            }
            else{
                cc.audioEngine.pause(this.bgMusicAudioID);//暂停正在播放音频。
            }
        }
        if(this.musicVolume != v){
            this.musicVolume = v;
            cc.audioEngine.setVolume(this.bgMusicAudioID,v);//设置音量（0.0 ~ 1.0）
            GmaeData.music.musicVolume = this.musicVolume
        }
    }
    //暂停现在正在播放的所有音频。
    pauseAll(){
        cc.audioEngine.pauseAll();
    }
    //恢复播放所有之前暂停的所有音频。
    resumeAll(){
        cc.audioEngine.resumeAll();
    }
}
