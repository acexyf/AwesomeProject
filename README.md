

# adb命令

1. 查看当前PC端连接有多少设备
adb devices

2. 查看adb的版本
adb　version

3. server的关闭
adb kill-server

4. 查看手机中装的所有的包
adb shell pm list packages

5. 手机截屏
adb shell screencap -p /sdcard/screenshot.png

6. 将数据从设备复制到PC中
adb -s 1dd5a009 pull /sdcard/screenshot.png D://adb/


7. 将数据从PC端复制到设备中
adb -s 1dd5a09 push D://img/my.png /sdcard/


8. 重启手机上的adbd，开启网络调试功能
adb tcpip 5555

9. 远程连接到手机
adb connect 192.168.31.196:5555


10. 对屏幕发送一个触摸事件
adb shell input tap 500 500

11. home按键
adb shell input keyevent 3

12. 返回按键
adb shell input keyevent 4

# 启动服务

npm run dev-android



# 远程连接调试

Dev Settings => Debug server host & port for devices => [ip]:8081

