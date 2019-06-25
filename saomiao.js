import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    Vibration,
    Animated,
    Easing,
    StyleSheet,
    AppRegistry
} from 'react-native';

const Dimensions = require('Dimensions');
const { width,height } = Dimensions.get('window');

import Camera from 'react-native-camera';
import FindView from './FindView'

import backIcon from './src/img/backIcon.png';//返回按钮11
import scanLine from './src/img/scan_line.png';//扫描线
import flashLight from './src/img/flash_light.jpg';//手电筒

export class MyApp extends Component{
    constructor(props){
        super(props);
        this.state = {
            barCodeType: '',//条码类型
            fadeInOpacity: new Animated.Value(0),//透明度初始值设为0
            isEndAnimation: false,//动画结束标记
            flag: true,
            openFlash: false
        }
    }
    componentDidMount(){
        this._startAnimation(false)
    }
    //动画开始，循环播放
    _startAnimation(isEnd){
        Animated.timing(this.state.fadeInOpacity,{
            toValue: 1, // 透明度最终变为1，即完全不透明111
            easing: Easing.linear,//动画方式
            duration: 2000//动画时长
        }).start(()=>{// 开始执行动画
            if (isEnd){
                this.setState({
                    isEndAnimation:true
                });
                return;
            }
            if (!this.state.isEndAnimation){
                this.state.fadeInOpacity.setValue(0);
                this._startAnimation(false)
            }
        })
    }
    render(){
        return(
            <View  style={{flex:1,justifyContent:'space-between'}}>
                <Camera
                    ref={cam => this.camera = cam}
                    style={{flex:1}}
                    barcodeScannerEnabled={true}//启用条形码
                    onBarCodeRead={(e)=>this.barcodeReceived(e)}
                    torchMode={this.state.openFlash ? 'on' : 'off'}
                >
                    <View style={styles.container}>
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={()=>this.popToMain()}
                        >
                            <View>
                                <Image source={backIcon} style={styles.backImg}/>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.centerContainer}/>

                    <View style={{flexDirection:'row'}}>
                        <View style={styles.fillView}/>
                        <View style={styles.scanFrame}>
                            <FindView />
                            <Animated.View style={{
                                alignItems: 'center',
                                opacity: 1,
                                transform:[{
                                    translateY:this.state.fadeInOpacity.interpolate({
                                        inputRange:[0,1],
                                        outputRange:[0,220]
                                    })
                                }]
                            }}>
                                <Image source={scanLine}/>
                            </Animated.View>
                        </View>
                        <View style={styles.fillView}/>
                    </View>

                    <View style={styles.bottomContainer}>
                        <Text style={[styles.text,{marginTop: 25}]}>请将二维码放在识别框中</Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={()=>this.openFlashMode()}
                        >
                            <View style={styles.flash}>
                                <Image source={flashLight} style={{width:30,height:30,borderRadius:15}}/>
                                <Text style={styles.text}>
                                    开/关灯
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Camera>
            </View>
        )
    }
    openFlashMode() {
        this.setState({
            openFlash: !this.state.openFlash,
        });
    }

    //返回上一界面
    popToMain(){

    }

    //扫码结果处理
    barcodeReceived(e){
        if(e.data !== this.state.barCodeType){

            this.state.barCodeType = e.data;
            alert(e.data)
            this.setState({
                isEndAnimation:true
            });
        }
    }
}

const styles = StyleSheet.create({
    container:{
        height: 50,
        backgroundColor:'#000',
        justifyContent: 'center',
        opacity:0.5
    },
    fillView:{
        width: (width-220)/2,
        height: 220,
        backgroundColor: '#000',
        opacity: 0.5
    },
    scanFrame:{
        width: 220,
        height: 220
    },
    backImg: {
        marginLeft: 10,
    },
    centerContainer:{
        width: width,
        height: (height - 50) / 6,
        backgroundColor: '#000',
        opacity: 0.5
    },
    bottomContainer:{
        flex: 1,
        width:width,
        alignItems: 'center',
        backgroundColor: '#000',
        opacity: 0.5,
    },
    text:{
        fontSize: 14,
        color: '#fff'
    },
    flash: {
        marginTop: 65,
        alignItems: 'center'
    }
})

AppRegistry.registerComponent('MyApp', () => MyApp);
