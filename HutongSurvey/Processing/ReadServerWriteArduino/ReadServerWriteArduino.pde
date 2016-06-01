
import processing.serial.*;

String myName, deviceTracked;
String serverURL = "http://hutong.guokrspace.com:81/server.php"; //you can use my server
String directions[];

Serial myPort;

Boolean redlightOn = false;  // set boolean for on/off
Boolean bluelightOn = false;  
Boolean greenlightOn = false;  

int redFill = 0;
int greenFill = 0;
int blueFill = 0;

int circW = 200;  //set width of circles

void setup() {
  size(300, 300);
  textAlign(CENTER, CENTER);
  textSize(28);
  myName = "kyle"; //put your name here to generate your own txt file
  
  printArray(Serial.list());
  String portName = Serial.list()[2];
  
  myPort = new Serial(this, portName, 9600);
}
void draw() {

  background(255, 255, 255);
  
  readDirections();
  
  for(int i=0; i<directions.length; i++)
  {
    String direction = directions[i];
    if(direction.equals("P"))
    {
      myPort.write('P');
      println('P');
    }
    else if(direction.equals("N"))
    {
      myPort.write('N');
      println('N');
    }
    
    delay(4000);
  }
  
  delay(10000);

}

void mousePressed() {
  myPort.write('S');
}

void readDirections(){  
  if (myName != "") {
    String url = serverURL+"?get="+myName;
    String result[] = loadStrings(url);
    if (result.length > 0)
        directions = result;
        printArray(directions);
    }
  }