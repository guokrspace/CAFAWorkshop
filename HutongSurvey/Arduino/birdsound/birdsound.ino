/*
  Melody

 Plays a melody

 circuit:
 * 8-ohm speaker on digital pin 8

 created 21 Jan 2010
 modified 30 Aug 2011
 by Tom Igoe

This example code is in the public domain.

 http://www.arduino.cc/en/Tutorial/Tone

 */
#include "pitches.h"

// notes in the melody:
int melody_positive[] = {
  NOTE_C8, NOTE_G7, NOTE_G7, NOTE_A7, NOTE_G7, 0, NOTE_B7, NOTE_C8
};

int melody_negative[] = {
  NOTE_C2, NOTE_G1, NOTE_G1, NOTE_A1, NOTE_G1, 0, NOTE_B1, NOTE_C2
};

// note durations: 4 = quarter note, 8 = eighth note, etc.:
int noteDurations[] = {
  8, 16, 16, 8, 8, 8, 8, 8
};

char key;

void setup() {
   Serial.begin(9600); // Start serial communication at 9600 bps
}

void loop() {
  // if we get a valid byte, read analog ins:
  while (Serial.available()) { // If data is available to read,
     key = Serial.read(); // read it and store it in val
  }

  if(key == 'P')
    play(melody_positive);
  else if(key=='N')
    play(melody_negative);

  delay(4000);
}

void play(int melody[])
{
 // iterate over the notes of the melody:
  for (int thisNote = 0; thisNote < 8; thisNote++) {

    // to calculate the note duration, take one second
    // divided by the note type.
    //e.g. quarter note = 1000 / 4, eighth note = 1000/8, etc.
    int noteDuration = 1000 / noteDurations[thisNote];
    
    tone(8, melody[thisNote], noteDuration); 
  
    // to distinguish the notes, set a minimum time between them.
    // the note's duration + 30% seems to work well:
    int pauseBetweenNotes = noteDuration * 2;
    delay(pauseBetweenNotes);
    // stop the tone playing:
    noTone(8);
  }
}

