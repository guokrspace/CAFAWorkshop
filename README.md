# CAFAWorkshop

## Beirithm - Hutong
1. The idea is to follow an algorithm to navigate the Hutong and interview the local people we meet there. During the interview, if they express an positive feeling about their life, we take a note of "Positive Mood", later on, when we continue to walk in the Hutong, we will turn left on next turn, otherwise, if they expressed a negative feeling about their lift, we take a note of "Negative Mood" and turn right on next turn. This data will also be sent to server and store there.

2. In the meantime, there are bird houses in the exhibition hall as an art installistion, those bird houses are connnected with an Arduino Open Source Hardward, which will generate bird sounds mimicking "happy" or "sad" bird sound. 

3. The bridge 1) and 2) is computer runing processing proram will go online to read the data store in the server describled above, if there is a "negative" feeling recorded, it will sends data to the Arduino to trigger a negative type of sound, otherwise, it trigger an positive sound.

## The Bird Sound
* Happy Sound:
The happy sound is a hack of a small bird toy. We use arduino connected with a TIP120 chip as a switch to turn on/off the bird sound.

* Sad Sound:
The sad sound is to use the Arduino to running a Melody for a Hummer.
![](https://github.com/guokrspace/CAFAWorkshop/blob/master/HutongSurvey/Arduino/finalwiredup.jpg)

## The Mobile App
The app is an implementation of the navigational algorithm. The goal is to use this App to guide people's navigation and collect the data. We use react to develop a webapp that can be running in the web browser or just inside Wechat. The benefit is that people don't need to install a native App and just to use Wechat to do this.
![](https://github.com/guokrspace/CAFAWorkshop/blob/master/HutongSurvey/Arduino/mobilewebapp.jpg)

## The bridge between the Bird Sound and the Mobile App.
For the time being, it is an computer with internnect connection. The processing proram runs on it, it retrieve data from the server that is collected by the mobile App. Based on the data, it will triggerd the Arduino to perform different sound based on the data from the server.
![](https://github.com/guokrspace/CAFAWorkshop/blob/master/HutongSurvey/Arduino/birdhouse.jpg)


